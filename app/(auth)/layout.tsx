import { ReactNode } from "react";
import "../globals.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/logo.png"; // đúng là "default import", không destructuring



export default function AuthLayout({children}: {children: ReactNode}) {

    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center">

            <Link href="/" className={`${buttonVariants({ variant: "outline", className:'absolute top-4 left-4' })} 
              bg-neutral-900 text-white hover:bg-neutral-800 
              dark:bg-neutral-800 dark:hover:bg-neutral-700` }>
                <ArrowLeft className="size-4"/>
                Return
            </Link>

            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link className="flex items-center gap-2 self-center font-medium" href='/'>
                <Image src={logo} alt="Logo" width={44} height={44}/>
                    Funtime Media Corp    
                </Link>
                {children}

                <div className="text-balance text-center text-xs text-mute">
                    By clicking countinue, you agree to our <span className="hover:text-blue-400 hover:underline">Term of service </span>
                    {""}
                    and <span className="hover:text-blue-400 hover:underline">Privacy Policy.</span>
                </div>
            </div>
            
            
        </div>
    )
}


