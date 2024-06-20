'use client'

import { HeroHighlightDemo } from "@/components/heroHighlight";
import GlobalCards from "./create-blog/page";





export default function page() {
  return (
    <>
      <div className=" dark:bg-black">
        <HeroHighlightDemo />
        <GlobalCards />
      </div>
    </>
  );
}
