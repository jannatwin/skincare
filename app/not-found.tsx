import Link from 'next/link';
import { Navbar } from '@/components/features/Navbar';
import { Footer } from '@/components/features/Footer';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-cream flex flex-col">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-9xl font-serif font-bold text-primary mb-4 opacity-20">404</h1>
                <h2 className="text-3xl font-serif font-bold mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    The page you are looking for might have been moved, deleted, or never existed.
                </p>
                <Link href="/">
                    <Button size="lg">
                        Back to Home
                    </Button>
                </Link>
            </main>
            <Footer />
        </div>
    );
}
