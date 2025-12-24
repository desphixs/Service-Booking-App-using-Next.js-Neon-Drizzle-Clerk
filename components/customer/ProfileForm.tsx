"use client";

import { useState } from "react";
import { User, Phone, Mail, Save, Loader2 } from "lucide-react";
import { updateCustomerProfile } from "@/app/actions/profile";
import { UploadButton } from "@/utils/uploadthing"; // Adjust path as needed
import Image from "next/image";
import { useFormStatus } from "react-dom";

// Sub-component for the loading button
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-black text-sm hover:bg-black transition-all shadow-xl disabled:opacity-50 active:scale-95">
            {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {pending ? "Saving Changes..." : "Save Profile Changes"}
        </button>
    );
}

export function ProfileForm({ customer }: { customer: any }) {
    const [imageUrl, setImageUrl] = useState(customer?.image || "");

    return (
        <form action={updateCustomerProfile} className="space-y-8">
            {/* Profile Image Section */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-[2rem] bg-slate-100 overflow-hidden border-4 border-white shadow-xl ring-1 ring-slate-100 relative">
                    {imageUrl ? (
                        <Image src={imageUrl} alt="Avatar" fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <User className="w-12 h-12" />
                        </div>
                    )}
                </div>

                <input type="hidden" name="image" value={imageUrl} />

                <div className="space-y-4 text-center md:text-left">
                    <h3 className="font-black text-slate-900">Profile Picture</h3>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setImageUrl(res[0].url);
                            alert("Image uploaded successfully!");
                        }}
                        appearance={{
                            button: "bg-indigo-600 rounded-xl text-xs font-bold px-6 py-3 h-auto",
                        }}
                    />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">JPG or PNG. Max 4MB.</p>
                </div>
            </div>

            {/* Form Fields Section */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                            <input name="fullName" type="text" defaultValue={customer?.fullName} required className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" />
                            <User className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative">
                            <input name="phone" type="tel" defaultValue={customer?.phone || ""} className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" />
                            <Phone className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                    <SubmitButton />
                </div>
            </div>
        </form>
    );
}
