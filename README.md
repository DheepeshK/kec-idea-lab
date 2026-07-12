# AICTE IDEA Lab @ Kongu Engineering College

The official website for the **AICTE IDEA Lab (Innovation, Development, Evaluation & Application Lab)** at Kongu Engineering College, Perundurai, Tamil Nadu — a government-funded hardware fabrication and rapid-prototyping facility fostering innovation among students and faculty.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3
- **Authentication:** NextAuth.js (credentials provider, bcrypt)
- **Data Store:** JSON file-based (seeded from `data/` directory)
- **Animations:** GSAP
- **UI Icons:** Lucide React
- **Theming:** next-themes (dark/light)
- **Validation:** Zod
- **Excel Export:** ExcelJS

## Getting Started

### Prerequisites

- Node.js >= 20.x
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
NEXTAUTH_SECRET="your_random_secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@kec.ac.in"
# Generate a base64-encoded bcrypt hash:
# node -e "import('bcryptjs').then(b=>console.log(Buffer.from(b.hashSync('your_password',10),'utf-8').toString('base64')))"
ADMIN_PASSWORD_HASH_B64="base64_encoded_bcrypt_hash_here"
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── data/                  # JSON seed data (team, equipment, events, etc.)
├── public/                # Static assets (images, logos, uploads)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── (site)/        # Public-facing routes
│   │   ├── admin/         # Admin panel (CRUD for all entities)
│   │   └── api/           # REST API routes
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities (auth, data store)
│   └── types/             # Shared TypeScript types
├── .env.example           # Environment variable template
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Features

### Public Site

- **Home:** Hero section, animated stats, featured equipment, upcoming events
- **About:** Mission, vision, IEF ecosystem
- **Facilities:** Tabbed equipment browser with specs and availability
- **Team:** Faculty coordinators, tech gurus, student ambassadors
- **Events:** Filterable event grid with registration
- **Calendar:** Yearly schedule with quarter-based grouping
- **Contact:** Enquiry form with validation

### Admin Panel

- **Dashboard:** Overview stats
- **Equipment CRUD:** Manage lab machinery
- **Team CRUD:** Manage team members with image upload
- **Events CRUD:** Manage workshops and events
- **Calendar CRUD:** Manage yearly schedule
- **Registrations:** View, search, delete, and export to Excel

## Available Scripts

| Script              | Description                     |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start development server        |
| `npm run build`     | Production build                |
| `npm start`         | Start production server         |
| `npm run lint`      | Run ESLint                      |
| `npm run typecheck` | Run TypeScript type checking    |
| `npm run format`    | Format code with Prettier       |
| `npm run test`      | Run tests                       |
| `npm run test:e2e`  | Run Playwright end-to-end tests |

## License

MIT
