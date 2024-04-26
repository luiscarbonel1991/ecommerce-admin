"use client";


import {CreateSizeParams, ImageM, SizeFormModel, UpdateSizeParams} from "@/types";
import Heading from "@/components/heading";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {SizeFormSchema, SizeFormValues} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useState} from "react";

import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {useParams, useRouter} from "next/navigation";
import {AlertModal} from "@/components/modals/alert-modal";
import {createSize, deleteSize, updateSize} from "@/lib/actions/size.action";

interface SizeFormProps {
    size: SizeFormModel | null
}

export const SizeForm = ({size}: SizeFormProps) => {

    const router = useRouter()
    const params = useParams();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = size ? "Edit Size" : "Create Size"
    const subtitle = size ? "Edit your Size details" : "Create a new Size"
    const toastTitle = size ? "Size updated" : "Size created"
    const toastDescription = size ? "Your Size details have been updated." : "Your Size has been created."
    const actionText = size ? "Save changes" : "Create"

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(SizeFormSchema),
        defaultValues: {
            name: size?.name || "",
            value: size?.value || "",
        }
    })

    const onSubmit = async (values: SizeFormValues) => {

        try {

            setLoading(true)


            if (size) {
                      await updateSize(size.id, {
                              name: values.name,
                              value: values.value,
                          } as UpdateSizeParams
                      )
            } else {


                const createSizeParams = {
                    name: values.name,
                    value: values.value,
                    storeId: parseInt(params.storeId as string),
                } as CreateSizeParams

                await createSize(createSizeParams)
            }

            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast({
                title: toastTitle,
                description: toastDescription,
                className: "bg-green-400",
                duration: 5000,
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
            const deleted = await deleteSize(size?.id as number)

            if (!deleted) {
                toast({
                    variant: "destructive",
                    title: "Size not found",
                    description: "The Size you are trying to delete does not exist.",
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
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    subtitle={subtitle}
                />


                {
                    size && (
                        <Button
                            size={"icon"}
                            variant={"default"}
                            onClick={() => setOpen(true)}
                        >
                            <TrashIcon className="h-4 w-4"/>
                        </Button>
                    )
                }
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
                                            placeholder={"Billboard Collection One"} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="value"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder={"Value Collection One"} {...field} />
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
                    >
                        {actionText}
                    </Button>
                </form>
            </Form>

        </>
    )
}