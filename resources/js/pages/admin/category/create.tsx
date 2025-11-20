import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Create() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const form = useForm<CategoryFormData>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            image: '',
            color: '#3b82f6',
            order: 0,
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

        router.post('/admin/categories', data, {
            onSuccess: () => {
                form.reset();
                setImageFile(null);
            },
        });
    };

    return (
        <AdminLayout
            title="Nova Categoria"
            breadcrumbs={[
                { label: 'Categorias', href: '/admin/categories' },
                { label: 'Nova' },
            ]}
        >
            <Head title="Nova Categoria - Admin" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Nova Categoria
                            </h1>
                            <p className="text-muted-foreground">
                                Crie uma nova categoria de artigos
                            </p>
                        </div>
                        <Button type="submit" disabled={uploading}>
                            <Save className="mr-2 h-4 w-4" />
                            Salvar
                        </Button>
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
        </AdminLayout>
    );
}
