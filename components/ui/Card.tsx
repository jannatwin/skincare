import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export function Card({ children, className = '', hover = true, onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-large shadow-soft p-6 transition-all duration-300 ${hover ? 'hover:shadow-medium hover:-translate-y-1' : ''
                } ${className} ${onClick ? 'cursor-pointer' : ''}`}
        >
            {children}
        </div>
    );
}
