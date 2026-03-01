import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-lavender-pale to-white pt-16 pb-8 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div>
                        <h2 className="text-3xl font-serif font-bold gradient-text mb-4">chame</h2>
                        <p className="text-gray-600 mb-4">
                            Premium skincare and makeup products tailored to your unique beauty needs.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-soft">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-soft">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-soft">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-soft">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/shop" className="text-gray-600 hover:text-primary transition-colors">
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=skincare" className="text-gray-600 hover:text-primary transition-colors">
                                    Skincare
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=makeup" className="text-gray-600 hover:text-primary transition-colors">
                                    Makeup
                                </Link>
                            </li>
                            <li>
                                <Link href="/skin-advisor" className="text-gray-600 hover:text-primary transition-colors">
                                    Ask AI
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-600 hover:text-primary transition-colors">
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Get In Touch</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-gray-600">
                                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                                <span>123 Beauty Street, Cosmetic City, BC 12345</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-600">
                                <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-600">
                                <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                                <span>hello@chame.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-lavender-light pt-8">
                    <p className="text-center text-gray-600 text-sm">
                        © {new Date().getFullYear()} Chame Beauty. All rights reserved. Made with love for beautiful skin.
                    </p>
                </div>
            </div>
        </footer>
    );
}
