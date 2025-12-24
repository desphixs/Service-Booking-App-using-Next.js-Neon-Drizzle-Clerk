"use server";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateCustomerProfile(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const image = formData.get("image") as string;

    await db
        .update(customers)
        .set({
            fullName,
            phone,
            image,
            updatedAt: new Date(),
        })
        .where(eq(customers.userId, userId));

    revalidatePath("/dashboard/settings");
    return { success: true };
}
