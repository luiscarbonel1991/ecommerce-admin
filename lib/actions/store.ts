"use server";


import {CreateStoreParams} from "@/types";
import {auth} from "@clerk/nextjs";
import {handleError} from "@/lib/utils";
import {db} from "@/lib/db";
import {store} from "@/lib/db/schema";
import {and, eq} from "drizzle-orm";

export const createStore = async (createStore: CreateStoreParams) => {
    try {
        const { userId } = auth()

        if(!userId) {
            throw new Error("Unauthorized");
        }

        const storeCreated = await db.insert(store).values({
            userId: userId,
            ...createStore
        }).returning({
            id: store.id
        })

        return storeCreated[0].id

    } catch (error) {
        handleError(error)
    }
}

export const findStore = async (storeId: number) => {
    try {
        const { userId } = auth()

        if(!userId) {
            throw new Error("Unauthorized");
        }

        const storeFound = await db.select()
            .from(store)
            .where(
                and(
                    eq(store.id, storeId),
                    eq(store.userId, userId)
                )
            ).limit(1)

        return storeFound.length === 0 ? null : storeFound[0]

    } catch (error) {
        handleError(error)
    }
}

export const findStoresByUser = async () => {
    try {
        const { userId } = auth()

        if(!userId) {
            throw new Error("Unauthorized");
        }

        const storeFound = await db.select()
            .from(store)
            .where(
                and(
                    eq(store.userId, userId)
                )
            )

        return storeFound.length === 0 ? null : storeFound

    } catch (error) {
        handleError(error)
    }
}

export const updateStore = async (storeId: number, updateStore: CreateStoreParams) => {
    try {
        const { userId } = auth()

        if(!userId) {
            throw new Error("Unauthorized");
        }

        if(!updateStore.name){
            throw new Error("Name is required");
        }

        const storeFound = await db.select()
            .from(store)
            .where(
                and(
                    eq(store.userId, userId),
                    eq(store.id, storeId)
                )
            )

        if(storeFound.length === 0) {
            throw new Error("Unauthorized");
        }

        const storeUpdated = await db.update(store)
            .set({
                name: updateStore.name,
                updatedAt: new Date()
            }).where(eq(store.id, storeFound[0].id)).returning({
                id: store.id,
                name: store.name
            })

        return storeUpdated

    } catch (error) {
        handleError(error)
    }
}

export const deleteStore = async (storeId: number) => {
    try {
        const { userId } = auth()

        if(!userId) {
            throw new Error("Unauthorized");
        }

        const deleteStore = await db.delete(store)
            .where(
                and(
                    eq(store.userId, userId),
                    eq(store.id, storeId)
                )
            ).returning({
                id: store.id
            })

        return deleteStore.length === 0 ? null : deleteStore[0].id

    } catch (error) {
        handleError(error)
    }
}
