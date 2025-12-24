import { pgTable, text, integer, timestamp, boolean, uuid, varchar, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const providers = pgTable("providers", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull().unique(), // Clerk User ID for the Provider
    email: varchar("email", { length: 255 }).notNull(),
    fullName: text("full_name").notNull(),
    bio: text("bio"), // Professional summary for their profile
    image: text("image"), // Profile/Business photo
    phone: varchar("phone", { length: 20 }),

    // Business Details
    businessName: text("business_name"),
    website: text("website"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const customers = pgTable("customers", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull().unique(), // Clerk User ID
    email: varchar("email", { length: 255 }).notNull(),
    fullName: text("full_name").notNull(),
    image: text("image"),
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
    currency: varchar("currency", { length: 10 }).default("USD"),
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

// 1. Customers can have many bookings
export const customerRelations = relations(customers, ({ many }) => ({
    bookings: many(bookings),
}));

// 2. Providers can own many services
export const providerRelations = relations(providers, ({ many }) => ({
    services: many(services),
}));

// 3. Services belong to one Provider and can have many Bookings
export const serviceRelations = relations(services, ({ one, many }) => ({
    provider: one(providers, {
        fields: [services.userId],
        references: [providers.userId],
    }),
    bookings: many(bookings),
}));

// 4. Bookings link one Service and one Customer
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
