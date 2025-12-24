import { db } from "@/db";
import { bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft, CheckCircle2, Loader2, Calendar, CreditCard, MapPin, Sparkles, FileText, Clock, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const booking = await db.query.bookings.findFirst({
        where: eq(bookings.id, id),
    });

    // 1. Loading/Verifying State
    if (!booking) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping"></div>
                    <div className="relative bg-white p-8 rounded-full shadow-2xl border border-slate-100">
                        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-xl font-black text-slate-900 mb-1">Retrieving Booking</h1>
                    <p className="text-slate-400 text-sm">We're pulling up your reservation details...</p>
                </div>
                <meta httpEquiv="refresh" content="3" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-4">
            {/* Back Button */}
            <Link href="/dashboard/bookings" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 mb-8 transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Bookings
            </Link>

            <div className="relative group">
                {/* Background Decorative Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

                <div className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
                    {/* Header Section */}
                    <div className="pt-12 pb-10 text-center relative border-b border-dashed border-slate-100 bg-slate-50/30">
                        <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Reservation</p>
                        </div>

                        <h1 className="text-3xl font-black text-slate-900 mb-2 px-6">{booking.serviceTitle}</h1>
                        <div className="flex items-center justify-center gap-2 text-slate-400">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <p className="text-xs font-bold uppercase tracking-widest">Ref: {booking.id.slice(-12).toUpperCase()}</p>
                        </div>

                        {/* Ticket Notches */}
                        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#F8FAFC] rounded-full border border-slate-100"></div>
                        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#F8FAFC] rounded-full border border-slate-100"></div>
                    </div>

                    <div className="p-8 md:p-10 space-y-10">
                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Date Card */}
                            <div className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all">
                                <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 border border-slate-50">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Date</p>
                                    <p className="text-sm font-black text-slate-900">{booking.scheduledFor.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                                </div>
                            </div>

                            {/* Time Card */}
                            <div className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all">
                                <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 border border-slate-50">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Time Slot</p>
                                    <p className="text-sm font-black text-slate-900 uppercase">{booking.scheduledFor.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
                                </div>
                            </div>

                            {/* Payment Card */}
                            <div className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all">
                                <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 border border-slate-50">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Payment</p>
                                    <p className="text-sm font-black text-slate-900">${(booking.amount_paid! / 100).toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Timezone Card */}
                            <div className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all">
                                <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 border border-slate-50">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Timezone</p>
                                    <p className="text-sm font-black text-slate-900 truncate max-w-[120px]">{booking.timezone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Notes Section */}
                        {booking.notes && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <FileText className="w-4 h-4" />
                                    <h3 className="text-xs font-black uppercase tracking-widest">Your Notes</h3>
                                </div>
                                <div className="p-5 rounded-2xl bg-indigo-50/30 border border-indigo-100/50 text-sm text-slate-600 leading-relaxed italic">"{booking.notes}"</div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] font-black text-xs hover:bg-black transition-all shadow-xl shadow-slate-200 group active:scale-95">Download Receipt</button>
                            <button className="flex-1 px-8 py-4 rounded-[1.5rem] border-2 border-slate-100 font-black text-xs text-slate-600 hover:bg-slate-50 transition-all active:scale-95">Need Help?</button>
                        </div>

                        {/* Footer Info */}
                        <div className="pt-6 border-t border-slate-50 text-center">
                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Booked on {booking.createdAt.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
