import { auth } from "@clerk/nextjs/server";
import { getProviderCustomerDetail } from "@/db/admin/queries";
import { ArrowLeft, Mail, Phone, Calendar, CreditCard, Clock, User as UserIcon, ChevronRight, Tag, Inbox } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function AdminCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) return null;

    const data = await getProviderCustomerDetail(id, userId);

    if (!data) notFound();

    // Calculate total spend for this specific provider relationship
    const totalSpend = data.bookings.reduce((acc, b) => acc + (b.amount_paid || 0), 0) / 100;

    return (
        <div className="py-8 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans']">
            {/* --- Header Section --- */}
            <div className="space-y-4">
                <Link href="/admin/customers" className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    Back to CRM
                </Link>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                    Customer <span className="text-indigo-600">Profile</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* --- Left Column: Customer Stats & Identity (Sticky on Desktop) --- */}
                <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                    <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-100/50 relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full -mr-10 -mt-10" />

                        <div className="relative z-10 text-center mb-10">
                            <div className="w-24 h-24 rounded-[2rem] bg-slate-800 mx-auto mb-6 relative overflow-hidden border-4 border-slate-800 shadow-2xl">
                                {data.image ? (
                                    <Image src={data.image} alt={data.fullName} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                                        <UserIcon className="w-10 h-10" />
                                    </div>
                                )}
                            </div>
                            <h2 className="text-2xl font-black tracking-tight">{data.fullName}</h2>
                            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Verified Merchant Client</p>
                        </div>

                        <div className="relative z-10 space-y-6 pt-10 border-t border-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email</p>
                                    <p className="text-sm font-bold truncate">{data.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                                    <p className="text-sm font-bold">{data.phone || "No phone listed"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-10 pt-10 border-t border-slate-800 grid grid-cols-2 gap-4">
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Sessions</p>
                                <p className="text-2xl font-black">{data.bookings.length}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Lifetime Value</p>
                                <p className="text-2xl font-black text-indigo-400">₦{totalSpend.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* --- Right Column: Booking History Timeline --- */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg">
                                <Clock className="w-5 h-5 text-slate-400" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Session History</h3>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                            <Tag className="w-3 h-3 text-indigo-500" />
                            Provider History
                        </div>
                    </div>

                    {data.bookings.length > 0 ? (
                        <div className="space-y-4">
                            {data.bookings.map((booking) => (
                                <Link key={booking.id} href={`/admin/bookings/${booking.id}`} className="group bg-white rounded-[2.5rem] border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                                    {/* Service Brand */}
                                    <div className="flex items-center gap-5 md:w-1/3 min-w-0 text-left">
                                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-50 shadow-sm">
                                            {booking.service?.image ? (
                                                <Image src={booking.service.image} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-indigo-100 bg-indigo-50">
                                                    <Calendar className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors leading-tight">{booking.serviceTitle}</h4>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] mt-1">Ref: {booking.id.slice(-8).toUpperCase()}</p>
                                        </div>
                                    </div>

                                    {/* Timeline Details */}
                                    <div className="flex items-center gap-10 flex-1 border-t md:border-t-0 pt-6 md:pt-0 border-slate-50">
                                        <div className="space-y-1 text-left">
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Appointment</p>
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Calendar className="w-4 h-4 text-indigo-500" />
                                                <span className="text-sm font-black italic">{booking.scheduledFor.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-left">
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Timing</p>
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Clock className="w-4 h-4 text-indigo-500" />
                                                <span className="text-sm font-black uppercase">{booking.scheduledFor.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Financials & Action */}
                                    <div className="flex items-center justify-between md:justify-end gap-10 border-t md:border-t-0 pt-6 md:pt-0 border-slate-50">
                                        <div className="text-left md:text-right">
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Amount</p>
                                            <p className="text-lg font-black text-slate-900 leading-none">₦{(booking.amount_paid! / 100).toLocaleString()}</p>
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
                        <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-100 py-32 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Inbox className="w-8 h-8 text-slate-200" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900">No session history</h2>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2 leading-relaxed">This customer hasn't booked any sessions with you yet. History will appear here once sessions are scheduled.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
