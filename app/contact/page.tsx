'use client';

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';
import { Button } from '@/components/ui/Button';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-black">
                <Image
                    src="https://images.pexels.com/photos/19437856/pexels-photo-19437856.jpeg"
                    alt="Get in Touch"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center px-4">
                    <span className="text-white text-2xl md:text-5xl tracking-[0.3em] md:tracking-[0.6em] uppercase font-serif font-bold text-center">
                        Get in Touch
                    </span>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-12 md:py-24 px-4 bg-cream">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl md:text-6xl font-serif font-bold leading-tight uppercase mb-12 md:mb-20">
                        <span className="gradient-text">Contact Us</span> VIA THE FORM<br className="hidden md:block" />
                        {" "}BELOW & WE&apos;LL GET BACK TO<br className="hidden md:block" />
                        <span className="text-primary">YOU</span> AS SOON AS WE CAN.
                    </h2>

                    <div className="flex flex-col md:flex-row items-start justify-between gap-12 text-left">
                        {/* Left Column: Contact Info */}
                        <div className="w-full md:w-1/3 space-y-10 border-b md:border-b-0 md:border-r border-lavender-light pb-10 md:pb-0 md:pr-12">
                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Email</h3>
                                <p className="text-gray-700 font-medium break-all text-sm md:text-base">info@chamebeauty.com</p>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Phone</h3>
                                <p className="text-gray-700 font-medium text-sm md:text-base">(000) 000-0000</p>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Address</h3>
                                <p className="text-gray-700 font-medium text-sm md:text-base">
                                    1234 Beauty Lane<br />
                                    Skincare City, SC 12345
                                </p>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Social</h3>
                                <div className="flex items-center space-x-4 mt-1">
                                    <Instagram className="w-4 h-4 text-gray-700 cursor-pointer hover:text-primary transition-colors" />
                                    <Facebook className="w-4 h-4 text-gray-700 cursor-pointer hover:text-primary transition-colors" />
                                    <Twitter className="w-4 h-4 text-gray-700 cursor-pointer hover:text-primary transition-colors" />
                                    <Linkedin className="w-4 h-4 text-gray-700 cursor-pointer hover:text-primary transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="w-full md:w-2/3">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 ml-1">Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border-2 border-lavender-light rounded-medium px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors shadow-soft"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 ml-1">Phone</label>
                                        <input
                                            type="tel"
                                            className="w-full bg-white border-2 border-lavender-light rounded-medium px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors shadow-soft"
                                            placeholder="(000) 000-0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 ml-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full bg-white border-2 border-lavender-light rounded-medium px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors shadow-soft"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 ml-1">Message</label>
                                    <textarea
                                        className="w-full bg-white border-2 border-lavender-light rounded-medium px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-primary transition-colors shadow-soft"
                                        placeholder="How can we help you today?"
                                    />
                                </div>
                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full md:w-auto min-w-[180px] shadow-large"
                                    >
                                        Send Message
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
