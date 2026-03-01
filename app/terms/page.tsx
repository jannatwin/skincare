'use client';

import React from 'react';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            <article className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Policy</span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 uppercase tracking-tight">Terms & Conditions</h1>
                        <p className="text-gray-500 mt-6 text-sm italic">Effective Date: February 20, 2024</p>
                    </div>

                    <div className="bg-white rounded-large shadow-large border border-lavender-light p-8 md:p-16 prose prose-mauve max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">1. Agreement to Terms</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                By accessing or using the Chame Beauty website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all of these terms, do not use our services.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">2. Products and Pricing</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                All products are subject to availability, and we reserve the right to impose quantity limits on any order, to reject all or part of an order, and to discontinue products without notice. Prices for our products are subject to change without notice.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">3. User Accounts</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">4. Intellectual Property</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                The Service and its original content, features, and functionality are and will remain the exclusive property of Chame Beauty and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Chame Beauty.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">5. Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                In no event shall Chame Beauty, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">6. Governing Law</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Chame Beauty operates, without regard to its conflict of law provisions.
                            </p>
                        </section>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
}
