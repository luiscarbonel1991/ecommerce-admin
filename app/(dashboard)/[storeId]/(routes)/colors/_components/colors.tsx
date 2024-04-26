"use client";


import Heading from "@/components/heading";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {Color} from "@/types";
import {ColorColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/colors/_components/columns";
import {format} from "date-fns";
import {DataTable} from "@/components/ui/data-table";

interface ColorsProps {
    data: Color[] | undefined
}
export const Colors = ({ data }: ColorsProps) => {

    const  router = useRouter()
    const params = useParams()

    const navigateToCreateColor = () => {
        router.push(`/${params.storeId}/colors/create`)
    }

    const sizeData = data?.map( b => (
        {
            id: `${b.id}`,
            name: b.name,
            value: b.value,
            createdAt: format(new Date(b.createdAt), "MMMM dd, yyyy")
        } as ColorColumn
    )) || []


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Colors (${sizeData.length})`}
                    subtitle={"Manage your colors"}
                />
                <Button

                    variant={"default"}
                    onClick={navigateToCreateColor}
                >
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add Color
                </Button>
            </div>

            <Separator className="my-4"/>
            
            <DataTable columns={columns} data={sizeData}/>

        </>
    )
}