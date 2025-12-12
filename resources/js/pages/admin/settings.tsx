import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import {
    Globe,
    Mail,
    MessageSquare,
    Palette,
    Save,
    Search,
} from 'lucide-react';
import { useState } from 'react';

interface Setting {
    id: number;
    key: string;
    value: string | null;
    type: string;
    group: string;
}

interface Props {
    settings: {
        general?: Setting[];
        seo?: Setting[];
        newsletter?: Setting[];
        appearance?: Setting[];
        comments?: Setting[];
    };
}

export default function Settings({ settings }: Props) {
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    // Criar objeto inicial com valores das settings
    const initialData: Record<string, any> = {};
    Object.values(settings)
        .flat()
        .forEach((setting) => {
            if (setting) {
                initialData[setting.key] =
                    setting.type === 'boolean'
                        ? setting.value === 'true'
                        : setting.value || '';
            }
        });

    const { data, setData, post, processing } = useForm({
        settings: initialData,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/scm/settings', {
            preserveScroll: true,
        });
    };

    const handleImageUpload = async (key: string, file: File | null) => {
        if (!file) {
            setData('settings', { ...data.settings, [key]: '' });
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/scm/upload/image', {
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
                setData('settings', { ...data.settings, [key]: result.url });
            }
        } catch (error) {
            console.error('Erro no upload:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <AdminLayout
            title="Configurações"
            breadcrumbs={[{ label: 'Configurações' }]}
        >
            <Head title="Configurações - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Configurações</h1>
                        <p className="text-muted-foreground">
                            Gerencie as configurações do seu blog
                        </p>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={processing || uploading}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                    </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="general" className="gap-2">
                            <Globe className="h-4 w-4" />
                            Geral
                        </TabsTrigger>
                        <TabsTrigger value="seo" className="gap-2">
                            <Search className="h-4 w-4" />
                            SEO
                        </TabsTrigger>
                        <TabsTrigger value="newsletter" className="gap-2">
                            <Mail className="h-4 w-4" />
                            Newsletter
                        </TabsTrigger>
                        <TabsTrigger value="appearance" className="gap-2">
                            <Palette className="h-4 w-4" />
                            Aparência
                        </TabsTrigger>
                        <TabsTrigger value="comments" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Comentários
                        </TabsTrigger>
                    </TabsList>

                    {/* General Tab */}
                    <TabsContent value="general" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações do Site</CardTitle>
                                <CardDescription>
                                    Configurações básicas do seu blog
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="site_name">
                                        Nome do Site
                                    </Label>
                                    <Input
                                        id="site_name"
                                        value={data.settings.site_name || ''}
                                        onChange={(e) =>
                                            setData('settings', {
                                                ...data.settings,
                                                site_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="site_description">
                                        Descrição
                                    </Label>
                                    <Textarea
                                        id="site_description"
                                        value={
                                            data.settings.site_description || ''
                                        }
                                        onChange={(e) =>
                                            setData('settings', {
                                                ...data.settings,
                                                site_description:
                                                    e.target.value,
                                            })
                                        }
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact_email">
                                        Email de Contato
                                    </Label>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        value={
                                            data.settings.contact_email || ''
                                        }
                                        onChange={(e) =>
                                            setData('settings', {
                                                ...data.settings,
                                                contact_email: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Logo do Site</Label>
                                        <ImageUpload
                                            value={
                                                data.settings.site_logo || ''
                                            }
                                            onChange={(file) =>
                                                handleImageUpload(
                                                    'site_logo',
                                                    file,
                                                )
                                            }
                                            disabled={uploading}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Favicon</Label>
                                        <ImageUpload
                                            value={
                                                data.settings.site_favicon || ''
                                            }
                                            onChange={(file) =>
                                                handleImageUpload(
                                                    'site_favicon',
                                                    file,
                                                )
                                            }
                                            disabled={uploading}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SEO Tab */}
                    <TabsContent value="seo" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configurações de SEO</CardTitle>
                                <CardDescription>
                                    Otimize seu blog para mecanismos de busca
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="meta_description">
                                        Meta Descrição Padrão
                                    </Label>
                                    <Textarea
                                        id="meta_description"
                                        value={
                                            data.settings.meta_description || ''
                                        }
                                        onChange={(e) =>
                                            setData('settings', {
                                                ...data.settings,
                                                meta_description:
                                                    e.target.value,
                                            })
                                        }
                                        rows={3}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Aparece nos resultados de busca
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="meta_keywords">
                                        Palavras-chave Padrão
                                    </Label>
                                    <Textarea
                                        id="meta_keywords"
                                        value={
                                            data.settings.meta_keywords || ''
                                        }
                                        onChange={(e) =>
                                            setData('settings', {
                                                ...data.settings,
                                                meta_keywords: e.target.value,
                                            })
                                        }
                                        rows={2}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Separadas por vírgula
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="google_analytics">
                                        Google Analytics ID
                                    </Label>
                                    <Input
                                        id="google_analytics"
                                        placeholder="G-XXXXXXXXXX"
                                        value={
                                            data.settings.google_analytics || ''
                                        }
                                        onChange={(e) =>
                                            setData('settings', {
                                                ...data.settings,
                                                google_analytics:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="google_site_verification">
                                        Google Site Verification
                                    </Label>
                                    <Input
                                        id="google_site_verification"
                                        value={
                                            data.settings
                                                .google_site_verification || ''
                                        }
                                        onChange={(e) =>
                                            setData('settings', {
                                                ...data.settings,
                                                google_site_verification:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="facebook_pixel">
                                        Facebook Pixel ID
                                    </Label>
                                    <Input
                                        id="facebook_pixel"
                                        value={
                                            data.settings.facebook_pixel || ''
                                        }
                                        onChange={(e) =>
                                            setData('settings', {
                                                ...data.settings,
                                                facebook_pixel: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Newsletter Tab */}
                    <TabsContent value="newsletter" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Configurações de Newsletter
                                </CardTitle>
                                <CardDescription>
                                    Gerencie a newsletter do seu blog
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="newsletter_enabled">
                                            Ativar Newsletter
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Permitir que visitantes se inscrevam
                                        </p>
                                    </div>
                                    <Switch
                                        id="newsletter_enabled"
                                        checked={
                                            data.settings.newsletter_enabled ||
                                            false
                                        }
                                        onCheckedChange={(checked) =>
                                            setData('settings', {
                                                ...data.settings,
                                                newsletter_enabled: checked,
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="newsletter_confirmation_required">
                                            Confirmação Obrigatória
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Exigir confirmação por email
                                        </p>
                                    </div>
                                    <Switch
                                        id="newsletter_confirmation_required"
                                        checked={
                                            data.settings
                                                .newsletter_confirmation_required ||
                                            false
                                        }
                                        onCheckedChange={(checked) =>
                                            setData('settings', {
                                                ...data.settings,
                                                newsletter_confirmation_required:
                                                    checked,
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="newsletter_welcome_text">
                                        Mensagem de Boas-vindas
                                    </Label>
                                    <Textarea
                                        id="newsletter_welcome_text"
                                        value={
                                            data.settings
                                                .newsletter_welcome_text || ''
                                        }
                                        onChange={(e) =>
                                            setData('settings', {
                                                ...data.settings,
                                                newsletter_welcome_text:
                                                    e.target.value,
                                            })
                                        }
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Appearance Tab */}
                    <TabsContent value="appearance" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Aparência</CardTitle>
                                <CardDescription>
                                    Personalize a aparência do seu blog
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="primary_color">
                                        Cor Primária
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="color"
                                            id="primary_color"
                                            value={
                                                data.settings.primary_color ||
                                                '#3b82f6'
                                            }
                                            onChange={(e) =>
                                                setData('settings', {
                                                    ...data.settings,
                                                    primary_color:
                                                        e.target.value,
                                                })
                                            }
                                            className="h-10 w-20"
                                        />
                                        <Input
                                            value={
                                                data.settings.primary_color ||
                                                '#3b82f6'
                                            }
                                            onChange={(e) =>
                                                setData('settings', {
                                                    ...data.settings,
                                                    primary_color:
                                                        e.target.value,
                                                })
                                            }
                                            className="flex-1"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="posts_per_page">
                                        Artigos por Página
                                    </Label>
                                    <Input
                                        id="posts_per_page"
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={
                                            data.settings.posts_per_page || 10
                                        }
                                        onChange={(e) =>
                                            setData('settings', {
                                                ...data.settings,
                                                posts_per_page: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="show_author">
                                            Mostrar Autor
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Exibir nome do autor nos artigos
                                        </p>
                                    </div>
                                    <Switch
                                        id="show_author"
                                        checked={
                                            data.settings.show_author || false
                                        }
                                        onCheckedChange={(checked) =>
                                            setData('settings', {
                                                ...data.settings,
                                                show_author: checked,
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="show_date">
                                            Mostrar Data
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Exibir data de publicação
                                        </p>
                                    </div>
                                    <Switch
                                        id="show_date"
                                        checked={
                                            data.settings.show_date || false
                                        }
                                        onCheckedChange={(checked) =>
                                            setData('settings', {
                                                ...data.settings,
                                                show_date: checked,
                                            })
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Comments Tab */}
                    <TabsContent value="comments" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Comentários</CardTitle>
                                <CardDescription>
                                    Gerencie os comentários do blog
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="comments_enabled">
                                            Ativar Comentários
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Permitir comentários nos artigos
                                        </p>
                                    </div>
                                    <Switch
                                        id="comments_enabled"
                                        checked={
                                            data.settings.comments_enabled ||
                                            false
                                        }
                                        onCheckedChange={(checked) =>
                                            setData('settings', {
                                                ...data.settings,
                                                comments_enabled: checked,
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="comments_moderation">
                                            Moderação Automática
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Comentários precisam ser aprovados
                                        </p>
                                    </div>
                                    <Switch
                                        id="comments_moderation"
                                        checked={
                                            data.settings.comments_moderation ||
                                            false
                                        }
                                        onCheckedChange={(checked) =>
                                            setData('settings', {
                                                ...data.settings,
                                                comments_moderation: checked,
                                            })
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
