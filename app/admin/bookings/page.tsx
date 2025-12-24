import { auth } from "@clerk/nextjs/server";
import { getProviderBookings } from "@/db/admin/queries";
import { Calendar, Clock, User, ChevronRight, Inbox, Search, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function ProviderBookingsPage() {
    const { userId } = await auth();
    if (!userId) return null;

    const allBookings = await getProviderBookings(userId);

    return (
        <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-['Plus_Jakarta_Sans']">
            {/* --- Elite Header --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="text-left">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Bookings</h1>
                    <p className="text-slate-500 font-medium mt-1">Review and manage all incoming appointments for your services.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search client name..." className="bg-white border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm" />
                    </div>
                    <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* --- Bookings List --- */}
            {allBookings.length > 0 ? (
                <div className="space-y-4">
                    {allBookings.map((booking) => (
                        <Link key={booking.id} href={`/admin/bookings/${booking.id}`} className="group bg-white p-5 rounded-[2rem] border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col lg:flex-row lg:items-center gap-6">
                            {/* 1. Service & Client (The Core Info) */}
                            <div className="flex items-center gap-5 flex-1 min-w-0">
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                                    {booking.service?.image ? (
                                        <Image src={booking.service.image} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-200">
                                            <Calendar className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0 text-left">
                                    <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors truncate">{booking.serviceTitle}</h3>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <User className="w-3.5 h-3.5 text-slate-400" />
                                        <p className="text-xs font-bold text-slate-500 truncate">{booking.customer?.fullName || "Anonymous Client"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Schedule Details (Desktop Alignment) */}
                            <div className="flex gap-10 lg:w-72 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-50">
                                <div className="space-y-1 text-left">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Date</p>
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Calendar className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm font-black italic">{booking.scheduledFor.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                    </div>
                                </div>
                                <div className="space-y-1 text-left">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Time</p>
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Clock className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm font-black uppercase">{booking.scheduledFor.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Status & Revenue */}
                            <div className="flex items-center justify-between lg:justify-end gap-10 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                                <div className="text-left lg:text-right">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Income</p>
                                    <p className="text-lg font-black text-slate-900 leading-tight">₦{(booking.amount_paid! / 100).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${booking.status === "paid" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}>{booking.status}</span>
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                /* --- Elite Empty State --- */
                <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-100 py-32 text-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Inbox className="w-10 h-10 text-slate-200" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900">No bookings yet</h2>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2">Your schedule is currently empty. Bookings will appear here once customers purchase your services.</p>
                </div>
            )}
        </div>
    );
}
