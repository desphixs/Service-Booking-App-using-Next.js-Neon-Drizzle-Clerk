import { db } from "./index";
import { services, bookings, customers } from "./schema";
import { eq, and, desc, sql } from "drizzle-orm";

export async function getActiveServices() {
    try {
        const data = await db.query.services.findMany({
            where: eq(services.isActive, true),
            orderBy: (services, { desc }) => [desc(services.createdAt)],
        });
        return data;
    } catch (error) {
        console.error("Failed to fetch active services:", error);
        return [];
    }
}

export async function getActiveServiceBySlug(slug: string) {
    try {
        const data = await db.query.services.findFirst({
            where: and(eq(services.slug, slug), eq(services.isActive, true)),
        });
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUserBookings(clerkUserId: string) {
    // 1. Get the customer record linked to this Clerk ID
    const customer = await db.query.customers.findFirst({
        where: eq(customers.userId, clerkUserId),
    });

    if (!customer) return [];

    // 2. Fetch bookings with related service details
    return await db.query.bookings.findMany({
        where: eq(bookings.customerId, customer.id),
        with: {
            service: {
                columns: {
                    image: true,
                    description: true,
                },
            },
        },
        orderBy: [desc(bookings.createdAt)],
    });
}

export async function getUserStats(clerkUserId: string) {
    const customer = await db.query.customers.findFirst({
        where: eq(customers.userId, clerkUserId),
    });

    if (!customer) return { totalBookings: 0, totalSpent: 0 };

    // 2. Aggregate stats directly in the database for better performance
    const stats = await db
        .select({
            count: sql<number>`count(${bookings.id})`,
            totalAmount: sql<number>`sum(${bookings.amount_paid})`,
        })
        .from(bookings)
        .where(eq(bookings.customerId, customer.id));

    return {
        totalBookings: stats[0]?.count || 0,
        totalSpent: (stats[0]?.totalAmount || 0) / 100, // Convert cents to dollars
    };
}
