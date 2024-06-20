import {z}  from 'zod'

export const userValidationSchema = z
                    .string()
                    .min(2,'username atlest 2 characters')
                    .max(20,'username less then 20 charactes')
                    .regex(/^[a-zA-Z0-9_]+$/,' username must not contain special c')
                    


export const SignUPSchema = z.object(
    {
        username:userValidationSchema,
        email: z.string().email({message:'invalid email'}),
        password:z.string().min(6,{message:'password must me 6 digits'})
    }
)

