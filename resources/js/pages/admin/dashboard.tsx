import StatsCard from '@/components/admin/stats-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import {
    BarChart3,
    Clock,
    Eye,
    FileText,
    Layers,
    Mail,
    Plus,
    TrendingUp,
    Users,
} from 'lucide-react';

interface Article {
    id: number;
    title: string;
    status: string;
    views_count: number;
    category?: {
        name: string;
        color?: string;
    };
    author?: {
        name: string;
    };
    created_at: string;
}

interface Category {
    id: number;
    name: string;
    color?: string;
    articles_count: number;
}

interface Stats {
    articles: {
        total: number;
        published: number;
        draft: number;
        views_count: number;
    };
    categories: number;
    series: number;
    subscribers: {
        total: number;
        active: number;
        pending: number;
    };
}

interface Props {
    stats: Stats;
    recentArticles: Article[];
    popularArticles: Article[];
    topCategories: Category[];
    articlesPerMonth: Array<{ month: string; count: number }>;
}

export default function Dashboard({
    stats,
    recentArticles,
    popularArticles,
    topCategories,
    articlesPerMonth,
}: Props) {
    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
            published: 'default',
            draft: 'secondary',
            scheduled: 'outline',
        };

        const labels: Record<string, string> = {
            published: 'Publicado',
            draft: 'Rascunho',
            scheduled: 'Agendado',
        };

        return (
            <Badge
                variant={variants[status] || 'secondary'}
                className="text-xs"
            >
                {labels[status] || status}
            </Badge>
        );
    };

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Visão geral do seu blog
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/articles/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Novo Artigo
                        </Link>
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total de Artigos"
                        value={stats.articles.total}
                        subtitle={`${stats.articles.published} publicados`}
                        icon={FileText}
                        color="blue"
                    />
                    <StatsCard
                        title="Visualizações"
                        value={
                            stats.articles.views_count
                                ? stats.articles.views_count.toLocaleString(
                                      'pt-BR',
                                  )
                                : ''
                        }
                        subtitle="Total de views"
                        icon={Eye}
                        color="green"
                    />
                    <StatsCard
                        title="Inscritos"
                        value={stats.subscribers.active}
                        subtitle={`${stats.subscribers.pending} pendentes`}
                        icon={Users}
                        color="purple"
                    />
                    <StatsCard
                        title="Categorias"
                        value={stats.categories}
                        subtitle={`${stats.series} séries`}
                        icon={Layers}
                        color="orange"
                    />
                </div>

                {/* Second Row Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Rascunhos
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.articles.draft}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                artigos aguardando publicação
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Newsletter
                            </CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.subscribers.total}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                total de inscritos
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Média de Views
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.articles.published > 0
                                    ? Math.round(
                                          stats.articles.views /
                                              stats.articles.published,
                                      )
                                    : 0}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                views por artigo
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts e Listas */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Artigos por Mês */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Artigos por Mês
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {articlesPerMonth.map((item, index) => (
                                    <div key={index} className="space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">
                                                {item.month}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {item.count} artigo(s)
                                            </span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                            <div
                                                className="h-full bg-primary transition-all"
                                                style={{
                                                    width: `${(item.count / Math.max(...articlesPerMonth.map((i) => i.count))) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Categorias */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Layers className="h-5 w-5" />
                                Categorias Mais Usadas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {topCategories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            {category.color && (
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            category.color,
                                                    }}
                                                />
                                            )}
                                            <span className="font-medium">
                                                {category.name}
                                            </span>
                                        </div>
                                        <Badge variant="secondary">
                                            {category.articles_count}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabelas */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Artigos Recentes */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Artigos Recentes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Título</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Views
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentArticles.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell>
                                                <Link
                                                    href={`/admin/articles/${article.id}/edit`}
                                                    className="font-medium hover:underline"
                                                >
                                                    {article.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(article.status)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {article.views_count}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Artigos Populares */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Mais Populares (30 dias)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Título</TableHead>
                                        <TableHead className="text-right">
                                            Views
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {popularArticles.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell>
                                                <div>
                                                    <Link
                                                        href={`/admin/articles/${article.id}/edit`}
                                                        className="font-medium hover:underline"
                                                    >
                                                        {article.title}
                                                    </Link>
                                                    {article.category && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {
                                                                article.category
                                                                    .name
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">
                                                {article.views_count.toLocaleString(
                                                    'pt-BR',
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
