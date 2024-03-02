"use client";

import Modal from "@/components/ui/modal";
import {useStoreModal} from "@/hooks/use-store-modal";
import {useForm} from "react-hook-form";
import {StoreModalFormValues, StoreModalSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {createStore} from "@/lib/actions/store";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";

export const StoreModal = () => {

    const storeModal = useStoreModal()
    const [loading, setLoading] = useState(false)

    const form = useForm<StoreModalFormValues>({
        resolver: zodResolver(StoreModalSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: StoreModalFormValues) => {
        try {
            setLoading(true)
            const storeId = await createStore(values)
            window.location.assign(`/${storeId}`)
        } catch (error) {
            setLoading(false)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    return (
        <Modal
            title={"Create store"}
            description={"Add a new store to manage products and categories"}
            isOpen={storeModal.open}
            onClose={storeModal.onClose}>
            <div className="space-y-4 py-2 p-4">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-4"
                    >
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

                        <div className="flex items-center justify-end space-x-2">
                            <Button
                                disabled={loading}
                                onClick={storeModal.onClose}
                                variant="outline">Cancel</Button>
                            <Button
                                disabled={loading}
                                type="submit"
                                variant="default"
                            >Create
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}