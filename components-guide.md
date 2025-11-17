# 🎯 Como Usar os Componentes do Blog YMDL

## 📚 Componentes Disponíveis

### 1. **FeaturedSlider** - Slider de Artigos em Destaque

```tsx
import FeaturedSlider from '@/components/blog/featured-slider';

// USO BÁSICO
<FeaturedSlider articles={featuredArticles} />;
```

**Props:**

- `articles: Article[]` - Array de artigos (OBRIGATÓRIO)

**Quando usar:**

- Home do blog (artigos em destaque)
- Páginas especiais (top posts)

---

### 2. **ArticleHighlight** - Destaque com Carousel de 2 Artigos

```tsx
import ArticleHighlight from '@/components/blog/article-highlight';

// USO BÁSICO (pega automaticamente só 2 artigos)
<ArticleHighlight articles={highlightArticles} />

// COM CLASSE CUSTOMIZADA
<ArticleHighlight
    articles={highlightArticles}
    className="col-lg-8 mb-30"
/>
```

**Props:**

- `articles: Article[]` - Array de artigos (usa apenas os 2 primeiros)
- `className?: string` - Classes CSS customizadas (default: 'col-lg-8 mb-30')

**Características:**

- ✅ Mostra 2 artigos em formato carousel vertical
- ✅ Imagem de fundo grande com overlay
- ✅ Exibe categoria e série (se houver)
- ✅ Animação de transição entre slides
- ✅ Ícone especial se artigo tiver série

**Quando usar:**

- Seção de destaques especiais
- Artigos de séries importantes
- "Artigos Imperdíveis" ou "Leia Também"

**Exemplo na Home:**

```tsx
<div className="row">
    {/* Destaque Carousel - 8 colunas */}
    <ArticleHighlight articles={featuredPosts} />

    {/* Sidebar com cards - 4 colunas */}
    <div className="col-lg-4">
        <PostList articles={sidebarArticles} columns={1} />
    </div>
</div>
```

---

### 3. **PostCard** - Card Individual de Artigo

```tsx
import PostCard from '@/components/blog/post-card';

// USO BÁSICO
<PostCard article={article} />

// USO COM OPÇÕES
<PostCard
    article={article}
    className="col-md-6 mb-40"    // Classes CSS (default: 'col-md-6 mb-40')
    showExcerpt={true}             // Mostrar resumo (default: true)
    showSocial={false}             // Mostrar botões sociais (default: true)
/>
```

**Props:**

- `article: Article` - Objeto Article (OBRIGATÓRIO)
- `className?: string` - Classes CSS customizadas
- `showExcerpt?: boolean` - Mostrar/ocultar excerpt
- `showSocial?: boolean` - Mostrar/ocultar botões de compartilhamento

**Quando usar:**

- Sidebar (artigos relacionados)
- Widgets personalizados
- Qualquer lugar que precise de um card individual

---

### 3. **PostList** - Lista/Grid de Artigos

```tsx
import PostList from '@/components/blog/post-list';

// GRID DE 2 COLUNAS (padrão)
<PostList articles={articles} />

// GRID DE 3 COLUNAS, SEM EXCERPT
<PostList
    articles={articles}
    columns={3}
    showExcerpt={false}
/>

// GRID DE 4 COLUNAS, SEM BOTÕES SOCIAIS
<PostList
    articles={articles}
    columns={4}
    showExcerpt={false}
    showSocial={false}
    emptyMessage="Nenhum artigo encontrado nesta categoria."
/>
```

**Props:**

- `articles: Article[]` - Array de artigos (OBRIGATÓRIO)
- `columns?: 1 | 2 | 3 | 4` - Número de colunas (default: 2)
- `showExcerpt?: boolean` - Mostrar excerpt nos cards (default: true)
- `showSocial?: boolean` - Mostrar botões sociais (default: true)
- `emptyMessage?: string` - Mensagem quando não há artigos

**Quando usar:**

- Home do blog (lista de artigos)
- Página de categoria
- Página de busca
- Página de tag
- Qualquer lista de artigos

---

## 🔧 Exemplos Práticos

### **Exemplo 1: Página Home Completa**

