
import { z } from 'zod'

export const courseLevels = ['Beginner','Intermediate','Advanced'] as const;
export const courseStatus = ['Draft','Publish','Archive'] as const;
export const courseCategories = ['Design', 'Edit','Video Filming','Content writing'] as const;
export const courseSchema = z.object({
    title: z.string().min(3, {message: 'Title must be at least 3 characters'}).max(100, {message: 'Title must be at most 100 characters'}),
    description: z.string().min(3, { message: 'Description must be at least 3 characters' }),
    fileKey: z.string().min(1, {message: 'File is required'}),
    duration: z.coerce.number().min(1).optional(),
    level: z.enum(courseLevels,{message:"Level is requiresd"}),
    category: z.enum(courseCategories, {message: "category is required"}),
    smallDescription: z.string().min(3, { message: 'Small description must be at least 3 characters' }).max(200, { message: 'Small description must be at most 3 characters' }),
    slug: z.string().min(3),
    status: z.enum(courseStatus),

})


export type courseSchemaType = z.infer<typeof courseSchema>