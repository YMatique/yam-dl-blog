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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/layouts/admin-layout';
import { generateSlug } from '@/utils/slug-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { Edit, Plus, Search, Tag as TagIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface Tag {
    id: number;
    name: string;
    slug: string;
    articles_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface TagsData {
    data: Tag[];
    links: PaginationLink[];
    total: number;
}

interface Props {
    tags: TagsData;
    filters: {
        search?: string;
    };
}

const tagSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(255),
    slug: z.string().min(2, 'Slug deve ter pelo menos 2 caracteres').max(255),
});

type TagFormData = z.infer<typeof tagSchema>;

export default function Index({ tags, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [formDialog, setFormDialog] = useState<{
        open: boolean;
        tag: Tag | null;
    }>({ open: false, tag: null });
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        tag: Tag | null;
    }>({ open: false, tag: null });

    const form = useForm<TagFormData>({
        resolver: zodResolver(tagSchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    });

    const applyFilters = () => {
        router.get(
            '/admin/tags',
            { search: search || undefined },
            { preserveState: true, preserveScroll: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        router.get('/admin/tags');
    };

    const openCreateDialog = () => {
        form.reset({ name: '', slug: '' });
        setFormDialog({ open: true, tag: null });
    };

    const openEditDialog = (tag: Tag) => {
        form.reset({ name: tag.name, slug: tag.slug });
        setFormDialog({ open: true, tag });
    };

    const handleNameChange = (value: string) => {
        form.setValue('name', value);
        if (!formDialog.tag && !form.getValues('slug')) {
            form.setValue('slug', generateSlug(value));
        }
    };

    const handleSubmit = async (data: TagFormData) => {
        const url = formDialog.tag
            ? `/admin/tags/${formDialog.tag.id}`
            : '/admin/tags';
        const method = formDialog.tag ? 'put' : 'post';

        try {
            const response = await fetch(url, {
                method: method === 'put' ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setFormDialog({ open: false, tag: null });
                router.reload();
            } else {
                alert(result.message || 'Erro ao salvar tag');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao salvar tag');
        }
    };

    const handleDelete = async () => {
        if (!deleteDialog.tag) return;

        try {
            const response = await fetch(`/admin/tags/${deleteDialog.tag.id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
            });

            const result = await response.json();

            if (result.success) {
                setDeleteDialog({ open: false, tag: null });
                router.reload();
            } else {
                alert(result.message || 'Erro ao deletar tag');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar tag');
        }
    };

    return (
        <AdminLayout title="Tags" breadcrumbs={[{ label: 'Tags' }]}>
            <Head title="Tags - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Tags</h1>
                        <p className="text-muted-foreground">
                            Gerencie as tags dos artigos
                        </p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nova Tag
                    </Button>
                </div>

                {/* Filtros */}
                <div className="rounded-lg border bg-card p-4">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Buscar tags..."
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
                <div className="rounded-lg border bg-card p-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total
                            </p>
                            <p className="text-2xl font-bold">{tags.total}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Com Artigos
                            </p>
                            <p className="text-2xl font-bold">
                                {
                                    tags.data.filter(
                                        (t) => t.articles_count > 0,
                                    ).length
                                }
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Sem Uso
                            </p>
                            <p className="text-2xl font-bold">
                                {
                                    tags.data.filter(
                                        (t) => t.articles_count === 0,
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid de Tags */}
                {tags.data.length === 0 ? (
                    <div className="rounded-lg border bg-card p-12 text-center">
                        <TagIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">
                            Nenhuma tag encontrada
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {tags.data.map((tag) => (
                            <div
                                key={tag.id}
                                className="group rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {tag.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            /{tag.slug}
                                        </p>
                                        <Badge
                                            variant="secondary"
                                            className="mt-2"
                                        >
                                            {tag.articles_count} artigo(s)
                                        </Badge>
                                    </div>
                                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => openEditDialog(tag)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive"
                                            onClick={() =>
                                                setDeleteDialog({
                                                    open: true,
                                                    tag,
                                                })
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Paginação */}
                {tags.data.length > 0 && <Pagination links={tags.links} />}
            </div>

            {/* Dialog Criar/Editar */}
            <Dialog
                open={formDialog.open}
                onOpenChange={(open) =>
                    !open && setFormDialog({ open, tag: null })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {formDialog.tag ? 'Editar Tag' : 'Nova Tag'}
                        </DialogTitle>
                        <DialogDescription>
                            {formDialog.tag
                                ? 'Atualize as informações da tag'
                                : 'Crie uma nova tag para organizar seus artigos'}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: JavaScript"
                                                {...field}
                                                onChange={(e) =>
                                                    handleNameChange(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="javascript"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        setFormDialog({
                                            open: false,
                                            tag: null,
                                        })
                                    }
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit">
                                    {formDialog.tag ? 'Atualizar' : 'Criar'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Dialog Deletar */}
            <Dialog
                open={deleteDialog.open}
                onOpenChange={(open) =>
                    !open && setDeleteDialog({ open, tag: null })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deletar Tag</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja deletar a tag "
                            {deleteDialog.tag?.name}"?
                            {deleteDialog.tag?.articles_count &&
                                deleteDialog.tag.articles_count > 0 && (
                                    <span className="mt-2 block text-destructive">
                                        Atenção: Esta tag está em{' '}
                                        {deleteDialog.tag.articles_count}{' '}
                                        artigo(s). Você não poderá deletá-la.
                                    </span>
                                )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDeleteDialog({ open: false, tag: null })
                            }
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={
                                deleteDialog.tag?.articles_count !==
                                    undefined &&
                                deleteDialog.tag.articles_count > 0
                            }
                        >
                            Deletar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
