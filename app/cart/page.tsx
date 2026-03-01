'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';
import { Button } from '@/components/ui/Button';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-cream">
                <Navbar />
                <div className="h-10"></div>
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-2xl mx-auto text-center">
                        <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                        <h1 className="text-4xl font-serif font-bold mb-4">Your Cart is Empty</h1>
                        <p className="text-gray-600 mb-8">
                            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
                        </p>
                        <Link href="/shop">
                            <Button size="lg">Start Shopping</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />
            <div className="h-10"></div>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold mb-8">Shopping Cart</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item.product.id} className="bg-white rounded-large shadow-soft p-6">
                                    <div className="flex gap-6">
                                        {/* Product Image */}
                                        <div className="relative w-32 h-32 flex-shrink-0 rounded-medium overflow-hidden bg-lavender-pale">
                                            <Image
                                                src={item.product.image_url || '/placeholder-product.jpg'}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-2">
                                                <div>
                                                    <Link href={`/product/${item.product.slug}`}>
                                                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                                                            {item.product.name}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-sm text-gray-600">{item.product.subcategory}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-full bg-lavender-pale hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.product.stock}
                                                        className="w-8 h-8 rounded-full bg-lavender-pale hover:bg-primary hover:text-white transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-primary">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        ${item.product.price.toFixed(2)} each
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={clearCart}
                                className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                            >
                                Clear Cart
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-large shadow-soft p-6 sticky top-24">
                                <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax</span>
                                        <span>${(cartTotal * 0.1).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-lavender-light pt-3 mt-3">
                                        <div className="flex justify-between text-xl font-bold">
                                            <span>Total</span>
                                            <span className="text-primary">${(cartTotal * 1.1).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/checkout">
                                    <Button size="lg" className="w-full mb-3">
                                        Proceed to Checkout
                                    </Button>
                                </Link>

                                <Link href="/shop">
                                    <Button size="lg" variant="outline" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </Link>

                                {/* Trust Badges */}
                                <div className="mt-6 pt-6 border-t border-lavender-light">
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                            <span>Secure Checkout</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                            <span>Free Shipping on All Orders</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                            <span>30-Day Money Back Guarantee</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
