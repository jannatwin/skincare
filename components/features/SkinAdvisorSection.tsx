'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, ChevronLeft, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase/client';

const SKIN_TYPES = [
    { name: 'Oily', image: '/images/skin-advisor/oily.jpg' },
    { name: 'Dry', image: '/images/skin-advisor/dry.png' },
    { name: 'Combination', image: '/images/skin-advisor/combination.png' },
    { name: 'Sensitive', image: '/images/skin-advisor/sensitive.png' },
    { name: 'Normal', image: '/images/skin-advisor/normal.png' },
];

const CONCERNS = [
    { name: 'Uneven skintone', image: 'https://images.pexels.com/photos/24735915/pexels-photo-24735915.jpeg' },
    { name: 'Dullness', image: '/images/skin-advisor/dullness.jpg' },
    { name: 'Blackheads', image: '/images/skin-advisor/blackheads.jpg' },
    { name: 'Dryness', image: '/images/skin-advisor/dryness.jpg' },
    { name: 'Acne', image: '/images/skin-advisor/acne.png' },
];

export function SkinAdvisorSection() {
    const [step, setStep] = useState(1);
    const [skinType, setSkinType] = useState('');
    const [concern, setConcern] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const getRecommendations = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/skin-advisor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode: 'guided',
                    skinType,
                    concern,
                    budget: 'Mid Range ($$)' // Default budget for homepage section
                })
            });
            const data = await res.json();
            setResults(data);

            const ids = data.recommendations?.map((r: any) => r.id) || [];

            if (ids.length > 0) {
                const { data: products, error } = await supabase
                    .from('products')
                    .select('*')
                    .in('id', ids);

                if (!error && products) {
                    setRecommendedProducts(products);
                }
            }

            setStep(3);
        } catch (error) {
            console.error('Failed to get recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-cream/30 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-slide-up">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                        Ask <span className="gradient-text">AI</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Personalized skincare recommendations tailored to your unique needs
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-serif font-bold text-gray-800">Select Your Skin Type</h3>
                                    <p className="text-gray-500 mt-2">Step 1 of 2</p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                                    {SKIN_TYPES.map((type) => (
                                        <div
                                            key={type.name}
                                            onClick={() => setSkinType(type.name)}
                                            className={`group cursor-pointer text-center transition-all ${skinType === type.name ? 'scale-105' : 'opacity-80 hover:opacity-100'
                                                }`}
                                        >
                                            <div className={`relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden mb-3 border-4 transition-all ${skinType === type.name ? 'border-primary shadow-glow' : 'border-transparent shadow-soft'
                                                }`}>
                                                <Image
                                                    src={type.image}
                                                    alt={type.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                {skinType === type.name && (
                                                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                        <div className="bg-primary text-white p-2 rounded-full">
                                                            <Check size={20} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`text-sm md:text-base font-semibold ${skinType === type.name ? 'text-primary' : 'text-gray-600'}`}>
                                                {type.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center mt-12">
                                    <Button
                                        size="lg"
                                        disabled={!skinType}
                                        onClick={handleNext}
                                        className="px-12 py-6 text-lg rounded-full shadow-glow"
                                    >
                                        Next Step
                                        <ChevronRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-serif font-bold text-gray-800">Shop By Concern</h3>
                                    <p className="text-gray-500 mt-2">Step 2 of 2</p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                                    {CONCERNS.map((c) => (
                                        <div
                                            key={c.name}
                                            onClick={() => setConcern(c.name)}
                                            className={`group cursor-pointer text-center transition-all ${concern === c.name ? 'scale-105' : 'opacity-80 hover:opacity-100'
                                                }`}
                                        >
                                            <div className={`relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden mb-3 border-4 transition-all ${concern === c.name ? 'border-primary shadow-glow' : 'border-transparent shadow-soft'
                                                }`}>
                                                <Image
                                                    src={c.image}
                                                    alt={c.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                {concern === c.name && (
                                                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                        <div className="bg-primary text-white p-2 rounded-full">
                                                            <Check size={20} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`text-sm md:text-base font-semibold ${concern === c.name ? 'text-primary' : 'text-gray-600'}`}>
                                                {c.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center gap-6 mt-12">
                                    <Button variant="outline" size="lg" onClick={handleBack} className="rounded-full px-8">
                                        <ChevronLeft className="mr-2 w-5 h-5" />
                                        Back
                                    </Button>
                                    <Button
                                        size="lg"
                                        disabled={!concern || loading}
                                        onClick={getRecommendations}
                                        className="px-12 py-6 text-lg rounded-full shadow-glow"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin mr-2" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                Get Advice
                                                <Sparkles className="ml-2 w-5 h-5" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && results && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-12"
                            >
                                <div className="text-center">
                                    <h3 className="text-3xl font-serif font-bold text-gray-800">Your Skin Analysis</h3>
                                    <p className="text-gray-600 mt-2">Recommended for {skinType} skin and {concern}</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {/* AI Content */}
                                    <div className="space-y-8">
                                        <div className="bg-white p-8 rounded-large shadow-medium border-l-4 border-primary">
                                            <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                                <Sparkles className="text-primary mr-2" /> AI Expert Recommendations
                                            </h4>
                                            <div className="space-y-6">
                                                {results.recommendations?.map((item: any, idx: number) => (
                                                    <div key={idx} className="bg-lavender-pale/50 p-4 rounded-xl">
                                                        <div className="font-bold text-primary">{item.name}</div>
                                                        <p className="text-sm text-gray-600 mt-1">{item.explanation}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-white p-6 rounded-large shadow-soft">
                                                <h4 className="font-bold text-gray-800 mb-4 text-primary">☀️ Morning</h4>
                                                <ul className="text-sm space-y-3">
                                                    {results.morningRoutine?.map((step: string, i: number) => (
                                                        <li key={i} className="flex items-start">
                                                            <Check size={16} className="text-secondary mt-0.5 mr-2 shrink-0" />
                                                            <span className="text-gray-600">{step}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="bg-white p-6 rounded-large shadow-soft">
                                                <h4 className="font-bold text-gray-800 mb-4 text-primary">🌙 Night</h4>
                                                <ul className="text-sm space-y-3">
                                                    {results.nightRoutine?.map((step: string, i: number) => (
                                                        <li key={i} className="flex items-start">
                                                            <Check size={16} className="text-secondary mt-0.5 mr-2 shrink-0" />
                                                            <span className="text-gray-600">{step}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Real Products */}
                                    <div className="space-y-6">
                                        <h4 className="text-2xl font-serif font-bold text-gray-800 text-center lg:text-left">Shop Recommended Products</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {recommendedProducts.length > 0 ? (
                                                recommendedProducts.map((product) => (
                                                    <ProductCard key={product.id} product={product} />
                                                ))
                                            ) : (
                                                <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-large shadow-soft border border-dashed border-gray-300">
                                                    Loading matching products...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-12">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => {
                                            setStep(1);
                                            setSkinType('');
                                            setConcern('');
                                            setResults(null);
                                        }}
                                        className="rounded-full px-12"
                                    >
                                        Start Over
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
