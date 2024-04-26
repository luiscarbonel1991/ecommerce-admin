import {LucideIcon} from "lucide-react";

declare type NavItem = {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: LucideIcon
}

export interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export interface SidebarNavItem extends NavItemWithChildren {
}

// Store

export declare type CreateStoreParams = {
    name: string
}

export declare type UpdateStoreParams = {
    name: string
}

export declare type Store = {
    id: number
    name: string
}

export declare type ImageProductType = "billboard" | "user" | "unknown"

export declare type  ImageStatus = "pending" | "active" | "inactive"

export declare type ImageM = {
    id: number
    name: string
    url: string
    productType: ImageProductType
    status: ImageStatus
    createdAt: Date
    updatedAt: Date
}

export declare type CreateBillboardParams = {
    name: string
    storeId: number
    imageId?: number
}

export declare type UpdateBillboardParams = {
    name: string
    storeId: number
    imageId?: number
}

export declare type Billboard = {
    id: number
    name: string
    storeId: number
    createdAt: Date
    imageId?: number
}

export declare type BillboardFormModel = {
    id: number
    name: string
    storeId: number
    imageId?: number
    image: ImageM | null | undefined
}

export interface IImage {
    title: string;
    transformationType: string;
    publicId: string;
    secureURL: string;
    width?: number;
    height?: number;
    config?: object;
    transformationURL?: string;
    aspectRatio?: string;
    color?: string;
    prompt?: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
    }
    createdAt?: Date;
    updatedAt?: Date;
}

export declare type Category = {
    id: number
    name: string
    billboard: Billboard
    storeId: number
    createdAt: Date
    updatedAt: Date
}

export declare type CreateUpdateCategoryParams = {
    name: string
    storeId: number
    billboardId: number
}

export declare type Size = {
    id: number
    name: string
    value: string
    storeId: number
    createdAt: Date
    updatedAt: Date
}

export declare type SizeFormModel = {
    id: number
    name: string
    value: string
    storeId: number
}

export declare type UpdateSizeParams = {
    name: string
    value: string
    storeId: number
}

export declare type CreateSizeParams = {
    name: string
    value: string
    storeId: number
}


export declare type Color = {
    id: number
    name: string
    value: string
    storeId: number
    createdAt: Date
    updatedAt: Date
}

export declare type ColorFormModel = {
    id: number
    name: string
    value: string
    storeId: number
}

export declare type UpdateColorParams = {
    name: string
    value: string
    storeId: number
}

export declare type CreateColorParams = {
    name: string
    value: string
    storeId: number
}
