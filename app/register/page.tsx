'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { Eye, EyeOff, UserPlus, Check } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const { signUp } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        if (!agreeToTerms) {
            toast.error('Please agree to the terms and conditions');
            return;
        }

        setLoading(true);

        try {
            await signUp(email, password, name);
            toast.success('Account created! Please check your email to verify.');
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    const passwordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        return strength;
    };

    const strength = passwordStrength(password);
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
                                <UserPlus className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-serif font-bold mb-2">
                                Create <span className="gradient-text">Account</span>
                            </h1>
                            <p className="text-gray-600">Join us and discover your perfect beauty routine</p>
                        </div>

                        {/* Register Form */}
                        <div className="bg-white rounded-large shadow-medium p-8">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <Input
                                    label="Full Name"
                                    type="text"
                                    placeholder="Jane Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />

                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <div className="relative">
                                    <Input
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="space-y-2">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-colors ${i < strength ? strengthColors[strength - 1] : 'bg-gray-200'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            Password strength: <span className="font-semibold">{strengthLabels[strength - 1] || 'Too short'}</span>
                                        </p>
                                    </div>
                                )}

                                <div className="relative">
                                    <Input
                                        label="Confirm Password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Re-enter your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                    {confirmPassword && password !== confirmPassword && (
                                        <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                                    )}
                                    {confirmPassword && password === confirmPassword && (
                                        <p className="mt-1 text-sm text-green-500 flex items-center">
                                            <Check className="w-4 h-4 mr-1" />
                                            Passwords match
                                        </p>
                                    )}
                                </div>

                                {/* Terms and Conditions */}
                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={agreeToTerms}
                                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                                        className="mr-3 mt-1 accent-primary"
                                        required
                                    />
                                    <span className="text-sm text-gray-600">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-primary hover:text-primary-dark">
                                            Terms & Conditions
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="text-primary hover:text-primary-dark">
                                            Privacy Policy
                                        </Link>
                                    </span>
                                </label>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={loading || !agreeToTerms}
                                >
                                    {loading ? 'Creating account...' : 'Create Account'}
                                </Button>
                            </form>

                            {/* Sign In Link */}
                            <div className="mt-6 text-center text-sm">
                                <span className="text-gray-600">Already have an account? </span>
                                <Link
                                    href="/login"
                                    className="text-primary hover:text-primary-dark font-semibold transition-colors"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="mt-8 bg-white rounded-large shadow-soft p-6">
                            <h3 className="font-semibold mb-4 text-gray-800">Why join Chame?</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start">
                                    <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Personalized AI skin advisor for custom recommendations</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Exclusive member discounts and early access to new products</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Track your orders and save your favorite products</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Free shipping on all orders, no minimum required</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
