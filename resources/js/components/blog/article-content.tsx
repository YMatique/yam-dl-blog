import { Article } from '@/types/blog';
import {
    formatDate,
    formatReadingTime,
    formatViews,
    getImageArticleUrl,
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
        <div className="single-content2">
            {/* Entry Header */}
            <div className="entry-header entry-header-style-1 mb-50">
                <h1 className="entry-title font-weight-900 mb-30">
                    {article.title}
                </h1>

                <div className="row">
                    <div className="col-md-6">
                        <div className="entry-meta align-items-center meta-2 font-small color-muted">
                            <p className="mb-5">
                                <a className="author-avatar" href="#">
                                    {article.author.avatar && (
                                        <img
                                            className="img-circle"
                                            src={article.author.avatar}
                                            alt={article.author.name}
                                        />
                                    )}
                                </a>
                                Por{' '}
                                <Link href={`/autor/${article.author.id}`}>
                                    <span className="author-name font-weight-bold">
                                        {article.author.name}
                                    </span>
                                </Link>
                            </p>
                            <span className="mr-10">
                                {formatDate(
                                    article.published_at || article.created_at,
                                )}
                            </span>
                            <span className="has-dot">
                                {formatReadingTime(article.reading_time)}
                            </span>
                        </div>
                    </div>

                    <div className="col-md-6 d-none d-md-inline text-right">
                        <ul className="header-social-network d-inline-block list-inline mr-15">
                            <li className="list-inline-item text-muted">
                                <span>Compartilhar: </span>
                            </li>
                            <li className="list-inline-item">
                                <a
                                    className="social-icon fb text-xs-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                                >
                                    <i className="elegant-icon social_facebook"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a
                                    className="social-icon tw text-xs-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(article.title)}`}
                                >
                                    <i className="elegant-icon social_twitter"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a
                                    className="social-icon pt text-xs-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://wa.me/?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}`}
                                >
                                    <i className="elegant-icon social_share"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* End Entry Header */}

            {/* Featured Image */}
            {article.featured_image ? (
                <>
                    <figure className="image border-radius-10 m-auto mb-30 text-center">
                        <img
                            className="border-radius-10"
                            src={article.featured_image}
                            alt={article.title}
                        />
                    </figure>
                </>
            ) : (
                <>
                    <figure className="image border-radius-10 m-auto mb-30 text-center">
                        <img
                            className="border-radius-10"
                            src={getImageArticleUrl(article.featured_image)}
                            alt={article.title}
                        />
                    </figure>
                </>
            )}
            {/* End Featured Image */}

            {/* Article Content */}
            <article className="entry-wraper mb-50">
                {/* Excerpt */}
                {article.excerpt && (
                    <div className="excerpt mb-30">
                        <p>{article.excerpt}</p>
                    </div>
                )}

                {/* Main Content */}
                <div
                    className="entry-main-content dropcap wow fadeIn animated"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Entry Bottom - Tags */}
                {article.tags && article.tags.length > 0 && (
                    <div className="entry-bottom wow fadeIn animated mt-50 mb-30">
                        <div className="tags">
                            <span>Tags: </span>
                            {article.tags.map((tag) => (
                                <Link
                                    key={tag.id}
                                    href={`/blog/artigos?tag=${tag.slug}`}
                                    rel="tag"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Social Share */}
                <div className="single-social-share clearfix wow fadeIn animated">
                    <div className="entry-meta meta-1 font-small color-grey float-left mt-10">
                        {/* <span className="hit-count mr-15">
                            <i className="elegant-icon icon_comment_alt mr-5"></i>
                            {article.comments_count || 0} comentários
                        </span> */}
                        {/* <span className="hit-count mr-15">
                            <i className="elegant-icon icon_like mr-5"></i>
                            {article.likes_count || 0} likes
                        </span> */}
                        <span className="hit-count">
                            <i className="elegant-icon icon_star-half_alt mr-5"></i>
                            {formatViews(article.views_count)}
                        </span>
                    </div>
                    <ul className="header-social-network d-inline-block list-inline float-md-right mt-md-0 mt-4">
                        <li className="list-inline-item text-muted">
                            <span>Compartilhar: </span>
                        </li>
                        <li className="list-inline-item">
                            <a
                                className="social-icon fb text-xs-center"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                            >
                                <i className="elegant-icon social_facebook"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a
                                className="social-icon tw text-xs-center"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(article.title)}`}
                            >
                                <i className="elegant-icon social_twitter"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a
                                className="social-icon pt text-xs-center"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://wa.me/?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}`}
                            >
                                <i className="elegant-icon social_share"></i>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Author Bio */}
                {/* <div className="author-bio border-radius-10 wow fadeIn animated mt-50 bg-white p-30">
                    <div className="author-image mb-30">
                        <Link href={`/autor/${article.author.id}`}>
                            <img
                                src={
                                    article.author.avatar ||
                                    '/assets/imgs/authors/default.jpg'
                                }
                                alt={article.author.name}
                                className="avatar"
                            />
                        </Link>
                    </div>
                    <div className="author-info">
                        <h4 className="font-weight-bold mb-20">
                            <span className="vcard author">
                                <span className="fn">
                                    <Link
                                        href={`/autor/${article.author.id}`}
                                        title={`Postado por ${article.author.name}`}
                                        rel="author"
                                    >
                                        {article.author.name}
                                    </Link>
                                </span>
                            </span>
                        </h4>
                        <h5 className="text-muted">Sobre o autor</h5>
                        {article.author.bio && (
                            <div className="author-description text-muted">
                                {article.author.bio}
                            </div>
                        )}
                        <Link
                            href={`/autor/${article.author.id}`}
                            className="author-bio-link mb-md-0 mb-3"
                        >
                            Ver todos os posts
                        </Link>
                        {article.author.social_links && (
                            <div className="author-social">
                                <ul className="author-social-icons">
                                    {article.author.social_links.facebook && (
                                        <li className="author-social-link-facebook">
                                            <a
                                                href={
                                                    article.author.social_links
                                                        .facebook
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="ti-facebook"></i>
                                            </a>
                                        </li>
                                    )}
                                    {article.author.social_links.twitter && (
                                        <li className="author-social-link-twitter">
                                            <a
                                                href={
                                                    article.author.social_links
                                                        .twitter
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="ti-twitter-alt"></i>
                                            </a>
                                        </li>
                                    )}
                                    {article.author.social_links.instagram && (
                                        <li className="author-social-link-instagram">
                                            <a
                                                href={
                                                    article.author.social_links
                                                        .instagram
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="ti-instagram"></i>
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div> */}

                {/* Related Posts */}
                {/* {relatedArticles.length > 0 && (
                    <div className="related-posts">
                        <div className="post-module-3">
                            <div className="widget-header-2 position-relative mb-30">
                                <h5 className="mt-5 mb-30">
                                    Artigos relacionados
                                </h5>
                            </div>
                            <div className="loop-list loop-list-style-1">
                                {relatedArticles.map((relatedArticle) => (
                                    <article
                                        key={relatedArticle.id}
                                        className="hover-up-2 wow fadeInUp animated transition-normal"
                                    >
                                        <div className="row list-style-2 mb-40">
                                            <div className="col-md-4">
                                                <div className="post-thumb position-relative border-radius-5">
                                                    <div
                                                        className="img-hover-slide border-radius-5 position-relative"
                                                        style={{
                                                            backgroundImage: `url(${relatedArticle.featured_image})`,
                                                        }}
                                                    >
                                                        <Link
                                                            className="img-link"
                                                            href={`/artigo/${relatedArticle.slug}`}
                                                        ></Link>
                                                    </div>
                                                    <ul className="social-share">
                                                        <li>
                                                            <a href="#">
                                                                <i className="elegant-icon social_share"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className="fb"
                                                                href="#"
                                                                title="Share on Facebook"
                                                                target="_blank"
                                                            >
                                                                <i className="elegant-icon social_facebook"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className="tw"
                                                                href="#"
                                                                target="_blank"
                                                                title="Tweet now"
                                                            >
                                                                <i className="elegant-icon social_twitter"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-md-8 align-self-center">
                                                <div className="post-content">
                                                    {relatedArticle.category && (
                                                        <div className="entry-meta meta-0 font-small mb-10">
                                                            <Link
                                                                href={`/categoria/${relatedArticle.category.slug}`}
                                                            >
                                                                <span className="post-cat text-primary">
                                                                    {
                                                                        relatedArticle
                                                                            .category
                                                                            .name
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    )}
                                                    <h5 className="post-title font-weight-900 mb-20">
                                                        <Link
                                                            href={`/artigo/${relatedArticle.slug}`}
                                                        >
                                                            {
                                                                relatedArticle.title
                                                            }
                                                        </Link>
                                                    </h5>
                                                    <div className="entry-meta meta-1 font-x-small text-uppercase float-left">
                                                        <span className="post-on">
                                                            {formatDate(
                                                                relatedArticle.published_at ||
                                                                    relatedArticle.created_at,
                                                            )}
                                                        </span>
                                                        <span className="time-reading has-dot">
                                                            {formatReadingTime(
                                                                relatedArticle.reading_time,
                                                            )}
                                                        </span>
                                                        <span className="post-by has-dot">
                                                            {formatViews(
                                                                relatedArticle.views_count,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                )} */}

                {/* More Articles */}
                {/* {moreArticles.length > 0 && (
                    <div className="single-more-articles border-radius-5">
                        <div className="widget-header-2 position-relative mb-30">
                            <h5 className="mt-5 mb-30">
                                Você pode se interessar
                            </h5>
                            <button className="single-more-articles-close">
                                <i className="elegant-icon icon_close"></i>
                            </button>
                        </div>
                        <div className="post-block-list post-module-1 post-module-5">
                            <ul className="list-post">
                                {moreArticles.map((moreArticle) => (
                                    <li key={moreArticle.id} className="mb-30">
                                        <div className="d-flex hover-up-2 transition-normal">
                                            <div className="post-thumb post-thumb-80 d-flex border-radius-5 img-hover-scale mr-15 overflow-hidden">
                                                <Link
                                                    className="color-white"
                                                    href={`/artigo/${moreArticle.slug}`}
                                                >
                                                    <img
                                                        src={
                                                            moreArticle.featured_image
                                                        }
                                                        alt={moreArticle.title}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="post-content media-body">
                                                <h6 className="post-title text-limit-2-row mb-15 font-medium">
                                                    <Link
                                                        href={`/artigo/${moreArticle.slug}`}
                                                    >
                                                        {moreArticle.title}
                                                    </Link>
                                                </h6>
                                                <div className="entry-meta meta-1 font-x-small text-uppercase float-left">
                                                    <span className="post-on">
                                                        {formatDate(
                                                            moreArticle.published_at ||
                                                                moreArticle.created_at,
                                                        )}
                                                    </span>
                                                    <span className="post-by has-dot">
                                                        {formatViews(
                                                            moreArticle.views_count,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )} */}
            </article>
        </div>
    );
};

export default ArticleContent;
