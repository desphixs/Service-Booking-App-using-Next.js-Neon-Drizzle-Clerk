import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/mockData";
import { getActiveServices } from "@/db/queries";
import { Search, ArrowRight, MoveRight, Sparkles, Star, ShieldCheck, Zap, Globe, Users, CalendarCheck, Rocket, CheckCircle2, HelpCircle, CreditCard, RefreshCw, MessageCircle } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        number: "01",
        title: "Discover Elite Talent",
        description: "Browse our curated catalog of verified industry experts. Filter by specialized niche, from UI/UX audits to full-stack architecture kits.",
        icon: Search,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
    {
        number: "02",
        title: "Secure Your Window",
        description: "Choose a time slot that fits your schedule. Our real-time syncing ensures you only see actual availability—no back-and-forth emails.",
        icon: CalendarCheck,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        number: "03",
        title: "Execute & Thrive",
        description: "Complete your secure payment via Stripe and receive instant confirmation. Your expert is locked in and ready to scale your project.",
        icon: Rocket,
        color: "text-amber-600",
        bg: "bg-amber-50",
    },
];

const faqs = [
    {
        question: "How do you verify the talent on BookMe?",
        answer: "Every merchant undergoes a multi-stage vetting process, including technical portfolio reviews and professional background checks to ensure 100% excellence.",
        icon: ShieldCheck,
    },
    {
        question: "Is my payment secure?",
        answer: "Absolutely. All transactions are processed through Stripe's encrypted infrastructure. We never store your credit card details on our servers.",
        icon: CreditCard,
    },
    {
        question: "Can I reschedule a session after booking?",
        answer: "Yes. You can reschedule up to 24 hours before your session directly through your User Dashboard, provided the merchant has available slots.",
        icon: RefreshCw,
    },
    {
        question: "What happens after I pay?",
        answer: "You will receive an instant confirmation email with session details, a calendar invite, and a direct link to your merchant's communication channel.",
        icon: Zap,
    },
];

