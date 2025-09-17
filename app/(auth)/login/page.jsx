import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogInIcon } from "lucide-react";

export default function LoginPage(){
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Welcome Back!</CardTitle>
                <CardDescription>Login with your email</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="bg-neutral-900 text-white hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-600 w-full" variant = "outline">
                    <LogInIcon className="size-4"/>
                    Sign in with Google account
                </Button>


            </CardContent>
        </Card>

    );
}

