import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EventProps } from "@/src/store/Event";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/src/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

const registrationSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
    roll: z.string().min(1, "Roll number is required"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
});

type FormData = z.infer<typeof registrationSchema>;

const RegistrationModal = ({ event }: { event: EventProps }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { addToast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            name: "",
            roll: "",
            email: "",
            phone: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/event-registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId: event._id,
                    ...data,
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || "Registration failed");
            }
            addToast({
                title: "Registration Successful",
                description: `You have been successfully registered for ${event.title}.`,
                variant: "success",
            });
            setShowSuccessModal(true);
            reset();
        } catch (error) {
            addToast({
                title: "Registration Failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "There was an error registering. Please try again.",
                variant: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-2xl text-purple-600 font-bold">
                Register for {event.title}
            </h1>
            <p className="text-zinc-400 my-2">
                Please fill in the details below to register for the event.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="name">Name*</Label>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="roll">Roll Number*</Label>
                        <Input
                            id="roll"
                            placeholder="Enter your roll number"
                            {...register("roll")}
                        />
                        {errors.roll && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.roll.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="email">Email*</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number*</Label>
                        <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            {...register("phone")}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </Button>
                </div>
            </form>

            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registration Successful!</DialogTitle>
                        <DialogDescription>
                            You have been successfully registered for {event.title}. You can
                            check your registration status in the My Registrations page.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button
                            onClick={() => setShowSuccessModal(false)}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            Close
                        </Button>
                        <Button
                            onClick={() => (window.location.href = "/my-registrations")}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            View My Registrations
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default RegistrationModal;