```tsx
// resources/js/pages/blog/index.tsx
import BlogLayout from '@/layouts/blog-layout';
import FeaturedSlider from '@/components/blog/featured-slider';
import PostList from '@/components/blog/post-list';
import { BlogIndexProps } from '@/types/blog';

export default function Home({
    articles,
    featuredPosts,
    categories,
}: BlogIndexProps) {
    return (
        <BlogLayout title="YAMDL - Home">
            <div className="pt-30 container">
                {/* Slider de Destaques */}
                <FeaturedSlider articles={featuredPosts} />

                {/* Grid de Artigos Recentes - 3 colunas */}
                <PostList
                    articles={articles.data}
                    columns={3}
                    showExcerpt={false}
                />
            </div>
        </BlogLayout>
    );
}
```

---

### **Exemplo 2: Página de Categoria**

```tsx
// resources/js/pages/blog/category.tsx
import BlogLayout from '@/layouts/blog-layout';
import PostList from '@/components/blog/post-list';
import { CategoryShowProps } from '@/types/blog';

export default function Category({ category, articles }: CategoryShowProps) {
    return (
        <BlogLayout title={`${category.name} - YAMDL`}>
            <div className="pt-50 container">
                {/* Header */}
                <div className="row mb-30">
                    <div className="col-12">
                        <h1>{category.name}</h1>
                        <p className="text-muted">{category.description}</p>
                    </div>
                </div>

                {/* Grid de 2 colunas com excerpt */}
                <PostList
                    articles={articles.data}
                    columns={2}
                    showExcerpt={true}
                    emptyMessage={`Nenhum artigo encontrado em ${category.name}.`}
                />
            </div>
        </BlogLayout>
    );
}
```

---

### **Exemplo 3: Sidebar com Artigos Relacionados**

```tsx
// Dentro de qualquer página
import PostCard from '@/components/blog/post-card';

function Sidebar({ relatedArticles }) {
    return (
        <div className="sidebar">
            <h3>Artigos Relacionados</h3>

            {relatedArticles.map((article) => (
                <PostCard
                    key={article.id}
                    article={article}
                    className="col-12 mb-20" // Largura total
                    showExcerpt={false} // Sem resumo
                    showSocial={false} // Sem botões sociais
                />
            ))}
        </div>
    );
}
```

---

### **Exemplo 4: Grid Responsivo Customizado**

```tsx
// Grid que muda de 1 para 3 colunas conforme a tela
import PostCard from '@/components/blog/post-card';

function CustomGrid({ articles }) {
    return (
        <div className="row">
            {articles.map((article) => (
                <PostCard
                    key={article.id}
                    article={article}
                    className="col-12 col-md-6 col-lg-4 mb-40" // Responsivo!
                    showExcerpt={true}
                />
            ))}
        </div>
    );
}
```

---

## 🚀 Fluxo Completo (Laravel → React)

### **1. Controller (Laravel)**

```php
// app/Http/Controllers/BlogController.php
public function index()
{
    $articles = Article::with(['author', 'category', 'tags'])
        ->published()
        ->latest('published_at')
        ->paginate(12);

    $featuredPosts = Article::with(['author', 'category'])
        ->published()
        ->orderBy('views_count', 'desc')
        ->take(5)
        ->get();

    return Inertia::render('blog/index', [
        'articles' => $articles,
        'featuredPosts' => $featuredPosts,
    ]);
}
```

### **2. Rota (Laravel)**

```php
// routes/web.php
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
```

### **3. Página (React)**

```tsx
// resources/js/pages/blog/index.tsx
import FeaturedSlider from '@/components/blog/featured-slider';
import PostList from '@/components/blog/post-list';
import { BlogIndexProps } from '@/types/blog';

export default function Index({ articles, featuredPosts }: BlogIndexProps) {
    return (
        <div>
            <FeaturedSlider articles={featuredPosts} />
            <PostList articles={articles.data} columns={3} />
        </div>
    );
}
```

**É SÓ ISSO!** Zero transformações, zero redundância! 🎉

---

## 📌 Dicas Importantes

1. **Type-Safety**: Sempre importe os types de `@/types/blog`
2. **Helpers**: Use os helpers de `@/utils/blog-helpers` para formatação
3. **Inertia Links**: Todos os links usam `<Link>` do Inertia.js
4. **Responsividade**: Use classes Bootstrap ou customize `className`
5. **Props Opcionais**: Customize com `showExcerpt`, `showSocial`, `columns`

---

## ✅ Checklist de Uso

- [ ] Importar o componente correto
- [ ] Passar o prop `article` ou `articles`
- [ ] Customizar com props opcionais (se necessário)
- [ ] Verificar que os dados vêm do Laravel com relationships

---

**Criado por:** Yuvi Matique  
**Data:** $(date +'%d/%m/%Y')
