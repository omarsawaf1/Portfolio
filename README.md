# Portfolio

This is a personal portfolio website showcasing professional experience, projects, and skills. It features a dual-mode interface tailored for two distinct professional identities: **Frontend Developer** and **Cybersecurity Analyst**.

## 🏗️ Architecture

The portfolio is built as a highly responsive, vanilla Frontend web application without the need for heavy frameworks. It leverages modern web standards to deliver a performant and interactive user experience:

- **Core Interface**: A single `index.html` file that houses both versions of the portfolio. Custom logic manages transitioning between the Frontend and Cybersecurity views without reloading the page.
- **Styling**: Vanilla CSS3 using modular stylesheets. Variables, flexbox/grid layouts, and native CSS animations are heavily utilized.
- **Logic**: Written in **TypeScript**, utilizing ES6 modules for clean, maintainable, and type-safe code. The source ts files are compiled into a `javascript` directory and included as modules in the HTML.

## 📂 Project Structure

```text
Portfolio/
├── index.html           # Main entry point holding both the Frontend and Cybersecurity views.
├── 404.html             # Custom 404 error page.
├── css/                 # Stylesheet directory containing modular CSS files (e.g., main.css, cybersecurity.css).
├── typescript/          # Source directory for TypeScript files (main.ts and granular modules).
├── javascript/          # Compiled JavaScript output directory.
├── assets/              # Media and assets including project pictures, logos, and UI icons.
├── images/              # Favicons, web manifests, and site-specific metadata icons.
├── package.json         # NPM configuration containing the TypeScript dependency.
└── tsconfig.json        # TypeScript compiler configuration.
```

## 🚀 How to Run

Because this is a static website, getting it up and running locally is simple:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine (specifically to use `npm` for TypeScript compilation).
- A static file server or a tool like VS Code's "Live Server" extension.

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/omarsawaf1/Portfolio.git
   cd Portfolio
   ```
2. **Install dependencies** (this installs TypeScript to compile the code):
   ```bash
   npm install
   ```
3. **Compile TypeScript**:
   If you make any changes to the `.ts` files inside the `typescript/` folder, you will need to recompile them into JavaScript.
   ```bash
   npx tsc
   # Or run in watch mode to auto-compile upon saving changes:
   npx tsc --watch
   ```
4. **Open the website**:
   Open the `index.html` file in your preferred browser, or use a local development server for the best experience (recommended due to ES module imports):
   ```bash
   npx serve .
   ```
   Navigate to `http://localhost:3000` (or the port provided by your server tool).
