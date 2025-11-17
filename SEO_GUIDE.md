# 🔍 Sistema de SEO Completo - YAMDL

## 📦 O que criamos

### 1. **Types** (`types/seo.d.ts`)

- Interface completa com todas as meta tags possíveis
- Open Graph, Twitter Card, Article Meta, etc.

### 2. **Componente SEOHead** (`components/seo/seo-head.tsx`)

- Gera automaticamente todas as meta tags
- Configuração centralizada do site
- Fallbacks inteligentes

### 3. **Helpers** (`utils/seo-helpers.ts`)

- Funções para gerar SEO automaticamente
- `generateArticleSEO()`, `generateCategorySEO()`, etc.

---

## 🚀 Como Usar

### **Método 1: Manual (Controle Total)**

```tsx
import BlogLayout from '@/layouts/blog-layout';

export default function ArticleShow({ article }) {
    return (
        <BlogLayout
            title={article.title}
            description={article.excerpt}
            keywords={['fé', 'bíblia', 'estudo']}
            ogType="article"
            ogImage={article.featured_image}
            articlePublishedTime={article.published_at}
            articleAuthor={article.author.name}
        >
            {/* Conteúdo */}
        </BlogLayout>
    );
}
```

---

### **Método 2: Com Helpers (Recomendado)**

```tsx
import BlogLayout from '@/layouts/blog-layout';
import { generateArticleSEO } from '@/utils/seo-helpers';

export default function ArticleShow({ article }) {
    const seoProps = generateArticleSEO(article);

    return <BlogLayout {...seoProps}>{/* Conteúdo */}</BlogLayout>;
}
```

---

## 📋 Exemplos por Tipo de Página

### **1. Home**

```tsx
import { generateHomeSEO } from '@/utils/seo-helpers';

export default function Home() {
    return <BlogLayout {...generateHomeSEO()}>{/* Conteúdo */}</BlogLayout>;
}
```

**Resultado:**

```html
<title>YAMDL - Biblioteca Digital de Estudos Bíblicos</title>
<meta name="description" content="Explore nossa coleção..." />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://yamdl.com/images/og-home.jpg" />
```

---

### **2. Artigo Individual**

```tsx
import { generateArticleSEO } from '@/utils/seo-helpers';

export default function ArticleShow({ article }) {
    return (
        <BlogLayout {...generateArticleSEO(article)}>
            <h1>{article.title}</h1>
            {/* Conteúdo do artigo */}
        </BlogLayout>
    );
}
```

**Resultado:**

```html
<title>A Graça em Romanos | YAMDL</title>
<meta name="description" content="Explorando as doutrinas..." />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2025-01-15" />
<meta property="article:author" content="João Silva" />
<meta name="twitter:card" content="summary_large_image" />
```

---

### **3. Categoria**

```tsx
import { generateCategorySEO } from '@/utils/seo-helpers';

export default function CategoryShow({ category, articles }) {
    return (
        <BlogLayout {...generateCategorySEO(category)}>
            <h1>{category.name}</h1>
            {/* Lista de artigos */}
        </BlogLayout>
    );
}
```

---

### **4. Série**

```tsx
import { generateSeriesSEO } from '@/utils/seo-helpers';

export default function SeriesShow({ series }) {
    return (
        <BlogLayout {...generateSeriesSEO(series)}>
            <h1>{series.title}</h1>
            {/* Artigos da série */}
        </BlogLayout>
    );
}
```

---

### **5. Busca**

```tsx
import { generateSearchSEO } from '@/utils/seo-helpers';

export default function Search({ query, results }) {
    return (
        <BlogLayout {...generateSearchSEO(query)}>
            <h1>Resultados para: {query}</h1>
            {/* Resultados */}
        </BlogLayout>
    );
}
```

**Nota:** Páginas de busca usam `robots="noindex,follow"` automaticamente.

---

## ⚙️ Configuração

### **1. Editar Configurações do Site**

Arquivo: `components/seo/seo-head.tsx`

```typescript
const SITE_CONFIG = {
    name: 'YAMDL',
    fullName: 'Yuvi Matique Digital Library',
    description: 'Sua descrição aqui',
    url: 'https://seu-dominio.com', // ← Altere aqui!
    logo: '/images/logo.png',
    twitterHandle: '@seu_twitter', // ← Altere aqui!
    locale: 'pt_BR',
    type: 'website',
};
```

### **2. Editar URL do Site**

Arquivo: `utils/seo-helpers.ts`

```typescript
const SITE_URL = 'https://seu-dominio.com'; // ← Altere aqui!
```

---

## 🎯 Meta Tags Geradas

### **Tags Básicas**

- `<title>` - Título da página
- `<meta name="description">` - Descrição
- `<meta name="keywords">` - Palavras-chave
- `<meta name="robots">` - Indexação

### **Open Graph (Facebook, WhatsApp, LinkedIn)**

- `og:title`, `og:description`, `og:image`
- `og:type` - website ou article
- `og:url` - URL canônica
- `og:locale` - Idioma

### **Article Meta (para posts)**

- `article:published_time` - Data de publicação
- `article:modified_time` - Data de atualização
- `article:author` - Autor
- `article:section` - Categoria
- `article:tag` - Tags

### **Twitter Card**

- `twitter:card` - Tipo de card
- `twitter:title`, `twitter:description`, `twitter:image`
- `twitter:site`, `twitter:creator`

### **PWA / Mobile**

- `theme-color` - Cor do tema
- `apple-mobile-web-app-*` - Configurações iOS

---

## ✅ Checklist de SEO

- [ ] Configurar `SITE_URL` e `SITE_CONFIG`
- [ ] Adicionar imagens OG (1200x630px)
- [ ] Testar com [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Testar com [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verificar canonical URLs
- [ ] Validar sitemap.xml
- [ ] Configurar Google Analytics
- [ ] Adicionar Schema.org (JSON-LD)

---

## 🔗 Recursos Úteis

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org](https://schema.org/)
- [Google Rich Results](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

---

## 🎨 Dicas de Imagens OG

### **Tamanhos Recomendados:**

- Open Graph: **1200 x 630px**
- Twitter Card: **1200 x 675px** (16:9)
- Logo: **512 x 512px** (quadrado)

### **Gerar Imagens Dinamicamente:**

```tsx
// No Controller (Laravel)
$article->og_image = "https://yamdl.com/og-images/{$article->slug}.jpg";
```

---

**Sistema completo e pronto para produção!** 🚀
