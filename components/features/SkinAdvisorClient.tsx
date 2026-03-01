'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';

export default function SkinAdvisorClient() {
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
    const [userInput, setUserInput] = useState('');

    const handleChatSubmit = async () => {
        if (!userInput.trim()) return;

        const newMessage = { role: 'user' as const, content: userInput };
        setChatHistory([...chatHistory, newMessage]);
        setUserInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/skin-advisor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode: 'chat', message: userInput })
            });
            const data = await res.json();

            if (!res.ok) {
                setChatHistory(prev => [...prev, {
                    role: 'ai',
                    content: data.response || data.error || 'Something went wrong. Please try again later.'
                }]);
            } else {
                setChatHistory(prev => [...prev, { role: 'ai', content: data.response }]);
            }
        } catch (error) {
            console.error(error);
            setChatHistory(prev => [...prev, {
                role: 'ai',
                content: 'Connection error. Please check your internet or server logs.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 pt-64 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Dedicated spacer to ensure gap from sticky header */}
                    <div className="h-20 w-full" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl font-bold text-[#A0849D] mb-4">Ask AI</h1>
                        <p className="text-[#A0849D]/80 text-lg">Chat freely with our AI beauty expert about your skin concerns and products.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-xl flex flex-col h-[650px] max-w-3xl mx-auto overflow-hidden border border-[#EEECF3]"
                    >
                        <div className="bg-[#A0849D] p-6 flex justify-between items-center">
                            <div className="flex items-center text-white">
                                <MessageSquare className="mr-3" />
                                <div>
                                    <h3 className="font-bold">Chame Beauty Expert</h3>
                                    <p className="text-xs opacity-80">AI Powered Skincare Analysis</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-[#FAF8F5]/50">
                            {chatHistory.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="bg-[#E3DAE7] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="text-[#A0849D]" size={40} />
                                    </div>
                                    <h4 className="text-xl font-bold text-[#A0849D]">Hello Gorgeous!</h4>
                                    <p className="text-[#A0849D]/70 max-w-xs mx-auto mt-2">Describe your skin concerns, routine, or ask for ingredient advice. I'm here to help!</p>
                                </div>
                            )}
                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-[#A0849D] text-white' : 'bg-white shadow-sm border border-[#EEECF3] text-[#A0849D]'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white shadow-sm border border-[#EEECF3] p-4 rounded-2xl">
                                        <Loader2 className="animate-spin text-[#A0849D]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-white border-t border-[#EEECF3]">
                            <form onSubmit={(e) => { e.preventDefault(); handleChatSubmit(); }} className="flex gap-2">
                                <Input
                                    placeholder="Type your concern here..."
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    className="border-[#EEECF3] focus:ring-[#A0849D]"
                                />
                                <Button
                                    type="submit"
                                    disabled={loading || !userInput.trim()}
                                    className="bg-[#A0849D] hover:bg-[#8e748b] text-white"
                                >
                                    <Send size={20} />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
