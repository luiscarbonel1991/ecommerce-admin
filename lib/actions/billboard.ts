"use server";


import {db} from "@/lib/db";
import {billboard, image} from "@/lib/db/schema";
import {desc, eq} from "drizzle-orm";
import {handleError} from "@/lib/utils";
import {Billboard, CreateBillboardParams, UpdateBillboardParams} from "@/types";
import {auth} from "@clerk/nextjs";

export const findBillboard = async (id: number) => {

    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }
        const billboardFound = await db.select()
            .from(billboard)
            .where(eq(billboard.id, id))

        return billboardFound.length === 0 ? null : billboardFound[0] as Billboard
    } catch (error) {
        handleError(error)
    }
}

export const createBillboard = async (createBillboardParams: CreateBillboardParams) => {

    try {
        if(createBillboardParams.imageId) {
            await db.update(image)
                .set({
                    status: "active"
                }).where(
                    eq(image.id, createBillboardParams.imageId)
                ).returning()
        }

        const billboardCreated = await db.insert(billboard)
            .values({
                name: createBillboardParams.name,
                storeId: createBillboardParams.storeId,
                imageId: createBillboardParams.imageId
            })
            .returning({id: billboard.id})


        return billboardCreated.length === 0 ? null : billboardCreated[0].id
    } catch (error) {
        handleError(error)
    }
}

export const updateBillboard = async (id: number, updateBillboardParams: UpdateBillboardParams) => {

    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const billboardFound = await findBillboard(id)

        if (!billboardFound) {
            throw new Error("Billboard not found")
        }

        if (billboardFound.imageId && billboardFound.imageId !== updateBillboardParams.imageId) {
            await db.update(image)
                .set({
                    status: "deleted"
                }).where(
                    eq(image.id, billboardFound.imageId)
                ).returning()
        }

        const billboardUpdated = await db.update(billboard)
            .set({
                name: updateBillboardParams.name,
                imageId: updateBillboardParams.imageId
            })
            .where(eq(billboard.id, id))
            .returning({id: billboard.id, imageId: billboard.imageId})

        if (billboardUpdated.length > 0 && billboardUpdated[0].imageId) {
            await db.update(image)
                .set({
                    status: "active"
                }).where(
                    eq(image.id, billboardUpdated[0].imageId)
                ).returning()
        }

        return billboardUpdated.length === 0 ? null : billboardUpdated[0].id
    } catch (error) {
        handleError(error)
    }
}

export const deleteBillboard = async (id: number) => {

    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const billboardFound = await findBillboard(id)

        if (!billboardFound) {
            throw new Error("Billboard not found")
        }

        if (billboardFound.imageId) {
            await db.update(image)
                .set({
                    status: "deleted"
                }).where(
                    eq(image.id, billboardFound.imageId)
                ).returning()
        }

        const billboardDeleted = await db.delete(billboard)
            .where(eq(billboard.id, id))
            .returning({id: billboard.id})

        return billboardDeleted.length === 0 ? null : billboardDeleted[0].id
    } catch (error) {
        handleError(error)
    }
}

export const findBillboards = async (storeId: number) => {

    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const billboardsFound = await db.select()
            .from(billboard)
            .where(eq(billboard.storeId, storeId))
            .orderBy(desc(billboard.createdAt))

        return billboardsFound as Billboard[]
    } catch (error) {
        handleError(error)
    }
}