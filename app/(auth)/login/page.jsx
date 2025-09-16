import {  Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginPage(){
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Welcome Back!</CardTitle>
                <CardDescription>Login with your email</CardDescription>
            </CardHeader>
        </Card>
    );
}

