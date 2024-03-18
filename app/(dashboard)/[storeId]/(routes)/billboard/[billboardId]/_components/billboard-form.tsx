"use client";


import {Billboard, BillboardFormModel, CreateBillboardParams, ImageM, UpdateBillboardParams} from "@/types";
import Heading from "@/components/heading";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {BillboardFormSchema, BillboardFormValues} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useState} from "react";

import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {useParams, useRouter} from "next/navigation";
import {AlertModal} from "@/components/modals/alert-modal";
import {createBillboard, deleteBillboard, updateBillboard} from "@/lib/actions/billboard";
import ImageUpload from "@/components/image-upload";

interface BillboardFormProps {
    billboard: BillboardFormModel | null
}

export const BillboardForm = ({billboard}: BillboardFormProps) => {

    const router = useRouter()
    const params = useParams();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = billboard ? "Edit Billboard" : "Create Billboard"
    const subtitle = billboard ? "Edit your Billboard details" : "Create a new Billboard"
    const toastTitle = billboard ? "Billboard updated" : "Billboard created"
    const toastDescription = billboard ? "Your Billboard details have been updated." : "Your Billboard has been created."
    const actionText = billboard ? "Save changes" : "Create"

    const [image, setImage] = useState<ImageM | null>(billboard?.image || null)

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(BillboardFormSchema),
        defaultValues: {
            name: billboard?.name || "",
            imageUrl: billboard?.image?.url || "",
        }
    })

    const onDeleteImage = async () => {
            setImage(null)
            router.refresh()
    }

    const onSubmit = async (values: BillboardFormValues) => {

        try {

            setLoading(true)

            if (!image) {
                toast({
                    variant: "destructive",
                    title: "Image not found",
                    description: "Please upload an image for the Billboard.",
                })

                return
            }


            if (billboard) {
                      await updateBillboard(billboard.id, {
                              name: values.name,
                              imageId: image?.id,
                              storeId: billboard.storeId
                          } as UpdateBillboardParams
                      )
            } else {


                const createBillboardParams = {
                    name: values.name,
                    storeId: parseInt(params.storeId as string),
                    imageId: image?.id,
                } as CreateBillboardParams

                await createBillboard(createBillboardParams)
            }

            router.refresh()
            router.push(`/${params.storeId}/billboard`)
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
            const deleted = await deleteBillboard(billboard?.id as number)

            if (!deleted) {
                toast({
                    variant: "destructive",
                    title: "Billboard not found",
                    description: "The Billboard you are trying to delete does not exist.",
                })
            } else {
                router.refresh()
                router.push(`/${params.storeId}/billboard`)
                toast({
                    title: "Billboard deleted",
                    description: "Your Billboard has been deleted.",
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
                    billboard && (
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
                            name="imageUrl"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <ImageUpload
                                            onValueChange={field.onChange}
                                            image={image}
                                            setImage={setImage}
                                            onDeleteImage={onDeleteImage}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}

                        />
                    </div>


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