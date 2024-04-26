import {integer, pgEnum, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";

export const imageStatusType = pgEnum("image_status", ["pending", "active", "deleted"])
export const productType = pgEnum("product_type", ["billboard", "user", "unknown"])
export const image = pgTable("image", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    url: varchar("url").notNull(),
    productType: productType("product_type").notNull().default("unknown"),
    status: imageStatusType("status").notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at"),
})

export const store = pgTable("store", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    userId: varchar("user_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
})

export const billboard = pgTable("billboard", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    imageUrl: varchar("image_url"),
    publicId: varchar("public_id"),
    storeId: integer("store_id").notNull().references(() => store.id, {
       onDelete: "cascade"
    }),
    imageId: integer("image_id").references(() => image.id, {
        onDelete: "set null"
    }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
})


export const category = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    billboardId: integer("billboard_id").notNull().references(() => billboard.id, {
        onDelete: "cascade"
    }),
    storeId: integer("store_id").notNull().references(() => store.id, {
        onDelete: "cascade"
    }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
})

export const size = pgTable("size", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    value: varchar("value").notNull(),
    storeId: integer("store_id").notNull().references(() => store.id, {
        onDelete: "cascade"
    }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
})
