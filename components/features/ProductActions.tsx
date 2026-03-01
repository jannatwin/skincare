'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

interface ProductActionsProps {
    product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
    const { addToCart } = useCart();

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button
                size="lg"
                className="flex-1 h-14 text-lg shadow-glow shadow-primary/20 group overflow-hidden"
                disabled={product.stock === 0}
                onClick={() => addToCart(product)}
            >
                <ShoppingCart className="w-5 h-5 mr-3 transition-transform group-hover:-translate-y-1" />
                Add to Cart
            </Button>
        </div>
    );
}
