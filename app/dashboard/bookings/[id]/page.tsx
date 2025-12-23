import React from "react";
import { CheckCircle2, Clock, XCircle, Calendar, Mail, FileText, ExternalLink, ArrowLeft, Download, Receipt } from "lucide-react";
import { Header } from "@/components/ui/Header";

const booking = {
    id: "bkg_01f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a01",
    service_id: "1213",
    service_image: "https://lollypop.design/wp-content/uploads/2024/07/UX-Audit-A-Stepping-Stone-to-Boost-Sales.webp",
    service_title: "Website UI Audit",
    user_id: "3",
    customer_name: "Destiny Franks",
    customer_email: "desphixs@gmail.com",
    scheduled_for: "2025-12-26T14:00:00Z",
    timezone: "Africa/Lagos",
    status: "failed", // try: "paid", "pending", or "failed"
    notes: "Focus on homepage and pricing section.",
    payment: {
        amount: 2389078,
        currency: "USD",
        provider: "stripe",
        status: "failed",
        receipt_url: "https://example.com/receipts/ui-audit-001",
        paid_at: "2025-12-20T09:03:00Z",
    },
};

const BookingStatus = () => {
    // Configuration for different statuses
    const statusConfig = {
        paid: {
            icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
            title: "Booking Confirmed!",
            description: "Your payment was successful and your slot is secured.",
            bgColor: "bg-green-50",
            textColor: "text-green-700",
        },
        pending: {
            icon: <Clock className="w-12 h-12 text-amber-500" />,
            title: "Booking Pending",
            description: "We're currently processing your payment. Hang tight!",
            bgColor: "bg-amber-50",
            textColor: "text-amber-700",
        },
        failed: {
            icon: <XCircle className="w-12 h-12 text-red-500" />,
            title: "Payment Failed",
            description: "Something went wrong with the transaction. Please try again.",
            bgColor: "bg-red-50",
            textColor: "text-red-700",
        },
    }[booking.status as "paid" | "pending" | "failed"];

    const bookingDate = new Date(booking.scheduled_for).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const bookingTime = new Date(booking.scheduled_for).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50/50 py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Back Button */}
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </button>

                    {/* Main Status Card */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                        {/* Header Section */}
                        <div className={`p-10 text-center ${statusConfig.bgColor}`}>
                            <div className="flex justify-center mb-4">{statusConfig.icon}</div>
                            <h1 className="text-3xl font-black text-gray-900 mb-2">{statusConfig.title}</h1>
                            <p className={`text-sm font-medium ${statusConfig.textColor}`}>{statusConfig.description}</p>
                        </div>

                        <div className="p-8 md:p-12 space-y-10">
                            {/* Service Summary */}
                            <div className="flex flex-col md:flex-row gap-6 items-center p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <img src={booking.service_image} alt={booking.service_title} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                                <div className="flex-1 text-center md:text-left">
                                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Service Details</p>
                                    <h2 className="text-xl font-black text-gray-900">{booking.service_title}</h2>
                                    <p className="text-sm text-gray-400">ID: {booking.id}</p>
                                </div>
                                <div className="text-center md:text-right">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Amount Paid</p>
                                    <p className="text-2xl font-black text-gray-900">{booking.payment.amount}</p>
                                </div>
                            </div>

                            {/* Grid Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                            <Calendar className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date & Time</p>
                                            <p className="text-gray-900 font-semibold">{bookingDate}</p>
                                            <p className="text-sm text-gray-500">
                                                {bookingTime} ({booking.timezone})
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</p>
                                            <p className="text-gray-900 font-semibold">{booking.customer_name}</p>
                                            <p className="text-sm text-gray-500">{booking.customer_email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                            <FileText className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Notes</p>
                                            <p className="text-sm text-gray-600 italic leading-relaxed">"{booking.notes}"</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                            <Receipt className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Method</p>
                                            <p className="text-gray-900 font-semibold capitalize">{booking.payment.provider}</p>
                                            <p className="text-sm text-gray-500">Transaction Secured</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                                {booking.status === "paid" ? (
                                    <>
                                        <a href={booking.payment.receipt_url} target="_blank" className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
                                            View Receipt
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                        <button className="flex-1 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                                            <Download className="w-4 h-4" />
                                            Download PDF
                                        </button>
                                    </>
                                ) : (
                                    <button className="w-full bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">{booking.status === "failed" ? "Try Payment Again" : "Refresh Status"}</button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer help link */}
                    <p className="text-center mt-10 text-sm text-gray-400">
                        Need help?{" "}
                        <a href="#" className="text-indigo-600 font-semibold hover:underline">
                            Contact our support team
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default BookingStatus;
