"use client";


import {ColorFormModel, CreateColorParams, UpdateColorParams} from "@/types";
import Heading from "@/components/heading";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {ColorFormSchema, ColorFormValues} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useState} from "react";

import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {useParams, useRouter} from "next/navigation";
import {AlertModal} from "@/components/modals/alert-modal";
import {createColor, deleteColor, updateColor} from "@/lib/actions/color.action";

interface ColorFormProps {
    color: ColorFormModel | null
}

export const ColorForm = ({color}: ColorFormProps) => {

    const router = useRouter()
    const params = useParams();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = color ? "Edit Color" : "Create Color"
    const subtitle = color ? "Edit your Color details" : "Create a new Color"
    const toastTitle = color ? "Color updated" : "Color created"
    const toastDescription = color ? "Your Color details have been updated." : "Your Color has been created."
    const actionText = color ? "Save changes" : "Create"

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(ColorFormSchema),
        defaultValues: {
            name: color?.name || "",
            value: color?.value || "",
        }
    })

    const onSubmit = async (values: ColorFormValues) => {

        try {

            setLoading(true)


            if (color) {
                      await updateColor(color.id, {
                              name: values.name,
                              value: values.value,
                              storeId: parseInt(params.storeId as string),
                          } as UpdateColorParams
                      )
            } else {


                const createColorParams = {
                    name: values.name,
                    value: values.value,
                    storeId: parseInt(params.storeId as string),
                } as CreateColorParams

                await createColor(createColorParams)
            }

            router.push(`/${params.storeId}/colors`)
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
            const deleted = await deleteColor(color?.id as number)

            if (!deleted) {
                toast({
                    variant: "destructive",
                    title: "Color not found",
                    description: "The Color you are trying to delete does not exist.",
                })
            } else {
                router.refresh()
                router.push(`/${params.storeId}/colors`)
                toast({
                    title: "Color deleted",
                    description: "Your Color has been deleted.",
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
                    color && (
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
                                            placeholder={"Color name"} {...field} />
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
                                       <div className="flex items-center gap-x-4">
                                           <Input
                                               disabled={loading}
                                               placeholder={"Color value"} {...field} />
                                           <div
                                               className="border p-4 rounded-full"
                                               style={{ backgroundColor: field.value }}
                                               />
                                       </div>
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