"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "@/app/(dashboard)/[storeId]/(routes)/category/_components/cell-action";
import {Billboard} from "@/types";


export type CategoryColumn = {
    id: string
    name: string
    createdAt: string
    billboard: Billboard
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "billboard",
        header: "Billboard",
        cell: ({ row }) => row.original.billboard.name
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction rowData={row.original}/>
    }
]
