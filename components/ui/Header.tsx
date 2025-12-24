"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Calendar, LayoutDashboard, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Browse Services", href: "/#services" },
        { name: "How it Works", href: "/#how" },
        { name: "Pricing", href: "/#pricing" },
    ];

    return (
        <nav className={`fixed top-0 z-100 w-full transition-all duration-500 ${scrolled ? "py-3 bg-white/70 backdrop-blur-xl border-b border-slate-100 shadow-sm" : "py-6 bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* 1. Logo Section */}
                    <Link href="/" className="group flex items-center gap-3 relative z-10">
                        <div className="bg-slate-900 p-2 rounded-2xl group-hover:bg-indigo-600 transition-all duration-500 shadow-xl shadow-slate-200 group-hover:shadow-indigo-200 group-hover:rotate-6">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-slate-900">
                            Book<span className="text-indigo-600">Me</span>
                        </span>
                    </Link>

                    {/* 2. Desktop Center Navigation */}
                    <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50 backdrop-blur-md">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="px-5 py-2 text-[13px] font-black text-slate-500 hover:text-indigo-600 hover:bg-white rounded-xl transition-all duration-300 uppercase tracking-widest">
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* 3. Desktop Actions */}
                    <div className="hidden md:flex items-center gap-5">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Sign in</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="group relative bg-slate-900 text-white px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all duration-500 shadow-xl shadow-slate-200 overflow-hidden active:scale-95">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get Started
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </SignUpButton>
                        </SignedOut>

                        <SignedIn>
                            <Link href="/dashboard" className="group flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all duration-500">
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                            <div className="pl-4 border-l border-slate-200">
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10 rounded-xl border-2 border-white shadow-md",
                                        },
                                    }}
                                />
                            </div>
                        </SignedIn>
                    </div>

                    {/* Mobile Toggle */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden relative z-10 p-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-900">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* 4. Modern Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-[90] transition-all duration-700 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible translate-y-4"}`}>
                <div className="flex flex-col h-full pt-32 px-8 space-y-8">
                    {navLinks.map((link, i) => (
                        <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className={`text-4xl font-black text-slate-900 tracking-tighter transition-all duration-500 delay-[${i * 100}ms] ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
                            {link.name}
                        </a>
                    ))}

                    <div className="pt-10 border-t border-slate-100 flex flex-col gap-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="w-full py-5 text-lg font-black text-slate-900 border-2 border-slate-100 rounded-[2rem]">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-slate-200">Create Account</button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="w-full py-5 bg-indigo-600 text-white text-center rounded-[2rem] font-black text-lg">
                                Access Dashboard
                            </Link>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
};
