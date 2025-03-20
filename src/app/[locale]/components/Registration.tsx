import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EventProps } from "@/src/store/Event"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useToast } from "@/src/components/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const registrationSchema = z.object({
    teamName: z.string()
        .min(3, "Team name must be at least 3 characters")
        .max(50, "Team name must be less than 50 characters"),
    leaderName: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
    leaderEmail: z.string()
        .email("Invalid email address"),
    leaderPhone: z.string()
        .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    leaderRoll: z.string()
        .min(1, "Roll number is required"),
    member1Name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
    member1Roll: z.string()
        .min(1, "Roll number is required"),
    member2Name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
    member2Roll: z.string()
        .min(1, "Roll number is required"),
}).superRefine((data, ctx) => {
    // Only check for duplicate roll numbers (allow same names)
    const rolls = [data.leaderRoll, data.member1Roll, data.member2Roll];
    const rollMap = new Map<string, string[]>();

    rolls.forEach((roll, index) => {
        // Skip empty strings
        if (roll.trim() === "") return;

        if (!rollMap.has(roll)) {
            rollMap.set(roll, []);
        }
        rollMap.get(roll)?.push(index === 0 ? 'leaderRoll' : index === 1 ? 'member1Roll' : 'member2Roll');
    });

    rollMap.forEach((fields, roll) => {
        if (fields.length > 1) {
            fields.forEach(field => {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `This roll number is already used by another team member`,
                    path: [field],
                });
            });
        }
    });
});

type FormData = z.infer<typeof registrationSchema>;

const RegistraionModal = ({ event }: { event: EventProps }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { addToast } = useToast();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            teamName: "",
            leaderName: "",
            leaderEmail: "",
            leaderPhone: "",
            leaderRoll: "",
            member1Name: "",
            member1Roll: "",
            member2Name: "",
            member2Roll: ""
        },
        mode: "onChange"
    });

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            
            const response = await fetch('/api/event-registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventId: event._id,
                    ...data
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Registration failed');
            }

            addToast({
                title: "Registration Successful",
                description: `Your team "${data.teamName}" has been registered for ${event.title}.`,
                variant: "success"
            });

            setShowSuccessModal(true);
            reset();
        } catch (error) {
            addToast({
                title: "Registration Failed",
                description: error instanceof Error ? error.message : "There was an error registering your team. Please try again.",
                variant: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className='text-2xl text-purple-600 font-bold'>Register for {event.title}</h1>
            <p className='text-zinc-400 my-2'>Please fill in the details below to register for the event.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className='flex flex-col gap-2'>
                    <div>
                        <Label htmlFor="teamName">Team Name*</Label>
                        <Input
                            id="teamName"
                            placeholder="Enter your team name"
                            {...register("teamName")}
                        />
                        {errors.teamName && <p className="text-red-500 text-sm mt-1">{errors.teamName.message}</p>}
                    </div>

                    <div className="pt-4">
                        <h2 className="text-lg font-medium text-white mb-2">Team Leader Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="leaderName">Leader Name*</Label>
                                <Input
                                    id="leaderName"
                                    placeholder="Enter leader's name"
                                    {...register("leaderName")}
                                />
                                {errors.leaderName && <p className="text-red-500 text-sm mt-1">{errors.leaderName.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="leaderEmail">Email*</Label>
                                <Input
                                    id="leaderEmail"
                                    type="email"
                                    placeholder="Enter leader's email"
                                    {...register("leaderEmail")}
                                />
                                {errors.leaderEmail && <p className="text-red-500 text-sm mt-1">{errors.leaderEmail.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="leaderPhone">Phone Number*</Label>
                                <Input
                                    id="leaderPhone"
                                    placeholder="Enter leader's phone number"
                                    {...register("leaderPhone")}
                                />
                                {errors.leaderPhone && <p className="text-red-500 text-sm mt-1">{errors.leaderPhone.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="leaderRoll">Roll Number*</Label>
                                <Input
                                    id="leaderRoll"
                                    placeholder="Enter leader's roll number"
                                    {...register("leaderRoll")}
                                />
                                {errors.leaderRoll && <p className="text-red-500 text-sm mt-1">{errors.leaderRoll.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <h2 className="text-lg font-medium text-white mb-2">Team Member 1</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="member1Name">Member Name*</Label>
                                <Input
                                    id="member1Name"
                                    placeholder="Enter member 1's name"
                                    {...register("member1Name")}
                                />
                                {errors.member1Name && <p className="text-red-500 text-sm mt-1">{errors.member1Name.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="member1Roll">Roll Number*</Label>
                                <Input
                                    id="member1Roll"
                                    placeholder="Enter member 1's roll number"
                                    {...register("member1Roll")}
                                />
                                {errors.member1Roll && <p className="text-red-500 text-sm mt-1">{errors.member1Roll.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <h2 className="text-lg font-medium text-white mb-2">Team Member 2</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="member2Name">Member Name*</Label>
                                <Input
                                    id="member2Name"
                                    placeholder="Enter member 2's name"
                                    {...register("member2Name")}
                                />
                                {errors.member2Name && <p className="text-red-500 text-sm mt-1">{errors.member2Name.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="member2Roll">Roll Number*</Label>
                                <Input
                                    id="member2Roll"
                                    placeholder="Enter member 2's roll number"
                                    {...register("member2Roll")}
                                />
                                {errors.member2Roll && <p className="text-red-500 text-sm mt-1">{errors.member2Roll.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register Team"}
                    </Button>
                </div>
            </form>

            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registration Successful!</DialogTitle>
                        <DialogDescription>
                            Your team has been successfully registered for {event.title}. 
                            You can check your registration status in the My Registrations page.
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
                            onClick={() => window.location.href = '/my-registrations'}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            View My Registrations
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default RegistraionModal;