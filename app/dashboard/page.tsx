'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Package, Heart, User, LogOut, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
    const router = useRouter();
    const { user, loading, signOut } = useAuth();

    // Redirect to login if not authenticated
    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success('Signed out successfully');
            router.push('/');
        } catch (error) {
            toast.error('Failed to sign out');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-serif font-bold mb-2">
                            Welcome back, <span className="gradient-text">{user.user_metadata?.name || 'there'}</span>!
                        </h1>
                        <p className="text-gray-600">Manage your account and track your orders</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-large shadow-soft p-6">
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold mr-4">
                                        {(user.user_metadata?.name || user.email || 'U')[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{user.user_metadata?.name || 'User'}</h3>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    <button className="w-full flex items-center px-4 py-3 rounded-medium bg-lavender-pale text-primary font-medium transition-colors">
                                        <User className="w-5 h-5 mr-3" />
                                        Profile
                                    </button>
                                    <button className="w-full flex items-center px-4 py-3 rounded-medium hover:bg-lavender-pale text-gray-700 transition-colors">
                                        <Package className="w-5 h-5 mr-3" />
                                        Orders
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center px-4 py-3 rounded-medium hover:bg-red-50 text-red-600 transition-colors"
                                    >
                                        <LogOut className="w-5 h-5 mr-3" />
                                        Sign Out
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Account Info */}
                            <div className="bg-white rounded-large shadow-soft p-6">
                                <h2 className="text-2xl font-serif font-bold mb-6">Account Information</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <p className="mt-1 text-gray-900">{user.user_metadata?.name || 'Not set'}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                                        <p className="mt-1 text-gray-900">{user.email}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Member Since</label>
                                        <p className="mt-1 text-gray-900">
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button variant="outline">Edit Profile</Button>
                                </div>
                            </div>

                            {/* Recent Orders */}
                            <div className="bg-white rounded-large shadow-soft p-6">
                                <h2 className="text-2xl font-serif font-bold mb-6">Recent Orders</h2>

                                <div className="text-center py-12">
                                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                    <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
                                    <Button onClick={() => router.push('/shop')}>
                                        Start Shopping
                                    </Button>
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="bg-gradient-to-br from-lavender-pale to-soft-pink/20 rounded-large p-6">
                                <h3 className="text-xl font-semibold mb-2">Get Personalized Recommendations</h3>
                                <p className="text-gray-600 mb-4">
                                    Try our AI Skin Advisor to get product recommendations tailored to your unique skin needs
                                </p>
                                <Button onClick={() => router.push('/skin-advisor')}>
                                    Try AI Advisor
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
