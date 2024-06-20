import {z} from 'zod'

export const UserIdSchema = z.object({
    _id:z.string()
})