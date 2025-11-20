import AdminLayout from '@/layouts/admin-layout';

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard" breadcrumbs={[{ label: 'Dashboard' }]}>
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total de Artigos
                            </p>
                            <h3 className="mt-2 text-3xl font-bold">156</h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <svg
                                className="h-6 w-6 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-green-600">
                        +12% desde o último mês
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Visualizações
                            </p>
                            <h3 className="mt-2 text-3xl font-bold">12.5k</h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                            <svg
                                className="h-6 w-6 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-green-600">
                        +8% desde o último mês
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Comentários
                            </p>
                            <h3 className="mt-2 text-3xl font-bold">89</h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                            <svg
                                className="h-6 w-6 text-amber-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-green-600">
                        +24% desde o último mês
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Subscribers
                            </p>
                            <h3 className="mt-2 text-3xl font-bold">2.3k</h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-green-600">
                        +18% desde o último mês
                    </p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 rounded-lg border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold">
                    Atividade Recente
                </h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between border-b pb-4 last:border-0"
                        >
                            <div>
                                <p className="font-medium">
                                    Novo artigo publicado
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    "O Poder da Oração" foi publicado há 2 horas
                                </p>
                            </div>
                            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                                Publicado
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
