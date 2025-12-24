import { auth, currentUser } from "@clerk/nextjs/server";
import { getProviderStats, getProviderBookings } from "@/db/admin/queries";
import { ArrowUpRight, CheckCircle, Clock, CreditCard, Calendar, LayoutGrid, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminDashboardPage() {
    const user = await currentUser();
    const { userId } = await auth();

    if (!userId) return null;

    // Fetch stats and bookings in parallel for performance
    const [stats, bookings] = await Promise.all([getProviderStats(userId), getProviderBookings(userId)]);

    const statItems = [
        {
            label: "Total Bookings",
            value: stats.totalBookings,
            icon: CheckCircle,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            label: "Active Services",
            value: stats.serviceCount,
            icon: LayoutGrid,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            label: "Total Revenue",
            value: `₦${stats.totalRevenue.toLocaleString()}`,
            icon: CreditCard,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
        },
    ];

    return (
        <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-['Plus_Jakarta_Sans']">
            {/* Header Section: Now handles wrapping better on small screens */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="text-left">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back, {user?.firstName || "Destiny"}!</h1>
                    <p className="text-slate-500 font-medium mt-1">Here is an overview of your business performance today.</p>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm self-start">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <div className="pr-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Today's Date</p>
                        <p className="text-sm font-bold text-slate-900">{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid: Responsive 1 to 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statItems.map((stat) => (
                    <div key={stat.label} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>
                            <span className="text-[10px] font-black text-slate-300 group-hover:text-indigo-400 transition-colors uppercase tracking-[0.2em]">Live Data</span>
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
                        <p className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Bookings: Refactored from Grid to a List of Cards for better responsiveness */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Activity</h2>
                    <Link href="/admin/bookings" className="group flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                        View All
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {bookings.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.slice(0, 5).map((booking) => (
                            <Link key={booking.id} href={`/admin/bookings/${booking.id}`} className="group bg-white p-5 rounded-[2rem] border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col md:flex-row md:items-center gap-6">
                                {/* Left Side: Service Details */}
                                <div className="flex items-center gap-5 flex-1 min-w-0">
                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                                        {booking.service?.image ? (
                                            <Image src={booking.service.image} alt={booking.serviceTitle} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <LayoutGrid className="w-6 h-6 text-slate-200" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors truncate">{booking.serviceTitle}</h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <User className="w-3.5 h-3.5 text-slate-400" />
                                            <p className="text-xs font-bold text-slate-500 truncate">{booking.customer?.fullName || "Anonymous Customer"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle Section: Date & Time - Hidden on very small screens, shown as block on MD */}
                                <div className="flex gap-8 md:w-64 shrink-0">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Date</p>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Calendar className="w-4 h-4 text-indigo-500" />
                                            <span className="text-sm font-black italic">{booking.scheduledFor.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Time</p>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Clock className="w-3.5 h-3.5 text-indigo-500" />
                                            <span className="text-xs font-bold">{booking.scheduledFor.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Status & Price */}
                                <div className="flex items-center justify-between md:justify-end gap-8 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                                    <div className="md:text-right">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Revenue</p>
                                        <p className="text-lg font-black text-slate-900">₦{(booking.amount_paid! / 100).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${booking.status === "paid" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}>{booking.status}</span>
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-100 py-24 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock className="w-10 h-10 text-slate-200" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">No activity yet</h3>
                        <p className="text-slate-500 text-sm mt-2">Bookings for your services will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
