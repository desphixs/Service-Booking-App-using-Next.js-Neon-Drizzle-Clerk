import React from "react";
import { getServiceDetail } from "@/app/actions/services";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, Globe, Clock, CheckCircle2, MoreHorizontal } from "lucide-react";

interface Props {
    params: { id: string };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const resolvedParams = await params;
    const serviceId = resolvedParams.id;

    // 1. Prevent the "new" keyword from triggering a DB search
    if (serviceId === "new") return null;

    const service = await getServiceDetail(serviceId, userId);
    if (!service) notFound();

    return (
        <div className="min-h-screen bg-[#F8F9FC] font-['Plus_Jakarta_Sans']">
            <main className="max-w-7xl mx-auto px-2 py-10 grid grid-cols-12 gap-10">
                <div className="col-span-8 space-y-8">
                    {/* Media Card */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Service Imagery</label>
                        <div className="relative aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group">
                            {service.image ? (
                                <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
                            ) : (
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                        <Globe className="w-6 h-6 text-slate-300" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-400">Upload high-res cover</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description Card */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Service Title</label>
                            <input defaultValue={service.title} className="w-full text-2xl font-black text-slate-900 bg-transparent border-none p-0 focus:ring-0 placeholder:text-slate-200" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Detailed Description</label>
                            <textarea rows={6} defaultValue={service.description || ""} className="w-full text-sm leading-relaxed text-slate-600 border-none p-0 focus:ring-0 resize-none" placeholder="Describe exactly what your clients will receive..." />
                        </div>
                    </div>

                    {/* Perks / Included */}
                    <div className="flex flex-col md:flex-row items-start gap-6 h-auto">
                        {/* What's Included Card */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[240px] h-auto w-full transition-all">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-6">What's Included</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.included?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-indigo-100 transition-colors">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span className="text-xs font-bold text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Time Slots Card */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[240px] h-auto w-full transition-all">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-6">Time Slots</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.timeSlots?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-indigo-100 transition-colors">
                                        <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                                        <span className="text-xs font-bold text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content: The "Business" */}
                <div className="col-span-4 space-y-6">
                    {/* Status & Pricing Sidebar */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Visibility</h3>
                            <span className={`h-2 w-2 rounded-full ${service.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`}></span>
                        </div>
                        <select className="w-full p-3.5 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 cursor-pointer outline-none">
                            <option value="active" selected={service.isActive}>
                                Published
                            </option>
                            <option value="inactive" selected={!service.isActive}>
                                Draft
                            </option>
                        </select>
                        <hr className="border-slate-50" />
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Service Pricing</label>
                            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="text-lg font-black text-slate-400">$</span>
                                <input type="number" defaultValue={service.price / 100} className="bg-transparent border-none p-0 text-xl font-black text-slate-900 focus:ring-0 w-full" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-slate-500">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="text-[10px] font-bold">{service.durationMinutes} Minutes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-tight">{service.currency}</span>
                            </div>
                        </div>
                    </div>

                    {/* Category Selector */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Market Category</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white outline-none focus:ring-2 focus:ring-indigo-500/20">
                            <option value={service.category || ""}>{service.category || "Select Category"}</option>
                            <option value="design">Design & Creative</option>
                            <option value="development">Software Development</option>
                            <option value="marketing">Digital Marketing</option>
                        </select>
                    </div>

                    {/* Dange Zone / Settings */}
                    <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">Delete Service</button>
                </div>
            </main>
        </div>
    );
}
