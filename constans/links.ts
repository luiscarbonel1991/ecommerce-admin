import {SidebarNavItem} from "@/types";
import {ImageIcon, Layers, LayoutDashboard, PlusIcon, Settings} from "lucide-react";

export const sidebarItems: SidebarNavItem[] = [
    {
        icon: LayoutDashboard,
        title: "Dashboard",
        href: "/",
    },
    {
        icon: ImageIcon,
        title: 'Billboard',
        href: '/billboard',
    },
    {
        icon: Layers,
        title: "Products",
        items: [
            {icon: Layers, title: "All Products", href: "/products"},
            {icon: PlusIcon, title: "Add Product", href: "/products"},
        ],
    },
    {
        icon: Settings,
        title: "Attributes",
        items: [
            {icon: Layers, title: "Sizes", href: "/sizes"},
            {icon: Layers, title: "Colors", href: "/colors"},
            {icon: Layers, title: "Brands", href: "/brands"},
        ],
    },
];