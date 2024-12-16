import {z} from"zod"
export const signschema=z.object({
    email:z.string().min(3).max(10).email(),
    password:z.string().min(8)
})

export const contentschema=z.object({
    title:z.string(),    
    type:z.string(),
    tags:z.array(z.string()).optional(),
    link:z.string().optional(),
    userId:z.string().optional()
})