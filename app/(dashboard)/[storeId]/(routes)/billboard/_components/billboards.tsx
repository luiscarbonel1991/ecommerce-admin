"use client";


import Heading from "@/components/heading";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {Billboard} from "@/types";
import {BillboardColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/billboard/_components/columns";
import {format} from "date-fns";
import {DataTable} from "@/components/ui/data-table";

interface BillboardsProps {
    data: Billboard[] | undefined
}
export const Billboards = ({ data }: BillboardsProps) => {

    const  router = useRouter()
    const params = useParams()

    const navigateToCreateBillboard = () => {
        router.push(`/${params.storeId}/billboard/create`)
    }

    const billboardColumns = data?.map( b => (
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
                    title={`Billboards (${billboardColumns.length})`}
                    subtitle={"Manage your billboards"}
                />
                <Button

                    variant={"default"}
                    onClick={navigateToCreateBillboard}
                >
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add Billboard
                </Button>
            </div>

            <Separator className="my-4"/>
            
            <DataTable columns={columns} data={billboardColumns}/>

        </>
    )
}