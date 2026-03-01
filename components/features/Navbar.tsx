'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, User, Menu, X, Search, ChevronDown, Sparkles } from 'lucide-react';

export function Navbar() {
    const { cartCount } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const categories = {
        skincare: [
            { name: 'All Skincare', href: '/shop?category=skincare' },
            { name: 'Cleansers', href: '/shop?category=skincare&subcategory=Cleanser' },
            { name: 'Serums', href: '/shop?category=skincare&subcategory=Serum' },
            { name: 'Moisturizers', href: '/shop?category=skincare&subcategory=Moisturizer' },
            { name: 'Sunscreen', href: '/shop?category=skincare&subcategory=Sunscreen' },
        ],
        makeup: [
            { name: 'All Makeup', href: '/shop?category=makeup' },
            { name: 'Foundations', href: '/shop?category=makeup&subcategory=Foundation' },
            { name: 'Concealers', href: '/shop?category=makeup&subcategory=Concealer' },
            { name: 'Lipsticks', href: '/shop?category=makeup&subcategory=Lipstick' },
            { name: 'Blush', href: '/shop?category=makeup&subcategory=Blush' },
        ]
    };

    const navLinkStyles = "relative py-2 text-gray-700 hover:text-primary transition-colors font-medium group";
    const underlineStyles = "absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full";

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-soft">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <h1 className="text-3xl font-serif font-bold gradient-text">chame</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={navLinkStyles}>
                            Home
                            <span className={underlineStyles}></span>
                        </Link>

                        <div className="relative group">
                            <Link href="/shop" className={`${navLinkStyles} flex items-center`}>
                                Shop
                                <span className={underlineStyles}></span>
                            </Link>
                        </div>

                        {/* Skincare Dropdown */}
                        <div className="relative group">
                            <Link href="/shop?category=skincare" className={`${navLinkStyles} flex items-center`}>
                                Skincare
                                <ChevronDown className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform" />
                                <span className={underlineStyles}></span>
                            </Link>
                            <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-medium py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                {categories.skincare.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-lavender-pale hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Makeup Dropdown */}
                        <div className="relative group">
                            <Link href="/shop?category=makeup" className={`${navLinkStyles} flex items-center`}>
                                Makeup
                                <ChevronDown className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform" />
                                <span className={underlineStyles}></span>
                            </Link>
                            <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-medium py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                {categories.makeup.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-lavender-pale hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link href="/about" className={navLinkStyles}>
                            About
                            <span className={underlineStyles}></span>
                        </Link>
                        <Link href="/contact" className={navLinkStyles}>
                            Contact
                            <span className={underlineStyles}></span>
                        </Link>
                        <Link href="/skin-advisor" className="ml-4 px-4 py-2 border-2 border-primary rounded-full flex items-center text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 group">
                            <Sparkles className="w-4 h-4 mr-2 text-primary group-hover:text-white animate-pulse" />
                            Ask AI
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        <button
                            className="p-2 hover:bg-lavender-pale rounded-full transition-colors"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <Search className="w-5 h-5 text-gray-700" />
                        </button>


                        <Link href="/cart" className="relative p-2 hover:bg-lavender-pale rounded-full transition-colors flex">
                            <ShoppingCart className="w-5 h-5 text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold text-[10px]">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/dashboard" className="p-2 hover:bg-lavender-pale rounded-full transition-colors flex">
                            <User className="w-5 h-5 text-gray-700" />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 hover:bg-lavender-pale rounded-full transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar Overlay */}
                <div className={`absolute inset-x-0 top-0 h-20 bg-white z-[60] flex items-center px-4 transition-all duration-300 transform ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                    <form onSubmit={handleSearch} className="container mx-auto flex items-center">
                        <Search className="w-6 h-6 text-gray-400 mr-4" />
                        <input
                            type="text"
                            placeholder="Search for products, brands, or concerns..."
                            className="flex-1 bg-transparent border-none outline-none text-lg text-gray-800 placeholder-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus={isSearchOpen}
                        />
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen(false)}
                            className="p-2 hover:bg-lavender-pale rounded-full transition-colors ml-4"
                        >
                            <X className="w-6 h-6 text-gray-700" />
                        </button>
                    </form>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-lavender-light animate-slide-up">
                        <div className="flex flex-col space-y-4">
                            <Link href="/" className="text-gray-700 hover:text-primary transition-colors font-medium px-2">
                                Home
                            </Link>
                            <Link href="/shop" className="text-gray-700 hover:text-primary transition-colors font-medium px-2">
                                Shop
                            </Link>

                            {/* Mobile Skincare Submenu */}
                            <div className="flex flex-col space-y-2 px-2">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Skincare</span>
                                {categories.skincare.map((item) => (
                                    <Link key={item.name} href={item.href} className="text-gray-700 hover:text-primary transition-colors pl-2">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Makeup Submenu */}
                            <div className="flex flex-col space-y-2 px-2">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Makeup</span>
                                {categories.makeup.map((item) => (
                                    <Link key={item.name} href={item.href} className="text-gray-700 hover:text-primary transition-colors pl-2">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors font-medium px-2">
                                About
                            </Link>
                            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors font-medium px-2">
                                Contact
                            </Link>
                            <Link href="/skin-advisor" onClick={() => setMobileMenuOpen(false)} className="mt-4 mx-2 px-4 py-3 border-2 border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all font-bold flex items-center justify-center shadow-soft">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Ask AI
                            </Link>

                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
