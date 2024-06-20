'use client'

import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { Vortex } from '@/components/ui/vortex'
import Link from 'next/link'


const page = () => {

  const {data:session} = useSession()
  const user:User = session?.user as User

if(!session){
  return <div>
    <p>Please Sign-in</p>
  </div>
}
return (
  <div className="w-full   h-screen">
    <Vortex
      backgroundColor="black"
      className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
    >
      <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
        Create the new Blogs
      </h2>
      <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
      Starting a blog gives you a platform to express your ideas, 
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 dark:bg-black rounded-full bg-white text-black dark:text-orange-500 hover:bg-green-700 ">
        <Link href={'/create-blog'} className=' px-3 py-3 rounded-sm hover:text-green-500  font-semibold'>Create Blog</Link>
      </div>
    </Vortex>
  </div>
);
}

export default page
