# 📚 Estrutura de Componentes do Blog YMDL

## ✅ O que criamos (Zero Redundância!)

### 1. **Types** (`resources/js/types/blog.d.ts`)

- ✅ Todos os types baseados nos models Laravel
- ✅ Article, Category, Tag, Series, User, News, Event
- ✅ PaginatedData (para paginação do Laravel)
- ✅ Props interfaces para páginas Inertia

### 2. **Helpers** (`resources/js/utils/blog-helpers.ts`)

- ✅ `formatDate()` - Formata datas
- ✅ `formatViews()` - Formata visualizações (1.5k, 2M, etc)
- ✅ `formatReadingTime()` - Tempo de leitura
- ✅ `getArticleUrl()` - URL do artigo
- ✅ `getCategoryUrl()` - URL da categoria
- ✅ `getImageUrl()` - URL da imagem (com fallback)
- ✅ E mais...

### 3. **Componentes**

#### `FeaturedSlider` (`components/blog/featured-slider.tsx`)

```tsx
<FeaturedSlider articles={featuredArticles} />
```

- ✅ Slider de artigos em destaque
- ✅ Usa Article type direto
- ✅ Links com Inertia.js

#### `PostCard` (`components/blog/post-card.tsx`)

```tsx
<PostCard
    article={article}
    className="col-md-6"
    showExcerpt={true}
    showSocial={true}
/>
```

- ✅ Card individual de artigo
- ✅ Totalmente reutilizável
- ✅ Props opcionais para customização
- ✅ Compartilhamento social funcional

#### `PostList` (`components/blog/post-list.tsx`)

```tsx
<PostList articles={articles} columns={3} showExcerpt={false} />
```

- ✅ Lista/Grid de artigos
- ✅ Usa PostCard internamente
- ✅ 1, 2, 3 ou 4 colunas

---

## 🎯 Como usar nos diferentes contextos

### **Exemplo 1: Home do Blog**

```tsx
import FeaturedSlider from '@/components/blog/featured-slider';
import PostList from '@/components/blog/post-list';
import { BlogIndexProps } from '@/types/blog';

export default function Home({ articles, featuredPosts }: BlogIndexProps) {
    return (
        <div>
            {/* Slider de Destaques */}
            <FeaturedSlider articles={featuredPosts} />

            {/* Lista de Artigos - 2 colunas */}
            <PostList articles={articles.data} columns={2} />
        </div>
    );
}
```

### **Exemplo 2: Página de Categoria**

```tsx
import PostList from '@/components/blog/post-list';
import { CategoryShowProps } from '@/types/blog';

export default function Category({ category, articles }: CategoryShowProps) {
    return (
        <div>
            <h1>{category.name}</h1>

            {/* Grid de 3 colunas, sem excerpt */}
            <PostList
                articles={articles.data}
                columns={3}
                showExcerpt={false}
            />
        </div>
    );
}
```

### **Exemplo 3: Sidebar - Artigos Relacionados**

```tsx
import PostCard from '@/components/blog/post-card';

export default function Sidebar({ relatedArticles }) {
    return (
        <div className="sidebar">
            <h3>Artigos Relacionados</h3>
            {relatedArticles.map((article) => (
                <PostCard
                    key={article.id}
                    article={article}
                    className="col-12 mb-20"
                    showExcerpt={false}
                    showSocial={false}
                />
            ))}
        </div>
    );
}
```

---

## 🚀 Benefícios

1. **Zero Transformações**
    - Article vem direto do Laravel
    - Sem adapters ou transformers

2. **Type-Safe**
    - TypeScript valida tudo
    - Autocomplete no VSCode

3. **Reutilizável**
    - Componentes funcionam em qualquer contexto
    - Props customizáveis

4. **Inertia.js**
    - Navegação SPA
    - Sem page reload

5. **Sem Redundância**
    - Helpers centralizados
    - Um único PostCard para tudo

---

## 📦 Próximos Passos

- [ ] Criar página `index.tsx` (Home do blog)
- [ ] Criar página `show.tsx` (Artigo individual)
- [ ] Criar página `category.tsx` (Artigos por categoria)
- [ ] Criar Controller Laravel (`BlogController`)
- [ ] Criar Rotas

---

**Estrutura criada em:** `$(date +'%d/%m/%Y')`
