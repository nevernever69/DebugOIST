"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import useEvent from "@/src/store/Event";
import { useToast } from "@/src/components/ui/toast";

export default function NewEventPage() {
    const { addEvent } = useEvent();
    const { addToast } = useToast();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            // Extract fields
            const title = formData.get("title") as string;
            const description = formData.get("description") as string;
            const date = formData.get("date") as string;
            const time = formData.get("time") as string;
            const venue = formData.get("venue") as string;
            const category = formData.get("category") as string;
            const registrationDeadline = formData.get("registration") as string;
            const image = formData.get("image") as File;

            // Create an object for easier validation.
            const requiredFields: { [key: string]: any } = {
                title,
                description,
                date,
                time,
                venue,
                category,
                registrationDeadline,
                image,
            };
            console.log("requiredFields", requiredFields);

            // Check if any required field is missing.
            const missingField = Object.entries(requiredFields).find(
                ([, value]) => !value
            );
            if (missingField) {
                console.log("All fields are required");
                addToast({
                    title: "Error",
                    description: "All fields are required",
                    variant: "error",
                });
                return;
            }

            // Call the API with the complete form data.
            await addEvent(formData);

            addToast({
                title: "Success",
                description: "Event created successfully",
                variant: "success",
            });
        } catch (error: any) {
            console.error("Error creating event:", error);
            addToast({
                title: "Error",
                description: "Failed to create event",
                variant: "error",
            });
        }
    };


    return (
        <div className="relative min-h-screen bg-black text-zinc-100">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute top-32 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
                <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
            </div>

            {/* Content container */}
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl mx-auto my-16">
                    <Card className="bg-zinc-900/30 backdrop-blur-md border-zinc-800/50">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                                Create New Event
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Event Title */}
                                <div className="space-y-2">
                                    <label htmlFor="title" className="text-sm font-medium text-zinc-300">
                                        Event Title
                                    </label>
                                    <Input
                                        id="title"
                                        name="title"
                                        className="bg-zinc-900/50 border-zinc-800 text-zinc-100"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label htmlFor="description" className="text-sm font-medium text-zinc-300">
                                        Description
                                    </label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        className="bg-zinc-900/50 border-zinc-800 text-zinc-100 min-h-[100px]"
                                        required
                                    />
                                </div>

                                {/* Image Upload with Preview */}
                                <div className="space-y-2">
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                                        Image
                                    </label>
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        ref={inputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleButtonClick}
                                        className="bg-zinc-900/50 border border-zinc-800 text-zinc-100 px-4 py-2 rounded-md cursor-pointer hover:bg-zinc-800 transition duration-150 w-full"
                                    >
                                        Choose Image
                                    </button>
                                    <p className="text-sm text-gray-400">Image must be a JPG or PNG file</p>
                                    {previewUrl && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-300">Image Preview:</p>
                                            <img
                                                src={previewUrl}
                                                alt="Selected Preview"
                                                className="mt-2 w-full h-auto rounded-md border border-zinc-800"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Date and Time */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="date" className="text-sm font-medium text-zinc-300">
                                            Date
                                        </label>
                                        <Input
                                            id="date"
                                            name="date"
                                            type="date"
                                            className="bg-zinc-900/50 border-zinc-800 text-zinc-100"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="time" className="text-sm font-medium text-zinc-300">
                                            Time
                                        </label>
                                        <Input
                                            id="time"
                                            name="time"
                                            type="time"
                                            className="bg-zinc-900/50 border-zinc-800 text-zinc-100"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Venue */}
                                <div className="space-y-2">
                                    <label htmlFor="venue" className="text-sm font-medium text-zinc-300">
                                        Venue
                                    </label>
                                    <Input
                                        id="venue"
                                        name="venue"
                                        className="bg-zinc-900/50 border-zinc-800 text-zinc-100"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label htmlFor="category" className="text-sm font-medium text-zinc-300">
                                        Category
                                    </label>
                                    <Input
                                        id="category"
                                        name="category"
                                        className="bg-zinc-900/50 border-zinc-800 text-zinc-100"
                                        required
                                    />
                                </div>

                                {/* Registration Deadline */}
                                <div className="space-y-2">
                                    <label htmlFor="registration" className="text-sm font-medium text-zinc-300">
                                        Registration Deadline
                                    </label>
                                    <Input
                                        id="registration"
                                        name="registration"
                                        type="date"
                                        className="bg-zinc-900/50 border-zinc-800 text-zinc-100"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-700/20"
                                    >
                                        Create Event
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 bg-zinc-900/50 border-zinc-800 text-zinc-100"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
