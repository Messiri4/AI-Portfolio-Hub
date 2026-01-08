# 🤖 AI Portfolio Hub

A modern, full-stack portfolio platform for showcasing AI/ML projects with a cyberpunk-inspired terminal aesthetic. Built with TypeScript, React, Express, PostgreSQL, and integrated with Resend for email notifications.

## ✨ Features

- **🎨 Modern UI/UX** - Cyberpunk-inspired design with smooth animations and gradient effects
- **📊 Dynamic Project Showcase** - Display AI/ML projects with detailed case studies
- **📈 Interactive Skills Visualization** - Animated bar charts showing technical proficiency
- **📧 Email Notifications** - Real-time contact form with Resend integration
- **💾 PostgreSQL Database** - Production-ready data persistence
- **🔒 Type-Safe API** - End-to-end TypeScript with Zod validation
- **🎭 Framer Motion Animations** - Smooth, performant animations throughout
- **📱 Fully Responsive** - Mobile-first design that works on all devices
- **🚀 Optimized Performance** - Fast loading with Vite build system

## 🌐 Live Demo

**[View Live Site →](https://ai-portfolio-hub.vercel.app)**

## 📸 Preview

*Coming soon - Add screenshots of your portfolio here*

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Production-ready animations
- **Wouter** - Lightweight client-side routing
- **React Hook Form** - Performant form handling
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon library
- **Zod** - TypeScript-first schema validation

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Minimalist web framework
- **TypeScript** - Full type safety
- **Drizzle ORM** - TypeScript ORM for SQL
- **PostgreSQL** - Powerful relational database
- **Resend** - Modern email API
- **Zod** - Runtime type checking

### DevOps & Tools
- **Vite** - Next-gen frontend tooling
- **Vercel** - Deployment platform
- **Neon** - Serverless PostgreSQL
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **PostgreSQL** database (or use [Neon](https://neon.tech) / [Supabase](https://supabase.com))
- **Resend API key** (free tier available)

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Messiri4/AI-Portfolio-Hub.git
cd AI-Portfolio-Hub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"

# Email (optional but recommended)
RESEND_API_KEY="re_YourResendApiKey"
```

**Get a free PostgreSQL database:**
- [Neon](https://neon.tech) - Serverless PostgreSQL (Recommended)
- [Supabase](https://supabase.com) - Open source Firebase alternative
- [Railway](https://railway.app) - Deploy infrastructure

**Get a free Resend API key:**
- Sign up at [resend.com](https://resend.com)
- Free tier: 3,000 emails/month

### 4. Run database migrations

```bash
npx drizzle-kit push
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
AI-Portfolio-Hub/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── NetworkBackground.tsx
│   │   │   └── TechBadge.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   │   └── use-portfolio.ts
│   │   ├── lib/           # Utility functions
│   │   │   └── queryClient.ts
│   │   └── pages/         # Route pages
│   │       ├── Home.tsx
│   │       ├── ProjectDetail.tsx
│   │       └── not-found.tsx
│   └── index.html
├── server/                 # Backend Express application
│   ├── db.ts              # Database configuration
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes & seeding
│   └── storage.ts         # Database operations (Drizzle ORM)
├── shared/                 # Shared TypeScript types
│   ├── routes.ts          # API route definitions
│   └── schema.ts          # Zod validation schemas
├── migrations/             # Database migration files
├── drizzle.config.ts      # Drizzle ORM configuration
├── vite.config.ts         # Vite build configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## 🗄️ Database Schema

### Projects Table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  methodology TEXT NOT NULL,
  outcome TEXT NOT NULL,
  tech_stack TEXT NOT NULL,        -- JSON array as string
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Skills Table
```sql
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INTEGER DEFAULT 50   -- 0-100
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | Run TypeScript type checking |
| `npx drizzle-kit push` | Push database schema changes |
| `npx drizzle-kit studio` | Open Drizzle Studio (database GUI) |
| `npx drizzle-kit generate` | Generate SQL migration files |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Add environment variables in Vercel dashboard:**
   - Go to **Settings** → **Environment Variables**
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Add `RESEND_API_KEY` with your Resend API key
   - Select all environments (Production, Preview, Development)
   - Save and redeploy

4. **Deploy updates:**
```bash
vercel --prod
```

### Alternative: Railway

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Deploy:**
```bash
railway login
railway init
railway up
```

3. **Set environment variables in Railway dashboard**

### Alternative: Render

1. Push your code to GitHub
2. Connect your repository on [render.com](https://render.com)
3. Configure:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
4. Add environment variables (`DATABASE_URL`, `RESEND_API_KEY`)

## 🎨 Customization

### Update Project Data

Projects are automatically seeded on first run. To modify seed data, edit `server/routes.ts`:

```typescript
await storage.createProject({
  title: "Your Project Title",
  shortDescription: "Brief description for the card",
  problemStatement: "What problem does it solve?",
  methodology: "How was it built? What technologies?",
  outcome: "What were the results and impact?",
  techStack: JSON.stringify(["Python", "TensorFlow", "Docker"]),
  githubUrl: "https://github.com/username/repo",
  demoUrl: "https://demo.example.com",
  imageUrl: "https://images.unsplash.com/photo-..."
});
```

### Update Skills

Modify the skills array in `server/routes.ts`:

```typescript
const skillsData = [
  { name: "Python", category: "Languages", proficiency: 95 },
  { name: "PyTorch", category: "Machine Learning", proficiency: 90 },
  { name: "Docker", category: "Infrastructure", proficiency: 85 },
  // Add more skills...
];
```

### Customize Theme Colors

Edit colors in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: "hsl(var(--primary))",      // Main accent color
      secondary: "hsl(var(--secondary))",  // Secondary elements
      background: "hsl(var(--background))", // Page background
      // Customize more colors...
    }
  }
}
```

Or edit CSS variables in `client/src/index.css`:

```css
:root {
  --primary: 266 100% 60%;    /* Purple accent */
  --secondary: 240 5% 15%;    /* Dark gray */
  --background: 240 10% 5%;   /* Near black */
}
```

### Update Contact Email

Change the recipient email in `server/routes.ts`:

```typescript
await resend.emails.send({
  from: 'Portfolio Contact <onboarding@resend.dev>',
  to: 'your.email@example.com',  // ← Change this
  subject: `New Contact Form Message from ${input.name}`,
  // ...
});
```

## 🐛 Troubleshooting

### Database Connection Issues

**Error:** `ECONNREFUSED ::1:5432`

**Solution:** 
- Verify your `DATABASE_URL` is correct and accessible
- Check that PostgreSQL is running (or use hosted service like Neon)
- Ensure your IP is whitelisted in database settings

### Email Not Sending

**Error:** Resend API errors

**Solution:**
- Verify `RESEND_API_KEY` is set correctly
- Check API key permissions in Resend dashboard
- Verify sender email domain (use `onboarding@resend.dev` for testing)

### Build Errors

**Error:** TypeScript compilation errors

**Solution:**
```bash
npm run check  # See detailed type errors
npm install    # Reinstall dependencies
```

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Miracle Messiri**

- GitHub: [@Messiri4](https://github.com/Messiri4)
- Portfolio: [ai-portfolio-hub.vercel.app](https://ai-portfolio-hub.vercel.app)
- Email: Contact via portfolio form

## 🙏 Acknowledgments

- Design inspiration from modern cyberpunk aesthetics and terminal interfaces
- Icons from [Lucide React](https://lucide.dev)
- Animations powered by [Framer Motion](https://www.framer.com/motion)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com)
- Charts built with [Recharts](https://recharts.org)
- Email service by [Resend](https://resend.com)

## 📧 Contact

For questions, feedback, or collaboration opportunities, please use the contact form on the [live site](https://ai-portfolio-hub.vercel.app) or open an issue on GitHub.

---

**⭐ If you find this project useful, please consider giving it a star!**

**🚀 Built with modern web technologies and a focus on performance, type safety, and developer experience.**
