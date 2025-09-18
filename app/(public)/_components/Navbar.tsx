import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.png'
import { ThemeToggle } from '@/components/ui/themeToggle';

const navigationItems = [
    {name: 'Home', href: '/'},
    {name: 'Course', href: 'course'},
    {name: 'Dashboard', href: '/dashboard'}

]


export function Navbar() {
    return(
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdro-filter]:bg-background/60">
            <div className='flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8'>
                <Link href ='/' className='flex items-center space-x-2 mr-4'>
                    <Image src={Logo} alt='Logo' className='size-9'></Image>
                    <span className='font-bold'>Funtime Media Corp</span>
                </Link>
                {/* {Desktop navigation} */}
                <nav>
                    <div className='flex items-center space-x-2'>
                        {navigationItems.map((item) => 
                            <Link key={item.name} href={item.href} className='text-sm font-medium transition-colors hover:text-gray-300'>{item.name}</Link>
                        )}
                    </div>
                    <div>
                        <ThemeToggle/>
                    </div>
                </nav>
            </div>
        </header>
    )
}