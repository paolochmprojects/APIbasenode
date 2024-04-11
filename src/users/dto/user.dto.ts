import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
    rate: z.number().min(1),
})

export type UserDTO = z.infer<typeof userSchema>

export function validatorBody(userSchema: z.ZodSchema) {

    return async (req: Request, res: Response, next: NextFunction) => {
        const result = await userSchema.safeParseAsync(req.body)
        if (result.success) return next()
       
        return res.status(400).json({message:"erro", error: result.error})
    }
}