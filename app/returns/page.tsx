'use client';

import React from 'react';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';
import { ShieldCheck, RotateCcw, Truck, MessageSquare } from 'lucide-react';

export default function ReturnsPage() {
    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            {/* Header */}
            <header className="py-20 text-center">
                <div className="container mx-auto px-4">
                    <span className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Customer Care</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 uppercase tracking-tight">Returns & Exchanges</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-8"></div>
                </div>
            </header>

            {/* Policy Content */}
            <section className="pb-24 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white rounded-large shadow-large border border-lavender-light p-8 md:p-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                            <div className="flex items-start space-x-6">
                                <div className="w-12 h-12 bg-lavender-pale rounded-full flex items-center justify-center shrink-0">
                                    <RotateCcw className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">30-Day Returns</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Not quite right? We offer hassle-free returns on all unopened products within 30 days of purchase.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-6">
                                <div className="w-12 h-12 bg-lavender-pale rounded-full flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Quality Guarantee</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Received a damaged or incorrect item? Our team will replace it immediately at no extra cost to you.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <article>
                                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center mr-4">1</span>
                                    How to Start a Return
                                </h2>
                                <div className="pl-12 space-y-4 text-gray-600 leading-relaxed">
                                    <p>To initiate a return or exchange, please follow these simple steps:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Contact our support team at <span className="text-primary font-bold">returns@chamebeauty.com</span> with your order number.</li>
                                        <li>Clearly state the reason for your return and whether you prefer a refund or an exchange.</li>
                                        <li>Our team will provide you with a pre-paid shipping label and further instructions within 24-48 hours.</li>
                                    </ul>
                                </div>
                            </article>

                            <article>
                                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center mr-4">2</span>
                                    Refund Timing
                                </h2>
                                <div className="pl-12 space-y-4 text-gray-600 leading-relaxed">
                                    <p>Once your return is received and inspected (usually within 3 business days of arrival), we will process your refund or exchange. Refunds will be applied to your original method of payment. Please note that it may take an additional 5-10 business days for the credit to appear on your statement depending on your bank.</p>
                                </div>
                            </article>

                            <article>
                                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center mr-4">3</span>
                                    Non-Returnable Items
                                    <Truck className="w-5 h-5 ml-4 text-gray-400" />
                                </h2>
                                <div className="pl-12 space-y-4 text-gray-600 leading-relaxed">
                                    <p>For health and safety reasons, we cannot accept returns on items that have been opened, used, or altered. This includes all skincare and makeup products where the security seal has been broken.</p>
                                    <p>Gift cards and promotional &quot;final sale&quot; items are also ineligible for returns or exchanges.</p>
                                </div>
                            </article>
                        </div>

                        <div className="mt-20 pt-10 border-t border-lavender-light text-center">
                            <p className="text-gray-500 text-sm mb-6 flex items-center justify-center">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Need more information? Our support team is here to help.
                            </p>
                            <a
                                href="/contact"
                                className="inline-block bg-primary text-white px-8 py-3 rounded-medium font-bold uppercase tracking-widest text-xs hover:bg-primary-dark transition-all hover:shadow-large"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
