'use client';
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courseStatus, courseLevels, courseCategories, courseSchema, courseSchemaType } from "@/lib/zodSchema";
import { ArrowLeft, PlusIcon, SparkleIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import slugify from 'slugify'
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export default function CreateCourseForm() {
  const form = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: '',
            description: '',
            fileKey: '',
            duration: 0,
            level: 'Beginner',
            category: 'Design',
            smallDescription: '',
            slug: '',
            status: 'Draft',
        }
    })

    function onSubmit(values: courseSchemaType) {
        console.log(values)
    }
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
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control}
                        name='title'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Title
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder = 'Title' {...field}></Input>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                    </form>
                    <div className="flex gap-4 items-end py-2">
                        <FormField control={form.control}
                        name='slug'
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Slug
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder = 'Slug' {...field}></Input>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <Button type="button" className="w-fit" onClick={() => {
                            const titleValue = form.getValues('title')
                            const slug = slugify(titleValue)
                            form.setValue('slug',slug,{shouldValidate: true})
                        }}>Generate Slug <SparkleIcon className="ml-1" size={16}/></Button>
                    </div>
                    <FormField control={form.control}
                        name='smallDescription'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="py-1">
                                    Small Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea placeholder = 'Small Description' className="min-h-[70]" {...field}></Textarea>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control}
                        name='description'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="py-2">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea placeholder = 'Description' className="min-h-[120]" {...field}></Textarea>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <FormField control={form.control}
                        name='fileKey'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="py-2">
                                    Thumbnail image
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder = 'Thumbnail url' {...field}></Input>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-2">
                            <FormField control = {form.control}
                                name='category'
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder='Select a Category'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {courseCategories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}>
                                
                            </FormField>
                            <FormField control = {form.control}
                                name='level'
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Level</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder='Select a Category'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {courseLevels.map((level) => (
                                                    <SelectItem key={level} value={level}>
                                                        {level}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}>
                                
                            </FormField>
                        </div>
                        <FormField control = {form.control}
                                name='status'
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder='Status'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {courseStatus.map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}>
                                
                            </FormField>

                    <Button > Create Course <PlusIcon className="ml-1"/></Button>
                </Form>
            </CardContent>
        </Card>
       
       </>
    )   
}