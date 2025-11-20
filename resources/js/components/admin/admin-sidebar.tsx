import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    ChevronLeft,
    FileText,
    FolderTree,
    Home,
    Mail,
    MessageSquare,
    Settings,
    Tags,
    Users,
} from 'lucide-react';

interface AdminSidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: FileText, label: 'Artigos', href: '/admin/articles' },
    { icon: BookOpen, label: 'Séries', href: '/admin/series' },
    { icon: FolderTree, label: 'Categorias', href: '/admin/categories' },
    { icon: Tags, label: 'Tags', href: '/admin/tags' },
    { icon: MessageSquare, label: 'Comentários', href: '/admin/comments' },
    { icon: Mail, label: 'Newsletter', href: '/admin/subscribers' },
    { icon: Users, label: 'Usuários', href: '/admin/users' },
    { icon: Settings, label: 'Configurações', href: '/admin/settings' },
];

export default function AdminSidebar({
    collapsed,
    onCollapse,
}: AdminSidebarProps) {
    const currentPath = window.location.pathname;

    return (
        <aside
            className={cn(
                'fixed top-0 left-0 z-40 h-screen border-r bg-card transition-all duration-300',
                collapsed ? 'w-16' : 'w-64',
            )}
        >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b px-4">
                {!collapsed && (
                    <Link href="/admin" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">
                            YAM DL
                        </span>
                    </Link>
                )}
                <button
                    onClick={() => onCollapse(!collapsed)}
                    className={cn(
                        'rounded-lg p-2 hover:bg-accent',
                        collapsed && 'mx-auto',
                    )}
                >
                    <ChevronLeft
                        className={cn(
                            'h-5 w-5 transition-transform',
                            collapsed && 'rotate-180',
                        )}
                    />
                </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 p-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                                collapsed && 'justify-center',
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className="h-5 w-5 shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
