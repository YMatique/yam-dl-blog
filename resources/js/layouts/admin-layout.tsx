import AdminBreadcrumb from '@/components/admin/admin-breadcrumb';
import AdminSidebar from '@/components/admin/admin-sidebar';
import AdminTopbar from '@/components/admin/admin-topbar';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AdminLayout({
    children,
    title = 'Admin',
    breadcrumbs = [],
}: AdminLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        // <ThemeProvider defaultTheme="system" storageKey="admin-theme">
        <>
            <Head title={`${title} - Admin YAM DL`} />

            <div className="min-h-screen bg-background">
                {/* Sidebar */}
                <AdminSidebar
                    collapsed={sidebarCollapsed}
                    onCollapse={setSidebarCollapsed}
                />

                {/* Main Content */}
                <div
                    className={cn(
                        'transition-all duration-300',
                        sidebarCollapsed ? 'ml-16' : 'ml-64',
                    )}
                >
                    {/* Topbar */}
                    <AdminTopbar sidebarCollapsed={sidebarCollapsed} />

                    {/* Content Area */}
                    <main className="mt-16 p-6">
                        {/* Breadcrumbs */}
                        {breadcrumbs.length > 0 && (
                            <div className="mb-6">
                                <AdminBreadcrumb items={breadcrumbs} />
                            </div>
                        )}

                        {/* Page Content */}
                        {children}
                    </main>
                </div>
            </div>
            {/* </ThemeProvider> */}
        </>
    );
}
