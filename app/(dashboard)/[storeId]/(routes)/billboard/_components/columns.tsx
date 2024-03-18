"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "@/app/(dashboard)/[storeId]/(routes)/billboard/_components/cell-action";


export type BillboardColumn = {
    id: string
    name: string
    createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction rowData={row.original}/>
    }
]
