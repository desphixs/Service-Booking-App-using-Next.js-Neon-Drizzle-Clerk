"use client";
import React, { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { createServiceAction, updateServiceAction } from "@/app/actions/services";
import { toast } from "sonner";
import { X, Plus, Clock, CheckCircle, Loader2, Timer } from "lucide-react";

interface ServiceData {
    id: string;
    title: string;
    price: number;
    description: string | null;
    image: string | null;
    category: string | null;
    included: string[] | null;
    timeSlots: string[] | null;
    durationMinutes: number | null;
}

export default function ServiceForm({
    userId,
    initialData,
}: {
    userId: string;
    initialData?: any; 
}) {
    const isEditMode = !!initialData;

    // Prefill state if editing, otherwise empty
    const [imageUrl, setImageUrl] = useState<string>(initialData?.image || "");
    const [included, setIncluded] = useState<string[]>(initialData?.included || []);
    const [timeSlots, setTimeSlots] = useState<string[]>(initialData?.timeSlots || []);

    const [isUploading, setIsUploading] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [currIncluded, setCurrIncluded] = useState("");
    const [currTime, setCurrTime] = useState("");

    const addIncluded = () => {
        if (!currIncluded.trim()) return;
        setIncluded([...included, currIncluded.trim()]);
        setCurrIncluded("");
    };

    const addTimeSlot = () => {
        if (!currTime) return;
        setTimeSlots([...timeSlots, currTime]);
        setCurrTime("");
    };

    const removeItem = (list: string[], setList: Function, index: number) => {
        setList(list.filter((_, i) => i !== index));
    };

    async function handleFormSubmit(formData: FormData) {
        if (!imageUrl) return toast.error("Please upload an image!");

        setIsPending(true);
        try {
            if (isEditMode) {
                await updateServiceAction(initialData.id, formData, imageUrl, included, timeSlots);
                toast.success("Service updated!");
            } else {
                await createServiceAction(formData, imageUrl, included, timeSlots);
                toast.success("Service created!");
            }
        } catch (error) {
            toast.error("An error occurred.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
            <form action={handleFormSubmit} className="space-y-8">
                <input type="hidden" name="userId" value={userId} />

                {/* Cover Image */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cover Image</label>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl p-6 bg-gray-50/50">
                        {imageUrl ? (
                            <div className="relatkive">
                                <img src={imageUrl} alt="Preview" className="w-40 h-40 object-cover rounded-2xl border-4 border-white shadow-md" />
                                <button type="button" onClick={() => setImageUrl("")} className="absolutke  bg-red-500 text-white rounded-full p-1 shadow-lg">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <UploadButton
                                endpoint="imageUploader"
                                onUploadBegin={() => setIsUploading(true)}
                                onClientUploadComplete={(res) => {
                                    setImageUrl(res[0].url);
                                    setIsUploading(false);
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Title</label>
                        <input name="title" defaultValue={initialData?.title} required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-indigo-500" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Price (Cents)</label>
                        <input name="price" type="number" defaultValue={initialData?.price} required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-indigo-500" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Duration (Mins)</label>
                        <input name="durationMinutes" type="number" defaultValue={initialData?.durationMinutes || 60} required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-indigo-500" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Category</label>
                        <select name="category" defaultValue={initialData?.category || "Design"} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none">
                            <option value="Design">Design</option>
                            <option value="Development">Development</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-50 pt-6">
                    <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" /> Included
                        </label>
                        <div className="flex gap-2">
                            <input value={currIncluded} onChange={(e) => setCurrIncluded(e.target.value)} placeholder="Add perk..." className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none" />
                            <button type="button" onClick={addIncluded} className="bg-indigo-600 text-white p-2 rounded-xl">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                            {included.map((item, i) => (
                                <div key={i} className="flex justify-between items-center bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs font-bold">
                                    <span>{item}</span>
                                    <X onClick={() => removeItem(included, setIncluded, i)} className="w-3.5 h-3.5 cursor-pointer text-indigo-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500" /> Time Slots
                        </label>
                        <div className="flex gap-2">
                            <input type="time" value={currTime} onChange={(e) => setCurrTime(e.target.value)} className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none" />
                            <button type="button" onClick={addTimeSlot} className="bg-indigo-600 text-white p-2 rounded-xl">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                            {timeSlots.map((time, i) => (
                                <div key={i} className="flex justify-between items-center bg-amber-50 text-amber-700 px-3 py-2 rounded-lg text-xs font-bold uppercase">
                                    <span>{time}</span>
                                    <X onClick={() => removeItem(timeSlots, setTimeSlots, i)} className="w-3.5 h-3.5 cursor-pointer text-amber-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Description</label>
                    <textarea name="description" defaultValue={initialData?.description} rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none resize-none" />
                </div>

                <button type="submit" disabled={isUploading || isPending} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-3">
                    {(isPending || isUploading) && <Loader2 className="animate-spin w-5 h-5" />}
                    {isUploading ? "Uploading Image..." : isEditMode ? "Update Service" : "Publish Service"}
                </button>
            </form>
        </div>
    );
}
