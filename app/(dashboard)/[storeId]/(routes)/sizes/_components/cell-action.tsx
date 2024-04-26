import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Edit, MoreHorizontal, Trash} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {useState} from "react";
import {AlertModal} from "@/components/modals/alert-modal";
import {SizeColumn} from "@/app/(dashboard)/[storeId]/(routes)/sizes/_components/columns";
import {deleteSize} from "@/lib/actions/size.action";

interface CellActionProps {
    rowData: SizeColumn
}

const CellAction = ({rowData}: CellActionProps) => {

    const router = useRouter()
    const params = useParams()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onConfirmDelete = async () => {
        try {

            setLoading(true)
            const deleted = await deleteSize(Number(rowData.id))

            if (!deleted) {
                toast({
                    variant: "destructive",
                    title: "Size not found",
                    description: "The size you are trying to delete does not exist.",
                })
            } else {
                router.refresh()
                router.push(`/${params.storeId}/sizes`)
                toast({
                    title: "Size deleted",
                    description: "Your Size has been deleted.",
                    className: "bg-green-400",
                })
            }

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal isOpen={open}
                        onClose={() => setOpen(false)}
                        onConfirm={onConfirmDelete}
                        loading={loading}/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => router.push(`/${params.storeId}/sizes/${rowData.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4"/>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="mr-2 h-4 w-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction
