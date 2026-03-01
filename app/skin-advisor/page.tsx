import { Metadata } from 'next';
import SkinAdvisorClient from '@/components/features/SkinAdvisorClient';

export const metadata: Metadata = {
    title: 'AI Skin Advisor | Chame Beauty',
    description: 'Get personalized skincare recommendations and expert advice from our AI-powered skin advisor. Discover your perfect routine today.',
    openGraph: {
        title: 'AI Skin Advisor | Chame Beauty',
        description: 'Personalized skincare routines and product recommendations powered by AI.',
        type: 'website',
    },
};

export default function SkinAdvisorPage() {
    return <SkinAdvisorClient />;
}
