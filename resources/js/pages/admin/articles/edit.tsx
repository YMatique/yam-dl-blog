import TagSelector from '@/components/admin/tag-selector';
import ImageUpload from '@/components/image-upload';
import TiptapEditor from '@/components/tiptap-editor';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { ArticleFormData, articleFormSchema } from '@/lib/article-form-schema';
import { generateSlug } from '@/utils/slug-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { Eye, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Category {
    id: number;
    name: string;
}

interface Series {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featured_image?: string;
    category_id: number;
    series_id?: number;
    status: 'draft' | 'published' | 'scheduled';
    published_at?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    tags?: Tag[];
}

interface Props {
    article: Article;
    categories: Category[];
    series?: Series[];
    tags?: Tag[];
}

export default function Edit({
    article,
    categories,
    series = [],
    tags = [],
}: Props) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const form = useForm<ArticleFormData>({
        resolver: zodResolver(articleFormSchema),
        defaultValues: {
            title: article.title || '',
            slug: article.slug || '',
            content: article.content || '',
            excerpt: article.excerpt || '',
            featured_image: article.featured_image || '',
            category_id: article.category_id?.toString() || '',
            series_id: article.series_id?.toString() || '',
            status: article.status || 'draft',
            published_at: article.published_at || '',
            meta_title: article.meta_title || '',
            meta_description: article.meta_description || '',
            meta_keywords: article.meta_keywords || '',
            tags: article.tags?.map((t) => t.id) || [],
        },
    });

    // Auto-gerar slug do título
    const handleTitleChange = (value: string) => {
        form.setValue('title', value);

        // Só gera slug se estiver vazio
        if (!form.getValues('slug')) {
            form.setValue('slug', generateSlug(value));
        }
    };

    // Quando seleciona imagem
    const handleImageSelect = (file: File | null) => {
        setImageFile(file);

        // Se removeu, limpa o campo
        if (!file) {
            form.setValue('featured_image', '');
        }
    };

    // Submit
    const onSubmit = async (data: ArticleFormData) => {
        // Upload imagem se houver nova
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
                    data.featured_image = result.url;
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

        // Atualizar artigo
        router.put(`/admin/articles/${article.id}`, data, {
            onSuccess: () => {
                setImageFile(null);
            },
        });
    };

    // Salvar como rascunho
    const saveDraft = () => {
        form.setValue('status', 'draft');
        form.handleSubmit(onSubmit)();
    };

    // Publicar/Atualizar
    const publish = () => {
        form.setValue('status', 'published');
        form.handleSubmit(onSubmit)();
    };

    // Deletar artigo
    const handleDelete = () => {
        router.delete(`/admin/articles/${article.id}`, {
            onSuccess: () => {
                setDeleteDialog(false);
            },
        });
    };

    return (
        <AdminLayout
            title={`Editar: ${article.title}`}
            breadcrumbs={[
                { label: 'Artigos', href: '/admin/articles' },
                { label: 'Editar' },
            ]}
        >
            <Head title={`Editar: ${article.title} - Admin`} />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Header com botões */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Editar Artigo
                            </h1>
                            <p className="text-muted-foreground">
                                Atualize as informações do artigo
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
                            <Button
                                type="button"
                                variant="outline"
                                onClick={saveDraft}
                                disabled={uploading}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Salvar Rascunho
                            </Button>
                            <Button
                                type="button"
                                onClick={publish}
                                disabled={uploading}
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                {article.status === 'published'
                                    ? 'Atualizar'
                                    : 'Publicar'}
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Coluna Principal */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Título e Slug */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informações Básicas</CardTitle>
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
                                                        placeholder="Digite o título do artigo"
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
                                                        placeholder="slug-do-artigo"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    URL amigável para o artigo
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="excerpt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Resumo</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Breve resumo do artigo (opcional)"
                                                        {...field}
                                                        rows={3}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Aparece em listagens e cards
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Conteúdo */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Conteúdo</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <TiptapEditor
                                                        content={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        placeholder="Escreva o conteúdo do artigo aqui..."
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* SEO */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>SEO</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="meta_title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Meta Título
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Título para SEO (opcional)"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {field.value?.length || 0}
                                                    /60 caracteres
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="meta_description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Meta Descrição
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Descrição para SEO (opcional)"
                                                        {...field}
                                                        rows={3}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {field.value?.length || 0}
                                                    /160 caracteres
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="meta_keywords"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Palavras-chave
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="palavra1, palavra2, palavra3"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Separadas por vírgula
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Imagem Destacada */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Imagem Destacada</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="featured_image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <ImageUpload
                                                        value={field.value}
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

                            {/* Categoria */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Categoria</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="category_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value?.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione uma categoria" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories.map(
                                                            (category) => (
                                                                <SelectItem
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    value={category.id.toString()}
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Série (Opcional) */}
                            {series.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Série (Opcional)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <FormField
                                            control={form.control}
                                            name="series_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={field.value?.toString()}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Sem série" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="">
                                                                Nenhuma
                                                            </SelectItem>
                                                            {series.map((s) => (
                                                                <SelectItem
                                                                    key={s.id}
                                                                    value={s.id.toString()}
                                                                >
                                                                    {s.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            )}

                            {/* Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="draft">
                                                            Rascunho
                                                        </SelectItem>
                                                        <SelectItem value="published">
                                                            Publicado
                                                        </SelectItem>
                                                        <SelectItem value="scheduled">
                                                            Agendado
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Tags */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tags</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="tags"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <TagSelector
                                                        tags={tags}
                                                        selectedIds={
                                                            field.value || []
                                                        }
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        disabled={uploading}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Selecione tags relacionadas
                                                    ao artigo
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

            {/* Dialog de Confirmação de Delete */}
            <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deletar Artigo</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja deletar o artigo "
                            {article.title}"? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialog(false)}
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
