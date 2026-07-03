# @beststar/create-react-scaffold

A modern React project scaffolding CLI tool — instantly create a project with **React 19** + **TypeScript** + **Vite** + **Tailwind CSS v4** + **shadcn/ui** pre-configured and ready to code.

## Quick Start

```bash
npx @beststar/create-react-scaffold my-app
cd my-app
npm run dev
```

Or use the shorthand:

```bash
npm create @beststar/react-scaffold my-app
```

You can also use `yarn create` or `pnpm create`:

```bash
# Yarn
yarn create @beststar/react-scaffold my-app

# pnpm
pnpm create @beststar/react-scaffold my-app
```

## What's Included

| Feature | Technology |
|---|---|
| ⚛️ **UI Framework** | React 19 with TypeScript |
| ⚡ **Build Tool** | Vite 7 |
| 🎨 **Styling** | Tailwind CSS v4 |
| 🧩 **Components** | shadcn/ui (button components pre-installed) |
| 🔤 **Icons** | lucide-react |
| 📦 **Utilities** | clsx, tailwind-merge, class-variance-authority |
| 🧹 **Linting** | ESLint with TypeScript rules |
| 🔧 **Path Aliases** | `@/` mapped to `src/` |

For a complete list, see the generated project's `package.json`.

## Prerequisites

- **Node.js** >= 18
- **npm**, **yarn**, or **pnpm**

## Usage

### Create a new project

```bash
npx @beststar/create-react-scaffold <project-name>
```

### Options

| Option | Description |
|--------|-------------|
| `-y`, `--yes` | Skip confirmation prompt |

### Example

```bash
npx @beststar/create-react-scaffold my-awesome-app
cd my-awesome-app
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

The generated project follows a clean, opinionated structure:

```
my-app/
├── public/               # Static assets
│   └── beststar.png
├── src/
│   ├── components/       # React components
│   │   └── ui/          # shadcn/ui components
│   ├── utils/           # Utility functions
│   ├── App.css          # Tailwind CSS entry + theme variables
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Application entry point
│   └── vite-env.d.ts   # Vite type declarations
├── index.html
├── vite.config.ts       # Vite configuration (with @ alias)
├── tsconfig.json        # TypeScript configuration
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── components.json      # shadcn/ui configuration
└── package.json
```

## Adding shadcn/ui Components

Since shadcn/ui is already configured, you can add more components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
# ... and any other shadcn/ui component
```

## Development

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

### Path Alias

The `@/` alias maps to `src/`. Use it for clean imports:

```ts
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/utils"
```

## Local Development of This CLI Tool

Clone the repo and link it locally to test changes:

```bash
git clone https://github.com/BestStarLi/react-scaffold.git
cd react-scaffold
npm link
create-react-scaffold test-app
```

Or run directly:

```bash
node bin/index.js test-app
```

### How It Works

1. The CLI copies the `template/` directory to your target folder
2. Updates the project name in `package.json`
3. Initializes a git repository
4. Runs `npm install` to install dependencies

## Publishing

To publish a new version to npm:

```bash
npm publish --access public
```

## License

MIT

---

<p align="center">Built with ❤️ by <a href="https://github.com/BestStarLi">BestStar</a></p>
