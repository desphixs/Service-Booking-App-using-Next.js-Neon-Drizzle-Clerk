"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { User, Phone, Globe, Briefcase, FileText, Save, Loader2, Camera } from "lucide-react";
import { updateProviderProfile } from "@/app/actions/provider";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-black text-sm hover:bg-black transition-all shadow-xl disabled:opacity-50 active:scale-95">
            {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {pending ? "Updating Profile..." : "Save Provider Settings"}
        </button>
    );
}

export function ProviderProfileForm({ provider }: { provider: any }) {
    const [imageUrl, setImageUrl] = useState(provider?.image || "");

    return (
        <form action={updateProviderProfile} className="space-y-8 text-left">
            {/* Business Brand & Avatar Section */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
                <div className="relative group">
                    <div className="w-40 h-40 rounded-[2.5rem] bg-slate-100 overflow-hidden border-4 border-white shadow-2xl ring-1 ring-slate-100 relative">
                        {imageUrl ? (
                            <Image src={imageUrl} alt="Provider" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                                <Briefcase className="w-16 h-16" />
                            </div>
                        )}
                    </div>
                    <input type="hidden" name="image" value={imageUrl} />
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                    <h3 className="text-xl font-black text-slate-900">Business Identity</h3>
                    <p className="text-slate-500 text-sm max-w-md">This photo and business name will be visible on all your service listings to build trust with clients.</p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                setImageUrl(res[0].url);
                                alert("Business image updated!");
                            }}
                            appearance={{
                                button: "bg-indigo-600 rounded-xl text-xs font-bold px-6 py-3 h-auto shadow-lg shadow-indigo-100",
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-8 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative">
                                <input name="fullName" type="text" defaultValue={provider?.fullName} required className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                                <User className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Name</label>
                            <div className="relative">
                                <input name="businessName" type="text" defaultValue={provider?.businessName || ""} placeholder="e.g. Acme Consulting" className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                                <Briefcase className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Bio</label>
                        <div className="relative">
                            <textarea name="bio" rows={5} defaultValue={provider?.bio || ""} placeholder="Describe your expertise and what clients can expect..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none" />
                            <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                        </div>
                    </div>

                    <SubmitButton />
                </div>

                {/* Sidebar Details */}
                <div className="space-y-8">
                    <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-indigo-400">Contact Info</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone Number</label>
                                <div className="relative">
                                    <input name="phone" type="tel" defaultValue={provider?.phone || ""} className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-4 pr-4 py-3 text-sm font-bold text-white focus:ring-2 focus:ring-indigo-500/40 outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Website URL</label>
                                <div className="relative">
                                    <input name="website" type="url" defaultValue={provider?.website || ""} placeholder="https://..." className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-4 pr-4 py-3 text-sm font-bold text-white focus:ring-2 focus:ring-indigo-500/40 outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
