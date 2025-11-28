
'use server'

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { APIResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { error } from "console";
import { headers } from "next/headers";


export async function CreateCourse(values: CourseSchemaType): Promise<APIResponse> {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),

        })
        if (!session || !session.user?.id) {
            return {
                status: "error",
                message: "You must be logged in to create a course",
            };
        }
        const validation = courseSchema.safeParse(values)
        if(!validation.success) {
            return {
                status: 'error',
                message: 'Validation failed'
            }
        }

        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session?.user.id
            }
        })

        return {
            status: 'success',
            message: 'Course created successfully'
        }
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            message: 'Failed to create course'
        }
    }
}