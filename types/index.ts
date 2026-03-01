// Type definitions for the application

export interface Product {
    id: string;
    name: string;
    slug: string;
    category: 'skincare' | 'makeup';
    subcategory: string;
    description: string;
    ingredients?: string;
    benefits?: string;
    skin_type?: string[];
    price: number;
    stock: number;
    image_url?: string;
    created_at?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    created_at?: string;
}

export interface Order {
    id: string;
    user_id: string;
    total_amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
    created_at?: string;
    items?: OrderItem[];
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
    created_at?: string;
    product?: Product;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface AIMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface AIChatLog {
    id: string;
    user_id?: string;
    user_message: string;
    ai_response: string;
    recommended_products?: any;
    created_at?: string;
}

export interface SkinAdvisorInput {
    skin_type?: string;
    concern?: string;
    budget?: string;
    message?: string;
}

export interface ProductRecommendation {
    product: Product;
    reason: string;
    usage: string;
}

export interface SkincareRoutine {
    morning: ProductRecommendation[];
    night: ProductRecommendation[];
    explanation: string;
}

export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    lowStockProducts: number;
}

export interface MonthlyRevenue {
    month: string;
    revenue: number;
}

export type SkinType = 'oily' | 'dry' | 'combination' | 'normal' | 'sensitive' | 'acne-prone' | 'mature' | 'all';

export type Category = 'skincare' | 'makeup';

export type SkincareSubcategory = 'Cleanser' | 'Serum' | 'Moisturizer' | 'Sunscreen' | 'Exfoliator' | 'Facewash';

export type MakeupSubcategory = 'Foundation' | 'Concealer' | 'Lipstick' | 'Blush' | 'Primer' | 'Setting Spray' | 'Compact / Powder';
