-- Simplified Database Schema for Development
-- This version has RELAXED security for easier testing
-- ⚠️ For production, you should enable stricter RLS policies

-- Drop existing tables if they exist
DROP TABLE IF EXISTS ai_chat_logs CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('skincare', 'makeup')),
  subcategory TEXT NOT NULL,
  description TEXT,
  ingredients TEXT,
  benefits TEXT,
  skin_type TEXT[],
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI chat logs table
CREATE TABLE ai_chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  recommended_products JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (but with PERMISSIVE policies for development)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_logs ENABLE ROW LEVEL SECURITY;

-- SIMPLIFIED RLS POLICIES FOR DEVELOPMENT
-- These are VERY permissive to make testing easier

-- Users policies - ALLOW ANYONE TO INSERT (for registration)
CREATE POLICY "Allow public user registration" ON users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own data" ON users
  FOR SELECT
  USING (auth.uid()::text = id::text OR role = 'admin');

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Products policies - PUBLIC READ ACCESS
CREATE POLICY "Anyone can read products" ON products
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert products" ON products
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update products" ON products
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text AND role = 'admin'
    )
  );

-- Orders policies
CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT
  USING (
    user_id::text = auth.uid()::text OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text AND role = 'admin'
    )
  );

CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT
  WITH CHECK (user_id::text = auth.uid()::text);

-- Order items policies
CREATE POLICY "Users can read own order items" ON order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id::text = auth.uid()::text OR
           EXISTS (SELECT 1 FROM users WHERE id::text = auth.uid()::text AND role = 'admin'))
    )
  );

CREATE POLICY "Users can create order items" ON order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id::text = auth.uid()::text
    )
  );

-- AI chat logs policies
CREATE POLICY "Users can read own chat logs" ON ai_chat_logs
  FOR SELECT
  USING (
    user_id::text = auth.uid()::text OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can create chat logs" ON ai_chat_logs
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_ai_chat_logs_user_id ON ai_chat_logs(user_id);

-- Success message
SELECT 'Database schema created successfully with simplified security policies!' as message;
