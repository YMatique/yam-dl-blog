import { Link } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';
import React from 'react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface AdminBreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link
                href="/admin"
                className="flex items-center hover:text-foreground"
            >
                <Home className="h-4 w-4" />
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="h-4 w-4" />
                    {item.href && index !== items.length - 1 ? (
                        <Link
                            href={item.href}
                            className="hover:text-foreground"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-foreground">
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}
