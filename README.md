## **BookMe – Premium Service Booking Platform**

A modern, full-stack service booking application built with **Next.js 16**, **Clerk**, **Drizzle ORM**, and **Neon**. This platform enables service providers to list offerings and customers to book time slots seamlessly.

---

### **🚀 Tech Stack**

-   **Framework:** Next.js 16 (App Router)
-   **Auth:** Clerk (Modern 2025 Middleware & Route Groups)
-   **Database:** Neon (Serverless PostgreSQL)
-   **ORM:** Drizzle ORM
-   **Styling:** Tailwind CSS + Lucide Icons
-   **File Uploads:** UploadThing (2GB Free Tier)
-   **Notifications:** Sonner

---

### **📁 Project Structure**

```text
├── app/
│   ├── (main)/          # Public marketing pages (Hero, Services)
│   ├── (dashboard)/     # Protected User/Admin Dashboard
│   ├── api/             # UploadThing & Clerk Webhooks
│   └── layout.tsx       # Global ClerkProvider & Root styles
├── db/
│   ├── schema.ts        # Database Tables (Services, Bookings, Payments)
│   └── index.ts         # Drizzle/Neon Connection
├── components/
│   ├── ui/              # Clean, modern UI components
│   └── admin/           # Dashboard forms & management tools
└── drizzle.config.ts    # Migration settings

```

---

### **🛠️ Getting Started**

#### **1. Clone & Install**

```bash
git clone https://github.com/yourusername/bookme.git
cd bookme
npm install

```

#### **2. Environment Setup**

Create a `.env.local` file in the root:

```env
# Database
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# UploadThing
UPLOADTHING_SECRET=sk_...
UPLOADTHING_APP_ID=...

```

#### **3. Database Sync**

Push your schema to Neon:

```bash
npx drizzle-kit push

```

#### **4. Run Locally**

```bash
npm run dev

```

---

### **✨ Key Features**

-   **Dynamic Dashboard:** Responsive sidebar with real-time booking stats.
-   **Service Management:** Unified "Mode-Aware" form for creating and editing services with image uploads.
-   **Advanced UI:** Vertical-stacking time slot and perk management to prevent layout overflow.
-   **Auth Middleware:** Centralized protection for `/dashboard` and `/admin` routes.

---

### **📝 License**

MIT License. Feel free to use this for your startup or portfolio!
