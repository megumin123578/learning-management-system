"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            
            router.push("/");
            toast.success("Sign out successfully!");
          },
          onError: () => {
            toast.error("Sign out failed!");
          },
        },
      });
    } catch (e) {
      toast.error("Sign out failed!");
      console.error(e);
    }
  };

  return (
    <div>
      Hello
      <ThemeToggle />
      {session ? (
        <div>
          <p>{session.user?.name}</p>
          <Button onClick={handleSignOut}>Logout</Button>
        </div>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
    </div>
  );
}
