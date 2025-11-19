# 📤 Como usar ImageUpload e FileUpload

## Instalação

```bash
npm install react-dropzone
```

---

## 1. ImageUpload - Upload de Imagens

### Uso básico

```tsx
import ImageUpload from '@/components/image-upload';
import { useState } from 'react';

function MyForm() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');

    return (
        <ImageUpload
            value={imageUrl}
            onChange={setImageFile}
            onUrlChange={setImageUrl}
            maxSize={5} // 5MB
        />
    );
}
```

### Com React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

const formSchema = z.object({
    featured_image: z.string().optional(),
});

function ArticleForm() {
    const [imageFile, setImageFile] = useState<File | null>(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            featured_image: '',
        },
    });

    const onSubmit = async (data) => {
        // Se tem imagem nova, fazer upload primeiro
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);

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
            }
        }

        // Enviar dados do artigo
        router.post('/admin/articles', data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="featured_image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Imagem Destacada</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value}
                                    onChange={setImageFile}
                                    onUrlChange={field.onChange}
                                    maxSize={5}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Salvar</Button>
            </form>
        </Form>
    );
}
```

### Com upload direto (sem esperar submit)

```tsx
import ImageUpload from '@/components/image-upload';
import { useState } from 'react';

function InstantUploadExample() {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleImageChange = async (file: File | null) => {
        if (!file) {
            setImageUrl('');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('image', file);

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
                setImageUrl(result.url);
            }
        } catch (error) {
            console.error('Erro no upload:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <ImageUpload
                value={imageUrl}
                onChange={handleImageChange}
                disabled={uploading}
            />
            {uploading && <p>Fazendo upload...</p>}
        </div>
    );
}
```

---

## 2. FileUpload - Upload de Arquivos

### Uso básico

```tsx
import FileUpload from '@/components/file-upload';
import { useState } from 'react';

function DocumentUpload() {
    const [file, setFile] = useState<File | null>(null);

    return (
        <FileUpload
            value={file}
            onChange={setFile}
            accept=".pdf,.doc,.docx"
            maxSize={10} // 10MB
        />
    );
}
```

---

## Backend - Controller

### Criar o controller:

```bash
php artisan make:controller Admin/UploadController
```

Copie o código do `UploadController.php` fornecido.

### Instalar Intervention Image (opcional, para redimensionar):

```bash
composer require intervention/image
```

### Configurar storage:

```bash
php artisan storage:link
```

### Adicionar rotas:

```php
// routes/web.php
require __DIR__.'/upload-routes.php';
```

---

## Props - ImageUpload

| Prop          | Tipo                           | Default     | Descrição                |
| ------------- | ------------------------------ | ----------- | ------------------------ |
| `value`       | `string`                       | -           | URL da imagem atual      |
| `onChange`    | `(file: File \| null) => void` | -           | Callback com arquivo     |
| `onUrlChange` | `(url: string) => void`        | -           | Callback com URL preview |
| `accept`      | `string`                       | `'image/*'` | Tipos aceitos            |
| `maxSize`     | `number`                       | `5`         | Tamanho máximo em MB     |
| `disabled`    | `boolean`                      | `false`     | Desabilitar upload       |
| `className`   | `string`                       | -           | Classes extras           |

---

## Props - FileUpload

| Prop        | Tipo                           | Default | Descrição            |
| ----------- | ------------------------------ | ------- | -------------------- |
| `value`     | `File \| string`               | -       | Arquivo ou URL       |
| `onChange`  | `(file: File \| null) => void` | -       | Callback com arquivo |
| `accept`    | `string`                       | `'*'`   | Tipos aceitos        |
| `maxSize`   | `number`                       | `10`    | Tamanho máximo em MB |
| `disabled`  | `boolean`                      | `false` | Desabilitar upload   |
| `multiple`  | `boolean`                      | `false` | Múltiplos arquivos   |
| `className` | `string`                       | -       | Classes extras       |

---

**Pronto para usar!** 🚀
