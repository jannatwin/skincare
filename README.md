# Chame - Premium Skincare & Makeup E-commerce Platform

A production-ready full-stack e-commerce platform for skincare and makeup products with AI-powered skin advisor, admin dashboard, and comprehensive SEO optimization.

![Chame Beauty](https://images.unsplash.com/photo-1596704017254-9b121068ec31?q=80&w=1200&h=400&fit=crop)

## ✨ Features

### 🛍️ E-commerce Functionality
- **100 Premium Products** - Curated collection of skincare and makeup products
- **Smart Filtering** - Filter by category, subcategory, and skin type
- **Shopping Cart** - Full cart management with localStorage persistence
- **Wishlist** - Save favorite products for later
- **Stripe Integration** - Secure payment processing (test mode)
- **Order Management** - Track orders and order history

### 🤖 AI Skin Advisor
- **Guided Recommendations** - Select skin type, concerns, and budget for personalized suggestions
- **Free Chat Mode** - Conversational AI for skincare advice
- **Morning & Night Routines** - AI-generated skincare routines
- **Product Recommendations** - Smart suggestions from database
- **Chat History** - All conversations logged for admin review

### 👨‍💼 Admin Dashboard
- **Revenue Analytics** - Total revenue, orders, and customer stats
- **Monthly Charts** - Visual revenue tracking
- **Order Management** - Update order status and payment status
- **Product CRUD** - Add, edit, and delete products
- **Customer Management** - View customer list with order history
- **AI Chat Logs** - Review all AI advisor conversations
- **Low Stock Alerts** - Automatic notifications for low inventory

### 🎨 Design & UI
- **Premium Aesthetic** - Elegant beauty brand design with soft pastels
- **Custom Color Palette** - Mauve (#A0849D), soft pink (#D3B3B8), lavender tones
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - Framer Motion for delightful interactions
- **Glassmorphism Effects** - Modern UI with backdrop blur

### 🔍 SEO Optimized
- **Dynamic Metadata** - Unique meta tags for each product
- **Structured Data** - Product schema for rich snippets
- **SEO-Friendly URLs** - Clean slugs for all products
- **Sitemap Generation** - Automatic sitemap.xml
- **Open Graph Tags** - Social media preview optimization
- **Performance Optimized** - Fast load times, lazy loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)
- Stripe account (test mode)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skincare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your API keys:
   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase database**

   a. Create a new Supabase project at [supabase.com](https://supabase.com)
   
   b. Run the schema SQL:
   - Go to SQL Editor in Supabase Dashboard
   - Copy contents from `lib/supabase/schema.sql`
   - Execute the SQL

   c. Seed the database with products:
   - Copy contents from `lib/supabase/seed.sql`
   - Execute the SQL
   - This will create 100 demo products

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
skincare/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Homepage
│   ├── shop/                # Shop pages
│   ├── product/[slug]/      # Product detail pages
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   ├── dashboard/           # User dashboard
│   ├── admin/               # Admin dashboard
│   ├── skin-advisor/        # AI skin advisor
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # Base UI components
│   └── features/            # Feature components
├── contexts/                # React Context providers
├── lib/                     # Utilities and configurations
│   ├── supabase/           # Database schema and client
│   ├── stripe.ts           # Stripe configuration
│   └── openai.ts           # OpenAI configuration
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## 🗄️ Database Schema

### Tables
- **users** - User accounts with role-based access (user/admin)
- **products** - Product catalog with full details
- **orders** - Customer orders
- **order_items** - Individual items in orders
- **ai_chat_logs** - AI advisor conversation history

### Row Level Security (RLS)
All tables have RLS policies enabled for secure data access.

## 🧪 Testing

### Test Stripe Payments
Use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date and any 3-digit CVC

### Test Admin Access
Create a user in Supabase and manually set their role to 'admin' in the users table.

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add all environment variables
   - Deploy!

3. **Update Stripe Webhook**
   - After deployment, update `STRIPE_WEBHOOK_SECRET` with production webhook secret
   - Set webhook URL to `https://your-domain.vercel.app/api/webhook/stripe`

## 📊 Admin Dashboard Access

To access the admin dashboard:
1. Create a user account
2. Go to Supabase Dashboard → Table Editor → users
3. Find your user and change `role` from 'user' to 'admin'
4. Visit `/admin` to access the dashboard

## 🎨 Color Palette

- **Primary Mauve**: `#A0849D`
- **Soft Pink**: `#D3B3B8`
- **Light Lavender**: `#E3DAE7`
- **Pale Lavender**: `#EEECF3`
- **Rose Gold**: `#C9A0A0`
- **Cream White**: `#FAF8F5`

## 📝 Product Categories

### Skincare
- Cleanser
- Serum
- Moisturizer
- Sunscreen
- Exfoliator
- Facewash

### Makeup
- Foundation
- Concealer
- Lipstick
- Blush
- Primer
- Setting Spray
- Compact / Powder

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with Next.js 14, TypeScript, and Tailwind CSS
- Database powered by Supabase
- Payments by Stripe
- AI by OpenAI
- Icons by Lucide React
- Images from Unsplash

---

**Made with 💜 for beautiful skin**
