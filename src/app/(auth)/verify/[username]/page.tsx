'use client'
import React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Verifyschmea } from '@/app/schemas/verifySchema'
import * as z from 'zod'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const page = () => {
  const router = useRouter()
  const {toast} = useToast()
  const param = useParams<{username:string}>()

  const form = useForm<z.infer<typeof Verifyschmea>>({
    resolver:zodResolver(Verifyschmea)
  })

  const onSubmit = async (data:z.infer<typeof Verifyschmea>)=>{
    try {
      const response = await axios.post(`/api/verify-code`,{
        username : param.username,
        code:data.code

      })
      toast({
        title:'Success',
        description:response.data.message
      })
      router.replace('/sign-in')
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title:'Verification is failed',
        description:axiosError.response?.data.message
      })
    }
  }
  return (
    <div className=" mx-auto flex justify-center items-center  h-screen ">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="01023" {...field} />
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

export default page
