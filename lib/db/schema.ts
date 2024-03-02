import {pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";

export const store = pgTable("store", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    userId: varchar("user_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
})