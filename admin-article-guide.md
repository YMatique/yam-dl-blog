# 📋 Página Index de Artigos - Guia Completo

## Estrutura de Arquivos

```
resources/js/Pages/admin/articles/
└── Index.tsx

app/Http/Controllers/Admin/
└── ArticleController.php

routes/
└── admin-routes.php
```

---

## Features Implementadas

### ✅ Lista de Artigos

- Tabela completa com todos os dados
- Paginação automática (15 por página)
- Ordenação por data (mais recentes primeiro)

### ✅ Filtros

- **Busca**: Por título ou conteúdo
- **Status**: Todos, Publicados, Rascunhos, Agendados
- **Categoria**: Filtrar por categoria específica
- Botão "Aplicar Filtros"
- Botão "Limpar" (reseta tudo)

### ✅ Estatísticas

- Total de artigos
- Artigos publicados
- Artigos em rascunho

### ✅ Ações por Artigo

- **Visualizar**: Abre artigo em nova aba
- **Editar**: Vai para página de edição
- **Deletar**: Abre dialog de confirmação

### ✅ Dialog de Confirmação

- Confirma antes de deletar
- Mostra nome do artigo
- Botões: Cancelar / Deletar

### ✅ Badges Visuais

- **Status**: Colorido (publicado/rascunho/agendado)
- **Categoria**: Outline badge

### ✅ Responsivo

- Layout adaptado para mobile
- Table scroll horizontal em telas pequenas

---

## Backend - ArticleController

### Métodos Implementados:

#### `index()` - Lista com filtros

```php
GET /admin/articles
GET /admin/articles?search=palavra
GET /admin/articles?status=published
GET /admin/articles?category=1
GET /admin/articles?search=palavra&status=published&category=1
```

#### `create()` - Form criar

```php
GET /admin/articles/create
```

#### `store()` - Salvar novo

```php
POST /admin/articles
```

#### `edit()` - Form editar

```php
GET /admin/articles/{id}/edit
```

#### `update()` - Atualizar

```php
PUT /admin/articles/{id}
```

#### `destroy()` - Deletar

```php
DELETE /admin/articles/{id}
```

---

## Estrutura de Dados

### Article (Modelo)

```php
$table->id();
$table->string('title');
$table->string('slug')->unique();
$table->text('content');
$table->text('excerpt')->nullable();
$table->string('featured_image')->nullable();
$table->foreignId('category_id')->constrained();
$table->foreignId('series_id')->nullable()->constrained();
$table->foreignId('author_id')->constrained('users');
$table->enum('status', ['draft', 'published', 'scheduled'])->default('draft');
$table->timestamp('published_at')->nullable();
$table->integer('views')->default(0);
$table->string('meta_title')->nullable();
$table->text('meta_description')->nullable();
$table->string('meta_keywords')->nullable();
$table->timestamps();
```

### Relacionamentos

```php
// Article.php
public function category()
{
    return $this->belongsTo(Category::class);
}

public function series()
{
    return $this->belongsTo(Series::class);
}

public function author()
{
    return $this->belongsTo(User::class, 'author_id');
}

public function tags()
{
    return $this->belongsToMany(Tag::class);
}
```

---

## Props do Componente Index

```typescript
interface Props {
    articles: {
        data: Article[]; // Array de artigos
        links: PaginationLink[]; // Links de paginação
        total: number; // Total de artigos
        per_page: number; // Por página
        current_page: number; // Página atual
    };
    categories: Category[]; // Para filtro
    filters: {
        search?: string; // Busca atual
        status?: string; // Status filtrado
        category?: string; // Categoria filtrada
    };
}
```

---

## Como usar na prática

### 1. Adicionar rotas:

```php
// routes/web.php
require __DIR__.'/admin-routes.php';
```

### 2. Criar migration de articles:

```bash
php artisan make:migration create_articles_table
```

### 3. Criar modelo Article:

```bash
php artisan make:model Article
```

### 4. Testar a página:

```
http://localhost/admin/articles
```

---

## Próximos Passos

Agora que temos a lista funcionando, o próximo passo é:

**Sessão 5: Criar/Editar Artigos**

- Formulário completo
- Validação com Zod
- Editor Tiptap
- Upload de imagem
- Seleção de categoria
- Tags
- SEO fields

---

## Customizações Possíveis

### Adicionar mais filtros:

```tsx
// Por autor
<Select value={author} onValueChange={setAuthor}>
    <SelectTrigger>
        <SelectValue placeholder="Autor" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        {authors.map((author) => (
            <SelectItem key={author.id} value={author.id.toString()}>
                {author.name}
            </SelectItem>
        ))}
    </SelectContent>
</Select>
```

### Adicionar ações em massa:

```tsx
// Checkbox para selecionar múltiplos
const [selected, setSelected] = useState<number[]>([]);

// Botão de deletar múltiplos
<Button
    variant="destructive"
    onClick={handleBulkDelete}
    disabled={selected.length === 0}
>
    Deletar {selected.length} selecionados
</Button>;
```

### Adicionar export:

```tsx
<Button variant="outline">
    <Download className="mr-2 h-4 w-4" />
    Exportar CSV
</Button>
```

---

**Página Index completa e funcional!** 🎉
