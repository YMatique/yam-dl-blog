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
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Edit, Mail, MoreVertical, Plus, Search, Trash2, User } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface UsersData {
    data: User[];
    links: PaginationLink[];
    total: number;
}

interface Props {
    users: UsersData;
    filters: {
        search?: string;
    };
}

export default function Index({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        user: User | null;
    }>({ open: false, user: null });
    
    const [formDialog, setFormDialog] = useState<{
        open: boolean;
        user: User | null;
    }>({ open: false, user: null });

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const applyFilters = () => {
        router.get(
            '/scm/users',
            { search: search || undefined },
            { preserveState: true, preserveScroll: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        router.get('/scm/users');
    };

    const handleDelete = () => {
        if (!deleteDialog.user) return;

        router.delete(`/scm/users/${deleteDialog.user.id}`, {
            onSuccess: () => {
                setDeleteDialog({ open: false, user: null });
            },
        });
    };

    const openCreateDialog = () => {
        reset();
        setFormDialog({ open: true, user: null });
    };

    const openEditDialog = (user: User) => {
        setData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
        });
        setFormDialog({ open: true, user });
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (formDialog.user) {
            // Edit
            put(`/scm/users/${formDialog.user.id}`, {
                onSuccess: () => {
                    setFormDialog({ open: false, user: null });
                    reset();
                },
            });
        } else {
            // Create
            post('/scm/users', {
                onSuccess: () => {
                    setFormDialog({ open: false, user: null });
                    reset();
                },
            });
        }
    };

    return (
        <AdminLayout title="Utilizadores" breadcrumbs={[{ label: 'Utilizadores' }]}>
            <Head title="Utilizadores - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Utilizadores</h1>
                        <p className="text-muted-foreground">
                            Gerencie os utilizadores do sistema
                        </p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Utilizador
                    </Button>
                </div>

                {/* Filtros */}
                <div className="rounded-lg border bg-card p-4">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Buscar utilizadores..."
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
                    <div className="rounded-lg border bg-card p-4">
                        <p className="text-sm text-muted-foreground">
                            Total de Utilizadores
                        </p>
                        <p className="text-2xl font-bold">{users.total}</p>
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                        <p className="text-sm text-muted-foreground">
                            Verificados
                        </p>
                        <p className="text-2xl font-bold">
                            {
                                users.data.filter(
                                    (u) => u.email_verified_at !== null,
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
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Data de Registo</TableHead>
                                <TableHead className="w-[70px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-32 text-center"
                                    >
                                        <p className="text-muted-foreground">
                                            Nenhum utilizador encontrado
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                    <User className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="font-medium">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Mail className="h-4 w-4" />
                                                {user.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {user.email_verified_at ? (
                                                <Badge variant="default">
                                                    Verificado
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">
                                                    Não Verificado
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(
                                                user.created_at,
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
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            openEditDialog(user)
                                                        }
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={() =>
                                                            setDeleteDialog({
                                                                open: true,
                                                                user: user,
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
                {users.data.length > 0 && (
                    <Pagination links={users.links} />
                )}
            </div>

            {/* Dialog de Criar/Editar */}
            <Dialog
                open={formDialog.open}
                onOpenChange={(open) => {
                    setFormDialog({ open, user: null });
                    if (!open) reset();
                }}
            >
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>
                                {formDialog.user
                                    ? 'Editar Utilizador'
                                    : 'Novo Utilizador'}
                            </DialogTitle>
                            <DialogDescription>
                                {formDialog.user
                                    ? 'Atualize os dados do utilizador'
                                    : 'Preencha os dados para criar um novo utilizador'}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="Nome completo"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder="email@exemplo.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    Password{' '}
                                    {formDialog.user && '(deixe vazio para manter)'}
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="••••••••"
                                    required={!formDialog.user}
                                />
                                {errors.password && (
                                    <p className="text-sm text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">
                                    Confirmar Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="••••••••"
                                    required={!formDialog.user}
                                />
                                {errors.password_confirmation && (
                                    <p className="text-sm text-destructive">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setFormDialog({ open: false, user: null });
                                    reset();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {formDialog.user ? 'Atualizar' : 'Criar'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Dialog de Delete */}
            <Dialog
                open={deleteDialog.open}
                onOpenChange={(open) =>
                    setDeleteDialog({ open, user: null })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deletar Utilizador</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja deletar o utilizador "
                            {deleteDialog.user?.name}"? Esta ação não pode
                            ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDeleteDialog({ open: false, user: null })
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
