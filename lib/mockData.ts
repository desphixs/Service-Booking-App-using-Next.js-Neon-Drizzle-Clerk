// mockData.ts
// Simple mock data for: services, customers, bookings (with nested payment)
// Uses snake_case to match your schema. You can map to camelCase in UI if needed.

export type Service = {
    id: string;
    image?: string | null;
    title: string;
    slug: string;
    description: string;
    category: string | null;
    included?: string[];
    timeSlots?: string[];
    price: number;
    currency: "NGN" | "USD";
    duration_minutes: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type Customer = {
    id: string;
    user_id: string; // Clerk user id
    email: string | null;
    full_name: string | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
};

export type Payment = {
    id: string;
    booking_id: string;
    user_id: string; // Clerk user id
    amount_cents: number;
    currency: "NGN" | "USD";
    provider: "stripe";
    status: "unpaid" | "pending" | "paid" | "failed" | "refunded" | "partially_refunded";
    stripe_checkout_session_id: string | null;
    stripe_payment_intent_id: string | null;
    paid_at: string | null;
    receipt_url: string | null;
    created_at: string;
    updated_at: string;
};

export type BookingStatus = "pending" | "requires_payment" | "paid" | "confirmed" | "cancelled" | "completed" | "failed" | "refunded";

export type Booking = {
    id: string;
    service_id: string;
    user_id: string; // Clerk user id
    customer_name: string | null;
    customer_email: string | null;
    scheduled_for: string; // ISO timestamp
    timezone: string | null;
    status: BookingStatus;
    notes: string | null;
    created_at: string;
    updated_at: string;

    // Nested for convenience in UI
    payment: Payment;
};

// ---- Helpers (tiny) ----
const now = (iso: string) => iso;

// ---- Customers (6) ----
export const customers: Customer[] = [
    {
        id: "2e0a5c4d-6a0c-4c7a-9cf1-0f5d52b3d2b1",
        user_id: "user_clerk_001",
        email: "ada.okafor@example.com",
        full_name: "Ada Okafor",
        phone: "+2348012345678",
        created_at: now("2025-11-10T10:20:00Z"),
        updated_at: now("2025-12-18T09:05:00Z"),
    },
    {
        id: "0a9d1a77-8d4e-4c38-9a7f-1f8ce2c2bfa2",
        user_id: "user_clerk_002",
        email: "tunde.balogun@example.com",
        full_name: "Tunde Balogun",
        phone: "+2348033332211",
        created_at: now("2025-11-14T13:10:00Z"),
        updated_at: now("2025-12-20T15:40:00Z"),
    },
    {
        id: "c86b9c31-8aa9-4db7-9d69-1c1e94c3a9e1",
        user_id: "user_clerk_003", // clerk user id
        email: "zainab.ibrahim@example.com",
        full_name: "Zainab Ibrahim",
        phone: "+2348090102030",
        created_at: now("2025-11-20T08:30:00Z"),
        updated_at: now("2025-12-19T18:00:00Z"),
    },
    {
        id: "b4a6f17d-4e3c-4f6a-bf42-86c6dbb8e2d0",
        user_id: "user_clerk_004",
        email: "chidi.nwosu@example.com",
        full_name: "Chidi Nwosu",
        phone: "+2348129988776",
        created_at: now("2025-11-28T11:00:00Z"),
        updated_at: now("2025-12-21T12:15:00Z"),
    },
    {
        id: "53b5b8c8-ff1c-4bf2-9cdb-3342f7d02a55",
        user_id: "user_clerk_005",
        email: "kemi.adesina@example.com",
        full_name: "Kemi Adesina",
        phone: "+2348077654321",
        created_at: now("2025-12-02T16:45:00Z"),
        updated_at: now("2025-12-21T17:25:00Z"),
    },
    {
        id: "f2e8cc0a-7df6-4b2e-bdbb-74c2bff2c60d",
        user_id: "user_clerk_006",
        email: "ibrahim.sani@example.com",
        full_name: "Ibrahim Sani",
        phone: "+2348101122334",
        created_at: now("2025-12-05T09:15:00Z"),
        updated_at: now("2025-12-22T09:00:00Z"),
    },
];

// ---- Services (10) ----
export const services: Service[] = [
    {
        user_id: "23442354", // clerk user id
        id: "0d6f0b4c-0b4b-4a7d-8c2b-2b2c16d2a0a1", 
        image: "https://lollypop.design/wp-content/uploads/2024/07/UX-Audit-A-Stepping-Stone-to-Boost-Sales.webp",
        title: "Website UI Audit",
        slug: "website-ui-audit",
        description: "A full UI/UX review with actionable fixes and a prioritized checklist.",
        category: "Design",
        included: ["Detailed PDF Report", "Accessibility Check", "Conversion Optimization", "Color Palette Review", "Typography Audit", "1-on-1 Strategy Call"],
        timeSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"],
        price: 2500000,
        currency: "NGN",
        duration_minutes: 60,
        is_active: true,
        created_at: now("2025-10-01T12:00:00Z"),
        updated_at: now("2025-12-15T10:00:00Z"),
    },
    {
        id: "c1c6a9f8-04cf-4f6d-a2d1-6a75a0f1b0a2",
        image: "https://cdn.dribbble.com/userupload/28031905/file/original-228bb6a02ccb95019f025c312ca72539.png",
        title: "Landing Page Build",
        slug: "landing-page-build",
        description: "Design + build a modern landing page (React + Tailwind), optimized for conversions.",
        category: "Development",
        price: 8500000,
        currency: "NGN",
        duration_minutes: 90,
        is_active: true,
        created_at: now("2025-10-03T12:00:00Z"),
        updated_at: now("2025-12-10T10:00:00Z"),
    },
    {
        id: "9b0d1e2a-9f7c-4a1a-b0c2-cc13d0f3a0a3",
        image: "https://miro.medium.com/0*LBkGUXK9yfofLIyl.png",
        title: "API Troubleshooting Call",
        slug: "api-troubleshooting-call",
        description: "Debug your backend/API issues live and ship a fix plan.",
        category: "Backend",
        price: 3000000,
        currency: "NGN",
        duration_minutes: 45,
        is_active: true,
        created_at: now("2025-10-05T12:00:00Z"),
        updated_at: now("2025-12-19T10:00:00Z"),
    },
    {
        id: "6b3f2a18-55fd-47f6-9df1-3f3ef0b4a0a4",
        title: "React Performance Tune-up",
        slug: "react-performance-tuneup",
        description: "Fix slow renders, reduce bundle size, and improve lighthouse scores.",
        category: "Frontend",
        price: 4500000,
        currency: "NGN",
        duration_minutes: 60,
        is_active: true,
        created_at: now("2025-10-08T12:00:00Z"),
        updated_at: now("2025-12-12T10:00:00Z"),
    },
    {
        id: "ab87f8d9-1b22-4b1e-88f3-4c91c0c5a0a5",
        title: "SaaS Roadmap Session",
        slug: "saas-roadmap-session",
        description: "Clarify your MVP, scope the features, and define a 2-week build plan.",
        category: "Strategy",
        price: 4000000,
        currency: "NGN",
        duration_minutes: 60,
        is_active: true,
        created_at: now("2025-10-12T12:00:00Z"),
        updated_at: now("2025-12-20T10:00:00Z"),
    },
    {
        id: "3e3b6b63-6f55-4e66-bb0c-5f1d7d6a0a6",
        title: "Brand + Visual Direction",
        slug: "brand-visual-direction",
        description: "Define colors, typography, UI style, and component direction for your product.",
        category: "Design",
        price: 6000000,
        currency: "NGN",
        duration_minutes: 90,
        is_active: true,
        created_at: now("2025-10-15T12:00:00Z"),
        updated_at: now("2025-12-18T10:00:00Z"),
    },
    {
        id: "5dfd6a0a-0d10-4f8a-9e2f-2e1a0c7a0a7",
        title: "Database Schema Review",
        slug: "database-schema-review",
        description: "Review your tables, constraints, indexes, and query patterns for scale.",
        category: "Backend",
        price: 3500000,
        currency: "NGN",
        duration_minutes: 60,
        is_active: true,
        created_at: now("2025-10-18T12:00:00Z"),
        updated_at: now("2025-12-09T10:00:00Z"),
    },
    {
        id: "7a0b2c1d-2e3f-4a5b-8c6d-9e0f1a2b0a8",
        title: "Clerk Auth Integration",
        slug: "clerk-auth-integration",
        description: "Integrate Clerk auth properly with your backend + protected routes.",
        category: "Development",
        price: 5000000,
        currency: "NGN",
        duration_minutes: 60,
        is_active: true,
        created_at: now("2025-10-20T12:00:00Z"),
        updated_at: now("2025-12-21T10:00:00Z"),
    },
    {
        id: "1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b0a9",
        title: "Bug Fix Sprint (2 hours)",
        slug: "bug-fix-sprint",
        description: "Rapid fixes across UI + API. You bring the list, we clear it.",
        category: "Support",
        price: 9000000,
        currency: "NGN",
        duration_minutes: 120,
        is_active: true,
        created_at: now("2025-10-22T12:00:00Z"),
        updated_at: now("2025-12-22T10:00:00Z"),
    },
    {
        id: "9f9e8d7c-6b5a-4c3d-2e1f-0a9b8c7d0aa0",
        title: "Content Strategy Session",
        slug: "content-strategy-session",
        description: "Plan weekly content ideas + scripts tailored to dev audience & your offers.",
        category: "Strategy",
        price: 2000000,
        currency: "NGN",
        duration_minutes: 45,
        is_active: false, // one inactive example
        created_at: now("2025-10-25T12:00:00Z"),
        updated_at: now("2025-12-01T10:00:00Z"),
    },
];

// ---- Bookings (12) with nested Payment (12) ----
export const bookings: Booking[] = [
    {
        id: "bkg_01f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a01",
        service_id: "1213",
        service_image: "https://lollypop.design/wp-content/uploads/2024/07/UX-Audit-A-Stepping-Stone-to-Boost-Sales.webp",
        service_title: "Website UI Audit",
        user_id: "3",
        customer_name: "Destiny Franks",
        customer_email: "desphixs@gmail.com",
        scheduled_for: "2025-12-26T14:00:00Z",
        timezone: "Africa/Lagos",
        status: "paid", // paid, failed or pending
        notes: "Focus on homepage and pricing section.",
        created_at: "2025-12-20T09:00:00Z",
        updated_at: "2025-12-20T10:00:00Z",
        payment: {
            id: "pay_01a11111-1111-4111-8111-111111111111",
            booking_id: "bkg_01f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a01",
            user_id: "3",
            amount_cents: 2389078,
            currency: "USD",
            provider: "stripe",
            status: "paid",
            stripe_checkout_session_id: "cs_test_ui_audit_001",
            stripe_payment_intent_id: "pi_test_ui_audit_001",
            paid_at: "2025-12-20T09:03:00Z",
            receipt_url: "https://example.com/receipts/ui-audit-001",
            created_at: "2025-12-20T09:01:00Z",
            updated_at: "2025-12-20T09:03:10Z",
        },
    },
    {
        id: "bkg_02f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a02",
        service_id: services[1].id,
        user_id: customers[1].user_id,
        customer_name: customers[1].full_name,
        customer_email: customers[1].email,
        scheduled_for: "2025-12-28T10:00:00Z",
        timezone: "Africa/Lagos",
        status: "paid",
        notes: "Needs hero section + testimonials.",
        created_at: "2025-12-18T12:30:00Z",
        updated_at: "2025-12-18T12:40:00Z",
        payment: {
            id: "pay_02b22222-2222-4222-8222-222222222222",
            booking_id: "bkg_02f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a02",
            user_id: customers[1].user_id,
            amount_cents: services[1].price,
            currency: services[1].currency,
            provider: "stripe",
            status: "paid",
            stripe_checkout_session_id: "cs_test_landing_002",
            stripe_payment_intent_id: "pi_test_landing_002",
            paid_at: "2025-12-18T12:35:00Z",
            receipt_url: "https://example.com/receipts/landing-002",
            created_at: "2025-12-18T12:31:00Z",
            updated_at: "2025-12-18T12:36:10Z",
        },
    },
    {
        id: "bkg_03f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a03",
        service_id: services[2].id,
        user_id: customers[2].user_id,
        customer_name: customers[2].full_name,
        customer_email: customers[2].email,
        scheduled_for: "2025-12-24T16:30:00Z",
        timezone: "Africa/Lagos",
        status: "pending",
        notes: "Investigate 500 errors on checkout.",
        created_at: "2025-12-22T08:10:00Z",
        updated_at: "2025-12-22T08:10:00Z",
        payment: {
            id: "pay_03c33333-3333-4333-8333-333333333333",
            booking_id: "bkg_03f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a03",
            user_id: customers[2].user_id,
            amount_cents: services[2].price,
            currency: services[2].currency,
            provider: "stripe",
            status: "unpaid",
            stripe_checkout_session_id: null,
            stripe_payment_intent_id: null,
            paid_at: null,
            receipt_url: null,
            created_at: "2025-12-22T08:10:00Z",
            updated_at: "2025-12-22T08:10:00Z",
        },
    },
    {
        id: "bkg_04f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a04",
        service_id: services[3].id,
        user_id: customers[3].user_id,
        customer_name: customers[3].full_name,
        customer_email: customers[3].email,
        scheduled_for: "2025-12-30T11:00:00Z",
        timezone: "Africa/Lagos",
        status: "requires_payment",
        notes: "Wants faster dashboard charts.",
        created_at: "2025-12-21T19:20:00Z",
        updated_at: "2025-12-21T19:20:00Z",
        payment: {
            id: "pay_04d44444-4444-4444-8444-444444444444",
            booking_id: "bkg_04f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a04",
            user_id: customers[3].user_id,
            amount_cents: services[3].price,
            currency: services[3].currency,
            provider: "stripe",
            status: "pending",
            stripe_checkout_session_id: "cs_test_perf_004",
            stripe_payment_intent_id: null,
            paid_at: null,
            receipt_url: null,
            created_at: "2025-12-21T19:21:00Z",
            updated_at: "2025-12-21T19:21:00Z",
        },
    },
    {
        id: "bkg_05f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a05",
        service_id: services[4].id,
        user_id: customers[4].user_id,
        customer_name: customers[4].full_name,
        customer_email: customers[4].email,
        scheduled_for: "2025-12-29T13:00:00Z",
        timezone: "Africa/Lagos",
        status: "completed",
        notes: "Clear MVP scope, avoid feature creep.",
        created_at: "2025-12-14T10:00:00Z",
        updated_at: "2025-12-16T15:30:00Z",
        payment: {
            id: "pay_05e55555-5555-4555-8555-555555555555",
            booking_id: "bkg_05f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a05",
            user_id: customers[4].user_id,
            amount_cents: services[4].price,
            currency: services[4].currency,
            provider: "stripe",
            status: "paid",
            stripe_checkout_session_id: "cs_test_roadmap_005",
            stripe_payment_intent_id: "pi_test_roadmap_005",
            paid_at: "2025-12-14T10:02:00Z",
            receipt_url: "https://example.com/receipts/roadmap-005",
            created_at: "2025-12-14T10:01:00Z",
            updated_at: "2025-12-14T10:02:10Z",
        },
    },
    {
        id: "bkg_06f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a06",
        service_id: services[5].id,
        user_id: customers[5].user_id,
        customer_name: customers[5].full_name,
        customer_email: customers[5].email,
        scheduled_for: "2025-12-27T09:00:00Z",
        timezone: "Africa/Lagos",
        status: "confirmed",
        notes: "Need consistent UI tokens.",
        created_at: "2025-12-19T07:45:00Z",
        updated_at: "2025-12-19T08:00:00Z",
        payment: {
            id: "pay_06f66666-6666-4666-8666-666666666666",
            booking_id: "bkg_06f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a06",
            user_id: customers[5].user_id,
            amount_cents: services[5].price,
            currency: services[5].currency,
            provider: "stripe",
            status: "paid",
            stripe_checkout_session_id: "cs_test_brand_006",
            stripe_payment_intent_id: "pi_test_brand_006",
            paid_at: "2025-12-19T07:50:00Z",
            receipt_url: "https://example.com/receipts/brand-006",
            created_at: "2025-12-19T07:46:00Z",
            updated_at: "2025-12-19T07:50:10Z",
        },
    },
    {
        id: "bkg_07f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a07",
        service_id: services[6].id,
        user_id: customers[0].user_id,
        customer_name: customers[0].full_name,
        customer_email: customers[0].email,
        scheduled_for: "2025-12-23T12:00:00Z",
        timezone: "Africa/Lagos",
        status: "failed",
        notes: "Payment failed once, retry needed.",
        created_at: "2025-12-22T06:15:00Z",
        updated_at: "2025-12-22T06:20:00Z",
        payment: {
            id: "pay_07a77777-7777-4777-8777-777777777777",
            booking_id: "bkg_07f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a07",
            user_id: customers[0].user_id,
            amount_cents: services[6].price,
            currency: services[6].currency,
            provider: "stripe",
            status: "failed",
            stripe_checkout_session_id: "cs_test_schema_007",
            stripe_payment_intent_id: "pi_test_schema_007",
            paid_at: null,
            receipt_url: null,
            created_at: "2025-12-22T06:16:00Z",
            updated_at: "2025-12-22T06:18:30Z",
        },
    },
    {
        id: "bkg_08f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a08",
        service_id: services[7].id,
        user_id: customers[2].user_id,
        customer_name: customers[2].full_name,
        customer_email: customers[2].email,
        scheduled_for: "2026-01-03T15:00:00Z",
        timezone: "Africa/Lagos",
        status: "requires_payment",
        notes: "Clerk + backend JWT bridging.",
        created_at: "2025-12-21T08:00:00Z",
        updated_at: "2025-12-21T08:00:00Z",
        payment: {
            id: "pay_08b88888-8888-4888-8888-888888888888",
            booking_id: "bkg_08f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a08",
            user_id: customers[2].user_id,
            amount_cents: services[7].price,
            currency: services[7].currency,
            provider: "stripe",
            status: "pending",
            stripe_checkout_session_id: "cs_test_clerk_008",
            stripe_payment_intent_id: null,
            paid_at: null,
            receipt_url: null,
            created_at: "2025-12-21T08:01:00Z",
            updated_at: "2025-12-21T08:01:00Z",
        },
    },
    {
        id: "bkg_09f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a09",
        service_id: services[8].id,
        user_id: customers[1].user_id,
        customer_name: customers[1].full_name,
        customer_email: customers[1].email,
        scheduled_for: "2025-12-31T17:00:00Z",
        timezone: "Africa/Lagos",
        status: "cancelled",
        notes: "Customer rescheduled to next week.",
        created_at: "2025-12-17T14:10:00Z",
        updated_at: "2025-12-18T09:00:00Z",
        payment: {
            id: "pay_09c99999-9999-4999-8999-999999999999",
            booking_id: "bkg_09f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a09",
            user_id: customers[1].user_id,
            amount_cents: services[8].price,
            currency: services[8].currency,
            provider: "stripe",
            status: "refunded",
            stripe_checkout_session_id: "cs_test_sprint_009",
            stripe_payment_intent_id: "pi_test_sprint_009",
            paid_at: "2025-12-17T14:12:00Z",
            receipt_url: "https://example.com/receipts/sprint-009",
            created_at: "2025-12-17T14:11:00Z",
            updated_at: "2025-12-18T09:05:00Z",
        },
    },
    {
        id: "bkg_10f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a10",
        service_id: services[0].id,
        user_id: customers[3].user_id,
        customer_name: customers[3].full_name,
        customer_email: customers[3].email,
        scheduled_for: "2025-12-25T09:30:00Z",
        timezone: "Africa/Lagos",
        status: "refunded",
        notes: "Refund processed due to double booking.",
        created_at: "2025-12-15T11:00:00Z",
        updated_at: "2025-12-16T08:30:00Z",
        payment: {
            id: "pay_10d10101-0101-4101-8101-010101010101",
            booking_id: "bkg_10f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a10",
            user_id: customers[3].user_id,
            amount_cents: services[0].price,
            currency: services[0].currency,
            provider: "stripe",
            status: "refunded",
            stripe_checkout_session_id: "cs_test_ui_audit_010",
            stripe_payment_intent_id: "pi_test_ui_audit_010",
            paid_at: "2025-12-15T11:02:00Z",
            receipt_url: "https://example.com/receipts/ui-audit-010",
            created_at: "2025-12-15T11:01:00Z",
            updated_at: "2025-12-16T08:30:00Z",
        },
    },
    {
        id: "bkg_11f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a11",
        service_id: services[2].id,
        user_id: customers[4].user_id,
        customer_name: customers[4].full_name,
        customer_email: customers[4].email,
        scheduled_for: "2026-01-05T10:00:00Z",
        timezone: "Africa/Lagos",
        status: "requires_payment",
        notes: "Needs quick backend review before launch.",
        created_at: "2025-12-22T09:30:00Z",
        updated_at: "2025-12-22T09:30:00Z",
        payment: {
            id: "pay_11e20202-0202-4202-8202-020202020202",
            booking_id: "bkg_11f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a11",
            user_id: customers[4].user_id,
            amount_cents: services[2].price,
            currency: services[2].currency,
            provider: "stripe",
            status: "unpaid",
            stripe_checkout_session_id: null,
            stripe_payment_intent_id: null,
            paid_at: null,
            receipt_url: null,
            created_at: "2025-12-22T09:30:00Z",
            updated_at: "2025-12-22T09:30:00Z",
        },
    },
    {
        id: "bkg_12f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a12",
        service_id: services[3].id,
        user_id: customers[5].user_id,
        customer_name: customers[5].full_name,
        customer_email: customers[5].email,
        scheduled_for: "2026-01-02T12:30:00Z",
        timezone: "Africa/Lagos",
        status: "confirmed",
        notes: "Investigate rerender loops and memoization.",
        created_at: "2025-12-21T21:00:00Z",
        updated_at: "2025-12-22T07:00:00Z",
        payment: {
            id: "pay_12f30303-0303-4303-8303-030303030303",
            booking_id: "bkg_12f1a2b3-4c5d-4e6f-8a9b-0c1d2e3f4a12",
            user_id: customers[5].user_id,
            amount_cents: services[3].price,
            currency: services[3].currency,
            provider: "stripe",
            status: "paid",
            stripe_checkout_session_id: "cs_test_perf_012",
            stripe_payment_intent_id: "pi_test_perf_012",
            paid_at: "2025-12-21T21:03:00Z",
            receipt_url: "https://example.com/receipts/perf-012",
            created_at: "2025-12-21T21:01:00Z",
            updated_at: "2025-12-21T21:03:10Z",
        },
    },
];

// Optional: handy maps for quick lookups
export const services_by_id: Record<string, Service> = Object.fromEntries(services.map((s) => [s.id, s]));

export const customers_by_user_id: Record<string, Customer> = Object.fromEntries(customers.map((c) => [c.user_id, c]));

export const bookings_by_id: Record<string, Booking> = Object.fromEntries(bookings.map((b) => [b.id, b]));
