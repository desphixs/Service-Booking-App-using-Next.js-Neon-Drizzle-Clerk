import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import ServiceForm from "@/components/admin/CreateServiceForm";

/*

In Next.js 16 (and late 2025 versions), params and searchParams are now asynchronous. 
You can no longer access params.id directly because params is a Promise that must be awaited before you can read its properties.

*/
export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    // 2. Await the params to "unwrap" them
    const resolvedParams = await params;
    const serviceId = resolvedParams.id;

    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    // 3. Use the unwrapped serviceId in your query
    const service = await db.query.services.findFirst({
        where: eq(services.id, serviceId),
    });

    if (!service) notFound();

    return (
        <div className="py-12 px-2">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900">Update Service</h1>
                <p className="text-gray-500">Use this form to update your existing service</p>
            </div>
            <ServiceForm userId={userId} initialData={service} />
        </div>
    );
}
