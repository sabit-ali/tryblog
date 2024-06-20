"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-cardTwo";
import Link from "next/link";
import { useRouter } from "next/navigation";
export function ThreeDCardDemo({image,title,description}:{image:string,title:string,description:string}) {
const router = useRouter()


  return (
    <CardContainer className="inter-var max-w-2xl h-auto mt-40 flex justify-center items-center">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-3xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={image}
            width="1000"
            height='1000'
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={title}
          />
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
         {description}
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="/create-blog"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
           Create-blog →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
           <Link href={'/'}>Go back </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
