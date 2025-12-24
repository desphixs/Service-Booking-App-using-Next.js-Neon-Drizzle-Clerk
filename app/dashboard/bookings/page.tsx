import { auth } from "@clerk/nextjs/server";
import { getUserBookings } from "@/db/queries";
import { Calendar, Clock, CreditCard, ChevronRight, Inbox, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function MyBookingsPage() {
    const { userId } = await auth();
    if (!userId) return null;

    const userBookings = await getUserBookings(userId);

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex   justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Bookings</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Manage your upcoming and past sessions</p>
                </div>
                <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    <Plus className="w-4 h-4" />
                    Book New Service
                </Link>
            </div>

            {/* Bookings Grid */}
            {userBookings.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {userBookings.map((booking) => (
                        <Link key={booking.id} href={`/dashboard/bookings/${booking.id}`} className="group bg-white rounded-[2.5rem] border border-slate-100 p-2 flex flex-col md:flex-row gap-6 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                            {/* Service Image Container */}
                            <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden rounded-[2rem] bg-slate-100 shrink-0">
                                {booking.service?.image ? (
                                    <Image src={booking.service.image} alt={booking.serviceTitle} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-50">
                                        <Calendar className="w-10 h-10 text-slate-200" />
                                    </div>
                                )}
                            </div>

                            {/* Booking Info */}
                            <div className="flex-1 p-4 md:pr-8 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${booking.status === "paid" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}>{booking.status}</span>
                                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Ref: {booking.id.slice(-8).toUpperCase()}</p>
                                    </div>

                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{booking.serviceTitle}</h3>

                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Calendar className="w-4 h-4 text-indigo-500" />
                                            <span className="text-xs font-bold">{booking.scheduledFor.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Clock className="w-4 h-4 text-indigo-500" />
                                            <span className="text-xs font-bold uppercase">{booking.scheduledFor.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-5">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-slate-50 rounded-lg">
                                            <CreditCard className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <p className="text-sm font-black text-slate-900">${(booking.amount_paid! / 100).toLocaleString()}</p>
                                    </div>
                                    <div className="bg-slate-900 text-white p-2.5 rounded-xl group-hover:bg-indigo-600 transition-all">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-[3rem] border border-dashed border-slate-200 py-24 text-center">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Inbox className="w-8 h-8 text-slate-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900">No bookings yet</h2>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2 mb-8">You haven't scheduled any services. Ready to start your journey?</p>
                    <Link href="/" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all">
                        Explore Services
                    </Link>
                </div>
            )}
        </div>
    );
}
