import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from './ui/label';
import { Input } from './ui/input';
import {useForm} from 'react-hook-form'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { BlogSchemaTypes } from '@/app/schemas/BlogSchemaTypes';
import * as z from 'zod'
import { Textarea } from "@/components/ui/textarea"


export const DialogCreateBlog = ({isLoading,onSubmit} : {isLoading : boolean, onSubmit:any}) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<z.infer<typeof BlogSchemaTypes>>();

      

    return (
        <Dialog>
            <DialogTrigger>
                <div className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        <span>Create-blogs</span>
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Creating a new blog</DialogTitle>
                    <div className="max-w-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input {...register('title')} type="text" />
                                {errors.title && <span>This field is required</span>}
                            </div>
                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Input {...register('avatar')} type="file" />
                                {errors.avatar && <span>This field is required</span>}
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea {...register('description')} placeholder='Write your feels' typeof='textarea' />
                                {errors.description && <span>This field is required</span>}
                            </div>
                            <Button type="submit" onClick={()=> setTimeout(()=>{
                                reset()
                            },200)} disabled={isLoading}>
                                {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait</>) : ('Submit')}
                            </Button>
                        </form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DialogCreateBlog
