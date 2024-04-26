import { z } from "zod";

export const StoreModalSchema =  z.object({
    name: z.string().min(3, "Name is too short").max(20, "Name is too long"),
})

export type StoreModalFormValues = z.infer<typeof StoreModalSchema>

export const StoreFormSchema =  z.object({
    name: z.string().min(3, "Name is too short").max(20, "Name is too long"),
})

export type StoreFormValues = z.infer<typeof StoreFormSchema>


export const BillboardModalSchema =  z.object({
    name: z.string().min(3, "Name is too short").max(20, "Name is too long"),
})

export type BillboardModalFormValues = z.infer<typeof BillboardModalSchema>

export const BillboardFormSchema =  z.object({
    name: z.string().min(3, "Name is too short").max(50, "Name is too long"),
    imageUrl: z.string().url( "Invalid Image URL")
})

export type BillboardFormValues = z.infer<typeof BillboardFormSchema>

export const CategoryFormSchema =  z.object({
    name: z.string().min(3, "Name is too short").max(20, "Name is too long"),
    billboardId: z.string().min(1)
})

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>

export const SizeFormSchema =  z.object({
    name: z.string().min(3, "Name is too short").max(20, "Name is too long"),
    value: z.string().min(1, "Value is too short").max(20, "Value is too long"),
})

export type SizeFormValues = z.infer<typeof SizeFormSchema>


export const ColorFormSchema =  z.object({
    name: z.string().min(3, "Name is too short").max(20, "Name is too long"),
    value: z.string().min(4).regex(/^#[0-9A-F]{6}$/i, "Invalid color value, must be a hex color code")
})

export type ColorFormValues = z.infer<typeof ColorFormSchema>

