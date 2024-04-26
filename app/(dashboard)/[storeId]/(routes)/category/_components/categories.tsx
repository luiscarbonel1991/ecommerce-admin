"use client";


import Heading from "@/components/heading";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {format} from "date-fns";
import {DataTable} from "@/components/ui/data-table";
import {CategoryColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/category/_components/columns";
import {Category} from "@/types";

interface CategoryProps {
    data: Category[] | undefined
}
export const Categories = ({ data }: CategoryProps) => {

    const  router = useRouter()
    const params = useParams()

    const navigateToCreateCategory = () => {
        router.push(`/${params.storeId}/category/create`)
    }

    const categoryColumns = data?.map( b => (
        {
            id: `${b.id}`,
            name: b.name,
            createdAt: format(new Date(b.updatedAt ?? b.createdAt), "MMMM dd, yyyy"),
            billboard: b.billboard
        } as CategoryColumn
    )) || []


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${categoryColumns.length})`}
                    subtitle={"Manage your categories"}
                />
                <Button

                    variant={"default"}
                    onClick={navigateToCreateCategory}
                >
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add Category
                </Button>
            </div>

            <Separator className="my-4"/>
            
            <DataTable columns={columns} data={categoryColumns}/>

        </>
    )
}