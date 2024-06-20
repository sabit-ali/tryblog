"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import axios from "axios";
import { Button } from "./ui/button";

import { useToast } from "./ui/use-toast";

export interface BlogCardType {
    _id:string,
    title:string,
    image_uri : string,
    description:string,
    price:string,
}
export function ThreeDCardDemo({_id,title,image_uri,description,price}:BlogCardType) {

    const {toast} = useToast()

        const handleRemoveBlogs = async ()=>{
            console.log("click remov item")
            const res = await axios.delete(`/api/remove-blog/${_id}`)
            if(res.data.success){
                toast({
                    title:'removed',
                    description:res.data.message,
                    variant:'destructive'
                })
            }
            if(res.data.success === false){
                toast({
                    title:'not removed',
                    description:res.data.message,
                    variant:'destructive'
                })
            }
        }

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={image_uri}
            width="1000"
            height="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            {price}
          </CardItem>
          <Button onClick={()=>handleRemoveBlogs}>Remove</Button>
        </div>
      </CardBody>
    </CardContainer>
  );
}
