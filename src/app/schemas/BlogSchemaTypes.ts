import { Description } from '@radix-ui/react-toast'
import {z} from 'zod'

export const BlogSchemaTypes = z.object({
    avatar : z.any(),
    title:z.string().min(7,{message:'atlest 6 charactar'}).max(10,{message:' maxmin.. 10 charactars'}),
    description : z.string().max(500,{message:'max 500 letters'}),
    price:z.string()
})