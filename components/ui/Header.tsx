"use client";
import React, { useState } from "react";
import { Menu, X, Calendar, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Browse Services", href: "/#services" },
        { name: "How it Works", href: "/#how" },
        { name: "Pricing", href: "/#pricing" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                        <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">BookMe</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                                {link.name}
                            </a>
                        ))}

                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                            {/* Shown only when LOGGED OUT */}
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign in</button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200">Get Started</button>
                                </SignUpButton>
                            </SignedOut>

                            {/* Shown only when LOGGED IN */}
                            <SignedIn>
                                <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600 flex items-center gap-2 mr-2">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                        </div>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="block px-3 py-3 text-base font-medium text-gray-600">
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-4 flex flex-col gap-3">
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="w-full text-center py-3 text-gray-600 font-medium border border-gray-100 rounded-xl">Sign in</button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium">Get Started</button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <Link href="/dashboard" className="w-full text-center py-3 text-indigo-600 font-bold bg-indigo-50 rounded-xl">
                                    Go to Dashboard
                                </Link>
                                <div className="flex justify-center pt-2">
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            </SignedIn>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
