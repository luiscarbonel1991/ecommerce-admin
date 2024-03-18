"use client";

import {useDropzone} from "react-dropzone";
import {useState} from "react";
import {ImageIcon, Loader2, Trash} from "lucide-react";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";

import {createImage} from "@/lib/actions/image.action";
import Image from "next/image";
import {uploadToS3} from "@/lib/s3";
import {generateS3SignedUrl} from "@/lib/actions/file.action";
import {ImageM} from "@/types";
import {Button} from "@/components/ui/button";
import {AlertModal} from "@/components/modals/alert-modal";

interface ImageUploadProps {
    image: ImageM | null;
    setImage: React.Dispatch<any>;
    onValueChange?: (value: string) => void;
    onDeleteImage?: (imageId: number) => void;
}

const ImageUpload = ({
                         image,
                         setImage,
                         onValueChange,
                         onDeleteImage
                     }: ImageUploadProps) => {

    const [uploading, setUploading] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const {getRootProps, getInputProps} = useDropzone({
        accept: {'image/*': [".png", ".jpg", ".webp", ".jpeg"]},
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: "File too large!",
                    description: "The file is too large. Please upload a file less than 5MB.",
                    variant: "destructive",
                    duration: 5000,
                    className: "bg-red-100 text-red-900",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            }

            try {

                setUploading(true);

                console.log("File", file);

                const fileUrl = await uploadToS3(file, `images`);
                if (!fileUrl) {
                    toast({
                        title: "Something went wrong!",
                        description: "The image failed to upload. Please try again.",
                        variant: "destructive",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    })
                } else {
                    const imageCreated = await createImage(fileUrl, "billboard", file.name);
                    if (!imageCreated) {
                        toast({
                            title: "Something went wrong!",
                            description: "The image failed to upload. Please try again.",
                            variant: "destructive",
                            action: <ToastAction altText="Try again">Try again</ToastAction>,
                        })
                    } else {
                        imageCreated.url = await generateS3SignedUrl(imageCreated.url);
                        onValueChange && onValueChange(imageCreated.url);
                    }

                    setImage(imageCreated);
                    toast({
                        title: "Image uploaded successfully!",
                        description: "The image has been uploaded to the server.",
                        duration: 5000,
                        className: "bg-green-100 text-green-900",
                    })
                }


            } catch (error) {
                console.error("Error uploading image", error);
                toast({
                    title: "Something went wrong!",
                    description: "The image failed to upload. Please try again.",
                    variant: "destructive",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            } finally {
                setUploading(false);
            }
        }
    });

    const onConfirmDelete = async () => {
        setLoading(true);
        image && onDeleteImage && onDeleteImage(image.id);
        setOpen(false);
        setLoading(false);
    }


    return (
        <section className="rounded-xl">
            <AlertModal isOpen={open}
                        onClose={() => setOpen(false)}
                        onConfirm={onConfirmDelete}
                        loading={loading}/>
            {
                image ? (
                        <div className="relative w-full h-96 rounded-xl overflow-hidden">
                            {
                                onDeleteImage && (
                                    <Button
                                        size={"icon"}
                                        type="button"
                                        variant="destructive"
                                        className="absolute top-2 right-2 z-10"
                                        onClick={() => setOpen(true)}
                                    >
                                        <Trash className="w-6 h-6"/>
                                    </Button>
                                )
                            }
                            <Image
                                src={image.url}
                                alt={image.name}
                                fill={true}
                                className="object-cover"
                            />
                        </div>
                    )
                    : (
                        <div
                            {...getRootProps({
                                className:
                                    "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
                            })}
                        >
                            <input {...getInputProps()} />
                            {uploading ? (
                                <>
                                    <Loader2 className="h-10 w-10 animate-spin"/>
                                    <p className="mt-2 text-sm text-slate-400">
                                        Upload in progress...
                                    </p>
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="w-10 h-10"/>
                                    <p className="mt-2 text-sm text-slate-400">Drop Image Here</p>
                                </>
                            )}
                        </div>
                    )
            }

        </section>
    )
}

export default ImageUpload;