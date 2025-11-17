import { Series } from '@/types/blog';
import { getImageUrl } from '@/utils/blog-helpers';
import { Link } from '@inertiajs/react';
import React from 'react';

/**
 * Props do componente SeriesHighlight
 */
interface SeriesHighlightProps {
    series: Series[];
    className?: string;
}

/**
 * Componente de destaque para Séries em carousel
 * Exibe séries com progresso, badges e barra visual
 */
const SeriesHighlight: React.FC<SeriesHighlightProps> = ({
    series,
    className = 'col-lg-8 mb-30',
}) => {
    // Validação - apenas 2 séries
    const displaySeries = series.slice(0, 2);

    if (!displaySeries || displaySeries.length === 0) {
        return (
            <div className={className}>
                <div className="py-50 text-center">
                    <p className="text-muted">Nenhuma série disponível.</p>
                </div>
            </div>
        );
    }

    /**
     * Calcula o progresso da série
     */
    const getProgress = (serie: Series): number => {
        if (!serie.total_articles || serie.total_articles === 0) return 0;
        const published = serie.articles?.length || 0;
        return Math.round((published / serie.total_articles) * 100);
    };

    /**
     * Retorna a cor da barra de progresso baseada no percentual
     */
    const getProgressColor = (progress: number): string => {
        if (progress >= 100) return 'bg-success';
        if (progress >= 50) return 'bg-info';
        if (progress >= 25) return 'bg-warning';
        return 'bg-danger';
    };

    return (
        <div className={className}>
            <div
                id="asadasd"
                className="carausel-post-2 hover-up border-radius-10 position-relative wow fadeInUp animated overflow-hidden transition-normal"
            >
                <div className="arrow-cover-1"></div>
                <div className="slide-fade-series">
                    {displaySeries.map((serie) => {
                        const progress = getProgress(serie);
                        const progressColor = getProgressColor(progress);
                        const publishedCount = serie.articles?.length || 0;

                        return (
                            <div
                                key={serie.id}
                                className="position-relative post-thumb"
                            >
                                <div
                                    className="thumb-overlay img-hover-slide position-relative"
                                    style={{
                                        backgroundImage: `url(${getImageUrl(
                                            serie.cover_image,
                                            '/stories/assets/imgs/series/default.jpg',
                                        )})`,
                                    }}
                                >
                                    <Link
                                        href={`/series/${serie.slug}`}
                                        className="img-link"
                                    />

                                    {/* Badge de Status */}
                                    <span
                                        className={`top-left-icon ${
                                            serie.is_complete
                                                ? 'bg-success'
                                                : 'bg-warning'
                                        }`}
                                    >
                                        <i
                                            className={`elegant-icon ${
                                                serie.is_complete
                                                    ? 'icon_check'
                                                    : 'icon_clock_alt'
                                            }`}
                                        ></i>
                                    </span>

                                    {/* Overlay com conteúdo */}
                                    <div className="post-content-overlay mr-30 ml-30 pb-30 text-white">
                                        {/* Tipo (Série) */}
                                        <div className="entry-meta meta-0 font-small mb-20">
                                            <span className="post-cat text-info text-uppercase">
                                                📚 Série de Estudos
                                            </span>
                                            {serie.is_complete && (
                                                <span className="post-cat text-success text-uppercase ml-2">
                                                    ✓ Completa
                                                </span>
                                            )}
                                        </div>

                                        {/* Título */}
                                        <h3 className="post-title font-weight-900 mb-20">
                                            <Link
                                                href={`/series/${serie.slug}`}
                                                className="text-white"
                                            >
                                                {serie.title}
                                            </Link>
                                        </h3>

                                        {/* Descrição (resumida) */}
                                        {serie.description && (
                                            <p className="font-small mb-20 text-white opacity-80">
                                                {serie.description.length > 120
                                                    ? serie.description.substring(
                                                          0,
                                                          120,
                                                      ) + '...'
                                                    : serie.description}
                                            </p>
                                        )}

                                        {/* Barra de Progresso */}
                                        <div className="mb-15">
                                            <div
                                                className="progress"
                                                style={{ height: '8px' }}
                                            >
                                                <div
                                                    className={`progress-bar ${progressColor}`}
                                                    role="progressbar"
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                    aria-valuenow={progress}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Metadados */}
                                        <div className="entry-meta meta-1 font-small d-flex justify-content-between align-items-center mt-10 pr-5 pl-5 text-white">
                                            <span className="post-on">
                                                {publishedCount} de{' '}
                                                {serie.total_articles} artigos
                                                publicados
                                            </span>
                                            <span className="badge badge-light">
                                                {progress}% completo
                                            </span>
                                        </div>

                                        {/* Botão de Ação */}
                                        {/* <div className="mt-20">
                                            <Link
                                                href={`/series/${serie.slug}`}
                                                className="btn btn-sm btn-primary text-white"
                                            >
                                                {serie.is_complete
                                                    ? 'Ver Série Completa'
                                                    : 'Começar a Ler'}{' '}
                                                →
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SeriesHighlight;
