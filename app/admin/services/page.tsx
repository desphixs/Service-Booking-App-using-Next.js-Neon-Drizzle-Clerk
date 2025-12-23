import React from "react";
import { getServicesByUser } from "@/app/actions/services";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Plus, Clock, ExternalLink, Settings2, Trash2, LayoutGrid, Sparkles } from "lucide-react";

const Services = async () => {
    const { userId } = await auth();
    if (!userId) return null;

    const userServices = await getServicesByUser(userId);

    return (
        <div className="max-w-6xl font-['Plus_Jakarta_Sans']">
            {/* --- Premium Header --- */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Merchant Hub</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Services</span>
                    </h1>
                    <p className="text-slate-500 text-base max-w-lg leading-relaxed font-medium">Manage your professional catalog and availability through your specialized merchant dashboard.</p>
                </div>

                <Link href="/admin/services/new" className="group relative flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[1.25rem] text-sm font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-2xl shadow-slate-200">
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    <span>Add New Service</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3  gap-10">
                {userServices.map((service) => (
                    <div key={service.id} style={{ boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.05)" }} className="group bg-white rounded-[2.5rem] border border-slate-100/80 hover:border-indigo-200 transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2">
                        <div className="relative aspect-[16/10] m-3 overflow-hidden rounded-[1.8rem] bg-slate-50">
                            {service.image ? (
                                <img src={service.image} alt={service.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-indigo-50/30">
                                    <LayoutGrid className="w-12 h-12 text-indigo-100" />
                                </div>
                            )}

                            {/* Floating Glass Badge */}
                            <div className="absolute top-4 left-4">
                                <div className="backdrop-blur-xl bg-white/70 border border-white/40 px-3 py-1.5 rounded-2xl flex items-center gap-2 shadow-sm">
                                    <div className={`w-1.5 h-1.5 rounded-full ${service.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">{service.isActive ? "Active" : "Draft"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-8 pt-4 flex flex-col flex-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-2">{service.category || "Consultation"}</span>

                            <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-1">{service.title}</h3>

                            <div className="flex items-center gap-6 mb-8 py-3 border-y border-slate-50">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-xs font-bold">{service.durationMinutes}m</span>
                                </div>
                                <div className="h-4 w-[1px] bg-slate-200" />
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase">From</span>
                                    <span className="text-xl font-black text-slate-900 tracking-tighter">${service.price}</span>
                                </div>
                            </div>

                            {/* Actions Toolbar */}
                            <div className="flex items-center gap-3">
                                <Link href={`/admin/services/${service.id}`} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-950 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Manage
                                </Link>

                                <Link href={`/admin/services/${service.id}/update`} className="p-3.5 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all border border-slate-100">
                                    <Settings2 className="w-4 h-4" />
                                </Link>

                                <button className="p-3.5 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all border border-slate-100">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- Elite Empty State --- */}
                {userServices.length === 0 && (
                    <div className="col-span-full py-32 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-[3rem] text-center shadow-sm">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                            <Plus className="w-10 h-10 text-indigo-200" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2">No active services</h2>
                        <p className="text-slate-500 text-sm max-w-xs mb-10 leading-relaxed font-medium">Start your digital journey by creating your first service offering.</p>
                        <Link href="/admin/services/new" className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
                            Create Service
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;
