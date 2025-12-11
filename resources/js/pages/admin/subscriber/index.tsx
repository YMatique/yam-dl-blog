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
import { Head, router } from '@inertiajs/react';
import {
    Clock,
    Download,
    Filter,
    MailCheck,
    MailX,
    Search,
    Trash2,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface Subscriber {
    id: number;
    email: string;
    name?: string;
    status: 'active' | 'pending' | 'unsubscribed';
    verified_at?: string;
    unsubscribed_at?: string;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface SubscribersData {
    data: Subscriber[];
    links: PaginationLink[];
    total: number;
}

interface Stats {
    total: number;
    active: number;
    pending: number;
    unsubscribed: number;
}

interface Props {
    subscribers: SubscribersData;
    stats: Stats;
    filters: {
        search?: string;
        status?: string;
    };
}

export default function Index({ subscribers, stats, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        subscriber: Subscriber | null;
    }>({ open: false, subscriber: null });

    const applyFilters = () => {
        router.get(
            '/scm/subscribers',
            {
                search: search || undefined,
                status: status !== 'all' ? status : undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('all');
        router.get('/scm/subscribers');
    };

    const handleDelete = async () => {
        if (!deleteDialog.subscriber) return;

        try {
            const response = await fetch(
                `/scm/subscribers/${deleteDialog.subscriber.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN':
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute('content') || '',
                    },
                },
            );

            const result = await response.json();

            if (result.success) {
                setDeleteDialog({ open: false, subscriber: null });
                router.reload();
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleExport = () => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (status !== 'all') params.append('status', status);

        window.location.href = `/scm/subscribers/export?${params.toString()}`;
    };

    const getStatusBadge = (subscriber: Subscriber) => {
        if (subscriber.status === 'unsubscribed') {
            return (
                <Badge variant="destructive" className="gap-1">
                    <MailX className="h-3 w-3" />
                    Descadastrado
                </Badge>
            );
        }

        if (!subscriber.verified_at) {
            return (
                <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    Pendente
                </Badge>
            );
        }

        return (
            <Badge className="gap-1">
                <MailCheck className="h-3 w-3" />
                Ativo
            </Badge>
        );
    };

    return (
        <AdminLayout title="Newsletter" breadcrumbs={[{ label: 'Newsletter' }]}>
            <Head title="Newsletter - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Newsletter</h1>
                        <p className="text-muted-foreground">
                            Gerencie os inscritos na newsletter
                        </p>
                    </div>
                    <Button onClick={handleExport} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar CSV
                    </Button>
                </div>

                {/* Filtros */}
                <div className="rounded-lg border bg-card p-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar por email ou nome..."
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
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="active">Ativos</SelectItem>
                                <SelectItem value="pending">
                                    Pendentes
                                </SelectItem>
                                <SelectItem value="unsubscribed">
                                    Descadastrados
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

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-4">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                                Total
                            </p>
                        </div>
                        <p className="mt-2 text-2xl font-bold">{stats.total}</p>
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                        <div className="flex items-center gap-2">
                            <MailCheck className="h-4 w-4 text-green-500" />
                            <p className="text-sm text-muted-foreground">
                                Ativos
                            </p>
                        </div>
                        <p className="mt-2 text-2xl font-bold">
                            {stats.active}
                        </p>
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-amber-500" />
                            <p className="text-sm text-muted-foreground">
                                Pendentes
                            </p>
                        </div>
                        <p className="mt-2 text-2xl font-bold">
                            {stats.pending}
                        </p>
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                        <div className="flex items-center gap-2">
                            <MailX className="h-4 w-4 text-red-500" />
                            <p className="text-sm text-muted-foreground">
                                Descadastrados
                            </p>
                        </div>
                        <p className="mt-2 text-2xl font-bold">
                            {stats.unsubscribed}
                        </p>
                    </div>
                </div>

                {/* Tabela */}
                <div className="rounded-lg border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Data de Inscrição</TableHead>
                                <TableHead className="w-[70px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscribers.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-32 text-center"
                                    >
                                        <p className="text-muted-foreground">
                                            Nenhum inscrito encontrado
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                subscribers.data.map((subscriber) => (
                                    <TableRow key={subscriber.id}>
                                        <TableCell className="font-medium">
                                            {subscriber.email}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.name || (
                                                <span className="text-muted-foreground">
                                                    —
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(subscriber)}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(
                                                subscriber.created_at,
                                            ).toLocaleDateString('pt-BR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    setDeleteDialog({
                                                        open: true,
                                                        subscriber: subscriber,
                                                    })
                                                }
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Paginação */}
                {subscribers.data.length > 0 && (
                    <Pagination links={subscribers.links} />
                )}
            </div>

            {/* Dialog de Delete */}
            <Dialog
                open={deleteDialog.open}
                onOpenChange={(open) =>
                    !open && setDeleteDialog({ open, subscriber: null })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remover Inscrito</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja remover "
                            {deleteDialog.subscriber?.email}" da lista de
                            inscritos? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDeleteDialog({
                                    open: false,
                                    subscriber: null,
                                })
                            }
                        >
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Remover
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
