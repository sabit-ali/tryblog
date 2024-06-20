"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotEmailSchema } from '@/app/schemas/forgotEmailSchema'
import * as z from 'zod'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

const page = () => {

    const {toast} = useToast()
    const router = useRouter()

    const [email, setEmail] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<string>()

    const form = useForm<z.infer<typeof forgotEmailSchema>>({
        resolver : zodResolver(forgotEmailSchema),
        defaultValues: {
            email:''
        }
    })

    const onSubmit = async (data:z.infer<typeof forgotEmailSchema>)=>{
        setIsLoading(true)
        setMessage('')

        try {
           const response = await axios.post('api/forgot-password',{
                email: data.email
            })

            toast({
                title: 'success',
                description:response.data.message ?? 'Password reset email send successfully , please your email'
            })

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast({
                title:'failed',
                description:axiosError.response?.data.message
            })
        }finally{
            setIsLoading(false)
            setMessage('')
        }

    }
  return (
    <div className=' w-full h-screen flex items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-6 max-w-lx flex flex-col">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                make sure email already existed!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">reset-password</Button>
        <span className='text-sm'> create new account ?
        <Link href={'/sign-up'} className=' text-purple-500 underline'>Sign-up</Link>
        </span>
        </form>
      </Form>
    </div>
  )
}

export default page
