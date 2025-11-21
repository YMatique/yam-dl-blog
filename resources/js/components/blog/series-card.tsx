import { Series } from '@/types/blog';
import { Link } from '@inertiajs/react';
import React from 'react';

interface SeriesCardProps {
    series: Series;
}

/**
 * Card individual de série para usar em grids/listas
 */
const SeriesCard: React.FC<SeriesCardProps> = ({ series }) => {
    /**
     * Calcula o progresso da série
     */
    const getProgress = (): number => {
        if (!series.total_articles || series.total_articles === 0) return 0;
        const published = series.articles?.length || 0;
        return Math.round((published / series.total_articles) * 100);
    };

    /**
     * Retorna a cor da barra de progresso
     */
    const getProgressColor = (progress: number): string => {
        if (progress >= 100) return 'bg-success';
        if (progress >= 50) return 'bg-info';
        if (progress >= 25) return 'bg-warning';
        return 'bg-danger';
    };

    const progress = getProgress();
    const progressColor = getProgressColor(progress);
    const publishedCount = series.articles?.length || 0;

    return (
        <article className="border-radius-10 hover-up-2 overflow-hidden bg-white transition-normal">
            {/* Imagem de Capa */}
            <div
                className="post-thumb position-relative"
                style={{ height: '250px' }}
            >
                <div
                    className="img-hover-slide border-radius-top-10 position-relative h-100"
                    style={{
                        backgroundImage: `url(${
                            series.cover_image || '/imgs/serie-default.jpg'
                        })`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Link
                        className="img-link"
                        href={`/series/${series.slug}`}
                    />
                    {/* Badge de Status */}
                    <span
                        className={`top-right-icon ${
                            series.is_complete ? 'bg-success' : 'bg-warning'
                        }`}
                    >
                        <i
                            className={`elegant-icon ${
                                series.is_complete
                                    ? 'icon_check'
                                    : 'icon_clock_alt'
                            }`}
                        ></i>
                    </span>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="post-content mt-10 p-30">
                {/* Meta */}
                <div className="entry-meta meta-0 font-small mb-15">
                    {/* <span className="post-cat text-primary">📚 Série</span> */}
                    {series.is_complete && (
                        <span className="post-cat text-success ml-2">
                            ✓ Completa
                        </span>
                    )}
                </div>

                {/* Título */}
                <h5 className="post-title font-weight-900 mb-15">
                    <Link href={`/series/${series.slug}`}>{series.title}</Link>
                </h5>

                {/* Descrição */}
                {series.description && (
                    <p className="font-small mb-20 text-muted">
                        {series.description.length > 100
                            ? series.description.substring(0, 100) + '...'
                            : series.description}
                    </p>
                )}

                {/* Barra de Progresso */}
                <div className="mb-15">
                    <div className="progress" style={{ height: '6px' }}>
                        <div
                            className={`progress-bar ${progressColor}`}
                            role="progressbar"
                            style={{ width: `${progress}%` }}
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        ></div>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <span className="font-small text-muted">
                            {publishedCount} de {series.total_articles} artigos
                        </span>
                        <span className="font-small font-weight-bold">
                            {progress}%
                        </span>
                    </div>
                </div>

                {/* Botão */}
                <Link
                    href={`/series/${series.slug}`}
                    className="btn btn-sm btn-primary"
                >
                    {series.is_complete
                        ? 'Ver Série Completa'
                        : 'Começar a Ler'}{' '}
                    →
                </Link>
            </div>
        </article>
    );
};

export default SeriesCard;
