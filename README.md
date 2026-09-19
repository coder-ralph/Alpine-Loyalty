# 🥛 Alpine Loyalty Card Generator

An interactive web application built with **Next.js**, **Tailwind CSS**, and **html-to-image** that lets users calculate their weekly Alpine milk consumption, view their loyalty tier, and generate a customized high-resolution digital card exported directly as a PNG.

---

## ✨ Features

- 🎯 **Interactive Loyalty Levels:** Dynamically calculates consumption metrics (cans/week, volume sizes in 154 mL and 370 mL) and updates loyalty tiers in real time.
- 🎨 **Live Customization:** Customize cardholder names and color schemes with live canvas previews.
- 📸 **High-Resolution PNG Export:** Powered by `html-to-image` (`toPng`) to export crisp 2x pixel-ratio cards safely avoiding SVG/CORS font rendering bugs.
- 📱 **Fully Responsive:** Dark-mode themed interface built with Tailwind CSS.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router, Client Components)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Icons:** [Lucide React](https://lucide.dev)
- **Image Generation:** [`html-to-image`](https://www.npmjs.com/package/html-to-image)

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine:
- Node.js 18.x or later
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/alpine-loyalty.git](https://github.com/your-username/alpine-loyalty.git)
   cd alpine-loyalty
Install dependencies:

Bash
npm install
# or
pnpm install
Run the development server:

Bash
npm run dev
# or
pnpm dev
Open http://localhost:3000 in your browser to view the application.

📝 License

Distributed under the MIT License. See LICENSE for more information.