import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateServiceForm from "@/components/admin/CreateServiceForm";

export default async function NewServicePage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <div className="py-12 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900">Add New Service</h1>
                <p className="text-gray-500">Create a new service offering for your customers.</p>
            </div>

            <CreateServiceForm userId={userId} />
        </div>
    );
}
