"use client"
import React, { useState } from 'react'
import * as z from 'zod'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { confirmCurrectPasswordSchema } from '@/app/schemas/forgotEmailSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'

interface ChangePasswordFormProps {
  resetPasswordToken : string
}
const ChangePasswordForm = ({resetPasswordToken} : ChangePasswordFormProps) => {
  const [password, setPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const [message, setMessage] = useState<string>()

  const {toast} = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof confirmCurrectPasswordSchema>>({
    resolver:zodResolver(confirmCurrectPasswordSchema),
    defaultValues:{
      password : '',
      confirmpassword:''
    }
  })

  const onSubmit = async (data:z.infer<typeof confirmCurrectPasswordSchema>) =>{
    if(password !== confirmPassword){
      setMessage('password do not match')
      return 
    }

    try {
     const respons = await axios.post(`api/change-password`,{
        resetPasswordToken : resetPasswordToken,
        password :data.password
      })

      toast({
        title:'success',
        description:respons.data.message
      })

      router.replace('/sign-in')
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title:'Failed password change',
        description:axiosError.response?.data.message,
        variant:"destructive"
        
      })
    }
  }
  return (
    <div className='flex h-screen w-full justify-center items-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-6'>
        <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="username/email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default ChangePasswordForm
