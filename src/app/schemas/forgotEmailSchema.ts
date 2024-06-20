import {z} from 'zod'

export const forgotEmailSchema = z.object({
    email : z
    .string()
    .email()
})


export const confirmCurrectPasswordSchema = z.object({
    password : z.string(),
    confirmpassword : z.string(),
})
export const tokenSchema = z.object({
    token : z.string(),
 
})