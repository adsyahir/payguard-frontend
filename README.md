# PayGuard Frontend

Admin console for the PayGuard payment platform. **UI only** — static example data,
no backend calls wired yet.

**React 19** · **Vite** · **TypeScript** · **Tailwind CSS v4** · **shadcn/ui** · **Zustand**

---

## Stack

| Area | Tech |
|------|------|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Components | shadcn/ui (Radix primitives) |
| Icons | lucide-react |
| State | Zustand |
| Font | Geist (`@fontsource-variable/geist`) |

---

## Screens

| Screen | File | What |
|--------|------|------|
| Login | `src/pages/login.tsx` | Email/password form, show/hide, SSO button (UI-only auth gate) |
| Dashboard | `src/pages/dashboard.tsx` | KPI tiles, fraud-rate trend (SVG), recent transactions |
| Transactions | `src/pages/transactions.tsx` | Filterable table — id, merchant, amount, score, decision |
| Fraud Review | `src/pages/fraud-review.tsx` | Review queue, score gauge, feature contributions, approve/block |

Decision bands are color-coded throughout: **APPROVE** green · **REVIEW** amber · **BLOCK** red.

---

## Structure

```
src/
├── App.tsx                 auth gate + page switch (Zustand)
├── main.tsx
├── index.css               Tailwind + shadcn theme tokens
├── pages/                  login, dashboard, transactions, fraud-review
├── components/
│   ├── navbar.tsx          top nav, avatar dropdown (logout)
│   ├── decision-badge.tsx  APPROVE/REVIEW/BLOCK badge + score-bar color
│   └── ui/                 shadcn components (button, card, table, …)
├── store/auth.ts           Zustand auth gate (UI only)
├── data/sample.ts          static example data — the ONLY data source right now
└── lib/utils.ts            cn() helper
```

---

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:
```bash
npm run build      # tsc + vite build
npm run preview    # serve the production build
npm run lint       # oxlint
```

---

## Path alias

`@/` → `src/` (set in `vite.config.ts` + `tsconfig`). Import like:
```ts
import { Button } from '@/components/ui/button'
```

## Add shadcn components
```bash
npx shadcn@latest add <name>
```

---

## Backend integration (not done yet)

Everything renders from `src/data/sample.ts`. No fetch/auth logic.

`vite.config.ts` already proxies `/api` → the gateway on `:8080`:
```ts
server: { proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } } }
```

Next step when wiring the backend:
- Replace `sample.ts` imports with data hooks (e.g. TanStack Query) hitting `/api/...`.
- Real login: POST `/api/auth/login` → store JWT → attach `Authorization: Bearer` →
  guard routes on the token instead of the UI-only `store/auth.ts`.

---

Part of the PayGuard project. Backend: `../payguard-backend`. Spec: `docs/PayGuard-Spec.md`.
