# Budgie


 
Elevate your financial management with Budgie - An expense tracker spp. Our user-friendly Next.js app simplifies expense tracking, offers multiple account management, easy money transfers, and efficient budgets tracking . Take charge of your finances and make informed choices, all in one platform.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Database:** [PostgreSql](https://postgresql.com)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Authentication:** [Clerk]([https://next-auth.js.org/](https://go.clerk.com/wPzIBHq))
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Deployment:** [Vercel](https://vercel.com/dashboard)

## Key Features

- Authentication with **NextAuth.js**
- ORM using **Drizzle ORM**
- Database on **PostgreSql with Drizzle ORM**
- Validation with **Clerk**
- Responsive design with **Tailwind CSS**

## Running Locally

1. Clone the repository

```bash
https://https://github.com/VrajShah34/Budgie.git
```

2. Install dependencies using pnpm

```bash
npm install
```

3. Copy the `.env.example` to `.env` and update the variables.

```bash
cp .env.example .env
```

4. Start the development server

```bash
npm run dev
```

5. Push the database schema

```bash
npm db:push
```

## How do I deploy this?

Follow the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
