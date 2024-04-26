"use server";

import {handleError} from "@/lib/utils";
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {size} from "@/lib/db/schema";
import {desc, eq} from "drizzle-orm";
import {CreateSizeParams, Size, UpdateSizeParams} from "@/types";


export const findSizes = async (storeId: number) => {
    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const sizes = await db.select()
            .from(size)
            .where(eq(size.storeId, storeId))
            .orderBy(desc(size.createdAt))

        return sizes as Size[]

    } catch (error) {
        handleError(error)
    }
}

export const findSizeById = async (id: number) => {
    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const sizes = await db.select()
            .from(size)
            .where(eq(size.id, id))

        return sizes.length > 0 ? sizes[0] as Size : null

    } catch (error) {
        handleError(error)
    }

}

export const createSize = async (createSizeParams: CreateSizeParams) => {
    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const created = await db.insert(size)
            .values(createSizeParams)
            .returning({id: size.id})

        return created.length > 0 ? created[0].id : null

    } catch (error) {
        handleError(error)
    }
}

export const updateSize = async (id: number, updateSizeParams: UpdateSizeParams)=> {
    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const updated = await db.update(size)
            .set(updateSizeParams)
            .where(eq(size.id, id))
            .returning({id: size.id})

        return updated.length > 0 ? updated[0].id : null

    } catch (error) {
        handleError(error)
    }
}

export const deleteSize = async (id: number) => {
    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const deleted = await db.delete(size)
            .where(eq(size.id, id))
            .returning({id: size.id})

        return deleted.length > 0 ? deleted[0].id : null

    } catch (error) {
        handleError(error)
    }
}