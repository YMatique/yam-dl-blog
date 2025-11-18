import { Article, Series } from '@/types/blog';
import { Link } from '@inertiajs/react';
import React from 'react';

interface SeriesNavigationProps {
    series: Series;
    currentArticle: Article;
}

/**
 * Componente de navegação dentro de uma série
 * Mostra artigo anterior e próximo
 */
const SeriesNavigation: React.FC<SeriesNavigationProps> = ({
    series,
    currentArticle,
}) => {
    // Encontra o índice do artigo atual
    const currentIndex =
        series.articles?.findIndex(
            (article) => article.id === currentArticle.id,
        ) ?? -1;

    if (currentIndex === -1 || !series.articles) {
        return null;
    }

    const previousArticle =
        currentIndex > 0 ? series.articles[currentIndex - 1] : null;
    const nextArticle =
        currentIndex < series.articles.length - 1
            ? series.articles[currentIndex + 1]
            : null;

    return (
        <div className="series-navigation border-radius-10 mb-30 bg-white p-30">
            {/* Header */}
            <div className="series-context mb-20">
                <div className="d-flex align-items-center">
                    <span className="badge badge-primary mr-10">
                        📚 Parte da Série
                    </span>
                    <Link
                        href={`/series/${series.slug}`}
                        className="font-weight-bold"
                    >
                        {series.title}
                    </Link>
                </div>
                <div className="font-small mt-10 text-muted">
                    Artigo {currentIndex + 1} de {series.articles.length}
                </div>
            </div>

            {/* Navegação */}
            <div className="row">
                {/* Artigo Anterior */}
                <div className="col-md-6 mb-md-0 mb-3">
                    {previousArticle ? (
                        <Link
                            href={`/artigo/${previousArticle.slug}`}
                            className="d-block border-radius-5 hover-up-2 border p-15 transition-normal"
                        >
                            <div className="font-small mb-5 text-muted">
                                ← Artigo Anterior
                            </div>
                            <div className="font-weight-bold text-limit-2-row">
                                {previousArticle.title}
                            </div>
                        </Link>
                    ) : (
                        <div className="border-radius-5 border p-15 text-muted opacity-50">
                            <div className="font-small mb-5">
                                ← Artigo Anterior
                            </div>
                            <div>Primeiro artigo da série</div>
                        </div>
                    )}
                </div>

                {/* Próximo Artigo */}
                <div className="col-md-6">
                    {nextArticle ? (
                        <Link
                            href={`/artigo/${nextArticle.slug}`}
                            className="d-block border-radius-5 hover-up-2 border p-15 text-right transition-normal"
                        >
                            <div className="font-small mb-5 text-muted">
                                Próximo Artigo →
                            </div>
                            <div className="font-weight-bold text-limit-2-row">
                                {nextArticle.title}
                            </div>
                        </Link>
                    ) : (
                        <div className="border-radius-5 border p-15 text-right text-muted opacity-50">
                            <div className="font-small mb-5">
                                Próximo Artigo →
                            </div>
                            <div>Último artigo da série</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Link para ver série completa */}
            <div className="mt-20 text-center">
                <Link
                    href={`/series/${series.slug}`}
                    className="btn btn-sm btn-outline-primary"
                >
                    📚 Ver Série Completa
                </Link>
            </div>
        </div>
    );
};

export default SeriesNavigation;
