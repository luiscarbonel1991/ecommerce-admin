import { z } from "zod";

export const StoreModalSchema =  z.object({
    name: z.string().min(3, "Name is too short").max(20, "Name is too long"),
})

export type StoreModalFormValues = z.infer<typeof StoreModalSchema>

export const StoreFormSchema =  z.object({
    name: z.string().min(3, "Name is too short").max(20, "Name is too long"),
})

export type StoreFormValues = z.infer<typeof StoreFormSchema>