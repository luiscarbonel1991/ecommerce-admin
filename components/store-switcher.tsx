"use client";

import {PopoverTriggerProps} from "@radix-ui/react-popover";
import {useStoreModal} from "@/hooks/use-store-modal";
import {useParams, useRouter} from "next/navigation";
import {Store} from "@/types";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Check, PlusCircle, StoreIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
import {BsChevronExpand} from "react-icons/bs";

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

const StoreSwitcher = ({
                           className,
                           items = []
                       }: StoreSwitcherProps) => {

    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const formattedStores = items.map(store => ({
        id: `${store.id}`,
        name: store.name
    }))

    const currentStore = formattedStores.find(store => store.id === params.storeId) || formattedStores[0]


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    onClick={() => setOpen(!open)}
                    className={cn("flex items-center justify-between gap-2", className)}
                    aria-expanded={open}
                    variant={"outline"}
                    size={"sm"}
                >
                    <div className="flex items-center gap-2">
                        <StoreIcon className="h-4 w-4"/>
                        <span>{currentStore.name}</span>
                    </div>
                    <BsChevronExpand className="h-4 w-4"/>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search stores"/>
                        <CommandEmpty>No stores found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedStores.map(store => (
                                <CommandItem
                                    key={store.id}
                                    onSelect={() => {
                                        setOpen(false)
                                        router.push(`/${store.id}`)
                                    }}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <StoreIcon className="h-4 w-4"/>
                                    {store.name}
                                    <Check
                                        className={cn(
                                            "h-4 w-4",
                                            store.id === currentStore.id ? "text-primary" : "text-transparent"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen()
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5"/>
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher