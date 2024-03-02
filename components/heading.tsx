import {cn} from "@/lib/utils";
import {LucideIcon} from "lucide-react";


const Heading = ({
                           title,
                           subtitle,
                           icon,
                           titleClassName,
                           subtitleClassName,
                       }: {
    title: string,
    subtitle?: string,
    icon?: LucideIcon,
    titleClassName?: string,
    subtitleClassName?: string
}) => {
    return (
        <div>
            <h2 className={
                cn(
                    "text-2xl md:text-3xl font-bold tracking-tight",
                    titleClassName
                )
            }>{title}</h2>
            {subtitle && <p className={
                cn(
                    "text-muted-foreground text-sm lg:text-lg",
                    subtitleClassName
                )
            }>{subtitle}</p>}
        </div>
    )
}

export default Heading