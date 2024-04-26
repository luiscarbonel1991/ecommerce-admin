"use client";


import {Billboard, Category} from "@/types";
import Heading from "@/components/heading";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {CategoryFormSchema, CategoryFormValues} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useState} from "react";

import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {useParams, useRouter} from "next/navigation";
import {AlertModal} from "@/components/modals/alert-modal";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {createCategory, deleteCategory, updateCategory} from "@/lib/actions/category.action";

interface CategoryFormProps {
    category: Category | null,
    billboards: Billboard[]
}

export const CategoryForm = ({category, billboards}: CategoryFormProps) => {

    const router = useRouter()
    const params = useParams();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = category ? "Edit Category" : "Create Category"
    const subtitle = category ? "Edit your Category details" : "Create a new Category"
    const toastTitle = category ? "Category updated" : "Category created"
    const toastDescription = category ? "Your Category details have been updated." : "Your Category has been created."
    const actionText = category ? "Save changes" : "Create"

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(CategoryFormSchema),
        defaultValues: {
            name: category?.name || "",
            billboardId: `${category?.billboard.id}` || '',
        }
    })


    const onSubmit = async (values: CategoryFormValues) => {

        try {

            setLoading(true)


            if (category) {
                await updateCategory(category.id, {
                    name: values.name,
                    billboardId: parseInt(values.billboardId),
                    storeId: Number(params.storeId)
                })
            } else {
                const createCategoryParams = {
                    name: values.name,
                    billboardId: parseInt(values.billboardId),
                    storeId: Number(params.storeId)
                }

                await createCategory(createCategoryParams)
            }

            router.refresh()
            router.push(`/${params.storeId}/category`)
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
            const deleted = await deleteCategory(category?.id as number)

            if (!deleted) {
                toast({
                    variant: "destructive",
                    title: "Category not found",
                    description: "The Category you are trying to delete does not exist.",
                })
                return
            }

            router.refresh()
            router.push(`/${params.storeId}/category`)
            toast({
                title: "Category deleted",
                description: "Your Category has been deleted.",
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
                    category && (
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
                                            placeholder={"Category One"} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a billboard"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                billboards?.map(b => (
                                                    <SelectItem
                                                        key={b.id}
                                                        value={`${b.id}`}>
                                                        {b.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>

                                    </Select>
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