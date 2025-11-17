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
 * Props do componente FeaturedSlider
 */
interface FeaturedSliderProps {
    articles: Article[];
}

/**
 * Componente de Slider para artigos em destaque
 * Usa Inertia.js para navegação e types do Laravel
 */
const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ articles }) => {
    // Validação
    if (!articles || articles.length === 0) {
        return (
            <div className="featured-slider-empty py-50 text-center">
                <p className="text-muted">
                    Nenhum artigo em destaque no momento.
                </p>
            </div>
        );
    }

    return (
        <div className="featured-slider-3 position-relative">
            <div className="slider-3-arrow-cover"></div>

            <div className="featured-slider-3-items">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="slider-single border-radius-10 overflow-hidden"
                    >
                        <div className="post-thumb position-relative">
                            <div
                                className="thumb-overlay position-relative"
                                style={{
                                    backgroundImage: `url(${getImageUrl(article.featured_image)})`,
                                }}
                            >
                                <div className="post-content-overlay">
                                    <div className="container">
                                        {/* Categoria */}
                                        <div className="entry-meta meta-0 font-small mb-20">
                                            <Link
                                                href={getCategoryUrl(
                                                    article.category.slug,
                                                )}
                                                tabIndex={0}
                                            >
                                                <span
                                                    className="post-cat text-info text-uppercase"
                                                    style={{
                                                        color:
                                                            article.category
                                                                .color ||
                                                            '#17a2b8',
                                                    }}
                                                >
                                                    {article.category.name}
                                                </span>
                                            </Link>
                                        </div>

                                        {/* Título do Artigo */}
                                        <h1 className="post-title font-weight-900 mb-20 text-white">
                                            <Link
                                                href={getArticleUrl(
                                                    article.slug,
                                                )}
                                                className="text-white"
                                                tabIndex={0}
                                            >
                                                {article.title}
                                            </Link>
                                        </h1>

                                        {/* Metadados (Data e Views) */}
                                        <div className="entry-meta meta-1 font-small mt-10 pr-5 pl-5 text-white">
                                            <span className="post-on">
                                                {article.published_at
                                                    ? formatDate(
                                                          article.published_at,
                                                      )
                                                    : 'Data não disponível'}
                                            </span>
                                            <span className="hit-count has-dot">
                                                {formatViews(
                                                    article.views_count,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedSlider;
