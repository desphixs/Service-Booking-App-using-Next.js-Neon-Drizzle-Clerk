import React from "react";
import { LayoutDashboard, Calendar, Settings, LogOut, User, PlusCircle, List, Users } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const navItems = [
        { name: "Overview", href: "/admin", icon: LayoutDashboard },
        { name: "Services", href: "/admin/services", icon: List },
        { name: "New Services", href: "/admin/new", icon: PlusCircle },
        { name: "Bookings", href: "/admin/bookings", icon: Calendar },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            {/* Sidebar: Use fixed and a z-index to keep it on top */}
            <aside className=" sm:flex w-72 flex-col  bg-white border-r border-gray-100 p-6 z-50">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">BookMe</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50">
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="pt-6 border-t border-gray-100">
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-h-screen">
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 py-3 sticky top-0 z-40">
                    <h2 className="font-bold text-gray-800">Admin Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-900">Destiny Franks</p>
                            <p className="text-xs text-gray-400">Premium Member</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-300 flex items-center justify-center ">
                            <User className="w-5 h-5 text-indigo-600" />
                        </div>
                    </div>
                </header>

                <main className="p-8 max-w-6xl w-full mx-auto">{children}</main>
            </div>
        </div>
    );
}
