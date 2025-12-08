# fcgomes.dev

Personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── header.tsx       # Header component
│   ├── hero.tsx         # Hero section
│   ├── experience.tsx   # Experience section
│   ├── projects.tsx     # Projects section
│   ├── education.tsx    # Education section
│   └── skills.tsx       # Skills section
└── public/              # Static assets
```

## Features

- Modern, clean design with Silicon Valley aesthetic
- Responsive layout
- Dark mode support (via shadcn/ui)
- Type-safe with TypeScript
- Optimized for performance

## Deployment

This project can be deployed on [Vercel](https://vercel.com), [Netlify](https://netlify.com), or any platform that supports Next.js.

## License

MIT
