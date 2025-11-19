import SeriesArticlesManager from '@/components/admin/series-articles-manager';
import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { SeriesFormData, seriesFormSchema } from '@/lib/series-form-schema';
import { generateSlug } from '@/utils/slug-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Series {
    id: number;
    title: string;
    slug: string;
    description?: string;
    cover_image?: string;
    is_complete: boolean;
    articles_count?: number;
}

interface Props {
    series: Series;
}

export default function Edit({ series }: Props) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const form = useForm<SeriesFormData>({
        resolver: zodResolver(seriesFormSchema),
        defaultValues: {
            title: series.title || '',
            slug: series.slug || '',
            description: series.description || '',
            cover_image: series.cover_image || '',
            is_complete: series.is_complete || false,
        },
    });

    const handleTitleChange = (value: string) => {
        form.setValue('title', value);
        if (!form.getValues('slug')) {
            form.setValue('slug', generateSlug(value));
        }
    };

    const handleImageSelect = (file: File | null) => {
        setImageFile(file);
        if (!file) {
            form.setValue('cover_image', '');
        }
    };

    const onSubmit = async (data: SeriesFormData) => {
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
                    data.cover_image = result.url;
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

        router.put(`/admin/series/${series.id}`, data, {
            onSuccess: () => {
                setImageFile(null);
            },
        });
    };

    const handleDelete = () => {
        router.delete(`/admin/series/${series.id}`, {
            onSuccess: () => {
                setDeleteDialog(false);
            },
        });
    };

    return (
        <AdminLayout
            title={`Editar: ${series.title}`}
            breadcrumbs={[
                { label: 'Séries', href: '/admin/series' },
                { label: 'Editar' },
            ]}
        >
            <Head title={`Editar: ${series.title} - Admin`} />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Editar Série</h1>
                            <p className="text-muted-foreground">
                                Atualize as informações da série
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
                        {/* Coluna Principal */}
                        <div className="space-y-6 lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informações da Série</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Título</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Digite o título da série"
                                                        {...field}
                                                        onChange={(e) =>
                                                            handleTitleChange(
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
                                                        placeholder="slug-da-serie"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    URL amigável para a série
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
                                                        placeholder="Descreva sobre o que é essa série (opcional)"
                                                        {...field}
                                                        rows={5}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Aparece na página da série
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Gerenciamento de Artigos */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Artigos da Série</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Arraste para reordenar os artigos
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <SeriesArticlesManager
                                        seriesId={series.id}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Imagem de Capa */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Imagem de Capa</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="cover_image"
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

                            {/* Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="is_complete"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Série Completa
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Marque se todos os
                                                        artigos já foram
                                                        publicados
                                                    </FormDescription>
                                                </div>
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
                        <DialogTitle>Deletar Série</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja deletar a série "
                            {series.title}"?
                            {series.articles_count &&
                                series.articles_count > 0 && (
                                    <span className="mt-2 block text-destructive">
                                        Atenção: Esta série possui{' '}
                                        {series.articles_count} artigo(s). Você
                                        não poderá deletá-la até remover os
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
                                series.articles_count !== undefined &&
                                series.articles_count > 0
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
