import { db } from "@/db";
import { bookings, services, customers, providers } from "@/db/schema";
import { eq, sql, desc, and } from "drizzle-orm";

export async function getProviderStats(providerUserId: string) {
    const stats = await db
        .select({
            totalBookings: sql<number>`count(${bookings.id})`,
            totalRevenue: sql<number>`sum(${bookings.amount_paid})`,
            serviceCount: sql<number>`count(distinct ${services.id})`,
        })
        .from(services)
        .leftJoin(bookings, eq(services.id, bookings.serviceId))
        .where(eq(services.userId, providerUserId));

    return {
        totalBookings: stats[0]?.totalBookings || 0,
        totalRevenue: (stats[0]?.totalRevenue || 0) / 100, // Convert cents to dollars
        serviceCount: stats[0]?.serviceCount || 0,
    };
}

export async function getServicesByUser(userId: string) {
    return await db.select().from(services).where(eq(services.userId, userId)).orderBy(services.createdAt);
}

export async function getServiceDetail(serviceId: string, userId: string) {
    const result = await db
        .select()
        .from(services)
        .where(and(eq(services.id, serviceId), eq(services.userId, userId)));

    return result[0] || null;
}

export async function getProviderBookings(providerUserId: string) {
    return await db.query.bookings.findMany({
        where: (bookings, { exists }) =>
            // Only get bookings for services owned by this provider
            exists(
                db
                    .select()
                    .from(services)
                    .where(and(eq(services.id, bookings.serviceId), eq(services.userId, providerUserId)))
            ),
        with: {
            customer: true, // Appends customer info (name, email, image)
            service: {
                columns: {
                    title: true,
                    image: true,
                },
            },
        },
        orderBy: [desc(bookings.scheduledFor)],
    });
}

export async function getProviderBookingDetail(bookingId: string, providerUserId: string) {
    const detail = await db.query.bookings.findFirst({
        where: eq(bookings.id, bookingId),
        with: {
            customer: true,
            service: true,
        },
    });

    // Security check: Ensure the service in this booking belongs to the provider
    if (detail?.service?.userId !== providerUserId) {
        return null;
    }

    return detail;
}

export async function getProviderCustomers(providerUserId: string) {
    const queryResult = await db
        .select({
            id: customers.id,
            fullName: customers.fullName,
            email: customers.email,
            image: customers.image,
            phone: customers.phone,
            totalSessions: sql<number>`count(${bookings.id})`,
            totalSpent: sql<number>`sum(${bookings.amount_paid}) / 100`,
            lastBookingDate: sql<Date>`max(${bookings.scheduledFor})`, // This is the alias
        })
        .from(customers)
        .innerJoin(bookings, eq(customers.id, bookings.customerId))
        .innerJoin(services, eq(bookings.serviceId, services.id))
        .where(eq(services.userId, providerUserId))
        .groupBy(customers.id, customers.fullName, customers.email, customers.image, customers.phone)
        // FIX: Order by the aggregate function again or the alias reference
        .orderBy(desc(sql`max(${bookings.scheduledFor})`));

    return queryResult;
}

export async function getProviderCustomerDetail(customerId: string, providerUserId: string) {
    // 1. Get the customer profile
    const customer = await db.query.customers.findFirst({
        where: eq(customers.id, customerId),
    });

    if (!customer) return null;

    // 2. Get all bookings this customer has made with THIS provider
    const customerBookings = await db.query.bookings.findMany({
        where: (bookings, { exists }) =>
            and(
                eq(bookings.customerId, customerId),
                exists(
                    db
                        .select()
                        .from(services)
                        .where(and(eq(services.id, bookings.serviceId), eq(services.userId, providerUserId)))
                )
            ),
        with: {
            service: {
                columns: {
                    title: true,
                    image: true,
                },
            },
        },
        orderBy: [desc(bookings.scheduledFor)],
    });

    return {
        ...customer,
        bookings: customerBookings,
    };
}
