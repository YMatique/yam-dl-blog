import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export default function Pagination({ links, className }: PaginationProps) {
    if (links.length <= 3) return null; // Não mostrar se só tiver prev, 1, next

    return (
        <nav
            className={cn('flex items-center justify-center gap-1', className)}
            aria-label="Pagination"
        >
            {links.map((link, index) => {
                // Primeiro link (Previous)
                if (index === 0) {
                    return (
                        <Button
                            key={index}
                            variant="outline"
                            size="icon"
                            disabled={!link.url}
                            asChild={!!link.url}
                        >
                            {link.url ? (
                                <Link href={link.url}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Link>
                            ) : (
                                <span>
                                    <ChevronLeft className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    );
                }

                // Último link (Next)
                if (index === links.length - 1) {
                    return (
                        <Button
                            key={index}
                            variant="outline"
                            size="icon"
                            disabled={!link.url}
                            asChild={!!link.url}
                        >
                            {link.url ? (
                                <Link href={link.url}>
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            ) : (
                                <span>
                                    <ChevronRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    );
                }

                // Links com "..."
                if (link.label === '...') {
                    return (
                        <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            disabled
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    );
                }

                // Links numéricos
                return (
                    <Button
                        key={index}
                        variant={link.active ? 'default' : 'outline'}
                        size="icon"
                        disabled={!link.url}
                        asChild={!!link.url}
                    >
                        {link.url ? (
                            <Link href={link.url}>{link.label}</Link>
                        ) : (
                            <span>{link.label}</span>
                        )}
                    </Button>
                );
            })}
        </nav>
    );
}
