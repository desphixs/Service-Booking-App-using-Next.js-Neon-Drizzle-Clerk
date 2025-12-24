import React from "react";
import { getServicesByUser } from "@/db/admin/queries";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { Plus, Clock, ExternalLink, Settings2, Trash2, LayoutGrid, Sparkles, ArrowUpRight, Tag } from "lucide-react";

const Services = async () => {
    const { userId } = await auth();
    if (!userId) return null;

    const userServices = await getServicesByUser(userId);

    return (
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-10 font-['Plus_Jakarta_Sans']">
            {/* --- Premium Header: Left Aligned --- */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
                <div className="space-y-5 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-2xl">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Merchant Hub</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                        My Professional <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">Services Catalog</span>
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed font-medium">Curate and manage your high-ticket offerings. Your services are automatically synced with the global booking directory.</p>
                </div>

                <Link href="/admin/services/new" className="group w-fit flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest hover:bg-indigo-600 transition-all duration-500 shadow-2xl shadow-slate-200 active:scale-95">
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    Create New Offering
                </Link>
            </div>

            {/* --- Service Grid: Left Aligned --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {userServices.map((service) => (
                    <div key={service.id} className="group bg-white rounded-[2.5rem] border border-slate-100 p-2 flex flex-col hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2">
                        {/* Image Container */}
                        <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-50">
                            {service.image ? (
                                <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-indigo-50/20">
                                    <LayoutGrid className="w-12 h-12 text-indigo-100" />
                                </div>
                            )}

                            {/* Status Overlay */}
                            <div className="absolute top-4 left-4">
                                <div className="backdrop-blur-xl bg-white/80 border border-white/40 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm">
                                    <div className={`w-2 h-2 rounded-full ${service.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-900">{service.isActive ? "Live" : "Draft"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <Tag className="w-3 h-3 text-indigo-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{service.category || "General"}</span>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">{service.title}</h3>

                            {/* Metadata Row */}
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg">
                                        <Clock className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-300 uppercase">Duration</p>
                                        <p className="text-sm font-bold text-slate-700">{service.durationMinutes}m</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-300 uppercase">Rate</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">₦{(service.price / 100).toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Toolbar */}
                            <div className="flex items-center gap-3">
                                <Link href={`/admin/services/${service.id}`} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
                                    Manage
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>

                                <Link href={`/admin/services/${service.id}/update`} className="p-4 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all border border-slate-100" title="Edit Details">
                                    <Settings2 className="w-5 h-5" />
                                </Link>

                                <button className="p-4 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all border border-slate-100" title="Delete Service">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- Empty State: Full Span --- */}
                {userServices.length === 0 && (
                    <div className="col-span-full py-24 flex flex-col items-start bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-12 text-left">
                        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8">
                            <LayoutGrid className="w-10 h-10 text-indigo-200" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-3">Your catalog is empty</h2>
                        <p className="text-slate-500 text-lg max-w-sm mb-10 leading-relaxed">Start monetization by defining your first professional service. It only takes 2 minutes.</p>
                        <Link href="/admin/services/new" className="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                            Create First Service
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;
