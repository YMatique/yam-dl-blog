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
    FileText,
    MoreVertical,
    Plus,
    Search,
    Tags,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    image?: string;
    order: number;
    articles_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface CategoriesData {
    data: Category[];
    links: PaginationLink[];
    total: number;
}

interface Props {
    categories: CategoriesData;
    filters: {
        search?: string;
    };
}

export default function Index({ categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        category: Category | null;
    }>({ open: false, category: null });

    const applyFilters = () => {
        router.get(
            '/scm/categories',
            { search: search || undefined },
            { preserveState: true, preserveScroll: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        router.get('/scm/categories');
    };

    const handleDelete = () => {
        if (!deleteDialog.category) return;

        router.delete(`/scm/categories/${deleteDialog.category.id}`, {
            onSuccess: () => {
                setDeleteDialog({ open: false, category: null });
            },
        });
    };

    return (
        <AdminLayout title="Categorias" breadcrumbs={[{ label: 'Categorias' }]}>
            <Head title="Categorias - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Categorias</h1>
                        <p className="text-muted-foreground">
                            Gerencie as categorias de artigos
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/scm/categories/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Nova Categoria
                        </Link>
                    </Button>
                </div>

                {/* Filtros */}
                <div className="rounded-lg border bg-card p-4">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Buscar categorias..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') applyFilters();
                                }}
                                className="pl-9"
                            />
                        </div>
                        <Button onClick={applyFilters}>Buscar</Button>
                        {search && (
                            <Button variant="outline" onClick={clearFilters}>
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border bg-card p-4 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total de Categorias
                                </p>
                                <p className="text-2xl font-bold">
                                    {categories.total}
                                </p>
                            </div>
                            <Tags className="h-8 w-8 text-primary/70" />
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Com Artigos
                                </p>
                                <p className="text-2xl font-bold">
                                    {
                                        categories.data.filter(
                                            (c) => c.articles_count > 0,
                                        ).length
                                    }
                                </p>
                            </div>
                            <FileText className="h-8 w-8 text-green-500/70" />
                        </div>
                    </div>
                </div>

                {/* Tabela */}
                <div className="rounded-lg border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    Ordem
                                </TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Artigos</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead className="w-[70px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-32 text-center"
                                    >
                                        <p className="text-muted-foreground">
                                            Nenhuma categoria encontrada
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.data.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-mono text-muted-foreground">
                                            {category.order}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {category.color && (
                                                    <div
                                                        className="h-4 w-4 rounded-full border"
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
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {category.articles_count}{' '}
                                                artigo(s)
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(
                                                category.created_at,
                                            ).toLocaleDateString('pt-BR')}
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
                                                            href={`/categoria/${category.slug}`}
                                                            target="_blank"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Visualizar
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/scm/categories/${category.id}/edit`}
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
                                                                category:
                                                                    category,
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
                {categories.data.length > 0 && (
                    <Pagination links={categories.links} />
                )}
            </div>

            {/* Dialog de Delete */}
            <Dialog
                open={deleteDialog.open}
                onOpenChange={(open) =>
                    setDeleteDialog({ open, category: null })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deletar Categoria</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja deletar a categoria "
                            {deleteDialog.category?.name}"? Esta ação não pode
                            ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDeleteDialog({ open: false, category: null })
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
