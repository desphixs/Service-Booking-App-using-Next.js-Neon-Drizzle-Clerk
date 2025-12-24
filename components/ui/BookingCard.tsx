"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createCheckoutSession } from "@/app/actions/checkout";
import { Calendar as CalendarIcon, MessageSquare, ChevronRight, ShieldCheck, Loader2, CreditCard } from "lucide-react";

function SubmitButton({ disabled }: { disabled: boolean }) {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={disabled || pending} className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest mt-4 hover:bg-indigo-600 transition-all duration-500 shadow-2xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-3 group active:scale-95">
            {pending ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Payment...
                </>
            ) : (
                <>
                    Confirm Booking
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
            )}
        </button>
    );
}

export const BookingCard = ({ service }: { service: any }) => {
    const [selectedTime, setSelectedTime] = useState("");

    return (
        <form action={createCheckoutSession} className="lg:sticky lg:top-32 border border-slate-100 rounded-[3rem] p-10 bg-white shadow-2xl shadow-slate-200/50">
            <input type="hidden" name="serviceId" value={service.id} />
            <input type="hidden" name="serviceTitle" value={service.title} />
            <input type="hidden" name="price" value={service.price} />
            <input type="hidden" name="time" value={selectedTime} />

            <div className="flex justify-between items-start mb-10 pb-8 border-b border-slate-50">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Service Rate</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-slate-900">$</span>
                        <p className="text-4xl font-black text-slate-900 tracking-tighter">{service.price.toLocaleString()}</p>
                    </div>
                </div>
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                    <CreditCard className="w-6 h-6" />
                </div>
            </div>

            <div className="space-y-8">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Select Session Date</label>
                    <div className="relative">
                        <input name="date" type="date" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all" />
                        <CalendarIcon className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Available Windows</label>
                    <div className="grid grid-cols-3 gap-2">
                        {service.timeSlots.map((time: string) => (
                            <button key={time} type="button" onClick={() => setSelectedTime(time)} className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all duration-300 ${selectedTime === time ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-600"}`}>
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Session Requirements</label>
                    <div className="relative">
                        <textarea name="notes" rows={4} placeholder="Briefly describe what you're looking to achieve..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium text-slate-600 focus:ring-4 focus:ring-indigo-500/5 outline-none resize-none transition-all" />
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                    </div>
                </div>

                <SubmitButton disabled={!selectedTime} />
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Secured via Stripe Encryption</span>
            </div>
        </form>
    );
};
