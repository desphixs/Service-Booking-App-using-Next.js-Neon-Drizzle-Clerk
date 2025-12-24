import React from "react";
import { getServiceDetail } from "@/db/admin/queries";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, Globe, Clock, CheckCircle2, LayoutGrid, Settings2, Trash2, Tag, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const resolvedParams = await params;
    const serviceId = resolvedParams.id;

    if (serviceId === "new") return null;

    const service = await getServiceDetail(serviceId, userId);
    if (!service) notFound();

    return (
        <div className="min-h-screen bg-slate-50/50 font-['Plus_Jakarta_Sans'] pb-20">
            {/* --- Navigation Header --- */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/services" className="p-2.5 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                            <ChevronLeft className="w-5 h-5 text-slate-400" />
                        </Link>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Service Overview</p>
                            <h2 className="font-black text-slate-900 tracking-tight">{service.title}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={`/admin/services/${service.id}/update`} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                            <Settings2 className="w-4 h-4" />
                            Edit Service
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* --- Left Column: Content --- */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Imagery Card */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                            <div className="relative aspect-video bg-slate-100 group">
                                {service.image ? (
                                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center">
                                        <LayoutGrid className="w-16 h-16 text-slate-200" />
                                    </div>
                                )}
                                <div className="absolute top-6 left-6">
                                    <div className="backdrop-blur-xl bg-white/80 border border-white/40 px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg">
                                        <div className={`w-2 h-2 rounded-full ${service.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-900">{service.isActive ? "Live in Market" : "Internal Draft"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">{service.title}</h1>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl text-indigo-600">
                                        <Tag className="w-4 h-4" />
                                        <span className="text-xs font-black uppercase tracking-widest">{service.category || "General"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-600 border border-slate-100">
                                        <Globe className="w-4 h-4" />
                                        <span className="text-xs font-black uppercase tracking-widest">{service.currency}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] block">Detailed Description</label>
                                <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-3xl whitespace-pre-line">{service.description || "No description provided for this service."}</p>
                            </div>
                        </div>

                        {/* Perks & Slots Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* What's Included */}
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-8">What's Included</label>
                                <div className="space-y-4">
                                    {service.included?.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-50 transition-colors">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                            <span className="text-sm font-bold text-slate-700 leading-tight">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Available Slots */}
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-8">Time Slots</label>
                                <div className="grid grid-cols-1 gap-4">
                                    {service.timeSlots?.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50/30 border border-indigo-50">
                                            <Clock className="w-5 h-5 text-indigo-500 shrink-0" />
                                            <span className="text-sm font-black text-indigo-900 uppercase tracking-widest">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column: Financials & Status --- */}
                    <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
                        {/* Quick Stats Card */}
                        <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100">
                            <div className="space-y-10">
                                <div>
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Total Price</p>
                                    <h3 className="text-6xl font-black tracking-tighter">
                                        <span className="text-2xl align-top mr-1">₦</span>
                                        {(service.price / 100).toLocaleString()}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-800">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Duration</p>
                                        <div className="flex items-center gap-2 font-black text-lg">
                                            <Clock className="w-5 h-5 text-indigo-500" />
                                            {service.durationMinutes}m
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Session Type</p>
                                        <div className="flex items-center gap-2 font-black text-lg text-emerald-400">
                                            <Calendar className="w-5 h-5" />
                                            1-on-1
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <Link href={`/service/${service.slug}`} target="_blank" className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-900 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                                <ArrowUpRight className="w-4 h-4" />
                                Preview Public Page
                            </Link>
                            <button className="w-full flex items-center justify-center gap-3 text-rose-500 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-rose-50 transition-all">
                                <Trash2 className="w-4 h-4" />
                                Permanent Deletion
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
