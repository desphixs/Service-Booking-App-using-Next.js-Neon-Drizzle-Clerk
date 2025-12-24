import { db } from "@/db";
import { bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ArrowRight, CheckCircle2, Loader2, Calendar, CreditCard, Hash, MapPin } from "lucide-react";
import { Header } from "@/components/ui/Header";
import Link from "next/link";

export default async function BookingSuccessPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const booking = await db.query.bookings.findFirst({
        where: eq(bookings.id, id),
    });

    // 1. Processing State (While Webhook is finishing)
    if (!booking) {
        return (
            <div className="min-h-screen bg-gray-50/50">
                <Header />
                <div className="max-w-xl mx-auto py-32 px-6 text-center">
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 rounded-full bg-indigo-100 animate-ping opacity-75"></div>
                        <div className="relative bg-white p-6 rounded-full shadow-sm border border-indigo-50">
                            <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Securing your slot...</h1>
                    <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">We are verifying your payment with Stripe. This usually takes just a few seconds.</p>
                    <meta httpEquiv="refresh" content="3" />
                </div>
            </div>
        );
    }

    // 2. Success State
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header />

            <main className="max-w-2xl mx-auto py-16 px-6">
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
                    {/* Header with Ping Animation */}
                    <div className="pt-12 pb-8 text-center border-b border-dashed border-gray-100 relative">
                        <div className="relative inline-block mb-6">
                            {/* Modern Pulse Effect */}
                            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-40"></div>
                            <div className="relative bg-green-500 p-4 rounded-full shadow-lg shadow-green-100">
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Booking Confirmed!</h1>
                        <p className="text-gray-500 font-medium">Order ID: #{booking.id.slice(-8).toUpperCase()}</p>

                        {/* Decorative Ticket Notches */}
                        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gray-50/50 rounded-full border border-gray-100"></div>
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gray-50/50 rounded-full border border-gray-100"></div>
                    </div>

                    <div className="p-8 md:p-12 space-y-10">
                        {/* Summary */}
                        <div className="text-center">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                You have successfully booked <span className="text-indigo-600 font-bold underline decoration-indigo-200 underline-offset-4">{booking.serviceTitle}</span>. A confirmation email has been sent to your inbox.
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4 p-5 rounded-3xl bg-gray-50/80 border border-gray-100/50">
                                <div className="p-3 bg-white rounded-2xl shadow-sm">
                                    <Calendar className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Scheduled For</p>
                                    <p className="font-bold text-gray-900">
                                        {booking.scheduledFor.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        <span className="block text-sm font-medium text-gray-500 mt-0.5">{booking.scheduledFor.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-5 rounded-3xl bg-gray-50/80 border border-gray-100/50">
                                <div className="p-3 bg-white rounded-2xl shadow-sm">
                                    <CreditCard className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Payment Status</p>
                                    <p className="font-bold text-gray-900">Paid In Full</p>
                                    <p className="text-sm font-medium text-indigo-600">${(booking.amount_paid! / 100).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Location/Timezone Info */}
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 font-medium">
                            <MapPin className="w-4 h-4" />
                            <span>Times shown in {booking.timezone}</span>
                        </div>

                        {/* CTA Section */}
                        <div className="pt-6">
                            <Link href={`/dashboard/bookings/${booking.id}`} className="w-full inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-5 rounded-[2rem] font-bold hover:bg-black transition-all shadow-xl shadow-gray-200 group active:scale-[0.98]">
                                Manage Booking Details
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <p className="mt-6 text-sm text-gray-400 text-center">Need to reschedule? Contact support or manage via your dashboard.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
