import { Article } from '@/types/blog';
import { Link } from '@inertiajs/react';
import React from 'react';

interface ArticleNavigationProps {
    previousArticle?: Article;
    nextArticle?: Article;
}

/**
 * Navegação entre artigos (anterior/próximo)
 */
const ArticleNavigation: React.FC<ArticleNavigationProps> = ({
    previousArticle,
    nextArticle,
}) => {
    if (!previousArticle && !nextArticle) {
        return null;
    }

    return (
        <div className="article-navigation border-radius-10 wow fadeInUp animated mb-30 bg-white p-30">
            <div className="row">
                {/* Artigo Anterior */}
                <div className="col-md-6">
                    {previousArticle && (
                        <div className="prev-article">
                            <span className="font-small text-uppercase d-block mb-10 text-muted">
                                ← Artigo Anterior
                            </span>
                            <Link
                                href={`/artigos/${previousArticle.slug}`}
                                className="d-block"
                            >
                                <h6 className="font-weight-700 hover-primary">
                                    {previousArticle.title}
                                </h6>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Próximo Artigo */}
                <div className="col-md-6 text-md-right">
                    {nextArticle && (
                        <div className="next-article">
                            <span className="font-small text-uppercase d-block mb-10 text-muted">
                                Próximo Artigo →
                            </span>
                            <Link
                                href={`/artigos/${nextArticle.slug}`}
                                className="d-block"
                            >
                                <h6 className="font-weight-700 hover-primary">
                                    {nextArticle.title}
                                </h6>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleNavigation;
