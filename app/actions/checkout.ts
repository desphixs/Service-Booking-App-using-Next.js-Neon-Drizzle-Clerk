"use server";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createCheckoutSession(formData: FormData) {
    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const serviceId = formData.get("serviceId") as string;
    const serviceTitle = formData.get("serviceTitle") as string;

    // Convert to Cents: Multiply by 100
    const priceInDollars = parseInt(formData.get("price") as string);
    const priceInCents = priceInDollars * 100;

    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const notes = formData.get("notes") as string;

    let customer = await db.query.customers.findFirst({
        where: eq(customers.userId, user.id),
    });

    if (!customer) {
        const [newCustomer] = await db
            .insert(customers)
            .values({
                userId: user.id,
                email: user.emailAddresses[0].emailAddress,
                fullName: `${user.firstName} ${user.lastName}`,
            })
            .returning();
        customer = newCustomer;
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: { name: serviceTitle },
                    unit_amount: priceInCents, // Now correctly in cents
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/{CHECKOUT_SESSION_ID}?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/service/${serviceId}`,
        metadata: {
            customerId: customer.id,
            serviceId,
            serviceTitle,
            scheduledFor: `${date}T${time}:00Z`,
            notes,
        },
    });

    redirect(session.url!);
}
