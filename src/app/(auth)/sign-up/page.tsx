"use client"


import axios, { Axios, AxiosError } from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { SignUPSchema } from "@/app/schemas/signUpSchema"
import { useDebounceCallback } from 'usehooks-ts'
import { ApiResponse } from '@/types/ApiResponse'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {toast} from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

const SignUp = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, SetIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof SignUPSchema>>(
    {
      resolver: zodResolver(SignUPSchema),
      defaultValues: {
        username: '',
        email: '',
        password: '',
      }
    }
  )

  const decounced = useDebounceCallback(setUsername, 300)

  useEffect(() => {
    const checkUserNameUnique = async () => {
      if (username) {
        SetIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          setUsernameMessage(response?.data.message)
          console.log(response.data)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? 'error checking username')
        } finally {
          SetIsCheckingUsername(false)
        }
      }
    }

    checkUserNameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof SignUPSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post(`/api/sign-up`, data)

      toast.success(response?.data.success,{
        description:response?.data.message
      })

      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message
      toast.error('signup failed',{
        description:errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="  w-full h-screen mx-auto flex justify-center items-center  py-4 px-4">
      <Form {...form}  >
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username/email" {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      decounced(e.target.value)
                    }} />
                </FormControl>
                {isCheckingUsername && <Loader2 className='h-4 w-4 mr-2 animate-spin ' />}
                {!isCheckingUsername && usernameMessage && (
                  <p className={`text-sm ${usernameMessage === 'Username is unique' ? ' text-green-500' : 'text-red-500'}`}>{usernameMessage}</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
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
                  <Input type='password' placeholder="0102" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <div className=' mt-3 '>
         <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className=' mr-2 h-4 w-4  animate-spin' /> please wait
              </>
            ) : 'Signup'}
          </Button>
         </div>
          <div className=' py-3 px-3 text-sm md:text-[1rem] text-center'>
            <span>Already have an account ? <span className='text-sm'>please</span> </span>
            <Link href={'/sign-in'} className=' underline '><span className=' text-purple-400 text-base font-mono'>sign-in</span></Link>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignUp
