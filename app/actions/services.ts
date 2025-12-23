"use server";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { services } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createServiceAction(formData: FormData, imageUrl: string, included: string[], timeSlots: string[]) {
    // 1. Extract data from form
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const userId = formData.get("userId") as string;
    const category = formData.get("category") as string;
    const durationMinutes = parseInt(formData.get("durationMinutes") as string);

    // 2. Simple URL-friendly slug generation
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    // 3. Insert into Drizzle DB
    const result = await db
        .insert(services)
        .values({
            userId,
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

    // result is an array, e.g., [{ insertedId: 1 }]
    const newServiceId = result[0].insertedId;

    // 4. Update the UI and Redirect
    revalidatePath("/admin/services" + newServiceId);
    redirect("/admin/services/" + newServiceId);
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

export async function getServicesByUser(userId: string) {
    return await db.select().from(services).where(eq(services.userId, userId)).orderBy(services.createdAt);
}

export async function getServiceDetail(serviceId: string, userId: string) {
    const result = await db
        .select()
        .from(services)
        .where(and(eq(services.id, serviceId), eq(services.userId, userId)));

    return result[0] || null;
}
