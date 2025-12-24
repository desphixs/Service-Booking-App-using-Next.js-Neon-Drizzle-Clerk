import { Header } from "@/components/ui/Header";
import { Clock, CheckCircle2, ChevronRight, Star, ShieldCheck, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getActiveServiceBySlug } from "@/db/queries";
import { notFound } from "next/navigation";
import { BookingCard } from "@/components/ui/BookingCard";

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParam = await params;
    const service = await getActiveServiceBySlug(resolvedParam.slug);

    if (!service) return notFound();

    return (
        <div className="min-h-screen bg-slate-50/30 font-['Plus_Jakarta_Sans']">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-32">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10">
                    <Link href="/" className="hover:text-indigo-600 transition-colors">
                        Services
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-slate-900">{service.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Left Column: Bold Visuals & Description */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* Service Branding & Image */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full">
                                    <Zap className="w-3 h-3 text-indigo-600 fill-indigo-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Verified Expert</span>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">{service.title}</h1>
                            </div>

                            {/* Main Hero Image */}
                            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10 border-4 border-white bg-slate-100">
                                {service.image ? (
                                    <Image src={service.image} alt={service.title} fill className="object-cover" priority />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                                        <Zap className="w-16 h-16 text-indigo-100" />
                                    </div>
                                )}
                            </div>

                            {/* Trust Bar */}
                            <div className="flex flex-wrap items-center gap-8 py-6 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1 ml-2">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="text-sm font-black">4.9</span>
                                        <span className="text-xs font-bold text-slate-400">(120+)</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <Clock className="w-4 h-4 text-indigo-500" />
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-600">{service.durationMinutes}m Session</span>
                                </div>
                            </div>
                        </div>

                        {/* Description Content */}
                        <section className="space-y-10">
                            <div>
                                <h3 className="text-sm font-black text-slate-300 uppercase tracking-[0.3em] mb-6">Service Overview</h3>
                                <p className="text-xl text-slate-600 leading-relaxed font-medium">{service.description}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-slate-300 uppercase tracking-[0.3em] mb-6">What's included?</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service?.included?.map((item: string) => (
                                        <li key={item} className="flex items-start gap-4 text-slate-700 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-indigo-100">
                                            <div className="p-1 bg-emerald-50 rounded-lg">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <span className="font-bold text-sm leading-tight">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Dynamic Booking Card */}
                    <div className="lg:col-span-5 relative">
                        <BookingCard service={service} />
                    </div>
                </div>
            </main>

            {/* Mobile Sticky CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6 z-50 flex items-center justify-between shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Rate</p>
                    <p className="text-2xl font-black text-slate-900">₦{(service.price / 100).toLocaleString()}</p>
                </div>
                <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 active:scale-95 transition-all">Book Now</button>
            </div>
        </div>
    );
}
