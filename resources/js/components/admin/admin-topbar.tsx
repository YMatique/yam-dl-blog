import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bell, Moon, Search, Sun, User } from 'lucide-react';
import React from 'react';
import { useTheme } from '../theme-provider';

interface AdminTopbarProps {
    sidebarCollapsed: boolean;
}

export default function AdminTopbar({ sidebarCollapsed }: AdminTopbarProps) {
    const { theme, setTheme } = useTheme();
    const [showSearch, setShowSearch] = React.useState(false);

    return (
        <header
            className={cn(
                'fixed top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-card px-6 transition-all duration-300',
                sidebarCollapsed ? 'left-16' : 'left-64',
            )}
            style={{
                width: sidebarCollapsed
                    ? 'calc(100% - 4rem)'
                    : 'calc(100% - 16rem)',
            }}
        >
            {/* Search Bar */}
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-md">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="h-10 w-full rounded-lg border bg-background pr-4 pl-10 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                        onFocus={() => setShowSearch(true)}
                        onBlur={() => setShowSearch(false)}
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
                {/* Dark Mode Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                    title="Alternar tema"
                >
                    {theme === 'dark' ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </Button>

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    title="Notificações"
                >
                    <Bell className="h-5 w-5" />
                    {/* Badge de notificações */}
                    <span className="absolute top-1 right-1 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </span>
                </Button>

                {/* User Profile */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    title="Perfil"
                >
                    <User className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}
