import { Article } from '@/types/blog';
import {
    formatDate,
    formatViews,
    getArticleUrl,
    getCategoryUrl,
    getImageUrl,
} from '@/utils/blog-helpers';
import { Link } from '@inertiajs/react';
import React from 'react';

/**
 * Props do componente ArticleHighlight
 */
interface ArticleHighlightProps {
    articles: Article[];
    className?: string;
}

/**
 * Componente de destaque para 2 artigos em carousel
 * Exibe artigos em slides verticais com transição
 */
const ArticleHighlight: React.FC<ArticleHighlightProps> = ({
    articles,
    className = 'col-lg-8 mb-30',
}) => {
    // Validação - apenas 2 artigos
    const displayArticles = articles.slice(0, 2);

    if (!displayArticles || displayArticles.length === 0) {
        return (
            <div className={className}>
                <div className="py-50 text-center">
                    <p className="text-muted">Nenhum artigo em destaque.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div
                id="avad"
                className="carausel-post-1 hover-up border-radius-10 position-relative wow fadeInUp animated overflow-hidden transition-normal"
            >
                <div className="arrow-cover"></div>
                <div className="slide-fade">
                    {displayArticles.map((article) => (
                        <div
                            key={article.id}
                            className="position-relative post-thumb"
                        >
                            <div
                                className="thumb-overlay img-hover-slide position-relative"
                                style={{
                                    backgroundImage: `url(${getImageUrl(article.featured_image)})`,
                                }}
                            >
                                <Link
                                    href={getArticleUrl(article.slug)}
                                    className="img-link"
                                />

                                {/* Ícone no canto (opcional - baseado na categoria ou série) */}
                                {article.series && (
                                    <span className="top-left-icon bg-warning">
                                        <i className="elegant-icon icon_star_alt"></i>
                                    </span>
                                )}

                                {/* Overlay com conteúdo */}
                                <div className="post-content-overlay mr-30 ml-30 pb-30 text-white">
                                    {/* Categoria */}
                                    <div className="entry-meta meta-0 font-small mb-20">
                                        <Link
                                            href={getCategoryUrl(
                                                article.category.slug,
                                            )}
                                        >
                                            <span
                                                className="post-cat text-info text-uppercase"
                                                style={{
                                                    color:
                                                        article.category
                                                            .color || '#17a2b8',
                                                }}
                                            >
                                                {article.category.name}
                                            </span>
                                        </Link>

                                        {/* Série (se houver) */}
                                        {article.series && (
                                            <Link
                                                href={`/series/${article.series.slug}`}
                                            >
                                                <span className="post-cat text-success text-uppercase">
                                                    {article.series.title}
                                                </span>
                                            </Link>
                                        )}
                                    </div>

                                    {/* Título */}
                                    <h3 className="post-title font-weight-900 mb-20">
                                        <Link
                                            href={getArticleUrl(article.slug)}
                                            className="text-white"
                                        >
                                            {article.title}
                                        </Link>
                                    </h3>

                                    {/* Metadados */}
                                    <div className="entry-meta meta-1 font-small mt-10 pr-5 pl-5 text-white">
                                        <span className="post-on">
                                            {article.published_at
                                                ? formatDate(
                                                      article.published_at,
                                                  )
                                                : 'Data não disponível'}
                                        </span>
                                        <span className="hit-count has-dot">
                                            {formatViews(article.views_count)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticleHighlight;
