'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader, LogInIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input'
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useTransition } from "react";

export function LoginForm() {
    const [githubPending, startGithubTransition] = useTransition()
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
                    onError: (error) => {
                    console.error("Github sign-in error:", error);
                    toast.error(error?.error?.message || "Something went wrong.");
                    }
                }
            }
        )
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
                    <Input placeholder="Enter your usename"/>
                </div>
                <Button className="bg-neutral-900 text-white hover:bg-yellow-300 focus-visible:ring-2 focus-visible:ring-green-600 w-full" variant = "outline">Continue with email</Button>
            </div>



        </CardContent>
    </Card>
    )
}