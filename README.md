# Uptrix — Frontend test assignment

Next.js (App Router) client for the Uptrix public site and authentication flows, integrated with the Node/Mongo backend from [ArhamAzeem/node-test](https://github.com/ArhamAzeem/node-test.git).





## Frontend setup

```bash
npm install
cp .env.example .env.local
```

Set `NEXT_PUBLIC_API_URL` to your API origin (no trailing slash).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Development server         |
| `npm run build`| Production build           |
| `npm run start`| Start production server  |
| `npm run lint` | ESLint                     |

## Approach

- **UI**: Landing page plus auth screens matching the Uptrix Figma theme (dark forest background `#050a08`, card `#111827`, accent emerald `#10b981`). Shared primitives live under `src/components/auth/`, homepage blocks under `src/components/home/`, and reusable site chrome under `src/components/site/`.
- **API**: Axios instance (`src/api/client.ts`) reads `NEXT_PUBLIC_API_URL`, attaches `Authorization: Bearer <token>` from the session cookie when present.
- **Validation**: `react-hook-form` + `yup` schemas in `src/lib/validation/auth.ts`.
### Auth flows

| Screen           | Route               | Backend calls |
|------------------|---------------------|---------------|
| Sign up          | `/register`         | `POST /register` → `/verify-otp` |
| Verify email     | `/verify-otp`       | `POST /verify-otp`; **Resend** calls `POST /forgot-password` (same OTP field on user; backend has no separate resend route) |
| Sign in          | `/login`            | `POST /login` |
| Forgot password  | `/forgot-password`  | `POST /forgot-password` → `/reset-password?email=` |
| Reset password   | `/reset-password`   | `POST /reset-password`; **Resend** → `POST /forgot-password` |
| Signed-in home   | `/`                 | Header **Log out** → `POST /logout`; `GET /me` on load via auth context |

## State management

- **React Context** (`src/context/auth-context.tsx`) holds the current user and exposes `setSession`, `logout`, and `refreshUser`.
- **Session persistence**: JWT is stored in a browser cookie (`uptrix_token`, 7-day expiry, `SameSite=Lax`) so middleware and client requests stay aligned.

### Tradeoffs

| Choice | Why | Cost |
|--------|-----|------|
| Context + `useState` | Matches assignment (no Redux/Zustand), enough for auth user + loading | Prop drilling avoided only where wrapped by provider |
| Non-httpOnly cookie | Lets Edge middleware read the token without a custom BFF | XSS surface higher than httpOnly + server-only session; acceptable for a focused assignment |
| Resend OTP → `forgot-password` | Backend exposes no dedicated `/resend-otp` | Same OTP bucket on the user model; email copy may say “reset” during signup resend |
| Client-side axios + cookie | Simple wiring to existing REST API | No SSR data fetching for the signed-in user on first paint |

## Project layout (high level)

```
src/app/           App Router pages (`/`, auth `/login` …)
src/components/    Layout, home page, auth UI, site chrome, shared UI (shadcn-style)
src/context/       Auth provider
src/api/           Axios client + auth API helpers
src/lib/validation yup schemas
```

## License

Private / assignment use unless stated otherwise by your course or employer.
