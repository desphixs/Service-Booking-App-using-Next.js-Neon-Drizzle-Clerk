import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { headers } from "next/headers";

export async function POST(req: Request) {
    const body = await req.text(); // Stripe needs the RAW text body
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event;

    try {
        // Verify the event actually came from Stripe
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response("Webhook Error", { status: 400 });
    }

    // Handle the successful payment event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const meta = session.metadata;

        // Create the booking in your database now that payment is confirmed
        await db.insert(bookings).values({
            id: session.id, // Using Stripe Session ID as a unique booking ID
            serviceId: meta!.serviceId,
            customerId: meta!.customerId,
            serviceTitle: meta!.serviceTitle,
            scheduledFor: new Date(meta!.scheduledFor),
            amount_paid: session.amount_total,
            stripeCheckoutSessionId: session.id,
            status: "paid",
            notes: meta!.notes,
        });

        console.log(`✅ Booking created for ${meta!.serviceTitle}`);
    }

    return new Response("Success", { status: 200 });
}
