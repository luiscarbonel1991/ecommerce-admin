"use server";


import {handleError} from "@/lib/utils";
import {db} from "@/lib/db";
import {billboard, category, store} from "@/lib/db/schema";
import {desc, eq} from "drizzle-orm";
import {Category, CreateUpdateCategoryParams} from "@/types";
import {findStore} from "@/lib/actions/store";
import {findBillboard} from "@/lib/actions/billboard";
import {revalidatePath} from "next/cache";

export const findCategories = async (storeId: number) => {
    try {
        const result = await db.select({
            id: category.id,
            name: category.name,
            storeId: category.storeId,
            createdAt: category.createdAt,
            billboard: {
                id: billboard.id,
                name: billboard.name,
            }
        }).from(category)
            .innerJoin(store, eq(store.id, category.storeId))
            .innerJoin(billboard, eq(billboard.id, category.billboardId)).orderBy(desc(category.createdAt))
            .where(eq(category.storeId, storeId))
        return result as Category[]

    } catch (error) {
        handleError(error)
    }
}

export const findCategory = async (id: number) => {
    try {
        const categoryFound = await db.select({
            id: category.id,
            name: category.name,
            storeId: category.storeId,
            createdAt: category.createdAt,
            billboard: {
                id: billboard.id,
                name: billboard.name,
            }
        }).from(category)
            .innerJoin(store, eq(store.id, category.storeId))
            .innerJoin(billboard, eq(billboard.id, category.billboardId))
            .where(eq(category.id, id))

        return categoryFound.length === 0 ? null : categoryFound[0] as Category
    } catch (error) {
        handleError(error)
    }

}

export const createCategory = async (createCategoryParams: CreateUpdateCategoryParams) => {
    try {

        const storeFound = await findStore(createCategoryParams.storeId)

        if (!storeFound) {
            throw new Error("Store not found")
        }

        const billboardFound = await findBillboard(createCategoryParams.billboardId)

        if (!billboardFound) {
            throw new Error("Billboard not found")
        }

        const categoryCreated = await db.insert(category)
            .values({
                name: createCategoryParams.name,
                storeId: createCategoryParams.storeId,
                billboardId: createCategoryParams.billboardId
            }).returning({id: category.id})

        return categoryCreated.length === 0 ? null : categoryCreated[0].id
    } catch (error) {
        handleError(error)
    }
}

export const updateCategory = async (id: number, updateCategoryParams: CreateUpdateCategoryParams) => {
    try {
        const storeFound = await findStore(updateCategoryParams.storeId)

        if (!storeFound) {
            throw new Error("Store not found")
        }

        const billboardFound = await findBillboard(updateCategoryParams.billboardId)

        if (!billboardFound) {
            throw new Error("Billboard not found")
        }

        const categoryUpdated = await db.update(category)
            .set({
                name: updateCategoryParams.name,
                billboardId: updateCategoryParams.billboardId,
                storeId: updateCategoryParams.storeId,
                updatedAt: new Date()
            }).where(eq(category.id, id)).returning({
                id: category.id
            })

        revalidatePath(`${updateCategoryParams.storeId}/category`)
        return categoryUpdated.length === 0 ? null : categoryUpdated[0].id
    } catch (error) {
        handleError(error)
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const categoryDeleted = await db.delete(category).where(eq(category.id, id)).returning({
            id: category.id
        })

        return categoryDeleted.length === 0 ? null : categoryDeleted[0].id
    } catch (error) {
        handleError(error)
    }
}