"use client";

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {Nav} from "@/components/nav";
import {Inbox, LayoutDashboard, LucideIcon, PaletteIcon, PencilRulerIcon, Send} from "lucide-react";
import {TooltipProvider} from "@/components/ui/tooltip";
import {useParams, usePathname} from "next/navigation";
import {Separator} from "@/components/ui/separator";


const Ecommerce = ({
                       children,
                       defaultLayout = [265, 500],
                       defaultCollapsed = false,
                       navCollapsedSize = 4
                   }: {
    children: React.ReactNode,
    defaultLayout: number[] | undefined
    defaultCollapsed?: boolean,
    navCollapsedSize: number
}) => {

    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
    const pathName = usePathname()
    const params = useParams()

    const links
        : {
        href: string;
        title: string;
        label?: string;
        icon: LucideIcon;
        variant: "default" | "ghost";
    }[]= [
        {
            href: `/${params.storeId}`,
            title: "Dashboard",
            label: "",
            icon: LayoutDashboard,
            variant: pathName === `/${params.storeId}` ? "default" : "ghost"
        },
        {
            href: `/${params.storeId}/store`,
            title: "Store",
            label: "",
            icon: Inbox,
            variant: pathName === `/${params.storeId}/store` ? "default" : "ghost",

        }
    ]

    const attributeLinks: {
        href: string;
        title: string;
        label?: string;
        icon: LucideIcon;
        variant: "default" | "ghost";
    }[]= [
        {
            href: `/${params.storeId}/color`,
            title: "Color",
            label: "",
            icon: PaletteIcon,
            variant: pathName === `/${params.storeId}/color` ? "default" : "ghost"
        },
        {
            href: `/${params.storeId}/size`,
            title: "Size",
            label: "",
            icon: PencilRulerIcon,
            variant: pathName === `/${params.storeId}/size` ? "default" : "ghost"
        }
    ]



    return (
        <TooltipProvider>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full max-h-[800px] items-stretch"
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={15}
                    maxSize={20}
                    onCollapse={() => {
                        setIsCollapsed(true)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            isCollapsed
                        )}`
                    }}

                    onExpand={() => {
                        setIsCollapsed(false)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            isCollapsed
                        )}`
                    }}
                    className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
                >
                    <Nav
                        isCollapsed={isCollapsed}
                        links={links}
                    />
                    <Separator/>
                    <Nav
                        isCollapsed={isCollapsed}
                        links={attributeLinks}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="p-8">
                    {children}
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}

export default Ecommerce