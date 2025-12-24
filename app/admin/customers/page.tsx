import { auth } from "@clerk/nextjs/server";
import { getProviderCustomers } from "@/db/admin/queries";
import { User, Mail, Phone, Calendar, CreditCard, Search, MoreHorizontal, ArrowUpRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminCustomersPage() {
    const { userId } = await auth();
    if (!userId) return null;

    const customerList = await getProviderCustomers(userId);

    return (
        <div className="py-6 space-y-10">
            {/* Header Section */}
            <div className="flex justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-600 mb-2">
                        <Users className="w-5 h-5" />
                        <span className="text-xs font-black uppercase tracking-widest">CRM Dashboard</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Customers</h1>
                    <p className="text-slate-500 font-medium">Manage relationships and view lifetime booking history.</p>
                </div>
            </div>

            {/* Customers Table/Grid */}
            {customerList.length > 0 ? (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    {customerList.map((customer) => (
                        <div key={customer.id} className="group bg-white rounded-4xl border border-slate-100 p-6 flex flex-col justify-between gap-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                            {/* Profile Info */}
                            <div className="flex items-center gap-5 min-w-70">
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-50 shrink-0 shadow-inner">
                                    {customer.image ? (
                                        <Image src={customer.image} alt={customer.fullName} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <User className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">{customer.fullName}</h3>
                                    <div className="flex items-center gap-2 mt-1 text-slate-400">
                                        <Mail className="w-3.5 h-3.5" />
                                        <p className="text-xs font-bold truncate max-w-[180px]">{customer.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Engagement Stats */}
                            <div className="grid grid-cols-2 w-full gap-8 flex-1 border-t lg:border-t-0 border-slate-50 pt-6 lg:pt-0">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total Sessions</p>
                                    <div className="flex items-center gap-2 text-slate-900 font-black">
                                        <Calendar className="w-4 h-4 text-indigo-500" />
                                        <span>{customer.totalSessions} Appointments</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Lifetime Value</p>
                                    <div className="flex items-center gap-2 text-slate-900 font-black">
                                        <CreditCard className="w-4 h-4 text-emerald-500" />
                                        <span>₦{Number(customer.totalSpent).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="space-y-1 hidden md:block">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Last Seen</p>
                                    <p className="text-sm font-bold text-slate-600">{customer.lastBookingDate ? new Date(customer.lastBookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Never"}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 border-t lg:border-t-0 border-slate-50 pt-6 lg:pt-0">
                                <Link href={`/admin/customers/${customer.id}`} className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-xs hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
                                    View History
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-[3rem] border border-dashed border-slate-200 py-32 text-center">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="w-8 h-8 text-slate-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900">No customers yet</h2>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2">Once clients start booking your services, they will appear in this list.</p>
                </div>
            )}
        </div>
    );
}