export default async function Home() {
    const allServices = await getActiveServices();
    return (
        <div className="">
            <Header />

            <main>
                <section className="relative overflow-hidden bg-white pt-24 pb-32 lg:pt-40 font-['Plus_Jakarta_Sans']">
                    {/* 1. Dynamic Background Elements */}
                    <div className="absolute inset-0 z-0">
                        {/* Modern Mesh Gradient */}
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-0 right-[-5%] w-[40%] h-[40%] bg-violet-200/30 rounded-full blur-[100px]"></div>

                        {/* Subtle Grid Pattern */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234338ca' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left lg:text-center">
                        <div className="flex flex-col items-start lg:items-center">
                            {/* Floating Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-indigo-500/5 text-indigo-600 text-xs font-black uppercase tracking-[0.2em] mb-8 animate-bounce-slow">
                                <Sparkles className="w-4 h-4 fill-indigo-600" />
                                Expert Services on Demand
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
                                Book elite talent <br className="hidden md:block" />
                                for your{" "}
                                <span className="relative">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">next big project.</span>
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-indigo-100 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h1>

                            {/* Subheadline */}
                            <p className="max-w-3xl lg:mx-auto text-xl text-slate-500 mb-12 font-medium leading-relaxed">
                                From UI Audits to specialized development kits. Get the expertise you need to scale, delivered by verified industry professionals in <span className="text-slate-900 font-bold underline decoration-indigo-500 decoration-4 underline-offset-4">record time.</span>
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-start lg:justify-center gap-6 w-full sm:w-auto">
                                <button className="group w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm hover:bg-indigo-600 transition-all duration-500 shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-3 active:scale-95">
                                    Explore Services
                                    <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </button>

                                <button className="group w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-[2rem] font-black text-sm hover:border-indigo-100 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                    View Case Studies
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-20 pt-10 border-t border-slate-100 w-full">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 lg:text-center">Trusted by Industry Leaders</p>
                                <div className="flex flex-wrap items-center justify-start lg:justify-center gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-6 h-6 fill-slate-900" />
                                        <span className="font-black text-2xl tracking-tighter">METASPHERE</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-6 h-6 fill-slate-900" />
                                        <span className="font-black text-2xl tracking-tighter">BOLTFLOW</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-6 h-6 fill-slate-900" />
                                        <span className="font-black text-2xl tracking-tighter">CYBERVAULT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        {allServices.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </section>

                <section className="relative py-24 lg:py-40 bg-white overflow-hidden font-['Plus_Jakarta_Sans']">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-indigo-50/50 rounded-full blur-[120px] -z-0" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* --- Top Header: Split Layout --- */}
                        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-24">
                            <div className="lg:max-w-xl space-y-6 text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 rounded-2xl">
                                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Our Mission</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                                    We bridge the gap <br />
                                    between <span className="text-indigo-600">Vision</span> & <br />
                                    <span className="italic font-serif text-slate-400">Execution.</span>
                                </h2>
                            </div>

                            <div className="lg:max-w-md lg:pt-20 text-left">
                                <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">BookMe isn't just a directory; it's a curated ecosystem where the world's most ambitious brands find the specialized talent required to scale without friction.</p>
                                <Link href="/#services" className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-900 hover:text-indigo-600 transition-colors">
                                    Explore the network
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* --- The Pillar Grid --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Pillar 1 */}
                            <div className="group bg-slate-50 p-10 rounded-[3rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Strictly Vetted</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">Only the top 3% of applicants pass our technical and professional screening process. We guarantee excellence, so you don't have to guess.</p>
                            </div>

                            {/* Pillar 2 */}
                            <div className="group bg-slate-50 p-10 rounded-[3rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Instant Scale</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">Stop the weeks of back-and-forth hiring. Find the service you need, select a time slot, and start your project with an expert in under 60 seconds.</p>
                            </div>

                            {/* Pillar 3 */}
                            <div className="group bg-slate-50 p-10 rounded-[3rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                                    <Globe className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Global Network</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">Access elite consultants and developers from across the globe. Our platform handles multi-currency payments and global time-zone syncing automatically.</p>
                            </div>
                        </div>

                        {/* --- Bottom Stats Bar --- */}
                        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 bg-slate-900 rounded-[3rem] p-12 lg:p-16 text-left">
                            <div>
                                <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-2">500+</p>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Verified Experts</p>
                            </div>
                            <div>
                                <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-2">12k+</p>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Sessions Booked</p>
                            </div>
                            <div>
                                <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-2">4.9/5</p>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Satisfaction Rate</p>
                            </div>
                            <div>
                                <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-2">₦250M+</p>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Merchant Earnings</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how" className="relative py-24 lg:py-40 bg-slate-50/50 overflow-hidden font-['Plus_Jakarta_Sans']">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* --- Section Header --- */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-24">
                            <div className="max-w-2xl text-left space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">The Blueprint</p>
                                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                                    How we deliver <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">Unfair Advantages.</span>
                                </h2>
                            </div>
                            <div className="lg:pb-2">
                                <p className="text-slate-500 font-bold max-w-sm text-left">A streamlined three-step workflow designed for high-growth teams and ambitious builders.</p>
                            </div>
                        </div>

                        {/* --- Step Cards --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                            {steps.map((step, index) => (
                                <div key={step.number} className="relative group">
                                    {/* Connector Line (Desktop Only) */}
                                    {index !== steps.length - 1 && <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-slate-100 -z-0" />}

                                    <div className="relative z-10 space-y-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group-hover:shadow-2xl group-hover:shadow-indigo-500/10 transition-all duration-500 group-hover:-translate-y-2">
                                        {/* Step Number Badge */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-5xl font-black text-slate-100 group-hover:text-indigo-50 transition-colors tracking-tighter">{step.number}</span>
                                            <div className={`w-14 h-14 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center`}>
                                                <step.icon className="w-7 h-7" />
                                            </div>
                                        </div>

                                        <div className="text-left space-y-4">
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{step.title}</h3>
                                            <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
                                        </div>

                                        {/* Micro-Feature List */}
                                        <div className="pt-6 border-t border-slate-50 space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                Instant Confirmation
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                Verified Security
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- Final CTA Area --- */}
                        <div className="mt-24 flex flex-col md:flex-row items-center justify-between p-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 gap-8">
                            <div className="text-left">
                                <h4 className="text-2xl font-black text-slate-900 tracking-tight">Ready to ship your next big idea?</h4>
                                <p className="text-slate-500 font-medium mt-1">Join 5,000+ companies booking elite talent on demand.</p>
                            </div>
                            <Link href="/#services" className="group flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest hover:bg-indigo-600 transition-all duration-500 active:scale-95">
                                Get Started Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="faq" className="py-24 lg:py-40 bg-white font-['Plus_Jakarta_Sans']">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            {/* Left Side: Header */}
                            <div className="lg:col-span-4 space-y-6 text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-2xl">
                                    <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Support</span>
                                </div>
                                <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                                    Common <br />
                                    <span className="text-slate-400 italic font-serif">Inquiries.</span>
                                </h2>
                                <p className="text-slate-500 font-medium text-lg leading-relaxed">Everything you need to know about the BookMe ecosystem and our merchant standards.</p>
                            </div>

                            {/* Right Side: FAQ Grid */}
                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                                {faqs.map((faq) => (
                                    <div key={faq.question} className="space-y-4 text-left group">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-500">
                                            <faq.icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{faq.question}</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-10 px-4 sm:px-6 lg:px-8 mb-20 font-['Plus_Jakarta_Sans']">
                    <div className="max-w-7xl mx-auto relative overflow-hidden bg-slate-900 rounded-[3.5rem] p-12 lg:p-24 shadow-2xl shadow-indigo-500/10">
                        {/* Background Accents */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full -mr-20 -mt-20" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full -ml-20 -mb-20" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                            <div className="max-w-2xl text-left space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-2xl border border-slate-700">
                                    <Sparkles className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Join 50,000+ Users</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                                    Stop searching. <br />
                                    Start <span className="text-indigo-400">shipping.</span>
                                </h2>
                                <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-lg">The world’s best talent is one click away. Book your first expert session today and get your project back on track.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                                <Link href="/#services" className="group w-full sm:w-auto flex items-center justify-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-xl">
                                    Explore Services
                                    <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>

                                <Link href="/sign-up" className="w-full sm:w-auto flex items-center justify-center px-10 py-6 border-2 border-slate-700 rounded-[2rem] text-white font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all">
                                    Become a Merchant
                                </Link>
                            </div>
                        </div>

                        {/* Secure Trust Indicators */}
                        <div className="mt-16 pt-10 border-t border-slate-800 flex flex-wrap gap-8 items-center justify-start opacity-50">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Stripe Protected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Verified Merchants</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Instant Scheduling</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
