"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";



const formSchema = z
    .object({
        username: z.string().min(2, { message: "Username must be at least 2 characters." }),
        password: z.string().min(6, { message: "Password must be at least 6 characters." }),
        confirmPassword: z.string().optional(),
    })
    .refine((data) => !data.confirmPassword || data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export function ProfileForm() {
    const navigate = useNavigate();
    const [isNewUser, setNewUser] = useState(false); // false = login, true = register

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const endpoint = isNewUser ? "register" : "login";

        try {
            const response = await axios.post(`http://localhost:8000/${endpoint}`,
                isNewUser
                    ? {
                        email: values.username,
                        password: values.password,
                    }
                    : {
                        login_email: values.username,
                        password: values.password,
                    }
            );

            const data = response.data;

            if (isNewUser) {
                alert("Registration successful!");
            } else {
                alert("Login successful!");
                console.log("Access Token:", data.access_token);
                localStorage.setItem("token", data.access_token);
                navigate("/dashboard");
            }
        } catch (error: any) {
            const message =
                error.response?.data?.detail || "Something went wrong during submission.";
            alert(message);
            console.error("Axios error:", message);
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md px-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                        {/* Username */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email or Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password (only if registering) */}
                        {isNewUser && (
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {/* Toggle */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="toggle"
                                checked={isNewUser}
                                onCheckedChange={(checked) => setNewUser(checked as boolean)}
                            />
                            <label htmlFor="toggle" className="text-sm ">
                                Don't have an account?
                            </label>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit">{isNewUser ? "Register" : "Login"}</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
