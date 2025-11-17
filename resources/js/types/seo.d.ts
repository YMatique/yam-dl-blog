/**
 * Types para SEO e Meta Tags
 */

export interface SEOProps {
    // Básico
    title: string;
    description?: string;
    keywords?: string[];

    // Open Graph (Facebook, WhatsApp, etc)
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'profile';
    ogUrl?: string;

    // Twitter Card
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    twitterSite?: string;
    twitterCreator?: string;

    // Article específico (para blog posts)
    articlePublishedTime?: string;
    articleModifiedTime?: string;
    articleAuthor?: string;
    articleSection?: string;
    articleTags?: string[];

    // Canonical
    canonical?: string;

    // Robots
    robots?: string; // 'index,follow' | 'noindex,nofollow' etc

    // Idioma
    locale?: string;
    alternateLocales?: string[];
}

export interface LayoutSEOProps extends SEOProps {
    children: React.ReactNode;
}
