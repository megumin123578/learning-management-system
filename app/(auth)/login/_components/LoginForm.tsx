'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input'
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// ==== Inline SVG logos ====
function GithubLogo({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.85 9.68.5.09.68-.22.68-.49 0-.24-.01-.86-.01-1.69-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.13-1.52-1.13-1.52-.93-.65.07-.63.07-.63 1.03.07 1.58 1.07 1.58 1.07.91 1.59 2.38 1.13 2.96.86.09-.67.36-1.12.65-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.04 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .85-.28 2.78 1.05a9.25 9.25 0 0 1 5.06 0c1.93-1.33 2.78-1.05 2.78-1.05.55 1.43.2 2.49.1 2.75.64.71 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.37.33.7.98.7 1.99 0 1.44-.01 2.6-.01 2.95 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
    </svg>
  );
}
function GoogleLogo({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path fill="#4285F4" d="M23.5 12.27c0-.84-.07-1.45-.22-2.08H12.24v3.77h6.41c-.13.94-.83 2.36-2.39 3.32l-.02.12 3.47 2.68.24.02c2.2-2.03 3.45-5.01 3.45-8.05Z"/>
      <path fill="#34A853" d="M12.24 24c3.15 0 5.79-1.04 7.73-2.83l-3.68-2.84c-.99.64-2.31 1.09-4.05 1.09-3.09 0-5.71-2.03-6.64-4.84l-.11.01-3.6 2.79-.05.11C3.83 21.51 7.72 24 12.24 24Z"/>
      <path fill="#FBBC05" d="M5.6 14.58a7.33 7.33 0 0 1 0-4.72l-.01-.11-3.64-2.83-.12.06a12.02 12.02 0 0 0 0 10.49l3.77-2.89Z"/>
      <path fill="#EA4335" d="M12.24 4.76c2.19 0 3.66.93 4.5 1.71l3.29-3.2C18 1.2 15.38 0 12.24 0 7.72 0 3.83 2.49 1.78 6.54l3.81 2.89c.94-2.81 3.55-4.67 6.65-4.67Z"/>
    </svg>
  );
}
function FacebookLogo({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M22 12.07C22 6.55 17.52 2 12 2S2 6.55 2 12.07C2 17.06 5.66 21.2 10.44 22v-7.03H7.9v-2.9h2.54v-2.2c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.24 0-1.62.78-1.62 1.58v1.85h2.77l-.44 2.9h-2.33V22C18.34 21.2 22 17.06 22 12.07Z"/>
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [facebookPending, startFacebookTransition] = useTransition();
  const [emailPending, startemailTransition] = useTransition();
  const [email, setEmail] = useState("");

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => { toast.success("Signed in with GitHub, redirecting..."); },
          onError: (error: any) => { 
            toast.error(error?.error?.message ?? error?.message ?? "Something went wrong."); 
          },
        },
      });
    });
  }

  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => { toast.success("Signed in with Google, redirecting..."); },
          onError: (error: any) => { 
            toast.error(error?.error?.message ?? error?.message ?? "Something went wrong."); 
          },
        },
      });
    });
  }

  async function signInWithFacebook() {
    startFacebookTransition(async () => {
      await authClient.signIn.social({
        provider: "facebook",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => { toast.success("Signed in with Facebook, redirecting..."); },
          onError: (error: any) => { 
            toast.error(error?.error?.message ?? error?.message ?? "Something went wrong."); 
          },
        },
      });
    });
  }

  function signInwithUsername() {
    startemailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email sent");
            router.push(`/verify-request`);
          },
          onError: () => { toast.error("Something wrong happen!"); },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>Login with your email</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* 3 social buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            aria-label="Sign in with GitHub"
            disabled={githubPending}
            onClick={signInWithGithub}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-xl p-0 hover:bg-gray-200"
            title="Sign in with GitHub"
          >
            {githubPending ? <span className="size-4 animate-spin" /> : <GithubLogo />}
          </Button>

          <Button
            aria-label="Sign in with Google"
            disabled={googlePending}
            onClick={signInWithGoogle}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-xl p-0 hover:bg-gray-200"
            title="Sign in with Google"
          >
            {googlePending ? <span className="size-4 animate-spin" /> : <GoogleLogo />}
          </Button>

          <Button
            aria-label="Sign in with Facebook"
            disabled={facebookPending}
            onClick={signInWithFacebook}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-xl p-0 hover:bg-gray-200"
            title="Sign in with Facebook"
          >
            {facebookPending ? <span className="size-4 animate-spin" /> : <FacebookLogo />}
          </Button>
        </div>

        <div className="relative my-2 text-center text-sm
                        after:content-[''] after:absolute after:inset-x-0
                        after:top-1/2 after:-translate-y-1/2
                        after:border-t after:border-border">
          <span className="relative z-10 inline-block bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Email/password */}
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label>Login with username</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="grid gap-2">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <Button
            onClick={signInwithUsername}
            disabled={emailPending}
            className="bg-neutral-900 text-white hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-600 w-full"
            variant="outline"
          >
            {emailPending ? <span className="size-4 animate-spin mr-2" /> : null}
            <span>{emailPending ? "Loading..." : "Continue with Username"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
