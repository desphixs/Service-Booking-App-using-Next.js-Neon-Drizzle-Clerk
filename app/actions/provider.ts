"use server";

import { db } from "@/db";
import { providers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateProviderProfile(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Extracting data from the form
    const fullName = formData.get("fullName") as string;
    const businessName = formData.get("businessName") as string;
    const bio = formData.get("bio") as string;
    const phone = formData.get("phone") as string;
    const website = formData.get("website") as string;
    const image = formData.get("image") as string;

    try {
        await db
            .update(providers)
            .set({
                fullName,
                businessName,
                bio,
                phone,
                website,
                image,
                updatedAt: new Date(),
            })
            .where(eq(providers.userId, userId));

        // Revalidate the dashboard and the profile page to show new data
        revalidatePath("/dashboard/admin/settings");
        revalidatePath("/admin/profile");

        return { success: true, message: "Provider profile updated successfully" };
    } catch (error) {
        console.error("Failed to update provider profile:", error);
        return { success: false, message: "Failed to update profile" };
    }
}
