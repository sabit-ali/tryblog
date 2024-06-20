import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  import { useSearchParams } from "next/navigation"
  import { usePathname,useRouter } from "next/navigation"
  
  const PaginationDev = ({totalpage}:{totalpage:number}) => {
    const {replace} = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
    const createPageURL = (pageNumber : number | string) =>{
        const params = new URLSearchParams(searchParams)
        params.set('page',pageNumber.toString());
        return `${pathname}?${params.toString()}`
    }

    const generatePaginationItems = () => {
        const items = []
        for (let i = 1; i <= totalpage; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink href={createPageURL(i)}>{i}</PaginationLink>
            </PaginationItem>
          )
        }
        return items
    }
    return (
      <div className=" mb-10">
        <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href={createPageURL(currentPage - 1)} />
    </PaginationItem>
    <PaginationItem>
      {generatePaginationItems()}
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext  href={createPageURL(currentPage + 1)} />
    </PaginationItem>
  </PaginationContent>
</Pagination>

      </div>
    )
  }
  
  export default PaginationDev
  