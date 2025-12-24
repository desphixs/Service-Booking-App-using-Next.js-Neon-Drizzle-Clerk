import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { providers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProviderProfileForm } from "@/components/admin/ProviderProfileForm";

export default async function AdminSettingsPage() {
    const { userId } = await auth();
    if (!userId) return null;

    // Fetch the provider profile for the current user
    const provider = await db.query.providers.findFirst({
        where: eq(providers.userId, userId),
    });

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <div className="mb-12 text-left">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Provider Settings</h1>
                <p className="text-slate-500 font-medium mt-1">Configure your professional profile and business details.</p>
            </div>

            <ProviderProfileForm provider={provider} />
        </div>
    );
}
