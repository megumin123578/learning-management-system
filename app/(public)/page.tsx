"use client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

  const features: featureProps[] = [
    {
      title: 'Learning',
      description: 'Access a wide range of course',
      icon: '📚'
    },
    {
      title: 'Progress tracking',
      description: 'Track your learning progress and see what you have completed',
      icon: '✅'
    },
    {
      title: 'Taking test',
      description: 'Assess your knowledge by taking interactive tests and quizzes',
      icon: '🤔'
    },

    {
    title: 'Community support',
    description: 'Get help and share knowledge with a supportive learning community',
    icon: '🙉'
    },
  ]

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
    <>
    <section className="relative py-20">
      <div className="flex flex-col items-center text-center space-y-8">
        <Badge variant="outline">Funtime Media Learning Platform</Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Better Videos Better Life</h1>
        <p className="max-w-[700px] md:text-xl text-muted-foreground">Discover a new way to learn with our modern, interactive learning management system. Access high-quality course anytime, anywhere</p>
      
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/course"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "text-popover-foreground",

            )}
          >
            Explore Course
          </Link>
          <Link href='/login' className={buttonVariants({
            size:'lg',
            variant:'outline',
          })}>
            Sign in
          </Link>
          
        </div>
      </div>
      
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
      {features.map((feature, index) => (
        <Card
          key={index}
          className={cn(
            "transition-colors hover:text-white",
            index === 0 && "hover:bg-blue-500",
            index === 1 && "hover:bg-green-500",
            index === 2 && "hover:bg-yellow-500",
            index === 3 && "hover:bg-red-500"
          )}
        >
          <CardHeader>
            <div className="text-4xl mb-4">{feature.icon}</div>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
    </>
  );
}
