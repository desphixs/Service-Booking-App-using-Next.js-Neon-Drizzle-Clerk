import { Calendar, Mail, Github, Twitter, Instagram, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-100 pt-24 pb-12 font-['Plus_Jakarta_Sans']">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
                    {/* 1. Brand & Vision (4 Columns) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="bg-slate-900 p-2 rounded-2xl">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-slate-900">
                                Book<span className="text-indigo-600">Me</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-sm">The elite marketplace for high-tier professional services. Connecting world-class merchants with ambitious builders since 2025.</p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                                <Github className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                                <Instagram className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* 2. Platform Navigation (2 Columns) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Explorer</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/#services" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                                    Browse Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/#how" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                                    How it Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/#faq" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                                    Knowledge Base
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Merchant & Dev Hub (2 Columns) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Merchant Hub</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/admin" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                                    Provider Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/new" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                                    Create Offering
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/settings" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                                    Account Settings
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                                    Seller Guide
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Newsletter / Devdrop (4 Columns) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full -mr-10 -mt-10" />
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-2 text-indigo-600">
                                    <Sparkles className="w-4 h-4 fill-indigo-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">BookMe Sync</span>
                                </div>
                                <h4 className="text-xl font-black text-slate-900 tracking-tight">Get Cool Letters From Us</h4>
                                <p className="text-xs font-bold text-slate-400 leading-relaxed">Join the inner circle of developers receiving exclusive source code directly to their inbox.</p>
                                <div className="flex items-center gap-2">
                                    <input type="email" placeholder="Email address" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/20" />
                                    <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-indigo-600 transition-all active:scale-95">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© {currentYear} BookMe Platform. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <Link href="/privacy" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/support" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                            Security
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
