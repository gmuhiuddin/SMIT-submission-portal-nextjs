// "use client"

// import { useEffect, useState, useTransition } from "react"
// import { useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { FormError } from "@/components/shared/form-error"
// import { FormSuccess } from "@/components/shared/form-success"
// import { getEmailFromToken } from "@/lib/jwt-token"

// import {
//     Card,
//     CardContent,
//     CardHeader
// } from "@/components/ui/card"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
//     FormDescription,
// } from "@/components/ui/form"
// import { Switch } from "@/components/ui/switch";

// export const NewTeacherForm = () => {
//     const searchParams = useSearchParams();
//     const token = searchParams.get("token");

//     const [name, setName] = useState<string | undefined>("");
//     const [email, setEmail] = useState<string | undefined>("");
//     const [password, setPassword] = useState<string | undefined>("");
//     const [confirmPassword, setConfirmPassword] = useState<string | undefined>("");
//     const [error, setError] = useState<string | undefined>("");
//     const [success, setSuccess] = useState<string | undefined>("");
//     const [isTokenVerified, setIsTokenVerified] = useState<boolean>(true);
//     const [isTwoFactor, setIsTwoFactor] = useState<boolean>(false);
//     const [isPending, startTransition] = useTransition();

//     async function onSubmit() {
//         // console.log(values)
//         // setError("")
//         // setSuccess("")

//         // startTransition(() => {
//         //     newPassword(values, token)
//         //         .then((data) => {
//         //             if (data?.error) {
//         //                 setError(data.error)
//         //             } else if (data?.success) {
//         //                 setSuccess(data.success)
//         //             }
//         //         })
//         //         .catch(() => setError("Something went wrong"))
//         // })
//     };

//     useEffect(() => {
//         getEmail();
//     }, []);

//     async function getEmail() {
//         const email: any = await getEmailFromToken(token as string);

//         if (email?.error) return setIsTokenVerified(false);

//         setEmail(email.email);
//     };

//     if (!isTokenVerified) return <>Incorrect detail</>;

//     // return (
//     //     <FormWrapper
//     //         headerLabel="Enter a new password"
//     //         backButtonLabel="Back to sign in"
//     //         backButtonHref="/signin"
//     //     >
//     //         <Form {...form}>
//     //             <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//     //                 <div className="space-y-4">
//     //                     <FormField
//     //                         control={form.control}
//     //                         name="newPassword"
//     //                         render={({ field }) => (
//     //                             <FormItem>
//     //                                 <FormLabel>New password</FormLabel>
//     //                                 <FormControl>
//     //                                     <Input
//     //                                         disabled={isPending}
//     //                                         type="password"
//     //                                         placeholder="new password"
//     //                                         {...field}
//     //                                     />
//     //                                 </FormControl>
//     //                                 <FormMessage />
//     //                             </FormItem>
//     //                         )}
//     //                     />
//     //                     <FormField
//     //                         control={form.control}
//     //                         name="confirmPassword"
//     //                         render={({ field }) => (
//     //                             <FormItem>
//     //                                 <FormLabel>Confirm password</FormLabel>
//     //                                 <FormControl>
//     //                                     <Input
//     //                                         disabled={isPending}
//     //                                         type="password"
//     //                                         placeholder="confirm password"
//     //                                         {...field}
//     //                                     />
//     //                                 </FormControl>
//     //                                 <FormMessage />
//     //                             </FormItem>
//     //                         )}
//     //                     />
//     //                 </div>
//     //                 <FormError message={error} />
//     //                 <FormSuccess message={success} />
//     //                 <Button
//     //                     size="lg"
//     //                     className="w-full mt-6"
//     //                     type="submit"
//     //                     disabled={isPending}
//     //                 >
//     //                     {isPending ? "Submitting..." : "Reset password"}
//     //                 </Button>
//     //             </form>
//     //         </Form>
//     //     </FormWrapper>
//     // );

//     // return (
//     //     <Card className="w-[350px] mt-2">
//     //         <CardHeader>
//     //             <p className="text-2xl font-semibold text-center">
//     //                 Profile Settings
//     //             </p>
//     //         </CardHeader>
//     //         <CardContent>
//     //             <form className="w-full">
//     //                 <div className="space-y-4">
//     //                     <FormField
//     //                         name="name"
//     //                         render={({ field }) => (
//     //                             <FormItem>
//     //                                 <FormLabel>Username</FormLabel>
//     //                                 {/* <Form>
//     //                                     <Input
//     //                                         disabled={isPending}
//     //                                         placeholder="your username"
//     //                                         {...field}
//     //                                     />
//     //                                 </Form> */}
//     //                                 <FormMessage />
//     //                             </FormItem>
//     //                         )}
//     //                     />

