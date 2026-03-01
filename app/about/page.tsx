'use client';

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                <Image
                    src="https://images.pexels.com/photos/19437856/pexels-photo-19437856.jpeg"
                    alt="Our Story"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-4">
                    <div className="text-center">
                        <span className="text-white text-sm md:text-base tracking-[0.5em] uppercase font-medium mb-4 block">
                            Our Journey
                        </span>
                        <h1 className="text-white text-4xl md:text-7xl font-serif font-bold leading-tight">
                            The Chame Story
                        </h1>
                    </div>
                </div>
            </section>

            {/* Brand Philosophy */}
            <section className="py-20 md:py-32 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Philosophy</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 leading-tight mb-8">
                                RADIANCE FROM <span className="gradient-text">WITHIN</span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Founded in the pursuit of pure, effective beauty, Chame was born from a simple belief: that skincare should be a ritual of self-love. We combine ancient botanical wisdom with modern scientific breakthroughs to create products that don't just sit on the surface, but work in harmony with your skin's natural biology.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Every formula we create is a testament to our commitment to quality, sustainability, and transparency. We believe you deserves to know exactly what goes onto your skin—and why.
                            </p>
                        </div>
                        <div className="relative aspect-[4/5] rounded-large overflow-hidden shadow-large border-8 border-white">
                            <Image
                                src="https://images.pexels.com/photos/3762882/pexels-photo-3762882.jpeg"
                                alt="Skincare routine"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 bg-lavender-pale/50 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 uppercase tracking-tight">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-soft">
                                <span className="text-primary font-serif text-2xl font-bold">01</span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-gray-800">Pure Ingredients</h3>
                            <p className="text-gray-600 text-sm">We source only the finest, ethically produced raw materials for maximum efficacy.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-soft">
                                <span className="text-primary font-serif text-2xl font-bold">02</span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-gray-800">Conscious Beauty</h3>
                            <p className="text-gray-600 text-sm">Our packaging and processes are designed with the planet's future in mind.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-soft">
                                <span className="text-primary font-serif text-2xl font-bold">03</span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-gray-800">Inclusive Care</h3>
                            <p className="text-gray-600 text-sm">Science-backed solutions for every skin tone, type, and concern.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
