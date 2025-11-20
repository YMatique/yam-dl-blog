import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import {
    CategoryFormData,
    categoryFormSchema,
} from '@/lib/category-form-schema';
import { generateSlug } from '@/utils/slug-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    color?: string;
    order: number;
    articles_count?: number;
}

interface Props {
    category: Category;
}

export default function Edit({ category }: Props) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const form = useForm<CategoryFormData>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: category.name || '',
            slug: category.slug || '',
            description: category.description || '',
            image: category.image || '',
            color: category.color || '#3b82f6',
            order: category.order || 0,
        },
    });

    const handleNameChange = (value: string) => {
        form.setValue('name', value);
        if (!form.getValues('slug')) {
            form.setValue('slug', generateSlug(value));
        }
    };

    const handleImageSelect = (file: File | null) => {
        setImageFile(file);
        if (!file) {
            form.setValue('image', '');
        }
    };

    const onSubmit = async (data: CategoryFormData) => {
        if (imageFile) {
            setUploading(true);

            const formData = new FormData();
            formData.append('image', imageFile);

            try {
                const response = await fetch('/admin/upload/image', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRF-TOKEN':
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute('content') || '',
                    },
                });

                const result = await response.json();

                if (result.success) {
                    data.image = result.url;
                } else {
                    alert('Erro ao fazer upload da imagem');
                    setUploading(false);
                    return;
                }
            } catch (error) {
                console.error('Erro no upload:', error);
                alert('Erro ao fazer upload');
                setUploading(false);
                return;
            } finally {
                setUploading(false);
            }
        }

        router.put(`/admin/categories/${category.id}`, data, {
            onSuccess: () => {
                setImageFile(null);
            },
        });
    };

    const handleDelete = () => {
        router.delete(`/admin/categories/${category.id}`, {
            onSuccess: () => {
                setDeleteDialog(false);
            },
        });
    };

    return (
        <AdminLayout
            title={`Editar: ${category.name}`}
            breadcrumbs={[
                { label: 'Categorias', href: '/admin/categories' },
                { label: 'Editar' },
            ]}
        >
            <Head title={`Editar: ${category.name} - Admin`} />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Editar Categoria
                            </h1>
                            <p className="text-muted-foreground">
                                Atualize as informações da categoria
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => setDeleteDialog(true)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Deletar
                            </Button>
                            <Button type="submit" disabled={uploading}>
                                <Save className="mr-2 h-4 w-4" />
                                Atualizar
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Informações da Categoria
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Digite o nome da categoria"
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
                                                <FormLabel>
                                                    Slug (URL)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="slug-da-categoria"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    URL amigável para a
                                                    categoria
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Descrição</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Descreva sobre o que é essa categoria (opcional)"
                                                        {...field}
                                                        rows={4}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Stats */}
                            {category.articles_count !== undefined && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Estatísticas</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Esta categoria possui{' '}
                                            <strong>
                                                {category.articles_count}
                                            </strong>{' '}
                                            artigo(s)
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Imagem</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <ImageUpload
                                                        value={
                                                            field.value || ''
                                                        }
                                                        onChange={
                                                            handleImageSelect
                                                        }
                                                        disabled={uploading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Aparência</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="color"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cor</FormLabel>
                                                <FormControl>
                                                    <div className="flex gap-2">
                                                        <Input
                                                            type="color"
                                                            {...field}
                                                            className="h-10 w-20"
                                                        />
                                                        <Input
                                                            placeholder="#3b82f6"
                                                            {...field}
                                                            className="flex-1"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Cor para identificar a
                                                    categoria
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="order"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ordem</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value
                                                                    ? parseInt(
                                                                          e
                                                                              .target
                                                                              .value,
                                                                      )
                                                                    : 0,
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Ordem de exibição (menor =
                                                    primeiro)
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>

            {/* Dialog de Delete */}
            <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deletar Categoria</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja deletar a categoria "
                            {category.name}"?
                            {category.articles_count &&
                                category.articles_count > 0 && (
                                    <span className="mt-2 block text-destructive">
                                        Atenção: Esta categoria possui{' '}
                                        {category.articles_count} artigo(s).
                                        Você não poderá deletá-la até remover os
                                        artigos.
                                    </span>
                                )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialog(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={
                                category.articles_count !== undefined &&
                                category.articles_count > 0
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
