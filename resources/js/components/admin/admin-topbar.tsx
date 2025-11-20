import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import {
    Bell,
    CheckCircle2,
    Clock,
    FileText,
    LogOut,
    Mail,
    Moon,
    Search,
    Settings,
    Sun,
    User,
    UserCircle,
} from 'lucide-react';
import React from 'react';
import { useTheme } from '../theme-provider';

interface AdminTopbarProps {
    sidebarCollapsed: boolean;
}

// Mock notifications - você pode substituir por dados reais do backend
const notifications = [
    {
        id: 1,
        title: 'Novo comentário',
        description: 'João comentou no artigo "Introdução ao Laravel"',
        time: '5 min atrás',
        read: false,
        icon: Mail,
    },
    {
        id: 2,
        title: 'Artigo publicado',
        description: 'Seu artigo "React Hooks" foi publicado',
        time: '1 hora atrás',
        read: false,
        icon: FileText,
    },
    {
        id: 3,
        title: 'Novo inscrito',
        description: '5 novos inscritos na newsletter',
        time: '2 horas atrás',
        read: true,
        icon: CheckCircle2,
    },
];

export default function AdminTopbar({ sidebarCollapsed }: AdminTopbarProps) {
    const { theme, setTheme } = useTheme();
    const [showSearch, setShowSearch] = React.useState(false);
    const { auth } = usePage().props as any;

    const unreadCount = notifications.filter((n) => !n.read).length;

    const handleLogout = () => {
        router.post('/logout');
    };

    // Iniciais do usuário para o avatar
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

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

                {/* Notifications Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            title="Notificações"
                        >
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            <span>Notificações</span>
                            {unreadCount > 0 && (
                                <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                    {unreadCount} nova(s)
                                </span>
                            )}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="py-8 text-center text-sm text-muted-foreground">
                                    Nenhuma notificação
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className={cn(
                                            'flex cursor-pointer items-start gap-3 p-3',
                                            !notification.read &&
                                                'bg-accent/50',
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'mt-0.5 rounded-full p-2',
                                                notification.read
                                                    ? 'bg-muted'
                                                    : 'bg-primary/10',
                                            )}
                                        >
                                            <notification.icon
                                                className={cn(
                                                    'h-4 w-4',
                                                    notification.read
                                                        ? 'text-muted-foreground'
                                                        : 'text-primary',
                                                )}
                                            />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium">
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {notification.description}
                                            </p>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {notification.time}
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                ))
                            )}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-sm text-primary">
                            Ver todas notificações
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-10 gap-2 px-2"
                            title="Perfil"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={auth?.user?.avatar} />
                                <AvatarFallback>
                                    <User className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>
                            <span className="hidden text-sm font-medium md:inline-block">
                                {auth?.user?.name || 'Admin'}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm leading-none font-medium">
                                    {auth?.user?.name || 'Admin'}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {auth?.user?.email || 'admin@example.com'}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => router.visit('/admin/profile')}
                            >
                                <UserCircle className="mr-2 h-4 w-4" />
                                <span>Meu Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => router.visit('/admin/settings')}
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Configurações</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-destructive focus:text-destructive"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sair</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
