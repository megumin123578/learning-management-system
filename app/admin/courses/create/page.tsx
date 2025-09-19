import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courseSchemaType } from "@/lib/zodSchema";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'


export default function CourseCreationPage() {

    //1 define form
    const form = useForm<courseSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
        }
    })
    return (
       <>
        <div className="flex items-center gap-4">
            <Link href='/admin/courses' className={buttonVariants({
                variant:'outline',
                size:'icon'
            })} >
            <ArrowLeft className="size-4"/>
            
            </Link>
            <h1 className="text-2xl font-bold">Create Courses</h1>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>
                    Basic Information
                </CardTitle>
                <CardDescription>
                    Provide basic information about the course
                </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
       
       </>
    )   
}