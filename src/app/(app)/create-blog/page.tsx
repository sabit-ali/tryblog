"use client";

import { Skeleton } from "@/components/ui/skeleton"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";
import { BlogSchemaTypes } from "@/app/schemas/BlogSchemaTypes";
import * as z from 'zod';
import {toast} from 'sonner'
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Abhaya_Libre } from 'next/font/google';
import PaginationDev from "@/components/Pagination";
import DialogCreateBlog from "@/components/DialogCreateBlog";
import SearchField from "@/components/SearchField";

const fontd = Abhaya_Libre({ subsets: ["sinhala"], weight: '400' });

const GlobalCards = (
  { searchParams }: {
    searchParams?: {
      query?: string,
      page?: string;
    }
  }
) => {

  const params = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1;
  const [isBlog, setIsBlog] = useState<{ title: string; image_uri: string; description: string; price: string; _id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const user: User = session?.user as User;

  const {
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof BlogSchemaTypes>>();

  const handelBlogState = async ({ params, currentPage }: { params: string, currentPage: number }) => {
    setIsLoading(true);
    const response = await axios.get(`/api/create-blog?query=${params}&page=${currentPage}`);
    const blogAllData = await response.data.data;
    setIsBlog(blogAllData);

    setIsLoading(false); // Set loading to false after data is fetched
  }

  const onSubmit = async (data: z.infer<typeof BlogSchemaTypes>) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('avatar', data.avatar[0]);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);

    try {
      const response = await axios.post(`api/create-blog`, formData);
      await handelBlogState({ params, currentPage });
      if (response.data.success) {
        toast.success(response.data.success, {
          description: response.data.message,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error('Failed to create new blog', {
        description: axiosError.response?.data.message,
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };


  const handleDeleteBlog = async (id: string) => {
    const response = await axios.delete(`api/remove-blog/${id}`);

    if (!response.status) {
      toast.success('error not removed',{
        description:response.data.message,
      })
    }
    setIsBlog((prevBlogs) => prevBlogs.filter(blog => blog._id !== id));
    toast.error('removed !',{
      description:response.data.message
    })
  };

  const isSearchArry = isBlog.filter((field) => field.title.toLowerCase().includes(params.toString().toLowerCase()))

  useEffect(() => {

    handelBlogState({ params, currentPage });

  }, [currentPage, params]);

  if (!session) {
    return (
      <>
        <div className=" w-full flex items-center justify-center flex-col h-14 mt-40 ">
          <SearchField />
        </div>
        <div className={`${fontd.className} w-full h-12 text-xl text-center  flex items-end gap-5 justify-center`}>
          <div>
            <span>Write an <span className="text-xl text-green-500 underline">Blog</span></span>
          </div>
          <Link href={'/sign-in'} className=" underline text-md  text-purple-500">Sign-in</Link>
        </div>


        {isLoading ? (
          <>
            <div className="w-full h-12 flex justify-center items-center mt-48">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </>
        ) : (
          <TracingBeam className={`${fontd.className}px-6 `}>

            <div className=" py-6 px-8  flex flex-col gap-5 relative">
              {isSearchArry.map((item) => (
                <Link href={{pathname : 'galary-image', query : {_id : item._id}}} key={`content-${item._id}`}>
                  <div  className=" border rounded-sm border-purple-700 py-4 px-5">

                    <p className={twMerge(fontd.className, " font-semibold text-4xl text-green-500 font-serif")}>
                      {item.title}
                    </p>

                    <div className={`text-2xl dark:bg-gray-700 py-4 px-4 rounded-sm prose prose-sm dark:prose-invert ${fontd.className}`}>
                      <div className=" w-full flex justify-center items-center  shadow-sm">
                        {item?.image_uri && (
                          <Image
                            src={item.image_uri}
                            alt="blog thumbnail"
                            height="300"
                            width="600"
                            className="rounded-lg mb-10 object-cover"
                          />
                        )}
                      </div>
                      {item.description}
                    </div>
                    <div className=" w-full h-4 flex justify-center items-center mt-4">
                      <Button
                        onClick={() => handleDeleteBlog(item._id)}
                        className="dark:bg-black h-4 w-4 rounded-sm dark:text-red-500 text-center">X</Button>
                    </div>
                  </div>
                </Link>
              ))}

            </div>
          </TracingBeam>
        )}
      </>



    );
  }

  if (session) {
    return (
      <>
        <div className="  w-full flex items-center justify-center flex-col h-14 mt-40 ">
          <SearchField />
          <div className=" w-full mt-2 text-center flex items-center justify-center">
            <div className=" w-[600px] border border-t border-purple-600"></div>
          </div>
        </div>
        <nav className="w-full h-12 flex justify-center items-center">
          <DialogCreateBlog isLoading={isLoading} onSubmit={onSubmit} />
        </nav>

        {isLoading ? (
          <>
            <div className="flex flex-col space-y-3 mt-32">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </>
        ) : (
          <TracingBeam className={`${fontd.className}px-6 `}>

          <div className=" py-6 px-8  flex flex-col gap-5 relative">
            {isSearchArry.map((item) => (
              <Link href={{pathname : 'galary-image', query : {_id : item._id}}} key={`content-${item._id}`}>
                <div  className=" border rounded-sm border-purple-700 py-4 px-5">

                  <p className={twMerge(fontd.className, " font-semibold text-4xl text-green-500 font-serif")}>
                    {item.title}
                  </p>

                  <div className={`text-2xl dark:bg-gray-700 py-4 px-4 rounded-sm prose prose-sm dark:prose-invert ${fontd.className}`}>
                    <div className=" w-full flex justify-center items-center  shadow-sm">
                      {item?.image_uri && (
                        <Image
                          src={item.image_uri}
                          alt="blog thumbnail"
                          height="300"
                          width="600"
                          className="rounded-lg mb-10 object-cover"
                        />
                      )}
                    </div>
                    {item.description}
                  </div>
                  <div className=" w-full h-4 flex justify-center items-center mt-4">
                    <Button
                      onClick={() => handleDeleteBlog(item._id)}
                      className="dark:bg-black h-4 w-4 rounded-sm dark:text-red-500 text-center">X</Button>
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </TracingBeam>
        )}
      </>
    );
  }
};

export default GlobalCards;
