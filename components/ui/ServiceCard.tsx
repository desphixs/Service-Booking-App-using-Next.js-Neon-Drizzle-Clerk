import { Clock, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export const ServiceCard = ({ service }: { service: any }) => {
    // Format price from cents
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: service.currency,
    }).format(service.price_cents / 100);

    return (
        <div className="group bg-white border border-gray-100 rounded-3xl p-6 transition-all duration-300 shadow-xl hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 font-['Plus_Jakarta_Sans']">
            {service.image && (
                <div className="mb-4">
                    <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-xl" />
                </div>
            )}
            <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">{service.category}</span>
                <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold text-gray-700">4.9</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">{service.title}</h3>

            <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{service.description}</p>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium">{service.duration_minutes} mins</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Starting at</p>
                    <p className="text-lg font-black text-gray-900">${service.price}</p>
                </div>
                <Link href={`/service/${service.slug}`} className="h-12 w-12 rounded-2xl bg-gray-50 text-gray-900 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};
