"use client";


import {Store} from "@/types";
import Heading from "@/components/heading";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {StoreFormSchema, StoreFormValues} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {deleteStore, updateStore} from "@/lib/actions/store";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {useRouter} from "next/navigation";
import {AlertModal} from "@/components/modals/alert-modal";

interface StoreFormProps {
    store: Store
}

export const StoreForm = ({store}: StoreFormProps) => {

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const form = useForm<StoreFormValues>({
        resolver: zodResolver(StoreFormSchema),
        defaultValues: {
            name: store.name,
        }
    })

    const onSubmit = async (values: StoreFormValues) => {
        try {
            setLoading(true)
            await updateStore(store.id, values)

            router.refresh()

            toast({
                title: "Store updated",
                description: "Your store details have been updated.",
                className: "bg-green-400",
            })

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            setLoading(false)
        }
    }

    const onConfirmDelete = async () => {
        try {

            setLoading(true)
            const deleteStoreId = await deleteStore(store.id)

            if (!deleteStoreId) {
                toast({
                    variant: "destructive",
                    title: "Store not found",
                    description: "The store you are trying to delete does not exist.",
                })
            } else {
                toast({
                    title: "Store deleted",
                    description: "Your store has been deleted.",
                    className: "bg-green-400",
                })

                router.refresh()
                router.push("/")
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
            <div className="flex items-center justify-between">
                <Heading
                    title={"Store Details"}
                    subtitle={"Edit your store details"}
                />
                <Button
                    size={"icon"}
                    variant={"default"}
                    onClick={() => setOpen(true)}
                >
                    <TrashIcon className="h-4 w-4"/>
                </Button>
            </div>

            <Separator className="my-4"/>


            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                >
                    <div className="grid grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder={"E-Commerce One"} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        disabled={loading}
                        type="submit"
                        variant="default"
                    >Save changes
                    </Button>
                </form>
            </Form>

        </>
    )
}