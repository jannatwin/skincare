'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/features/ProductCard';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase/client';
import { SkinAdvisorSection } from '@/components/features/SkinAdvisorSection';
import {
    Sparkles,
    Heart,
    Star,
    TrendingUp,
    ArrowRight,
    ShoppingBag as ShoppingCart,
    ShieldCheck,
    Truck
} from 'lucide-react';

export default function Home() {
    const [bestSellers, setBestSellers] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .limit(4);

                if (error) throw error;
                setBestSellers(data || []);
            } catch (error) {
                console.error('Error fetching best sellers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBestSellers();
    }, []);

    const categories = [
        {
            name: 'Moisturizers',
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop',
            href: '/shop?category=skincare&subcategory=Moisturizer',
        },
        {
            name: 'Sunscreens',
            image: 'https://images.pexels.com/photos/12851388/pexels-photo-12851388.jpeg',
            href: '/shop?category=skincare&subcategory=Sunscreen',
        },
        {
            name: 'Foundations',
            image: 'https://images.pexels.com/photos/34073270/pexels-photo-34073270.jpeg',
            href: '/shop?category=makeup&subcategory=Foundation',
        },
        {
            name: 'Lipsticks',
            image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop',
            href: '/shop?category=makeup&subcategory=Lipstick',
        },
    ];

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            {/* Hero Section with Product Photography Overlay */}
            <section className="relative h-[600px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-lavender-pale via-cream to-soft-pink/30">
                    <Image
                        src="https://images.pexels.com/photos/6690888/pexels-photo-6690888.jpeg"
                        alt="Hero products"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </div>

                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl animate-slide-up">
                        <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6">
                            <span className="text-white">Glow Like</span>
                            <br />
                            <span className="text-black">Never Before!</span>
                        </h1>
                        <p className="text-xl text-white mb-8 max-w-xl">
                            Discover premium skincare and makeup products tailored to your unique beauty needs.
                            Experience the perfect blend of science and luxury.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <Link href="/shop" className="w-full sm:w-auto">
                                <Button size="lg" className="shadow-large h-14 w-full sm:w-auto">
                                    Shop Now
                                </Button>
                            </Link>
                            <Link href="/skin-advisor" className="w-full sm:w-auto">
                                <Button size="lg" variant="secondary" className="h-14 w-full sm:w-auto">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    AI Skin Advisor
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-10 right-10 animate-float hidden md:block">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rosegold/30 to-soft-pink/30 backdrop-blur-sm"></div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-slide-up">
                        <h2 className="text-4xl font-serif font-bold mb-4">
                            <span className="gradient-text">Explore</span> Our Categories
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            From luxurious skincare to stunning makeup, find everything you need for your beauty routine
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="group relative overflow-hidden rounded-large shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2 h-[300px]"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-serif font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        {category.name}
                                    </h3>
                                    <div className="w-10 h-1 bg-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Skin Advisor Section */}
            <SkinAdvisorSection />

            {/* Promotional Banner - Glow Like Never Before Style */}
            <section className="py-20 bg-gradient-to-br from-lavender-pale via-cream to-soft-pink/20 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Left: Promotional Image */}
                        <div className="relative w-[280px] h-[336px] animate-float flex-shrink-0">
                            <Image
                                src="https://images.pexels.com/photos/25355736/pexels-photo-25355736.jpeg"
                                alt="Skincare product left"
                                fill
                                className="object-cover rounded-large border-2 border-primary shadow-soft"
                            />
                        </div>

                        {/* Center: Promotional Text */}
                        <div className="text-center flex-1">
                            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4">
                                <span className="gradient-text">Glow Like Never</span>
                                <br />
                                <span className="text-primary">Before!</span>
                            </h2>
                            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
                                Transform your skincare routine with our exclusive collection.
                                Premium ingredients, visible results.
                            </p>
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <span className="text-4xl font-bold text-primary">$60.00</span>
                                <span className="text-2xl text-gray-500 line-through">$80.00</span>
                            </div>
                            <Link href="/shop">
                                <Button size="lg" className="shadow-glow">
                                    Shop Now
                                </Button>
                            </Link>
                        </div>

                        {/* Right: Promotional Image */}
                        <div className="relative w-[280px] h-[336px] animate-float flex-shrink-0" style={{ animationDelay: '1s' }}>
                            <Image
                                src="https://images.pexels.com/photos/16185701/pexels-photo-16185701.jpeg"
                                alt="Skincare product right"
                                fill
                                className="object-cover rounded-large border-2 border-primary shadow-soft"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
                        <div>
                            <h2 className="text-4xl font-serif font-bold mb-2">
                                <span className="gradient-text">Best</span> Sellers
                            </h2>
                            <p className="text-gray-600">Our most loved products</p>
                        </div>
                        <Link href="/shop" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full sm:w-auto">
                                View All
                                <TrendingUp className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-gray-200 aspect-square rounded-large mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            ))
                        ) : bestSellers.length > 0 ? (
                            bestSellers.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="text-center py-20 col-span-full text-gray-500">
                                Products will be shown once the database is seeded.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section
                className="relative py-32 overflow-hidden bg-fixed bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.pexels.com/photos/19437856/pexels-photo-19437856.jpeg")' }}
            >
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white uppercase tracking-tight">
                            Why Chame?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-white rounded-large shadow-soft">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                            <p className="text-gray-600">
                                Only the finest ingredients and formulations for your skin
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-large shadow-soft">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rosegold to-accent-rose flex items-center justify-center">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
                            <p className="text-gray-600">
                                AI-powered recommendations tailored to your unique skin needs
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-large shadow-soft">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-soft-pink flex items-center justify-center">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Trusted Results</h3>
                            <p className="text-gray-600">
                                Thousands of satisfied customers with glowing reviews
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold mb-4">
                            <span className="gradient-text">Finest</span> Customers
                        </h2>
                        <p className="text-gray-600">Hear what our customers have to say</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-lavender-pale rounded-large p-8">
                            <div className="flex items-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl mr-4">
                                    RG
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Rosie Gale</h4>
                                    <p className="text-sm text-gray-600">Verified Customer</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                "The AI skin advisor helped me find the perfect routine for my sensitive skin.
                                My complexion has never looked better!"
                            </p>
                        </div>

                        <div className="bg-lavender-pale rounded-large p-8">
                            <div className="flex items-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rosegold to-accent-rose flex items-center justify-center text-white font-bold text-xl mr-4">
                                    EN
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Emma Nora</h4>
                                    <p className="text-sm text-gray-600">Verified Customer</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                "Premium quality products at great prices. The foundation is absolutely flawless
                                and lasts all day. Highly recommend!"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary via-secondary to-rosegold text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                        Ready to Transform Your Beauty Routine?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Join thousands of satisfied customers and discover your perfect skincare match with our AI advisor
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/skin-advisor">
                            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-cream">
                                Try AI Skin Advisor
                            </Button>
                        </Link>
                        <Link href="/shop">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
