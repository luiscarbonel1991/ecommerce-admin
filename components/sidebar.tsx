"use client";
import {ChevronFirst, ChevronLast, LucideIcon} from "lucide-react"
import React, {createContext, useContext, useState} from "react"
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {sidebarItems} from "@/constans/links";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const SidebarContext = createContext({expanded: true})



export default function Sidebar() {

    const [expanded, setExpanded] = useState(true)
    const pathName = usePathname()

    return (
        <aside className={cn(
            "w-60 h-screen overflow-hidden transition-all",
            expanded ? "w-60" : "w-16"
        )}>
            <nav className="h-5/6 flex flex-col border-r shadow-sm">
                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3 mt-2">
                        {
                            sidebarItems.map((item, index) => {
                                const active = pathName === item.href
                                return (
                                    <React.Fragment key={index}>
                                        <SidebarItem
                                            href={item.href || "/"}
                                            Icon={item.icon}
                                            text={item.title}
                                            active={active}
                                        />
                                        {item.items && (
                                            <ul className={cn(expanded ? "ml-4" : "")}>
                                                {
                                                    item.items.map((subItem, index) => {
                                                        const activeSubItem = pathName === subItem.href
                                                        return (
                                                            <SidebarItem
                                                                key={`${index}-${subItem.title}`}
                                                                href={subItem.href || "/"}
                                                                Icon={subItem.icon}
                                                                text={subItem.title}
                                                                active={activeSubItem}/>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        )}
                                        {
                                            index < sidebarItems.length - 1 && <Separator/>
                                        }
                                    </React.Fragment>
                                )
                            })
                        }
                    </ul>
                </SidebarContext.Provider>

                <div className="flex justify-center items-center">
                    <Button
                        asChild
                        onClick={() => setExpanded((curr) => !curr)}
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full h-10 w-10 p-2 mb-2 cursor-pointer"
                    >
                        {expanded ? <ChevronFirst/> : <ChevronLast/>}
                    </Button>
                </div>
            </nav>
        </aside>
    )
}

export function SidebarItem({Icon, text, active, alert, href}
                                : {
                                Icon?: LucideIcon
                                text: React.ReactNode
                                href: string
                                active?: boolean
                                alert?: boolean
                            }
) {
    const {expanded} = useContext(SidebarContext)

    return (
        <Link href={href}>
            <li
                className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
                    active
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                        : "hover:bg-indigo-50 text-gray-600"
                }
    `}
            >
                {Icon && <Icon size={20} className={expanded ? 'mr-2' : ''}/>}
                <span
                    className={`overflow-hidden transition-all ${
                        expanded ? "w-52 ml-3" : "w-0"
                    }`}
                >
           {expanded ? text : ''}
           </span>

            </li>
        </Link>
    )
}