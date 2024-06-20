'use client'


import { useDebounceCallback } from 'usehooks-ts';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';


 const SearchField = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const debounced = useDebounceCallback( async (search) => {

        const params = new URLSearchParams(searchParams);

        if (search) {
            params.set('query', search)
        } else {
            params.delete('query')
        }

      const res = replace(`${pathname}?${params.toString()}`)
       console.log(res)
    }, 300)

    return (
        <div className=''>
            <Input className={` `} placeholder='blog search' type="search" onChange={(e) => {
                debounced(e.target.value)
            }} defaultValue={searchParams.get('query')?.toString()}
            
            />

        </div>
    );
};

export default SearchField;
