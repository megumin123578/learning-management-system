import { description } from '@/components/sidebar/chart-area-interactive'
import { stat } from 'fs'
import { title } from 'process'
import { z } from 'zod'

export const courseLevels = ['Beginner','Intermediate','Advanced']
export const courseStatus = ['Drat','Publish','Archive']
export const courseSchema = z.object({
    title: z.string().min(3, {message: 'Title must be at least 3 characters'}).max(100, {message: 'Title must be at most 100 characters'}),
    description: z.string().min(3, { message: 'Description must be at least 3 characters' }),
    fileKey: z.string().min(1, {message: 'File is required'}),
    duration: z.coerce.number().min(1),
    level: z.enum(courseLevels,{message:"Level is requiresd"}),
    category: z.string(),
    smallDescription: z.string().min(3, { message: 'Small description must be at least 3 characters' }).max(200, { message: 'Small description must be at most 3 characters' }),
    slug: z.string().min(3),
    status: z.enum(courseStatus),

})