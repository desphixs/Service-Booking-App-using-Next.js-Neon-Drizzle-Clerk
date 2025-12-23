"use client";

import { Header } from "@/components/ui/Header";
import { Clock, ShieldCheck, CheckCircle2, Calendar as CalendarIcon, ChevronRight, Calendar as User, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BookingCard = ({ service }: { service: any }) => {
    return (
        <div className="sticky top-24 border border-gray-100 rounded-3xl p-8 bg-white shadow-xl shadow-gray-200/50">
            {/* Price Header */}
            <div className="flex justify-between items-end mb-6">
                <div>
                    <p className="text-sm text-gray-400 font-medium">Investment</p>
                    <p className="text-3xl font-black text-gray-900">{service?.price}</p>
                </div>
                <div className="text-right">
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md font-bold uppercase tracking-wider">Available</span>
                </div>
            </div>

            <div className="space-y-5">
                {/* Personal Info Group */}
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1.5 block">Full Name</label>
                        <div className="relative">
                            <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                            <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1.5 block">Email Address</label>
                        <div className="relative">
                            <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Date & Time Group */}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1.5 block">Select Date</label>
                        <div className="relative">
                            <input type="date" className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none" />
                            <CalendarIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1.5 block">Available Time</label>
                        <div className="grid grid-cols-3 gap-2">
                            {service.timeSlots.map((time: string) => (
                                <button className={`py-2 text-[10px] font-bold rounded-lg border transition-allshadow-md shadow-indigo-200 bg-white border-gray-100 text-gray-600 hover:border-indigo-200}`}>{time}</button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Note Field */}
                <div>
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1.5 block">Additional Notes</label>
                    <div className="relative">
                        <textarea rows={3} placeholder="Tell us about your project..." className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none" />
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                </div>

                {/* CTA Button */}
                <Link href={`/booking/${"23453"}`} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold mt-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group">
                    Reserve Service
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-[11px] text-gray-400 text-center">Our team will review the request and send a confirmation within 2 hours.</p>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-50 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-medium">Secure payment processing</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-medium">Full {service.duration_minutes} min session</span>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---
export default function ServiceDetail() {
    const service = {
        id: "0d6f0b4c-0b4b-4a7d-8c2b-2b2c16d2a0a1",
        image: "https://lollypop.design/wp-content/uploads/2024/07/UX-Audit-A-Stepping-Stone-to-Boost-Sales.webp",
        title: "Website UI Audit",
        slug: "website-ui-audit",
        description: "A full UI/UX review with actionable fixes and a prioritized checklist.",
        category: "Design",
        timeSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"],
        included: ["Detailed PDF Report", "Accessibility Check", "Conversion Optimization", "Color Palette Review", "Typography Audit", "1-on-1 Strategy Call"],
        price: 2500000,
        currency: "NGN",
        duration_minutes: 60,
        is_active: true,
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <a href="/" className="hover:text-indigo-600 transition-colors">
                        Services
                    </a>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">{service.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-7">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{service.title}</h1>

                        <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-gray-900">4.9</span>
                                <span className="text-sm text-gray-400">(120+ Reviews)</span>
                            </div>
                            <div className="h-4 w-px bg-gray-200" />
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>{service.duration_minutes} Minutes</span>
                            </div>
                        </div>

                        <section className="prose prose-indigo max-w-none">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Service Overview</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">{service.description}</p>

                            <h3 className="text-xl font-bold text-gray-900 mb-4">What's included?</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                {service?.included?.map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-white text-xl font-bold mb-2">Ready to scale?</h3>
                                    <p className="text-indigo-200 text-sm mb-0">Our UI audits have helped startups increase their conversion rates by an average of 34%.</p>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <BookingCard service={service} />
                    </div>
                </div>
            </main>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Total</p>
                    <p className="text-xl font-black text-gray-900">{"3425"}</p>
                </div>
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm">Book Now</button>
            </div>
        </div>
    );
}
