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
    CheckCircle2,
    Circle,
    Edit,
    Eye,
    Filter,
    Layers,
    MoreVertical,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface Series {
    id: number;
    title: string;
    slug: string;
    description?: string;
    cover_image?: string;
    is_complete: boolean;
    articles_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface SeriesData {
    data: Series[];
    links: PaginationLink[];
    total: number;
}

interface Props {
    series: SeriesData;
    filters: {
        search?: string;
        status?: string;
    };
}

export default function Index({ series, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        series: Series | null;
    }>({ open: false, series: null });

    const applyFilters = () => {
        router.get(
            '/scm/series',
            {
                search: search || undefined,
                status: status !== 'all' ? status : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('all');
        router.get('/scm/series');
    };

    const handleDelete = () => {
        if (!deleteDialog.series) return;

        router.delete(`/scm/series/${deleteDialog.series.id}`, {
            onSuccess: () => {
                setDeleteDialog({ open: false, series: null });
            },
        });
    };

    return (
        <AdminLayout title="Séries" breadcrumbs={[{ label: 'Séries' }]}>
            <Head title="Séries - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Séries</h1>
                        <p className="text-muted-foreground">
                            Gerencie todas as séries de artigos
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/scm/series/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Nova Série
                        </Link>
                    </Button>
                </div>

                {/* Filtros */}
                <div className="rounded-lg border bg-card p-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar séries..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') applyFilters();
                                    }}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                <SelectItem value="complete">
                                    Completas
                                </SelectItem>
                                <SelectItem value="incomplete">
                                    Em Andamento
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

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
                    <div className="rounded-lg border bg-card p-4 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total
                                </p>
                                <p className="text-2xl font-bold">
                                    {series.total}
                                </p>
                            </div>
                            <Layers className="h-8 w-8 text-primary/70" />
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Completas
                                </p>
                                <p className="text-2xl font-bold">
                                    {
                                        series.data.filter((s) => s.is_complete)
                                            .length
                                    }
                                </p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-green-500/70" />
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Em Andamento
                                </p>
                                <p className="text-2xl font-bold">
                                    {
                                        series.data.filter(
                                            (s) => !s.is_complete,
                                        ).length
                                    }
                                </p>
                            </div>
                            <Circle className="h-8 w-8 text-orange-500/70" />
                        </div>
                    </div>
                </div>

                {/* Tabela */}
                <div className="rounded-lg border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">
                                    Imagem
                                </TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead>Artigos</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead className="w-[70px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {series.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-32 text-center"
                                    >
                                        <p className="text-muted-foreground">
                                            Nenhuma série encontrada
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                series.data.map((s) => (
                                    <TableRow key={s.id}>
                                        <TableCell>
                                            {s.cover_image ? (
                                                <img
                                                    src={s.cover_image}
                                                    alt={s.title}
                                                    className="h-10 w-16 rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-16 items-center justify-center rounded-md bg-muted">
                                                    <span className="text-xs text-muted-foreground">
                                                        Sem img
                                                    </span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {s.title}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {s.articles_count} artigo(s)
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {s.is_complete ? (
                                                <Badge className="gap-1">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    Completa
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="secondary"
                                                    className="gap-1"
                                                >
                                                    <Circle className="h-3 w-3" />
                                                    Em Andamento
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(
                                                s.created_at,
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
                                                            href={`/series/${s.slug}`}
                                                            target="_blank"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Visualizar
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/scm/series/${s.id}/edit`}
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
                                                                series: s,
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
                {series.data.length > 0 && <Pagination links={series.links} />}
            </div>

            {/* Dialog de Delete */}
            <Dialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open, series: null })}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deletar Série</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja deletar a série "
                            {deleteDialog.series?.title}"? Esta ação não pode
                            ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDeleteDialog({ open: false, series: null })
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
