"use client";
import React, { useState } from "react";
import { LayoutDashboard, Calendar, Settings, LogOut, User, PlusCircle, List, Users, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "Overview", href: "/admin", icon: LayoutDashboard },
        { name: "Services", href: "/admin/services", icon: List },
        { name: "New Services", href: "/admin/new", icon: PlusCircle },
        { name: "Bookings", href: "/admin/bookings", icon: Calendar },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50/50 font-['Plus_Jakarta_Sans']">
            {/* 1. Mobile Backdrop Overlay */}
            {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity" onClick={() => setIsSidebarOpen(false)} />}

            {/* 2. Responsive Sidebar */}
            <aside
                className={`
                fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-100 p-6 z-[70] 
                transition-transform duration-500 ease-in-out flex flex-col
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
            >
                <div className="flex items-center justify-between mb-10 px-2">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-slate-900 p-2 rounded-2xl shadow-lg shadow-slate-200">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-slate-900">BookMe</span>
                    </Link>
                    {/* Close button for mobile */}
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-4 px-5 py-3.5 text-sm font-black rounded-2xl transition-all uppercase tracking-widest ${isActive ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"}`}>
                                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-6 border-t border-slate-50">
                    <button className="flex items-center gap-4 w-full px-5 py-4 text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* 3. Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen min-w-0">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-12 py-3 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Trigger */}
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 active:scale-95 transition-all">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs hidden sm:block">Admin Dashboard</h2>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-black text-slate-900 tracking-tight">Destiny Franks</p>
                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Verified Provider</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                            <User className="w-6 h-6 text-slate-400" />
                        </div>
                    </div>
                </header>

                <main className="p-6 lg:p-12 w-full max-w-7xl mx-auto">{children}</main>
            </div>
        </div>
    );
}
