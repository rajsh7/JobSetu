# 🌉 JobSetu

> **Your Bridge to a Better Career**  
> India's fastest career portal for Sarkari Jobs, Results, Admit Cards, Private Jobs & Top Exams.

---

## 🚀 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | Next.js (App Router) | 16.x |
| Styling | Tailwind CSS (Oxide engine) | v4 |
| UI Components | shadcn/ui | 4.x |
| Backend | NestJS | 12.x |
| ORM | Prisma | 7.x |
| Database | PostgreSQL (Supabase) | 16.x |
| Cache | Redis (Upstash) | 7.x |
| CDN/Security | Cloudflare | Free |
| Language | TypeScript | 7.x |
| Runtime | Node.js | 24 LTS |
| Package Manager | pnpm | 12.x |
| Monorepo | Turborepo | 2.x |

---

## 📁 Project Structure

```
jobsetu/
├── apps/
│   ├── web/          ← Next.js 16 Frontend
│   └── api/          ← NestJS 12 Backend
└── packages/
    └── types/        ← Shared TypeScript types
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 24 LTS
- pnpm 12+
- A Supabase account (free)
- An Upstash account (free)

### 1. Clone & Install
```bash
git clone https://github.com/your-org/jobsetu.git
cd jobsetu
pnpm install
```

### 2. Setup Environment Variables

**API:**
```bash
cp apps/api/.env.example apps/api/.env
# Fill in your DATABASE_URL, JWT_SECRET, REDIS_URL
```

**Web:**
```bash
cp apps/web/.env.example apps/web/.env.local
# Fill in your API_URL, NEXTAUTH_SECRET
```

### 3. Setup Database
```bash
pnpm db:migrate   # Run Prisma migrations
pnpm db:seed      # Seed sample data
```

### 4. Run Development
```bash
pnpm dev          # Starts both web (port 3000) and api (port 4000)
```

---

## 🔑 Key URLs

| URL | Description |
|---|---|
| `http://localhost:3000` | Frontend |
| `http://localhost:4000/api` | Backend API |
| `http://localhost:4000/api/health` | Health check |
| `http://localhost:4000/api/jobs` | Jobs endpoint |

---

## 📦 Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Run all apps in dev mode |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all apps |
| `pnpm type-check` | TypeScript check |
| `pnpm db:migrate` | Run DB migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:seed` | Seed database |

---

## 🌐 Deployment

- **Frontend:** Vercel (connect GitHub repo)
- **Backend:** Railway or Render
- **Database:** Supabase
- **Cache:** Upstash Redis
- **CDN:** Cloudflare (point your domain here)

---

*Built with ❤️ for Indian students*