//     //                     <FormField
//     //                         name="email"
//     //                         // value={email}
//     //                         render={({ field }) => (
//     //                             <FormItem>
//     //                                 <FormLabel>Email</FormLabel>
//     //                                 <FormControl>
//     //                                     <Input
//     //                                         disabled={isPending}
//     //                                         placeholder="mail@example.com"
//     //                                         {...field}
//     //                                     />
//     //                                 </FormControl>
//     //                                 <FormMessage />
//     //                             </FormItem>
//     //                         )}
//     //                     />

//     //                     {/* <FormField
//     //                 control={form.control}
//     //                 name="role"
//     //                 render={({ field }) => (
//     //                   <FormItem>
//     //                     <FormLabel>Role</FormLabel>
//     //                     <Select
//     //                       disabled={isPending}
//     //                       onValueChange={field.onChange}
//     //                       defaultValue={field.value}
//     //                     >
//     //                       <FormControl>
//     //                         <SelectTrigger>
//     //                           <SelectValue placeholder="Select a role" />
//     //                         </SelectTrigger>
//     //                       </FormControl>
//     //                       <SelectContent>
//     //                         <SelectItem value={UserRole.ADMIN}>
//     //                           Admin
//     //                         </SelectItem>
//     //                         <SelectItem value={UserRole.USER}>
//     //                           User
//     //                         </SelectItem>
//     //                       </SelectContent>
//     //                     </Select>
//     //                     <FormMessage />
//     //                   </FormItem>
//     //                 )}
//     //               /> */}
//     //                     <FormField
//     //                         name="isTwoFactorEnabled"
//     //                         render={({ field }) => (
//     //                             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
//     //                                 <div className="space-y-0.5">
//     //                                     <FormLabel>Two Factor Authentication</FormLabel>
//     //                                     <FormDescription>
//     //                                         Enable two factor authentication
//     //                                     </FormDescription>
//     //                                 </div>
//     //                                 <FormControl>
//     //                                     <Switch
//     //                                         disabled={isPending}
//     //                                         checked={isTwoFactor}
//     //                                         onCheckedChange={field.onChange}
//     //                                     />
//     //                                 </FormControl>
//     //                             </FormItem>
//     //                         )}
//     //                     />
//     //                 </div>
//     //                 <FormError message={error} />
//     //                 <FormSuccess message={success} />
//     //                 <Button
//     //                     size="lg"
//     //                     className="w-full my-6"
//     //                     type="submit"
//     //                     disabled={isPending}
//     //                 >
//     //                     {isPending ? "Saving..." : "Save"}
//     //                 </Button>
//     //             </form>
//     //         </CardContent>
//     //     </Card>
//     // )
// };
"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation"; // To get query params
import jwt from "jsonwebtoken";
import { createTeacherValidation } from "@/lib/validations/auth"; // Adjust according to your validation schema
import { createTeacher } from "@/lib/actions/auth/signup-with-credentials"; // API call for creating a teacher

import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { getEmailFromToken } from "@/lib/jwt-token";
import { checkTeacherWasExist } from "@/lib/actions/auth/teacher";

export const NewTeacherForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [email, setEmail] = useState<string | undefined>("");
    const [emailExist, setEmailExist] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof createTeacherValidation>>({
        resolver: zodResolver(createTeacherValidation),
        defaultValues: {
            name: "",
            email: "", // Pre-fill email
            password: "",
            confirmPassword: ""
        }
    });

    // Decode token to get email
    useEffect(() => {
        if (token) {
            getEmail();
        } else {
            setError("Invalid token!");
        };
    }, [token]);

    async function checkEmailWasExist(email: any) {
        const teacherExist: any = await checkTeacherWasExist(email as string);

        setInitialLoading(false);

        if (teacherExist?.error) return setError(teacherExist?.error);

        setEmailExist(teacherExist.isTeacherExist);
    };

    async function getEmail() {
        const email: any = await getEmailFromToken(token as string);

        if (email?.error) return setError(email?.error);

        checkEmailWasExist(email.email);
        setEmail(email.email);

        form.setValue("email", email.email);
    };

    async function onSubmit(values: z.infer<typeof createTeacherValidation>) {
        setError("");
        setSuccess("");

        startTransition(() => {
            createTeacher(values)
                .then((data: any) => {
                    console.log(data);

                    if (data?.error) {
                        setError(data.error);
                    } else if (data?.success) {
                        setSuccess(data?.success);
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    }

    if (initialLoading) return <>Loading...</>;

    if (error == "Token has expired!" || error == "Invalid token!") return <>You loose a opportunity of teaching</>

    if (emailExist) return <h1>Teacher was created go to <a href="/signin"> login</a></h1>

    return (
        <Card className="w-[350px] mt-2">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Create Teacher
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="Enter teacher's name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending || !!email} // Disable if email is pre-filled from token
                                                placeholder="mail@example.com"
                                                {...field}
                                                value={email}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                type="password"
                                                placeholder="your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                type="password"
                                                placeholder="confirm your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        {success && <a className="text-center block" href="/signin">Go to login</a>}
                        <Button
                            size="lg"
                            className="w-full my-6"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? "Creating..." : "Create Teacher"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};