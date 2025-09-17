import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogInIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input'

export default function LoginPage(){
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Welcome Back!</CardTitle>
                <CardDescription>Login with your email</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1/2">
                <Button className="bg-neutral-900 text-white hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-600 w-full" variant = "outline">
                    <LogInIcon className="size-4"/>
                    Sign in with Google account
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
                </div>



            </CardContent>
        </Card>

    );
}

