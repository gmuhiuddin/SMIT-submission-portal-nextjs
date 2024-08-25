"use client"

import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/shared/form-error"
import { FormSuccess } from "@/components/shared/form-success"
import { FormWrapper } from "@/components/shared/form-wrapper"
import Head from 'next/head';
import Link from "next/link";
import { useSession } from "next-auth/react"
import { addClassRoom } from "@/lib/actions/auth/classRoom"
import TagInputComponent from '@/components/ui/tagInput';
import { cn } from '@/lib/utils';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ResetPasswordValidation } from "@/lib/validations/auth";
import BlurLoader from '@/components/shared/blurLoader';
import '../admin-dashboard/style.css';
import { sendTeacherCreatingEmail } from '@/lib/actions/auth/teacher';

const CreateTeacher = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetPasswordValidation>>({
        resolver: zodResolver(ResetPasswordValidation),
        defaultValues: {
            email: ""
        }
    })

    async function onSubmit(values: z.infer<typeof ResetPasswordValidation>) {
        // console.log(values)
        setError("")
        setSuccess("")

        startTransition(() => {
            sendTeacherCreatingEmail(values)
                .then((data: any) => {
                    if (data?.error) {
                        setError(data.error)
                    } else if (data?.success) {
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError("Something went wrong"))
        })
    }

    return (
        <>
            <div className='class-room-main-container h-2/3 flex items-center create-class-room-main-container'>
                <FormWrapper
                    headerLabel="Create Teacher"
                    backButtonLabel="Back to dashboard"
                    backButtonHref="/"
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    placeholder="mail@example.com"
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
                            <Button
                                size="lg"
                                className="w-full mt-6"
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? "Sending..." : "Send teacher creating email"}
                            </Button>
                        </form>
                    </Form>
                </FormWrapper>
            </div>
        </>
    );
};

export default CreateTeacher;