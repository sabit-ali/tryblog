
import { getSingleProduct } from '@/app/helper'
import { ThreeDCardDemo } from '@/components/TreeD'
import { ApiResponse } from '@/types/ApiResponse'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { abort } from 'process'
import React, { useEffect, useState } from 'react'

const SinglePageBlog = async (_id:string) => {
    const [data, setData] = useState<{ title: string, description: string, image_uri: string } | null>(null)
    const [isLoading, setIsLoading] = useState(false)
        const _id = String(searchParams._id)
      const product =  await getSingleProduct(_id)
      console.log(product)
     
    
    console.log("Is Koko-id data state - : ",data)

    return (
        <>
          <div>
          {isLoading ? ('Loading ...') : (
             <div className="max-w-md mx-auto bg-white dark:bg-black dark:text-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-48">
             <div className="md:flex">
                  <div className='md:shrink-0'>
                      {data?.image_uri && <Image
                      height={'1000'}
                      width={'1000'}
                      src={data?.image_uri}
                      alt={data.title}
                      className='h-48 w-full bg-top object-cover md:h-full md:w-48'
                       />}
                  </div>
                  <div className=' px-4 py-2 uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                      <h1 >{data?.title}</h1>
                      <div>
                          <span className='mt-2 text-slate-500 dark:text-white  '>
                              {data?.description}
                          </span>
                      </div>
                  </div>
              </div>
          </div>
          )}
          </div>
        </>
    )
}

export default SinglePageBlog


