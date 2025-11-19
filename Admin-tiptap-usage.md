# 📝 Como usar o TiptapEditor

## 1. Uso básico (sem formulário)

```tsx
import TiptapEditor from '@/components/tiptap-editor';
import { useState } from 'react';

function MyComponent() {
    const [content, setContent] = useState('');

    return (
        <TiptapEditor
            content={content}
            onChange={setContent}
            placeholder="Escreva algo incrível..."
        />
    );
}
```

---

## 2. Com React Hook Form

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
import TiptapEditor from '@/components/tiptap-editor';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    content: z.string().min(10, 'Conteúdo muito curto'),
});

function ArticleForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Conteúdo do Artigo</FormLabel>
                            <FormControl>
                                <TiptapEditor
                                    content={field.value}
                                    onChange={field.onChange}
                                    placeholder="Escreva seu artigo aqui..."
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

---

## 3. Com Upload de Imagem

```tsx
import TiptapEditor from '@/components/tiptap-editor';
import { useState } from 'react';
import { router } from '@inertiajs/react';

function ArticleEditor() {
    const [content, setContent] = useState('');

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('image', file);

            // Upload para o backend
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            // Inserir imagem no editor
            // Você precisa ter acesso ao editor aqui
            // Alternativa: usar callback ou ref
            console.log('URL da imagem:', data.url);
        };

        input.click();
    };

    return (
        <TiptapEditor
            content={content}
            onChange={setContent}
            onImageUpload={handleImageUpload}
        />
    );
}
```

---

## 4. Apenas leitura (Preview)

```tsx
import TiptapEditor from '@/components/tiptap-editor';

function ArticlePreview({ content }) {
    return <TiptapEditor content={content} editable={false} />;
}
```

---

## Props do TiptapEditor:

| Prop            | Tipo                     | Default                  | Descrição                      |
| --------------- | ------------------------ | ------------------------ | ------------------------------ |
| `content`       | `string`                 | `''`                     | Conteúdo HTML inicial          |
| `onChange`      | `(html: string) => void` | -                        | Callback quando conteúdo muda  |
| `placeholder`   | `string`                 | `'Comece a escrever...'` | Placeholder                    |
| `editable`      | `boolean`                | `true`                   | Editor editável ou só leitura  |
| `className`     | `string`                 | -                        | Classes CSS extras             |
| `onImageUpload` | `() => void`             | -                        | Callback para upload de imagem |

---

## Atalhos de Teclado:

- **Ctrl+B** - Negrito
- **Ctrl+I** - Itálico
- **Ctrl+U** - Sublinhado
- **Ctrl+Z** - Desfazer
- **Ctrl+Y** - Refazer
- **Ctrl+Shift+X** - Tachado

---

## Formatações Disponíveis:

✅ Negrito, Itálico, Sublinhado, Tachado  
✅ Headings (H1, H2, H3)  
✅ Listas (marcadores e numeradas)  
✅ Citações (blockquote)  
✅ Links  
✅ Imagens  
✅ Código inline  
✅ Alinhamento (esquerda, centro, direita)  
✅ Desfazer/Refazer

---

**Pronto para usar!** 🚀
