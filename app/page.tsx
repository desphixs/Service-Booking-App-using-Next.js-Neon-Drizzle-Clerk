import { Header } from "@/components/ui/Header";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ArrowRight, Search } from "lucide-react";
import { services } from "@/lib/mockData";

export default async function Home() {
    return (
        <div className="">
            <Header />

            <main>
                <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                Expert Services on Demand
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
                                Book elite talent for your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">next big project.</span>
                            </h1>
                            <p className="max-w-2xl mx-auto text-lg text-gray-500 mb-10 leading-relaxed">From UI Audits to specialized development kits. Get the expertise you need to scale, delivered by verified industry professionals.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                                    Explore Services
                                    <Search className="w-4 h-4" />
                                </button>
                                <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-semibold hover:bg-gray-50 transition-all">View Case Studies</button>
                            </div>

                            <div className="mt-12 flex items-center justify-center gap-8 opacity-50 grayscale">
                                {/* Mock Partner Logos */}
                                <span className="font-bold text-xl italic">PartnerA</span>
                                <span className="font-bold text-xl italic">PartnerB</span>
                                <span className="font-bold text-xl italic">PartnerC</span>
                            </div>
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-50"></div>
                        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-violet-50 rounded-full blur-[100px] opacity-50"></div>
                    </div>
                </section>

                <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Featured Services</h2>
                            <p className="text-gray-500 mt-2">Selected high-impact services for growing businesses.</p>
                        </div>
                        <button className="text-indigo-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                            View all services <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
