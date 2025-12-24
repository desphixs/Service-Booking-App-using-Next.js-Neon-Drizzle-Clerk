import { auth } from "@clerk/nextjs/server";
import { getProviderBookingDetail } from "@/db/admin/queries";
import { Calendar, Clock, Mail, Phone, FileText, CreditCard, ArrowLeft, MapPin, CheckCircle2, AlertCircle, User as UserIcon, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { userId } = await auth();
    if (!userId) return null;

    const booking = await getProviderBookingDetail(id, userId);
    if (!booking) notFound();

    return (
        <div className="min-h-screen bg-slate-50/50 font-['Plus_Jakarta_Sans'] pb-20">
            {/* --- Navigation Header --- */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col gap-4 mb-12">
                    <Link href="/admin/bookings" className="w-fit flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] transition-all group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Activity
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                        Booking <span className="text-indigo-600">Overview</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* --- Left Column: Primary Info (8 Columns) --- */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Status Banner */}
                        <div className={`p-8 rounded-[2.5rem] border flex flex-col sm:flex-row items-start sm:items-center gap-6 ${booking.status === "paid" ? "bg-emerald-50 border-emerald-100 text-emerald-900" : "bg-amber-50 border-amber-100 text-amber-900"}`}>
                            <div className={`p-4 rounded-2xl ${booking.status === "paid" ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>{booking.status === "paid" ? <CheckCircle2 className="w-8 h-8 text-emerald-600" /> : <AlertCircle className="w-8 h-8 text-amber-600" />}</div>
                            <div>
                                <p className="font-black uppercase tracking-[0.2em] text-[10px] opacity-60 mb-1">Current Transaction Status</p>
                                <p className="text-lg font-bold">This session is {booking.status === "paid" ? "fully confirmed and paid" : "awaiting final payment"}.</p>
                            </div>
                        </div>

                        {/* Service Summary Card */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                            <div className="p-8 md:p-12">
                                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] block mb-10">Service Summary</label>

                                <div className="flex flex-col md:flex-row gap-10">
                                    <div className="relative w-full md:w-64 h-44 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200 shrink-0">
                                        {booking.service?.image ? (
                                            <Image src={booking.service.image} alt="" fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                                                <UserIcon className="w-10 h-10 text-slate-200" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-8">
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{booking.serviceTitle}</h2>

                                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                                                <div className="flex items-center gap-2 font-black text-slate-700">
                                                    <Clock className="w-4 h-4 text-indigo-500" />
                                                    <span>{booking.service?.durationMinutes} Minutes</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session Date</p>
                                                <div className="flex items-center gap-2 font-black text-slate-700">
                                                    <Calendar className="w-4 h-4 text-indigo-500" />
                                                    <span>{booking.scheduledFor.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Client Notes Section */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Customer Requirements</h3>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 text-slate-600 font-medium leading-relaxed italic text-lg">"{booking.notes || "The customer did not provide specific requirements for this session."}"</div>
                        </div>
                    </div>

                    {/* --- Right Column: Sidebar (4 Columns) --- */}
                    <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-10">
                        {/* Customer Profile Card */}
                        <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[60px] rounded-full" />

                            <div className="text-center mb-10 relative z-10">
                                <div className="w-24 h-24 rounded-[2rem] bg-slate-800 mx-auto mb-6 relative overflow-hidden border-4 border-slate-800 shadow-2xl">
                                    {booking.customer?.image ? (
                                        <Image src={booking.customer.image} alt="" fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <UserIcon className="w-10 h-10 text-slate-600" />
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-2xl font-black tracking-tight">{booking.customer?.fullName}</h2>
                                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Verified Client</p>
                            </div>

                            <div className="space-y-6 pt-10 border-t border-slate-800 relative z-10">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email</p>
                                        <p className="text-sm font-bold truncate">{booking.customer?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                                        <p className="text-sm font-bold">{booking.customer?.phone || "Private Number"}</p>
                                    </div>
                                </div>
                            </div>

                            <Link href={`/admin/customers/${booking.customerId}`} className="w-full mt-10 py-4 bg-slate-800 hover:bg-white hover:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                View Client History <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Financial Snapshot */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-8">Financial Snapshot</label>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Paid</span>
                                    <span className="text-xl font-black text-slate-900 leading-none">${(booking.amount_paid! / 100).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-900 text-xs font-black uppercase tracking-widest">Net Revenue</span>
                                    <span className="text-3xl font-black text-indigo-600 tracking-tighter">${(booking.amount_paid! / 100).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
