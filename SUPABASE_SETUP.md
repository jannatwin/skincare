# Supabase Setup Guide for Chame E-commerce Platform

This guide will walk you through setting up Supabase for your skincare & makeup e-commerce platform.

## Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up using:
   - GitHub (recommended)
   - Google
   - Email

## Step 2: Create a New Project

1. After signing in, click **"New Project"**
2. Fill in the project details:
   - **Name**: `chame-ecommerce` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Select **Free** tier (perfect for development)

3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be set up

## Step 3: Get Your API Keys

1. Once the project is ready, go to **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see two important keys:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   **anon public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
   ```

4. Copy these values - you'll need them for your `.env.local` file

## Step 4: Get Service Role Key (for Admin Operations)

1. Still in **Settings → API**
2. Scroll down to find **service_role key** (this is secret!)
3. Click **"Reveal"** and copy the key
4. ⚠️ **IMPORTANT**: Never expose this key in client-side code!

## Step 5: Set Up the Database Schema

1. In your Supabase dashboard, click **SQL Editor** (in the sidebar)
2. Click **"New query"**
3. Open the file `d:\skincare\lib\supabase\schema.sql` in your code editor
4. Copy the **entire contents** of the file
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: ✅ **Success. No rows returned**

This creates all the necessary tables:
- `users` - User accounts
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items
- `ai_chat_logs` - AI conversation history

## Step 6: Seed the Database with Products

1. Still in the **SQL Editor**, click **"New query"** again
2. Open the file `d:\skincare\lib\supabase\seed.sql`
3. Copy the **entire contents**
4. Paste it into the SQL Editor
5. Click **"Run"**
6. You should see: ✅ **Success. No rows returned**

This adds 100 realistic products to your database!

## Step 7: Verify the Data

1. Click **Table Editor** in the sidebar
2. Select the **products** table
3. You should see 100 products with:
   - Names, descriptions, prices
   - Categories (skincare/makeup)
   - Subcategories
   - Ingredients, benefits, skin types
   - Stock quantities

## Step 8: Configure Environment Variables

1. In your project folder, locate `.env.example`
2. Create a new file called `.env.local` (copy from `.env.example`)
3. Fill in your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe Configuration (leave empty for now)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# OpenAI Configuration (leave empty for now)
OPENAI_API_KEY=

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Save the file

## Step 9: Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Email** provider
3. Make sure it's **enabled** (should be by default)
4. Configure email settings:
   - **Enable email confirmations**: ON (recommended)
   - **Secure email change**: ON
   - **Secure password change**: ON

## Step 10: Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the email templates:
   - **Confirm signup**: Welcome email
   - **Magic Link**: Passwordless login
   - **Change Email Address**: Email change confirmation
   - **Reset Password**: Password reset email

You can customize the design and content to match your brand!

## Step 11: Test the Connection

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000 in your browser
3. Navigate to the **Shop** page
4. You should see 100 products loaded from Supabase!

## Step 12: Test Authentication

1. Go to http://localhost:3000/register
2. Create a new account with:
   - Your name
   - Email address
   - Password (at least 6 characters)
3. Check your email for a confirmation link
4. Click the confirmation link
5. Go to http://localhost:3000/login
6. Sign in with your credentials
7. You should be redirected to the dashboard!

## Step 13: Make Yourself an Admin (Optional)

To access the admin dashboard:

1. In Supabase, go to **Table Editor**
2. Select the **users** table
3. Find your user account (by email)
4. Click **Edit** on your row
5. Change the **role** field from `user` to `admin`
6. Click **Save**
7. Now you can access `/admin` routes!

## Troubleshooting

### Products not showing?
- Check that you ran both `schema.sql` and `seed.sql`
- Verify in Table Editor that products table has 100 rows
- Check browser console for errors

### Can't sign up?
- Verify your `.env.local` file has correct Supabase keys
- Check that email provider is enabled in Authentication settings
- Look for errors in browser console

### Email confirmation not arriving?
- Check your spam folder
- In Supabase, go to Authentication → Settings
- Disable "Enable email confirmations" for testing
- Re-enable it for production

### RLS (Row Level Security) errors?
- The schema.sql file includes all necessary RLS policies
- If you get permission errors, verify the policies are created
- Check in SQL Editor: `SELECT * FROM pg_policies;`

## Next Steps

Now that Supabase is set up, you can:

1. ✅ Browse products on the shop page
2. ✅ Add items to cart
3. ✅ Create an account and sign in
4. ✅ View your dashboard
5. 🔄 Set up Stripe for payments (next guide)
6. 🔄 Set up OpenAI for AI skin advisor (next guide)
7. 🔄 Build the admin dashboard

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Use environment variables** - Never hardcode API keys
3. **Enable RLS** - All tables have Row Level Security enabled
4. **Use service role key carefully** - Only in server-side code
5. **Enable email confirmation** - Prevents fake accounts
6. **Use strong passwords** - Enforce password requirements

## Support

If you encounter any issues:
- Check [Supabase Documentation](https://supabase.com/docs)
- Visit [Supabase Discord](https://discord.supabase.com)
- Review the error messages in browser console
- Check Supabase dashboard logs

---

**Congratulations! Your Supabase database is now set up and ready to use! 🎉**
