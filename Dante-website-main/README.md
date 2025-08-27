# Dante.dev - Personal Website with Authentication

A modern Next.js website with Supabase authentication integration.

## Features

- ✨ Modern glassmorphism design with animations
- 🔐 Complete authentication system (login/register)
- 👤 User dashboard and profile management
- 📱 Fully responsive design
- 🎨 Framer Motion animations
- 🔥 React Hot Toast notifications

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Authentication**: Supabase
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Icons**: Heroicons & Lucide React
- **Deployment**: Netlify

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your URL and anon key
3. The authentication tables will be created automatically

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Authentication Features

### Pages
- `/auth` - Login/Register page
- `/dashboard` - Protected user dashboard

### Components
- `AuthForm` - Unified login/register form
- `AuthContext` - Authentication state management
- Updated `Header` - Dynamic auth buttons and user menu

### Authentication Flow
1. Users can register with email/password
2. Email verification is required
3. Protected routes redirect to login
4. User dashboard shows profile information
5. Logout functionality available in header menu

## Deployment

The site is configured for Netlify deployment with:
- Static export configuration
- Proper build settings in `netlify.toml`
- Environment variables support

## Project Structure

```
src/
├── app/
│   ├── auth/page.tsx          # Authentication page
│   ├── dashboard/page.tsx     # User dashboard
│   ├── layout.tsx             # Root layout with AuthProvider
│   └── page.tsx               # Home page
├── components/
│   ├── AuthForm.tsx           # Login/Register form
│   ├── Header.tsx             # Navigation with auth
│   └── ...                    # Other components
├── contexts/
│   └── AuthContext.tsx        # Authentication context
└── lib/
    └── supabase.ts            # Supabase client
```

## Usage

1. Visit the site and click "Get Started" or "Sign In"
2. Register a new account or login with existing credentials
3. Access the dashboard to view profile information
4. Use the header menu to navigate or logout

## Environment Variables Required

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

Make sure to add these to your deployment environment as well.
