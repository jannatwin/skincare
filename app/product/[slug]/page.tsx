import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Product } from '@/types';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';
import { ProductActions } from '@/components/features/ProductActions';
import {
    Star,
    ShieldCheck,
    Truck,
    ShoppingCart,
    Facebook,
    Twitter,
    Link as LinkIcon
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

interface Props {
    params: { slug: string };
}

// Generate dynamic metadata for SEO
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (!product) return { title: 'Product Not Found' };

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${product.name} | Chame Premium Beauty`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.image_url, ...previousImages],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: product.description,
            images: [product.image_url],
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (!product) {
        notFound();
    }

    // Structured Data (JSON-LD) for Google Product Snippets
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image_url,
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: 'Chame',
        },
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
    };

    return (
        <div className="min-h-screen bg-cream">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <div className="h-20" />

            <main className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 shadow-xl overflow-hidden animate-fade-in">
                    {/* Product Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-lavender-pale border border-lavender-light group">
                        <Image
                            src={product.image_url || '/placeholder-product.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            priority
                        />
                        {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                                <span className="text-white text-2xl font-bold px-6 py-2 border-2 border-white rounded-full">
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-6">
                            <span className="text-sm font-bold text-primary uppercase tracking-widest bg-lavender-pale px-3 py-1 rounded-full mb-4 inline-block">
                                {product.category} / {product.subcategory}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex text-rosegold">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                <span className="text-gray-500 text-sm">(120+ Reviews)</span>
                            </div>
                            <p className="text-3xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            {product.description}
                        </p>

                        {/* Skin Type Badge */}
                        {product.skin_type && product.skin_type.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Best for Skin Types:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.skin_type.map((type: string) => (
                                        <span key={type} className="px-4 py-2 bg-cream text-primary border border-primary/20 rounded-xl text-sm font-medium capitalize shadow-sm">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <ProductActions product={product} />

                        {/* Benefits/Promises */}
                        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-lavender-light">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Tested & Proven</h4>
                                    <p className="text-xs text-gray-500 line-clamp-1">Dermatologist approved</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Truck className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Free Express</h4>
                                    <p className="text-xs text-gray-500 line-clamp-1">Orders above $50</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Extended Details Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-soft">
                        <h3 className="text-xl font-serif font-bold mb-4 text-primary">Ingredients</h3>
                        <p className="text-gray-600 leading-relaxed italic">
                            {product.ingredients || "Purified Water, Glycerin, Botanical Extracts, Essential Oils, Vitamins."}
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-soft">
                        <h3 className="text-xl font-serif font-bold mb-4 text-primary">Key Benefits</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {product.benefits || "Instantly hydrates and plumps the skin while providing a natural glow that lasts all day."}
                        </p>
                    </div>
                    <div className="bg-lavender-pale p-8 rounded-3xl border border-lavender-light">
                        <h3 className="text-xl font-serif font-bold mb-4 text-primary">Sustainability</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Recyclable packaging, 100% Vegan formulas, and Cruelty-free certified testing.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
