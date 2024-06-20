import { Description } from '@radix-ui/react-toast'
import {string, z} from 'zod'

export const BlogSchema = z.object({
    title:z.string(),
    description:z.string(),
    avatar: z.any()
})