"use server";


import {handleError} from "@/lib/utils";
import {generateS3SignedUrl} from "@/lib/actions/file.action";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {image} from "@/lib/db/schema";
import {eq} from "drizzle-orm";
import {ImageM, ImageProductType} from "@/types";

export const createImage = async (fileKey: string, product: ImageProductType, name: string) => {

    const { userId } = auth()

    if(!userId) {
        throw new Error("Unauthorized");
    }

    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("User not found");
        }

        if (!fileKey) {
            throw new Error("File not uploaded");
        }

        const createdImage = await db.insert(image)
            .values({
                name,
                url: fileKey,
                productType: product,
            }).returning({
                id: image.id,
                name: image.name,
                url: image.url,
                productType: image.productType,
                createdAt: image.createdAt,
                updatedAt: image.updatedAt,
            })

        return createdImage[0] as ImageM

    } catch (error) {
        handleError(error)
    }
}

export const findImageById = async (id: number) => {

    const {userId} = auth()

    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const imageFound = await db.select()
            .from(image)
            .where(eq(image.id, id))


        return imageFound.length === 0 ? null : {
            id: imageFound[0].id,
            name: imageFound[0].name,
            url: await generateS3SignedUrl(imageFound[0].url),
            productType: imageFound[0].productType,
            createdAt: imageFound[0].createdAt,
            updatedAt: imageFound[0].updatedAt,
        } as ImageM
    } catch (error) {
        handleError(error)
    }
}

