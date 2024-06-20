"use client";
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogTypes } from '@/app/models/BlogSchema';
import Image from 'next/image';
import { abort } from 'process';
import Link from 'next/link';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<BlogTypes | null>(null);  // Adjust type according to your schema
  const searchParams = useSearchParams();
  const id = searchParams.get('_id');

  const handleFetchParams = useCallback(async (abortController:any) => {
    if (id) {
      try {
        const response = await axios.get(`/api/galary-image?query=${id}`, {
          signal: abortController.signal,
        });
        setData(response.data.data);
      } catch (error:any) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error fetching data', error.message);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    const abortController = new AbortController();
    handleFetchParams(abortController);

    return () => {
      abortController.abort();
    };
  }, [handleFetchParams]);



  return (
    <>
      <div className=' mb-40'>
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
