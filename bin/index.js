#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.resolve(__dirname, "../template");

const PKG_NAME = "@beststar/create-react-scaffold";

function log(msg) {
  console.log(`\x1b[36m[${PKG_NAME}]\x1b[0m ${msg}`);
}

function error(msg) {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`);
}

function success(msg) {
  console.log(`\x1b[32m✓\x1b[0m ${msg}`);
}

function showHelp() {
  console.log(`
  ${PKG_NAME} — Create a new React scaffold project

  Usage:
    npx ${PKG_NAME} <project-name> [options]

  Options:
    -y, --yes    Skip confirmation prompt (equivalent to using --yes)

  Examples:
    npx ${PKG_NAME} my-app
    npx ${PKG_NAME} my-react-app
`);
}

// ── Parse arguments ──────────────────────────────────────────────
const args = process.argv.slice(2);
const projectName = args.find((a) => !a.startsWith("-"));
const skipConfirm = args.includes("-y") || args.includes("--yes") || args.includes("--yes");

if (!projectName || args.includes("--help") || args.includes("-h")) {
  showHelp();
  process.exit(projectName ? 0 : 1);
}

// ── Validate project name ────────────────────────────────────────
if (!/^[a-z0-9][a-z0-9._-]*$/i.test(projectName)) {
  error(
    `"${projectName}" is not a valid project name. Use a name like "my-app" (alphanumeric, hyphens, underscores, dots).`
  );
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
  error(`Target directory "${projectName}" already exists.`);
  process.exit(1);
}

// ── Check template directory exists ──────────────────────────────
if (!fs.existsSync(TEMPLATE_DIR)) {
  error(
    `Template directory not found at ${TEMPLATE_DIR}. This is a bug — please report it.`
  );
  process.exit(1);
}

// ── Confirm ──────────────────────────────────────────────────────
if (!skipConfirm) {
  console.log(`\n  ✨ Scaffolding a new project: \x1b[1m${projectName}\x1b[0m`);
  console.log(`  📁 Target directory: ${targetDir}\n`);
}

// ── Copy template ────────────────────────────────────────────────
log("Copying template files...");
fs.cpSync(TEMPLATE_DIR, targetDir, { recursive: true });
success("Template files copied");

// ── Update package.json name ─────────────────────────────────────
log("Configuring project...");
const pkgPath = path.join(targetDir, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
pkg.name = projectName;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
success(`Project name set to "${projectName}"`);

// ── Initialize git repository ────────────────────────────────────
if (fs.existsSync(path.join(targetDir, ".gitignore")) && !fs.existsSync(path.join(targetDir, ".git"))) {
  log("Initializing git repository...");
  try {
    execSync("git init", { cwd: targetDir, stdio: "ignore" });
    success("Git repository initialized");
  } catch {
    log("Skipping git init (git not available)");
  }
}

// ── Install dependencies ─────────────────────────────────────────
log("Installing dependencies...\n");
try {
  execSync("npm install", { cwd: targetDir, stdio: "inherit" });
} catch {
  error("npm install failed. You can run it manually later.");
}

// ── Done ─────────────────────────────────────────────────────────
console.log(`
\x1b[32m┌─────────────────────────────────────────────────────┐
│  ✨ Project "${projectName}" created successfully!  │
└─────────────────────────────────────────────────────┘\x1b[0m

  \x1b[1mNext steps:\x1b[0m

    \x1b[36mcd ${projectName}\x1b[0m
    \x1b[36mnpm run dev\x1b[0m

  \x1b[2mHappy coding! 🚀\x1b[0m
`);
