'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Clock, User } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: "The Ultimate Morning Skincare Routine for Radiant Skin",
        excerpt: "Discover the essential steps to kickstart your day with a glow that lasts. From double cleansing to the power of Vitamin C.",
        image: "https://images.pexels.com/photos/3762882/pexels-photo-3762882.jpeg",
        category: "Skincare Tips",
        author: "Sarah J.",
        date: "Feb 15, 2024",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "5 Makeup Trends That Are Dominating This Season",
        excerpt: "From 'doll skin' to bold monochromatic looks, we break down how to achieve these styles using our latest collection.",
        image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg",
        category: "Makeup Trends",
        author: "Emma L.",
        date: "Feb 10, 2024",
        readTime: "4 min read"
    },
    {
        id: 3,
        title: "Why Sustainability is at the Heart of Chame Beauty",
        excerpt: "An inside look at how we source our ingredients and our commitment to eco-friendly packaging for a better tomorrow.",
        image: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg",
        category: "Brand Story",
        author: "Chame Team",
        date: "Feb 05, 2024",
        readTime: "6 min read"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
                <Image
                    src="https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg"
                    alt="The Chame Blog"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
                    <div className="text-center">
                        <span className="text-white text-xs md:text-sm tracking-[0.5em] uppercase font-medium mb-4 block">
                            Journal
                        </span>
                        <h1 className="text-white text-4xl md:text-7xl font-serif font-bold leading-tight">
                            The Chame Blog
                        </h1>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="group bg-white rounded-large overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 border border-lavender-light flex flex-col h-full">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-primary rounded-full shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center space-x-4 text-gray-400 text-[10px] uppercase tracking-wider mb-4">
                                        <span className="flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {post.date}
                                        </span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-lavender-light flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-lavender-pale flex items-center justify-center">
                                                <User className="w-3 h-3 text-primary" />
                                            </div>
                                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{post.author}</span>
                                        </div>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="text-primary hover:text-primary-dark transition-colors inline-flex items-center text-xs font-bold uppercase tracking-widest group/link"
                                        >
                                            Read More
                                            <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Newsletter Section */}
                    <div className="mt-32 bg-primary/10 rounded-large p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Beauty Delivered To Your <span className="gradient-text">Inbox</span></h2>
                            <p className="text-gray-600 mb-10">Sign up for our newsletter and be the first to know about new launches, skincare secrets, and exclusive offers.</p>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 px-6 py-4 rounded-medium border-2 border-primary/20 focus:outline-none focus:border-primary bg-white shadow-soft transition-all"
                                />
                                <Button size="lg" className="whitespace-nowrap shadow-large font-bold">
                                    Join The List
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
