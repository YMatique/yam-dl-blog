# 📦 Dependências Necessárias - Sessão 1

## Instalar React Hook Form + Zod

```bash
npm install react-hook-form @hookform/resolvers zod
```

## O que são:

- **react-hook-form**: Gerenciamento de formulários performático
- **@hookform/resolvers**: Integração com validadores (Zod)
- **zod**: Schema validation TypeScript-first

---

## Arquivos criados:

### **1. Textarea** (`resources/js/components/ui/textarea.tsx`)

- Campo de texto multilinha
- Estilizado com Tailwind
- Suporte a ref e validação

### **2. Form** (`resources/js/components/ui/form.tsx`)

- Form, FormField, FormItem, FormLabel, FormControl, FormMessage
- Integração com React Hook Form
- Validação automática com erros

### **3. Table** (`resources/js/components/ui/table.tsx`)

- Table, TableHeader, TableBody, TableRow, TableHead, TableCell
- Responsivo
- Estilizado

### **4. Pagination** (`resources/js/components/pagination.tsx`)

- Componente de paginação para Laravel
- Integração com Inertia links
- Prev/Next + números

---

## Exemplo de uso:

### **Form com validação:**

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
    content: z.string().min(10, 'Conteúdo muito curto'),
});

function MyForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite o título"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Conteúdo</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Digite o conteúdo"
                                    {...field}
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

### **Table:**

```tsx
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

function MyTable({ articles }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {articles.map((article) => (
                    <TableRow key={article.id}>
                        <TableCell>{article.title}</TableCell>
                        <TableCell>{article.status}</TableCell>
                        <TableCell>{article.created_at}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
```

### **Pagination:**

```tsx
import Pagination from '@/components/pagination';

function MyPage({ articles }) {
    return (
        <>
            {/* Conteúdo */}
            <Pagination links={articles.links} />
        </>
    );
}
```

---

## ✅ Checklist:

- [ ] Instalar: `npm install react-hook-form @hookform/resolvers zod`
- [ ] Criar `textarea.tsx` em `resources/js/components/ui/`
- [ ] Criar `form.tsx` em `resources/js/components/ui/`
- [ ] Criar `table.tsx` em `resources/js/components/ui/`
- [ ] Criar `pagination.tsx` em `resources/js/components/`

---

**Pronto para Sessão 2 (Tiptap Editor)!** 🚀
