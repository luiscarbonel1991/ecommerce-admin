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