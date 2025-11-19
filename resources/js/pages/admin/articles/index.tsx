import Pagination from '@/components/admin/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Edit,
    Eye,
    Filter,
    MoreVertical,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface Article {
    id: number;
    title: string;
    slug: string;
    status: 'draft' | 'published' | 'scheduled';
    category: {
        id: number;
        name: string;
    };
    author: {
        id: number;
        name: string;
    };
    views: number;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface ArticlesData {
    data: Article[];
    links: PaginationLink[];
    total: number;
    per_page: number;
    current_page: number;
}

interface Category {
    id: number;
    name: string;
}

interface Props {
    articles: ArticlesData;
    categories: Category[];
    filters: {
        search?: string;
        status?: string;
        category?: string;
    };
}

export default function Index({ articles, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [category, setCategory] = useState(filters.category || 'all');
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        article: Article | null;
    }>({ open: false, article: null });

    // Aplicar filtros
    const applyFilters = () => {
        router.get(
            '/admin/articles',
            {
                search: search || undefined,
                status: status !== 'all' ? status : undefined,
                category: category !== 'all' ? category : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    // Limpar filtros
    const clearFilters = () => {
        setSearch('');
        setStatus('all');
        setCategory('all');
        router.get('/admin/articles');
    };

    // Deletar artigo
    const handleDelete = () => {
        if (!deleteDialog.article) return;

        router.delete(`/admin/articles/${deleteDialog.article.id}`, {
            onSuccess: () => {
                setDeleteDialog({ open: false, article: null });
            },
        });
    };

    // Badge de status
    const getStatusBadge = (status: Article['status']) => {
        const variants = {
            draft: 'secondary',
            published: 'default',
            scheduled: 'outline',
        } as const;

        const labels = {
            draft: 'Rascunho',
            published: 'Publicado',
            scheduled: 'Agendado',
        };

        return <Badge variant={variants[status]}>{labels[status]}</Badge>;
    };

    // Formatar data
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <AdminLayout title="Artigos" breadcrumbs={[{ label: 'Artigos' }]}>
            <Head title="Artigos - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Artigos</h1>
                        <p className="text-muted-foreground">
                            Gerencie todos os artigos do blog
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/articles/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Novo Artigo
                        </Link>
                    </Button>
                </div>

                {/* Filtros */}
                <div className="rounded-lg border bg-card p-4">
                    <div className="grid gap-4 md:grid-cols-4">
                        {/* Busca */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar artigos..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') applyFilters();
                                    }}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="published">
                                    Publicados
                                </SelectItem>
                                <SelectItem value="draft">Rascunhos</SelectItem>
                                <SelectItem value="scheduled">
                                    Agendados
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Categoria */}
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem
                                        key={cat.id}
                                        value={cat.id.toString()}
                                    >
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Botões de ação */}
                    <div className="mt-4 flex gap-2">
                        <Button onClick={applyFilters}>
                            <Filter className="mr-2 h-4 w-4" />
                            Aplicar Filtros
                        </Button>
                        <Button variant="outline" onClick={clearFilters}>
                            Limpar
                        </Button>
                    </div>
                </div>

                {/* Estatísticas */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold">{articles.total}</p>
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                        <p className="text-sm text-muted-foreground">
                            Publicados
                        </p>
                        <p className="text-2xl font-bold">
                            {
                                articles.data.filter(
                                    (a) => a.status === 'published',
                                ).length
                            }
                        </p>
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                        <p className="text-sm text-muted-foreground">
                            Rascunhos
                        </p>
                        <p className="text-2xl font-bold">
                            {
                                articles.data.filter(
                                    (a) => a.status === 'draft',
                                ).length
                            }
                        </p>
                    </div>
                </div>

                {/* Tabela */}
                <div className="rounded-lg border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Autor</TableHead>
                                <TableHead>Visualizações</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead className="w-[70px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-32 text-center"
                                    >
                                        <p className="text-muted-foreground">
                                            Nenhum artigo encontrado
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                articles.data.map((article) => (
                                    <TableRow key={article.id}>
                                        <TableCell className="font-medium">
                                            {article.title}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {article.category.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(article.status)}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {article.author.name}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {/* {article.views.toLocaleString()} */}
                                            {article.views
                                                ? article.views.toLocaleString()
                                                : '0'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {formatDate(article.created_at)}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/artigos/${article.slug}`}
                                                            target="_blank"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Visualizar
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/admin/articles/${article.id}/edit`}
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Editar
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={() =>
                                                            setDeleteDialog({
                                                                open: true,
                                                                article,
                                                            })
                                                        }
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Deletar
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Paginação */}
                {articles.data.length > 0 && (
                    <Pagination links={articles.links} />
                )}
            </div>

            {/* Dialog de Confirmação de Delete */}
            <Dialog
                open={deleteDialog.open}
                onOpenChange={(open) =>
                    setDeleteDialog({ open, article: null })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deletar Artigo</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja deletar o artigo "
                            {deleteDialog.article?.title}"? Esta ação não pode
                            ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDeleteDialog({ open: false, article: null })
                            }
                        >
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Deletar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
