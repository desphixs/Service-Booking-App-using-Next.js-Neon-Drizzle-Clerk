import { pgTable, text, integer, timestamp, boolean, uuid, varchar, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const customers = pgTable("customers", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull().unique(), // Clerk User ID
    email: varchar("email", { length: 255 }).notNull(),
    fullName: text("full_name").notNull(),
    phone: varchar("phone", { length: 20 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Services Table ---
export const services = pgTable("services", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(), // Owner/Provider ID
    image: text("image"),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    category: varchar("category", { length: 100 }),
    included: jsonb("included").$type<string[]>(), // Array of perks
    timeSlots: jsonb("time_slots").$type<string[]>(), // Available times
    price: integer("price").notNull(), // stored in cents
    currency: varchar("currency", { length: 10 }).default("NGN"),
    durationMinutes: integer("duration_minutes").default(60),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Bookings Table ---
export const bookings = pgTable("bookings", {
    id: text("id").primaryKey(),
    serviceId: uuid("service_id").references(() => services.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").references(() => customers.id),
    serviceTitle: text("service_title").notNull(),
    scheduledFor: timestamp("scheduled_for").notNull(),
    amount_paid: integer("amount"),
    stripeCheckoutSessionId: text("stripe_checkout_session_id"),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    timezone: text("timezone").default("Africa/Lagos"),
    status: varchar("status", { length: 20 }).default("pending"), // paid, failed, pending
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Relationships ---
export const customerRelations = relations(customers, ({ many }) => ({
    bookings: many(bookings),
}));

export const bookingRelations = relations(bookings, ({ one }) => ({
    service: one(services, {
        fields: [bookings.serviceId],
        references: [services.id],
    }),
    customer: one(customers, {
        fields: [bookings.customerId],
        references: [customers.id],
    }),
}));
