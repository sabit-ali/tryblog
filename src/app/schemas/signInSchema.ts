import {string, z} from 'zod'

export const SignInSchema = z.object(
    {
        identified : z.string(),
        password : z.string(),
    }
)