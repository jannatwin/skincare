'use client';

import React from 'react';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            <article className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Legal</span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 uppercase tracking-tight">Privacy Policy</h1>
                        <p className="text-gray-500 mt-6 text-sm italic">Last Updated: February 20, 2024</p>
                    </div>

                    <div className="bg-white rounded-large shadow-large border border-lavender-light p-8 md:p-16 prose prose-mauve max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">1. Introduction</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                At Chame Beauty, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">2. Data We Collect</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                                <li><strong>Financial Data</strong> includes payment card details.</li>
                                <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, and location.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">3. How We Use Your Data</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>To register you as a new customer.</li>
                                <li>To process and deliver your order.</li>
                                <li>To manage our relationship with you.</li>
                                <li>To improve our website, products, and services.</li>
                                <li>To send you marketing communications where you have opted in.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">4. Data Security</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-lavender-light pb-2">5. Contact Us</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                If you have any questions about this privacy policy or our privacy practices, please contact our data privacy manager at <span className="text-primary font-bold">privacy@chamebeauty.com</span>.
                            </p>
                        </section>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
}
