'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '../ui/Button';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <Link href={`/product/${product.slug}`}>
            <div className="group bg-white rounded-large overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-lavender-pale">
                    <Image
                        src={product.image_url || '/placeholder-product.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Stock Badge */}
                    {product.stock < 10 && product.stock > 0 && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-rosegold text-white text-xs font-semibold rounded-full">
                            Only {product.stock} left!
                        </div>
                    )}

                    {product.stock === 0 && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
                            Out of Stock
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-3 md:p-4">
                    {/* Category Badge */}
                    <div className="mb-2">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                            {product.subcategory}
                        </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-semibold text-sm md:text-base text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>

                    {/* Skin Type Tags */}
                    {product.skin_type && product.skin_type.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {product.skin_type.slice(0, 2).map((type) => (
                                <span
                                    key={type}
                                    className="text-xs px-2 py-1 bg-lavender-pale text-gray-600 rounded-full"
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <p className="text-lg md:text-2xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>

                        <Button
                            size="sm"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="flex items-center space-x-2"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="hidden sm:inline">Add</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
