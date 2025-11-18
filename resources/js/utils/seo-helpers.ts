import { Article, Category, Series } from '@/types/blog';
import { SEOProps } from '@/types/seo';

/**
 * Configurações do site
 */
const SITE_URL = 'https://yamdl.com';

/**
 * Gera SEO props para um artigo
 * 100% seguro contra erros de Symbol/Iterator
 */
export const generateArticleSEO = (article: Article): SEOProps => {
    // Garantir que tags é um array válido
    const tagsArray = Array.isArray(article.tags) ? article.tags : [];
    const tagNames = tagsArray
        .map((tag) => tag?.name)
        .filter(Boolean) as string[];

    return {
        title: article.title || 'Artigo',
        description: article.excerpt || article.meta_description || '',
        keywords: tagNames,

        // Open Graph
        ogType: 'article',
        ogTitle: article.title || 'Artigo',
        ogDescription: article.excerpt || '',
        ogImage: article.featured_image
            ? `${SITE_URL}${article.featured_image}`
            : undefined,
        ogUrl: `${SITE_URL}/blog/artigo/${article.slug}`,

        // Article
        articlePublishedTime: article.published_at,
        articleModifiedTime: article.updated_at,
        articleAuthor: article.author?.name || '',
        articleSection: article.category?.name || '',
        articleTags: tagNames,

        // Twitter
        twitterCard: 'summary_large_image',
        twitterCreator: '',

        // Canonical
        canonical: `${SITE_URL}/blog/artigo/${article.slug}`,
    };
};

/**
 * Gera SEO props para uma categoria
 */
export const generateCategorySEO = (category: Category): SEOProps => {
    return {
        title: `${category.name} - Artigos e Estudos`,
        description:
            category.description ||
            `Explore todos os artigos da categoria ${category.name}`,
        keywords: [category.name, 'estudos bíblicos', 'artigos cristãos'],

        ogImage: category.image ? `${SITE_URL}${category.image}` : undefined,
        ogUrl: `${SITE_URL}/blog/categoria/${category.slug}`,

        canonical: `${SITE_URL}/blog/categoria/${category.slug}`,
    };
};

/**
 * Gera SEO props para uma série
 */
export const generateSeriesSEO = (series: Series): SEOProps => {
    return {
        title: `Série: ${series.title}`,
        description: series.description || `Série de estudos: ${series.title}`,
        keywords: [series.title, 'série bíblica', 'estudo em série'],

        ogType: 'article',
        ogImage: series.cover_image
            ? `${SITE_URL}${series.cover_image}`
            : undefined,
        ogUrl: `${SITE_URL}/blog/serie/${series.slug}`,

        articleSection: 'Série',
        articleTags: [series.title],

        canonical: `${SITE_URL}/blog/serie/${series.slug}`,
    };
};

/**
 * Gera SEO props para busca
 */
export const generateSearchSEO = (query: string): SEOProps => {
    return {
        title: `Busca: ${query}`,
        description: `Resultados da busca por "${query}"`,
        robots: 'noindex,follow',
    };
};

/**
 * Gera SEO props para home
 */
export const generateHomeSEO = (): SEOProps => {
    return {
        title: 'YAMDL - Biblioteca Digital de Estudos Bíblicos',
        description:
            'Explore nossa coleção de estudos bíblicos, artigos cristãos, séries e recursos para crescimento espiritual.',
        keywords: [
            'estudos bíblicos',
            'artigos cristãos',
            'devocional',
            'teologia',
            'crescimento espiritual',
        ],
        ogType: 'website',
        ogImage: `${SITE_URL}/images/og-home.jpg`,
        ogUrl: SITE_URL,
        canonical: SITE_URL,
    };
};

/**
 * Trunca texto para meta description (máximo 160 caracteres)
 */
export const truncateForMeta = (text: string, maxLength = 160): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
};

/**
 * Gera URL absoluta
 */
export const getAbsoluteUrl = (path: string): string => {
    return `${SITE_URL}${path}`;
};
