import { ArrowUpRight, CheckCircle, Clock, CreditCard } from "lucide-react";

export default function DashboardPage() {
    const stats = [
        { label: "Total Bookings", value: "12", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
        { label: "Pending", value: "2", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Total Spent", value: "$2,400", icon: CreditCard, color: "text-indigo-600", bg: "bg-indigo-50" },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900">Welcome back, Destiny!</h1>
                <p className="text-gray-500">Here is what is happening with your bookings today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                    <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Service</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[1, 2, 3].map((_, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-indigo-100 rounded-xl shrink-0" />
                                            <span className="font-bold text-gray-900">Website UI Audit</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">Dec 26, 2025</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">Paid</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all">
                                            <ArrowUpRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
