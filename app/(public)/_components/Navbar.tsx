
'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.png'
import { ThemeToggle } from '@/components/ui/themeToggle';
import { authClient } from '@/lib/auth-client';
import { buttonVariants } from '@/components/ui/button';
import { UserDropDown } from './UserDropdown';

const navigationItems = [
    {name: 'Home', href: '/'},
    {name: 'Course', href: 'course'},
    {name: 'Dashboard', href: '/dashboard'}

]


export function Navbar() {
    const {data:session, isPending} = authClient.useSession()
    return(
        <header className="sticky top-0 z-10 w-full
        bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur
        shadow-[inset_0_-1px_0_0_hsl(var(--border))]">
            <div className='flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8'>
                <Link href ='/' className='flex items-center space-x-2 mr-4'>
                    <Image src={Logo} alt='Logo' className='size-9'></Image>
                    <span className='font-bold'>Funtime Media Corp</span>
                </Link>
                {/* {Desktop navigation} */}
                <nav className='hidden md:flex md:flex-1 md:items-center md:justify-between'>
                    <div className='flex items-center space-x-2'>
                        {navigationItems.map((item) => 
                            <Link key={item.name} href={item.href} className='text-sm font-medium transition-colors hover:text-gray-300'>{item.name}</Link>
                        )}
                    </div>
                    <div className='flex items-center space-x-4'>
                        <ThemeToggle/>
                        
                        {isPending ? null : session ?(
                            <UserDropDown email={session.user.email} image={session.user.image || ""}  name={session.user.name}/>
                        ):(
                            <>
                            <Link href='/login' className={buttonVariants({ variant: "outline"})}>
                                Login
                            </Link>
                            <Link href='/login' className={buttonVariants({variant: "outline"})}>
                                Get started
                            </Link>
                            </>
                            
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}