"use client";
import React, { useState } from "react";
import { LayoutDashboard, Calendar, Settings, LogOut, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans']">
            {/* 1. Mobile Overlay (Backdrop) */}
            {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300" onClick={() => setIsSidebarOpen(false)} />}

            {/* 2. Responsive Sidebar */}
            <aside
                className={`
                fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-100 p-8 flex flex-col z-[70] 
                transition-transform duration-500 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
            >
                {/* Logo & Close Button */}
                <div className="flex items-center justify-between mb-12 px-2">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-900">BookMe</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-4 px-5 py-3.5 text-sm font-bold rounded-2xl transition-all ${isActive ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50"}`}>
                                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Sign Out */}
                <div className="pt-8 border-t border-slate-100">
                    <SignOutButton>
                        <button className="flex items-center gap-4 w-full px-5 py-4 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </SignOutButton>
                </div>
            </aside>

            {/* 3. Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-h-screen min-w-0">
                <header className="h-24 bg-white/90 backdrop-blur-lg border-b border-slate-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Trigger */}
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 active:scale-95 transition-all">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 hidden sm:block">User Dashboard</h2>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-black text-slate-900 leading-tight">Destiny Franks</p>
                            <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-tighter">Premium Member</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-100">
                            <User className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 flex items-start justify-center p-6 md:p-10">
                    <div className="w-full max-w-5xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
