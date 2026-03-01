import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: "Chame - Premium Skincare & Makeup",
    description: "Discover premium skincare and makeup products tailored to your unique beauty needs. Shop our curated collection of luxury beauty essentials.",
    keywords: "skincare, makeup, beauty, cosmetics, luxury skincare, premium makeup, beauty products",
    authors: [{ name: "Chame Beauty" }],
    openGraph: {
        title: "Chame - Premium Skincare & Makeup",
        description: "Discover premium skincare and makeup products tailored to your unique beauty needs.",
        type: "website",
        locale: "en_US",
        siteName: "Chame Beauty",
    },
    twitter: {
        card: "summary_large_image",
        title: "Chame - Premium Skincare & Makeup",
        description: "Discover premium skincare and makeup products tailored to your unique beauty needs.",
    },
    robots: {
        index: true,
        follow: true,
    },
    manifest: '/manifest.json',
    category: 'beauty',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} antialiased`}>
                <CartProvider>
                    {children}
                    <Toaster position="top-right" />
                </CartProvider>
            </body>
        </html>
    );
}
