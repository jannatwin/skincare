'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';
import { ProductCard } from '@/components/features/ProductCard';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase/client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, Loader2, X } from 'lucide-react';

export default function ShopPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const search = searchParams.get('search');
    const selectedCategory = searchParams.get('category') || 'all';
    const selectedSubcategory = searchParams.get('subcategory') || 'all';
    const sortBy = searchParams.get('sort') || 'name';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, selectedSubcategory, sortBy, search]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            console.log('Fetching products with:', { selectedCategory, selectedSubcategory, sortBy, search });
            let query = supabase.from('products').select('*');

            if (selectedCategory !== 'all') {
                query = query.eq('category', selectedCategory);
            }

            if (selectedSubcategory !== 'all') {
                query = query.eq('subcategory', selectedSubcategory);
            }

            if (search) {
                query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
            }

            // Sorting
            if (sortBy === 'price-low') {
                query = query.order('price', { ascending: true });
            } else if (sortBy === 'price-high') {
                query = query.order('price', { ascending: false });
            } else {
                query = query.order('name', { ascending: true });
            }

            const { data, error } = await query;
            console.log('Query result:', { dataCount: data?.length, error });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateFilters = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === 'all') {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        // Reset subcategory if category changes
        if (updates.category && !updates.subcategory) {
            params.delete('subcategory');
        }
        router.push(`/shop?${params.toString()}`);
    };

    const subcategories = {
        skincare: ['Cleanser', 'Serum', 'Moisturizer', 'Sunscreen', 'Exfoliator', 'Facewash'],
        makeup: ['Foundation', 'Concealer', 'Lipstick', 'Blush', 'Primer', 'Setting Spray', 'Compact / Powder'],
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            {/* Header */}
            <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-serif font-bold mb-4">Shop All Products</h1>
                    <p className="text-xl opacity-90">Discover our complete collection of premium beauty essentials</p>
                </div>
            </section>

            {/* Filters and Products */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <div className="lg:w-64 flex-shrink-0">
                            <div className="bg-white rounded-large shadow-soft p-6 sticky top-24">
                                <div className="flex items-center mb-6">
                                    <Filter className="w-5 h-5 mr-2 text-primary" />
                                    <h2 className="text-xl font-semibold">Filters</h2>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3 text-gray-800">Category</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                value="all"
                                                checked={selectedCategory === 'all'}
                                                onChange={(e) => updateFilters({ category: e.target.value })}
                                                className="mr-2 accent-primary"
                                            />
                                            <span className="text-gray-700">All Products</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                value="skincare"
                                                checked={selectedCategory === 'skincare'}
                                                onChange={(e) => updateFilters({ category: e.target.value })}
                                                className="mr-2 accent-primary"
                                            />
                                            <span className="text-gray-700">Skincare</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                value="makeup"
                                                checked={selectedCategory === 'makeup'}
                                                onChange={(e) => updateFilters({ category: e.target.value })}
                                                className="mr-2 accent-primary"
                                            />
                                            <span className="text-gray-700">Makeup</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Subcategory Filter */}
                                {selectedCategory !== 'all' && (
                                    <div className="mb-6">
                                        <h3 className="font-semibold mb-3 text-gray-800">Subcategory</h3>
                                        <div className="space-y-2">
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="subcategory"
                                                    value="all"
                                                    checked={selectedSubcategory === 'all'}
                                                    onChange={(e) => updateFilters({ subcategory: e.target.value })}
                                                    className="mr-2 accent-primary"
                                                />
                                                <span className="text-gray-700">All</span>
                                            </label>
                                            {subcategories[selectedCategory as keyof typeof subcategories]?.map((sub) => (
                                                <label key={sub} className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="subcategory"
                                                        value={sub}
                                                        checked={selectedSubcategory === sub}
                                                        onChange={(e) => updateFilters({ subcategory: e.target.value })}
                                                        className="mr-2 accent-primary"
                                                    />
                                                    <span className="text-gray-700">{sub}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Sort By */}
                                <div>
                                    <h3 className="font-semibold mb-3 text-gray-800">Sort By</h3>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => updateFilters({ sort: e.target.value })}
                                        className="w-full px-4 py-2 rounded-medium border-2 border-lavender-light focus:border-primary focus:outline-none"
                                    >
                                        <option value="name">Name (A-Z)</option>
                                        <option value="price-low">Price (Low to High)</option>
                                        <option value="price-high">Price (High to Low)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="flex-1">
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                <p className="text-gray-600">
                                    Showing <span className="font-semibold text-primary">{products.length}</span> products
                                    {search && (
                                        <>
                                            {' '}for <span className="font-semibold">"{search}"</span>
                                        </>
                                    )}
                                </p>
                                {search && (
                                    <Link
                                        href="/shop"
                                        className="flex items-center text-sm text-gray-500 hover:text-primary transition-colors bg-white px-3 py-1 rounded-full shadow-sm"
                                    >
                                        <X className="w-4 h-4 mr-1" />
                                        Clear Search
                                    </Link>
                                )}
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-gray-500 text-lg">No products found matching your search</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
