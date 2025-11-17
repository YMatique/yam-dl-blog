import { Article } from '@/types/blog';
import {
    formatDate,
    formatReadingTime,
    formatViews,
    getArticleUrl,
    getCategoryUrl,
    getImageUrl,
} from '@/utils/blog-helpers';
import { Link } from '@inertiajs/react';
import React from 'react';

/**
 * Props do componente PostCard
 */
interface PostCardProps {
    article: Article;
    className?: string;
    showExcerpt?: boolean;
    showSocial?: boolean;
}

/**
 * Componente de Card para exibir artigos em listas e grids
 * Totalmente reutilizável e compatível com Inertia.js
 */
const PostCard: React.FC<PostCardProps> = ({
    article,
    className = 'col-md-6 mb-40',
    showExcerpt = true,
    showSocial = true,
}) => {
    const backgroundStyle = {
        backgroundImage: `url("${getImageUrl(article.featured_image)}")`,
    };

    return (
        <article
            className={`${className} wow fadeInUp animated`}
            style={{ visibility: 'visible', animationName: 'fadeInUp' }}
        >
            <div className="post-card-1 border-radius-10 hover-up">
                {/* Imagem de Capa */}
                <div
                    className="post-thumb thumb-overlay img-hover-slide position-relative"
                    style={backgroundStyle}
                >
                    <Link
                        href={getArticleUrl(article.slug)}
                        className="img-link"
                    />

                    {/* Botões de Compartilhamento */}
                    {showSocial && (
                        <ul className="social-share">
                            <li>
                                <a href="#">
                                    <i className="elegant-icon social_share"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="fb"
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${getArticleUrl(article.slug)}`}
                                    title="Share on Facebook"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="elegant-icon social_facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="tw"
                                    href={`https://twitter.com/intent/tweet?url=${window.location.origin}${getArticleUrl(article.slug)}&text=${encodeURIComponent(article.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Tweet now"
                                >
                                    <i className="elegant-icon social_twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="pt"
                                    href={`https://pinterest.com/pin/create/button/?url=${window.location.origin}${getArticleUrl(article.slug)}&description=${encodeURIComponent(article.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Pin it"
                                >
                                    <i className="elegant-icon social_pinterest"></i>
                                </a>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Conteúdo do Post */}
                <div className="post-content p-30">
                    {/* Categoria */}
                    <div className="entry-meta meta-0 font-small mb-10">
                        <Link href={getCategoryUrl(article.category.slug)}>
                            <span
                                className="post-cat text-primary"
                                style={{
                                    color: article.category.color || '#007bff',
                                }}
                            >
                                {article.category.name}
                            </span>
                        </Link>
                    </div>

                    <div className="d-flex post-card-content">
                        {/* Título */}
                        <h5 className="post-title font-weight-900 mb-20">
                            <Link href={getArticleUrl(article.slug)}>
                                {article.title}
                            </Link>
                        </h5>

                        {/* Excerto/Resumo */}
                        {showExcerpt && article.excerpt && (
                            <div className="post-excerpt font-small mb-25 text-muted">
                                <p>{article.excerpt}</p>
                            </div>
                        )}

                        {/* Metadados */}
                        <div className="entry-meta meta-1 font-x-small text-uppercase float-left">
                            <span className="post-on">
                                {article.published_at
                                    ? formatDate(article.published_at)
                                    : 'Data não disponível'}
                            </span>
                            <span className="time-reading has-dot">
                                {formatReadingTime(article.reading_time)}
                            </span>
                            <span className="post-by has-dot">
                                {formatViews(article.views_count)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
