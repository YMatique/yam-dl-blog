import { Article } from '@/types/blog';
import {
    formatDate,
    formatReadingTime,
    formatViews,
} from '@/utils/blog-helpers';
import { Link } from '@inertiajs/react';
import React from 'react';

interface ArticleContentProps {
    article: Article;
}

/**
 * Componente principal do conteúdo do artigo
 */
const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
    return (
        <article className="post-details border-radius-10 mb-30 bg-white p-30">
            {/* Header do Artigo */}
            <div className="article-header mb-30">
                {/* Categoria */}
                <div className="entry-meta meta-0 font-small mb-20">
                    {/* <Link href={`/blog/categoria/${article.category.slug}`}>
                        <span
                            className="post-cat text-uppercase"
                            style={{
                                color: article.category.color || '#007bff',
                            }}
                        >
                            {article.category.name}
                        </span>
                    </Link> */}

                    {/* Série (se houver) */}
                    {article.series && (
                        <>
                            <span className="mx-10">•</span>
                            <Link href={`/blog/serie/${article.series.slug}`}>
                                <span className="post-series text-uppercase text-warning">
                                    📚 {article.series.title}
                                    {article.series_order &&
                                        ` #${article.series_order}`}
                                </span>
                            </Link>
                        </>
                    )}
                </div>

                {/* Título */}
                <h1 className="post-title font-weight-900 mb-20">
                    {article.title}
                </h1>

                {/* Excerpt/Resumo */}
                {article.excerpt && (
                    <p className="post-excerpt font-large mb-30 text-muted">
                        {article.excerpt}
                    </p>
                )}

                {/* Meta Info */}
                <div className="entry-meta meta-1 font-small text-uppercase mb-20">
                    {/* Autor */}
                    <span className="post-author">
                        {article.author.avatar && (
                            <img
                                src={article.author.avatar}
                                alt={article.author.name}
                                className="rounded-circle mr-5"
                                style={{ width: '24px', height: '24px' }}
                            />
                        )}
                        Por <strong>{article.author.name}</strong>
                    </span>

                    {/* Data */}
                    <span className="post-on has-dot">
                        {formatDate(article.published_at || article.created_at)}
                    </span>

                    {/* Tempo de Leitura */}
                    <span className="time-reading has-dot">
                        {formatReadingTime(article.reading_time)}
                    </span>

                    {/* Views */}
                    <span className="post-by has-dot">
                        {formatViews(article.views_count)}
                    </span>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                    <div className="article-tags mb-30">
                        {article.tags.map((tag) => (
                            <Link
                                key={tag.id}
                                href={`/blog/artigos?tag=${tag.slug}`}
                                className="btn btn-sm btn-outline-primary mr-10 mb-10"
                            >
                                # {tag.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Imagem Destacada */}
            {article.featured_image && (
                <div className="featured-image mb-50">
                    <img
                        src={article.featured_image}
                        alt={article.title}
                        className="border-radius-10 w-100"
                    />
                </div>
            )}

            {/* Conteúdo do Artigo */}
            <div
                className="article-content font-large"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Footer do Artigo */}
            <div className="article-footer border-top mt-50 pt-30">
                <div className="row">
                    <div className="col-md-6">
                        {/* Tags novamente */}
                        {article.tags && article.tags.length > 0 && (
                            <div className="tags-bottom">
                                <span className="font-small mr-10 text-muted">
                                    Tags:
                                </span>
                                {article.tags.map((tag) => (
                                    <Link
                                        key={tag.id}
                                        href={`/blog/artigos?tag=${tag.slug}`}
                                        className="tag-link mr-10"
                                    >
                                        #{tag.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="col-md-6 text-md-right">
                        {/* Compartilhar */}
                        <span className="font-small mr-10 text-muted">
                            Compartilhar:
                        </span>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon mr-10"
                        >
                            <i className="elegant-icon social_facebook"></i>
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(article.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon mr-10"
                        >
                            <i className="elegant-icon social_twitter"></i>
                        </a>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                        >
                            <i className="elegant-icon social_share"></i>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArticleContent;
