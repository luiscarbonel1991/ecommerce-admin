"use server";

import {handleError} from "@/lib/utils";
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {color} from "@/lib/db/schema";
import {desc, eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {Color, CreateColorParams, UpdateColorParams} from "@/types";


export const findColors = async (storeId: number) => {
    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const colors = await db.select()
            .from(color)
            .where(eq(color.storeId, storeId))
            .orderBy(desc(color.createdAt))

        return colors as Color[]

    } catch (error) {
        handleError(error)
    }
}

export const findColorById = async (id: number) => {
    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const colors = await db.select()
            .from(color)
            .where(eq(color.id, id))

        return colors.length > 0 ? colors[0] as Color : null

    } catch (error) {
        handleError(error)
    }

}

export const createColor = async (createColorParams: CreateColorParams) => {
    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const created = await db.insert(color)
            .values(createColorParams)
            .returning({id: color.id})

        revalidatePath(`/${createColorParams.storeId}/colors`)

        return created.length > 0 ? created[0].id : null

    } catch (error) {
        handleError(error)
    }
}

export const updateColor = async (id: number, updateColorParams: UpdateColorParams)=> {
    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const updated = await db.update(color)
            .set(updateColorParams)
            .where(eq(color.id, id))
            .returning({id: color.id})

        revalidatePath(`/${updateColorParams.storeId}/colors`)
        return updated.length > 0 ? updated[0].id : null

    } catch (error) {
        handleError(error)
    }
}

export const deleteColor = async (id: number) => {
    try {

        const {userId} = auth()

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const deleted = await db.delete(color)
            .where(eq(color.id, id))
            .returning({id: color.id, storeId: color.storeId})

        revalidatePath(`/${deleted[0].storeId}/colors`)
        return deleted.length > 0 ? deleted[0].id : null

    } catch (error) {
        handleError(error)
    }
}