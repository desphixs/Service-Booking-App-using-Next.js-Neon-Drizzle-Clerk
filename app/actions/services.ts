"use server";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { services, providers } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export async function createServiceAction(formData: FormData, imageUrl: string, included: string[], timeSlots: string[]) {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    // 1. Ensure Provider record exists (The Sync)
    // We use a standard select here as a safer alternative to .query if config is tricky
    const existingProviders = await db.select().from(providers).where(eq(providers.userId, user.id)).limit(1);

    const provider = existingProviders[0];

    if (!provider) {
        // Create the provider profile if this is their first time
        await db.insert(providers).values({
            userId: user.id,
            email: user.emailAddresses[0].emailAddress,
            fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            image: user.imageUrl,
        });
    }

    // 2. Extract and Validate Form Data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priceRaw = formData.get("price") as string;
    const category = formData.get("category") as string;
    const durationRaw = formData.get("durationMinutes") as string;

    // Convert to numbers
    const price = parseInt(priceRaw) || 0;
    const durationMinutes = parseInt(durationRaw) || 60;

    // 3. Generate Slug
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    // 4. Insert Service
    const result = await db
        .insert(services)
        .values({
            userId: user.id, // Linked to provider via schema userId
            title,
            slug,
            description,
            image: imageUrl,
            price,
            category,
            included,
            timeSlots,
            durationMinutes,
            isActive: true,
        })
        .returning({ insertedId: services.id });

    const newServiceId = result[0].insertedId;

    // 5. Update Cache and Redirect
    revalidatePath("/admin/services");
    redirect(`/admin/services/${newServiceId}`);
}

// --- NEW UPDATE ACTION ---
export async function updateServiceAction(id: string, formData: FormData, imageUrl: string, included: string[], timeSlots: string[]) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const category = formData.get("category") as string;
    const durationMinutes = parseInt(formData.get("durationMinutes") as string);

    await db
        .update(services)
        .set({
            title,
            description,
            image: imageUrl,
            price,
            category,
            included,
            timeSlots,
            durationMinutes,
            updatedAt: new Date(),
        })
        .where(eq(services.id, id)); //

    revalidatePath(`/admin/services/${id}/update`);
    redirect(`/admin/services/${id}`);
}
