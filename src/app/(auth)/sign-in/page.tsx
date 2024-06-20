"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { SignInSchema } from '@/app/schemas/signInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import {toast} from 'sonner'

const page = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof SignInSchema>>(
    {
      resolver: zodResolver(SignInSchema),
      defaultValues: {
        identified: '',
        password: ''
      }
    }
  )

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setIsSubmitting(true)

    const result = await signIn('credentials', {
      redirect: false,
      identified: data.identified,
      password: data.password
    })
    if(result?.ok){
      toast.success('Done,',{
        description :'User Successfully login'
      })
    }

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast.error('Login Failed',{
          description:'Incorrect username or password'
        })
      } else {
        toast.error('Error',{
          description : result?.error
        })
      }
    }

    if (result?.url) {
      router.replace('/dashboard')
    }
    setIsSubmitting(false)

  }
  return (
    <div className=" w-full h-screen mx-auto flex justify-center items-center  py-4 px-4">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <FormField
            control={form.control}
            name="identified"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username/Email</FormLabel>
                <FormControl>
                  <Input placeholder="username/email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=' space-y-3 mt-3 '>
          <Button type="submit" disabled={isSubmitting}> {
            isSubmitting ? (
              <>
                <Loader2 className='h-4 w-4 mr-2 animate-spin' /> please wait
              </>
            ) : ('signin')
          } </Button>
          </div>
          
            <ul className='none'>
              <li className=' none'>
                <Link href={'/forgot-password'} className=' underline underline-offset-4 '><span className=' text-red-500 text-base font-mono'>forgot-password</span></Link>
              </li>
              <li>
                <div>
                  <span>not have an account ? <span className='text-sm'>please</span> </span>
                  <Link href={'/sign-up'} className=' underline '><span className=' text-purple-400 text-base font-mono '>sign-up</span></Link>
                </div>
              </li>
            </ul>

       
        </form>
      </Form>

    </div>
  )
}

export default page
