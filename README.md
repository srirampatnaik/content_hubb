# 📚 Content Hub

The **Content Hub** is a lightweight content-focused platform that works like a mini CMS + content explorer.  
It allows users to request new guides, browse existing ones, and explore richly written content with smooth UI transitions.  

The project is designed to showcase **modern React/Next.js development practices** including data fetching, validation, animations, and real-time updates.

---

## 🎯 Goal
The app was built to:
- ✍️ Let users submit **new content requests** (e.g., *“Write a guide on Next.js SEO”*).  
- 📰 Display a **content feed** of requested guides.  
- ⚡ Update the feed in **real time** using Server-Sent Events (SSE).  
- 📖 Publish guides as static pages (Markdown/MDX with Contentlayer).  
- 🎨 Provide a **smooth, interactive user experience** using Framer Motion animations.  

In short, it feels like a **knowledge-sharing platform** rather than just a form and list demo.  

---

## 🛠️ Tech Stack
This project brings together several modern tools:

- **Next.js (App Router)** → Framework & SEO-friendly routing  
- **TanStack Query** → Data fetching and caching  
- **Axios** → REST API requests + SSE handling  
- **Zod** → Validation for forms and API responses  
- **React Hook Form** → Content request submission form  
- **Tailwind CSS** → Responsive, modern UI design  
- **Redux Toolkit** → Global state (theme, preferences, user)  
- **Prisma ORM** → Database layer (SQLite for local dev, Postgres for production)  
- **Contentlayer** → Markdown/MDX guide pages  
- **Framer Motion** → Animations (page transitions, cards, skeletons)  

---

## 🚀 Features

### 🏠 Content Feed
- Displays all requested content (`GET /api/content`).  
- Each card shows **title, description, and status** (“Requested” or “Published”).  
- New items appear with **Framer Motion animations**.  
- Real-time updates through **SSE stream** (`/api/content/stream`).  

### 📝 Submit Request Form
- Fields: `title`, `description`, `category`.  
- Built with **React Hook Form + Zod**.  
- Posts via `POST /api/content`.  
- On success → clears form + animated success message.  

### 📖 Guide Pages
- Each published request generates a static guide at `/guides/[slug]`.  
- Powered by **Contentlayer (Markdown/MDX)**.  
- Example: “Next.js SEO” → `/guides/nextjs-seo`.  

### 🌐 Global State
Managed via **Redux Toolkit**:  
- Theme toggle (dark/light).  
- Reading mode (compact/detailed).  
- Username stored globally.  

### 🎨 UI & Styling
- Tailwind CSS for consistent, responsive styling.  
- Framer Motion for:
  - Page transitions  
  - Card hover/expand effects  
  - Loading skeletons  

---

## 📦 API Endpoints
The app uses Next.js API routes:  

- `GET /api/content` → Fetch all content requests.  
- `POST /api/content` → Submit a new content request.  
- `GET /api/content/stream` → Real-time updates (SSE).  

---

## ⚡ Getting Started (Local Development)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/knowledge-hub.git
cd knowledge-hub

