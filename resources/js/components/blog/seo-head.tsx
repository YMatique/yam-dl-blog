import { SEOProps } from '@/types/seo';
import { Head } from '@inertiajs/react';
import React from 'react';

/**
 * Configurações padrão do site
 */
const SITE_CONFIG = {
    name: 'YAMDL',
    fullName: 'Yuvi Matique Digital Library',
    description:
        'Biblioteca digital de estudos bíblicos, artigos e recursos cristãos',
    url: 'https://yamdl.com',
    logo: '/images/logo.png',
    twitterHandle: '@yamdl',
    locale: 'pt_BR',
    type: 'website',
};

/**
 * Componente SEO Head otimizado e seguro
 */
interface SEOHeadProps extends SEOProps {}

const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description = SITE_CONFIG.description,
    keywords = [],
    ogTitle,
    ogDescription,
    ogImage,
    ogType = 'website',
    ogUrl,
    twitterCard = 'summary_large_image',
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterSite = SITE_CONFIG.twitterHandle,
    twitterCreator,
    articlePublishedTime,
    articleModifiedTime,
    articleAuthor,
    articleSection,
    articleTags = [],
    canonical,
    robots = 'index,follow',
    locale = SITE_CONFIG.locale,
    alternateLocales = [],
}) => {
    // Garantir que keywords é um array
    const safeKeywords = Array.isArray(keywords) ? keywords : [];

    // Garantir que articleTags é um array
    const safeArticleTags = Array.isArray(articleTags) ? articleTags : [];

    // Garantir que alternateLocales é um array
    const safeAlternateLocales = Array.isArray(alternateLocales)
        ? alternateLocales
        : [];

    // Título completo
    const fullTitle = title?.includes(SITE_CONFIG.name)
        ? title
        : `${title} | ${SITE_CONFIG.name}`;

    // Open Graph defaults
    const finalOgTitle = ogTitle || title;
    const finalOgDescription = ogDescription || description;
    const finalOgImage = ogImage || SITE_CONFIG.logo;
    const finalOgUrl =
        ogUrl ||
        (typeof window !== 'undefined'
            ? window.location.href
            : SITE_CONFIG.url);

    // Twitter defaults
    const finalTwitterTitle = twitterTitle || finalOgTitle;
    const finalTwitterDescription = twitterDescription || finalOgDescription;
    const finalTwitterImage = twitterImage || finalOgImage;

    // Canonical URL
    const finalCanonical =
        canonical ||
        (typeof window !== 'undefined' ? window.location.href : '');

    return (
        <Head>
            {/* ========== CSS e JS do Template ========== */}
            <link
                rel="shortcut icon"
                type="image/x-icon"
                href="/stories/assets/imgs/theme/favicon.png"
            />
            <link rel="stylesheet" href="/stories/assets/css/style.css" />
            <link rel="stylesheet" href="/stories/assets/css/widgets.css" />
            <link rel="stylesheet" href="/stories/assets/css/responsive.css" />
            <link rel="stylesheet" href="/override.css" />

            {/* Básico */}
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />

            {/* Título e Descrição */}
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}

            {/* Keywords */}
            {safeKeywords.length > 0 && (
                <meta name="keywords" content={safeKeywords.join(', ')} />
            )}

            {/* Robots */}
            <meta name="robots" content={robots} />

            {/* Canonical */}
            {finalCanonical && <link rel="canonical" href={finalCanonical} />}

            {/* Idioma */}
            <meta property="og:locale" content={locale} />
            {safeAlternateLocales.map((altLocale) => (
                <meta
                    key={altLocale}
                    property="og:locale:alternate"
                    content={altLocale}
                />
            ))}

            {/* Open Graph */}
            <meta property="og:site_name" content={SITE_CONFIG.fullName} />
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={finalOgTitle} />
            <meta property="og:description" content={finalOgDescription} />
            <meta property="og:url" content={finalOgUrl} />
            {finalOgImage && (
                <meta property="og:image" content={finalOgImage} />
            )}
            {finalOgImage && (
                <meta property="og:image:alt" content={finalOgTitle} />
            )}

            {/* Article Meta (para posts) */}
            {ogType === 'article' && (
                <>
                    {articlePublishedTime && (
                        <meta
                            property="article:published_time"
                            content={articlePublishedTime}
                        />
                    )}
                    {articleModifiedTime && (
                        <meta
                            property="article:modified_time"
                            content={articleModifiedTime}
                        />
                    )}
                    {articleAuthor && (
                        <meta
                            property="article:author"
                            content={articleAuthor}
                        />
                    )}
                    {articleSection && (
                        <meta
                            property="article:section"
                            content={articleSection}
                        />
                    )}
                    {safeArticleTags.map((tag) => (
                        <meta key={tag} property="article:tag" content={tag} />
                    ))}
                </>
            )}

            {/* Twitter Card */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:site" content={twitterSite} />
            {twitterCreator && (
                <meta name="twitter:creator" content={twitterCreator} />
            )}
            <meta name="twitter:title" content={finalTwitterTitle} />
            <meta
                name="twitter:description"
                content={finalTwitterDescription}
            />
            {finalTwitterImage && (
                <meta name="twitter:image" content={finalTwitterImage} />
            )}

            {/* PWA */}
            <meta name="theme-color" content="#007bff" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="default"
            />
            <meta
                name="apple-mobile-web-app-title"
                content={SITE_CONFIG.name}
            />
        </Head>
    );
};

export default SEOHead;
