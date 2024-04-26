"use client";


import Heading from "@/components/heading";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {Size} from "@/types";
import {BillboardColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/billboard/_components/columns";
import {format} from "date-fns";
import {DataTable} from "@/components/ui/data-table";

interface SizesProps {
    data: Size[] | undefined
}
export const Sizes = ({ data }: SizesProps) => {

    const  router = useRouter()
    const params = useParams()

    const navigateToCreateSize = () => {
        router.push(`/${params.storeId}/sizes/create`)
    }

    const sizeData = data?.map( b => (
        {
            id: `${b.id}`,
            name: b.name,
            createdAt: format(new Date(b.createdAt), "MMMM dd, yyyy")
        } as BillboardColumn
    )) || []


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${sizeData.length})`}
                    subtitle={"Manage your sizes"}
                />
                <Button

                    variant={"default"}
                    onClick={navigateToCreateSize}
                >
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add Size
                </Button>
            </div>

            <Separator className="my-4"/>
            
            <DataTable columns={columns} data={sizeData}/>

        </>
    )
}