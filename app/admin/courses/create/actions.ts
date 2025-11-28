
'use server'

import { prisma } from "@/lib/db";
import { APIResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";


export async function CreateCourse(values: CourseSchemaType): Promise<APIResponse> {
    try {
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
                userId: 'amamamama'
            }
        })

        return {
            status: 'success',
            message: 'Course created successfully'
        }
    } catch {
        return {
            status: 'error',
            message: 'Failed to create course'
        }
    }
}