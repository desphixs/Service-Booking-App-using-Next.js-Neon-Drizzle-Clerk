import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProfileForm } from "@/components/customer/ProfileForm";

export default async function SettingsPage() {
    const { userId } = await auth();

    const customer = await db.query.customers.findFirst({
        where: eq(customers.userId, userId!),
    });

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Settings</h1>
                <p className="text-slate-500 text-sm font-medium mt-1">Manage your identity and contact info</p>
            </div>

            <ProfileForm customer={customer} />
        </div>
    );
}
