"use client";
import { useCallback, useState } from 'react';
import {FileRejection, useDropzone} from 'react-dropzone';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import {RenderEmptyState, RenderErrorState}  from './RenderState';
import { toast } from 'sonner';
import { set, StringFormatParams } from 'better-auth';
import { v4 as uuidv4 } from 'uuid'

interface UploaderState {
    id: string | null
    file: File | null
    uploading: boolean
    progress: number
    key?: string
    isDeleting: boolean
    error: boolean
    objectUrl?: string
    fileType: "image" |'video' | 'document'
    
}

export function Uploader() {
    const [fileState, setFileState] = useState<UploaderState>({
        id: null,
        file: null,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        fileType: 'image'
    })

    function uploadFile(file:File) {
        setFileState((prev) => ({ //only update uploading and progress values
            ...prev,
            uploading: true,
            progress: 0, 

        }))
        try {
            
        } catch {

        }
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        
        if(acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            setFileState({
                file: file,
                uploading: false,
                progress: 0,
                objectUrl: URL.createObjectURL(file),
                error: false,
                id: uuidv4(),
                isDeleting: false,
                fileType: 'image'
            })
        }

    }, [])

    function rejectedFiles(fileRejection: FileRejection[]){
        if(fileRejection.length) {

            

            const tooManyFiles = fileRejection.find(
                (rejection) => rejection.errors[0].code === 'too-many-files'
            )
            
            const fileSizeTooBig = fileRejection.find(
                (rejection) => rejection.errors[0].code === 'file-too-large'
            )

            if(tooManyFiles) {
                toast.error('Too many files. Please upload only one file at a time.');
            }
            if(fileSizeTooBig) {
                toast.error('File size is too big. Maximum file size is 5MB.')
            }
        }
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, 
        accept: {'image/*': []}, 
        maxFiles:1, 
        multiple:false, 
        maxSize: 5*1024*1024,
        onDropRejected: rejectedFiles,
    });
    return (
        <Card {...getRootProps()} className={cn(
            "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
            isDragActive ? "border-primary bg-primary/10 border-solid":
            "border-border hover:border-primary"
        )}>
            <CardContent className='flex items-center justify-center h-full w-full p-4'>
                <input {...getInputProps()}/>
                <RenderEmptyState isDragActive={isDragActive}/>
                {/* <RenderEmptyState isDragActive={isDragActive}/> */}
                {/* <RenderErrorState/> */}
            </CardContent>
        </Card>
    )
}
