'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader, Loader2, LogInIcon, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input'
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const router = useRouter()
    const [githubPending, startGithubTransition] = useTransition();
    const [emailPending, startemailTransition] = useTransition();
    const [email, setEmail] = useState("")
    async function signInWithGithub(){
        startGithubTransition(async () => {
                    await authClient.signIn.social(
            {
                provider: 'github',
                callbackURL: '/',
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('Signed in with github, you will be redirected soon...')
                     
                    },
                    onError: (error: any) => {
                    toast.error(error?.error?.message ?? error?.message ?? "Something went wrong.");
                    }

                }
            }
        )
        })

    }
    function signInwithEmail() {
        startemailTransition(async() => {
            await authClient.emailOtp.sendVerificationOtp({
                email: email,
                type: "sign-in",
                fetchOptions: {
                    onSuccess: ()=> {
                        toast.success('Email sent')
                        router.push(`/verify-request`)
                    },
                    onError: () => {
                        toast.error('Sent email failed!')
                    }
                }
            })
        })
    }
    return(
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Welcome Back!</CardTitle>
            <CardDescription>Login with your email</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1/2">
            <Button disabled = {githubPending}
            onClick={signInWithGithub} 
            className="bg-neutral-900 text-white hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-600 w-full" 
            variant = "outline">
                {githubPending ? (
                    <>
                        <Loader className="sizze-4 animate-spin"/>
                        <span>Loading...</span>
                    </>
                ) :  (
                    <>
                    <LogInIcon className="size-4"/>
                        Sign in with Github account
                    </>
                )
                
                }
            </Button>
            <div className="relative my-4 text-center text-sm
                            after:content-[''] after:absolute after:inset-x-0
                            after:top-1/2 after:-translate-y-1/2
                            after:border-t after:border-border">
            <span className="relative z-10 inline-block bg-background px-2 text-muted-foreground">
                Or continue with
            </span>
            </div>

            <div className="grid gap-3">
                <div className="grid gap-2">
                    <Label>Username</Label>
                    <Input value = {email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="username@gmail.com"
                    required/>
                    
                </div>
                <Button onClick={signInwithEmail} disabled={emailPending} className="bg-neutral-900 text-white hover:bg-yellow-300 focus-visible:ring-2 focus-visible:ring-green-600 w-full" variant = "outline">
                    {emailPending ? (
                        <>
                            <Loader2 className='size-4 animate-spin'/>
                            <span>Loading...</span>
                        </>
                    ):(
                        <>
                            <Send className="size-4"/>
                            <span>Continue with Email</span>
                        </>
                    )
                    }
                </Button>
            </div>



        </CardContent>
    </Card>
    )
}