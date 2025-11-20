import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        label: string;
    };
    color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    green: 'bg-green-500/10 text-green-600 dark:text-green-400',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    red: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export default function StatsCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    color = 'blue',
}: StatsCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                            {title}
                        </p>
                        <h3 className="mt-2 text-3xl font-bold tracking-tight">
                            {value}
                        </h3>
                        {subtitle && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                {subtitle}
                            </p>
                        )}
                        {trend && (
                            <div className="mt-2 flex items-center gap-1">
                                <span
                                    className={cn(
                                        'text-sm font-medium',
                                        trend.value >= 0
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400',
                                    )}
                                >
                                    {trend.value >= 0 ? '+' : ''}
                                    {trend.value}%
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {trend.label}
                                </span>
                            </div>
                        )}
                    </div>
                    <div
                        className={cn(
                            'flex h-12 w-12 items-center justify-center rounded-lg',
                            colorClasses[color],
                        )}
                    >
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}
