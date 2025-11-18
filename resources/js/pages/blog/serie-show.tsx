import BlogLayout from '@/layouts/blog-layout';
import { Article, Series } from '@/types/blog';
import { formatDate, formatReadingTime } from '@/utils/blog-helpers';
import { Head, Link } from '@inertiajs/react';

interface SeriesShowProps {
    series: Series;
    relatedSeries?: Series[];
}

/**
 * Página de exibição de uma série individual
 */
export default function Show({ series, relatedSeries = [] }: SeriesShowProps) {
    /**
     * Calcula o progresso da série
     */
    const progress = series.total_articles
        ? Math.round(
              ((series.articles?.length || 0) / series.total_articles) * 100,
          )
        : 0;

    /**
     * Retorna a cor da barra de progresso
     */
    const getProgressColor = (progress: number): string => {
        if (progress >= 100) return 'bg-success';
        if (progress >= 50) return 'bg-info';
        if (progress >= 25) return 'bg-warning';
        return 'bg-danger';
    };

    const progressColor = getProgressColor(progress);
    const publishedCount = series.articles?.length || 0;

    return (
        <BlogLayout title={`${series.title} - Série de Estudos - YMDL Blog`}>
            <Head title={`${series.title} - Série de Estudos - YMDL Blog`} />

            <main className="bg-grey pb-30">
                <div className="container">
                    {/* Breadcrumb */}
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb mt-30 mb-30">
                                <Link href="/">Home</Link>
                                <span className="mx-2">/</span>
                                <Link href="/series">Séries</Link>
                                <span className="mx-2">/</span>
                                <span className="text-muted">
                                    {series.title}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Conteúdo Principal */}
                        <div className="col-lg-8">
                            {/* Header da Série */}
                            <div className="border-radius-10 mb-30 bg-white p-30">
                                {/* Imagem de Capa */}
                                {series.cover_image && (
                                    <div className="mb-30">
                                        <img
                                            src={series.cover_image}
                                            alt={series.title}
                                            className="border-radius-10 w-100"
                                            style={{
                                                maxHeight: '400px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Badge de Status */}
                                <div className="entry-meta meta-0 font-small mb-20">
                                    <span className="post-cat text-primary">
                                        📚 Série de Estudos
                                    </span>
                                    {series.is_complete ? (
                                        <span className="post-cat text-success ml-2">
                                            ✓ Série Completa
                                        </span>
                                    ) : (
                                        <span className="post-cat text-warning ml-2">
                                            ⏰ Em Andamento
                                        </span>
                                    )}
                                </div>

                                {/* Título */}
                                <h1 className="post-title font-weight-900 mb-20">
                                    {series.title}
                                </h1>

                                {/* Descrição */}
                                {series.description && (
                                    <div className="post-excerpt font-large mb-30 text-muted">
                                        <p>{series.description}</p>
                                    </div>
                                )}

                                {/* Barra de Progresso */}
                                <div className="mb-20">
                                    <div className="d-flex justify-content-between mb-10">
                                        <span className="font-weight-bold">
                                            Progresso da Série
                                        </span>
                                        <span className="font-weight-bold">
                                            {progress}%
                                        </span>
                                    </div>
                                    <div
                                        className="progress"
                                        style={{ height: '10px' }}
                                    >
                                        <div
                                            className={`progress-bar ${progressColor}`}
                                            role="progressbar"
                                            style={{ width: `${progress}%` }}
                                            aria-valuenow={progress}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        ></div>
                                    </div>
                                    <div className="font-small mt-10 text-muted">
                                        {publishedCount} de{' '}
                                        {series.total_articles} artigos
                                        publicados
                                    </div>
                                </div>
                            </div>

                            {/* Lista de Artigos da Série */}
                            <div className="border-radius-10 mb-30 bg-white p-30">
                                <div className="widget-header-2 position-relative mb-30">
                                    <h5 className="mt-5 mb-30">
                                        Artigos desta Série
                                    </h5>
                                </div>

                                {series.articles &&
                                series.articles.length > 0 ? (
                                    <div className="list-post">
                                        {series.articles.map(
                                            (article: Article, index) => (
                                                <article
                                                    key={article.id}
                                                    className="border-bottom mb-30 pb-30"
                                                >
                                                    <div className="row">
                                                        {/* Número da Ordem */}
                                                        <div className="col-md-1 text-center">
                                                            <div
                                                                className="rounded-circle d-inline-flex align-items-center justify-content-center font-weight-bold bg-primary text-white"
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                }}
                                                            >
                                                                {index + 1}
                                                            </div>
                                                        </div>

                                                        {/* Thumbnail */}
                                                        <div className="col-md-3">
                                                            <div
                                                                className="post-thumb position-relative border-radius-5"
                                                                style={{
                                                                    height: '120px',
                                                                }}
                                                            >
                                                                <div
                                                                    className="img-hover-slide border-radius-5 position-relative h-100"
                                                                    style={{
                                                                        backgroundImage: `url(${
                                                                            article.featured_image ||
                                                                            '/stories/assets/imgs/news/default.jpg'
                                                                        })`,
                                                                        backgroundSize:
                                                                            'cover',
                                                                        backgroundPosition:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    <Link
                                                                        className="img-link"
                                                                        href={`/artigo/${article.slug}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Conteúdo */}
                                                        <div className="col-md-8">
                                                            <div className="post-content">
                                                                <h5 className="post-title font-weight-900 mb-15">
                                                                    <Link
                                                                        href={`/artigo/${article.slug}`}
                                                                    >
                                                                        {
                                                                            article.title
                                                                        }
                                                                    </Link>
                                                                </h5>

                                                                {article.excerpt && (
                                                                    <p className="font-small mb-15 text-muted">
                                                                        {article
                                                                            .excerpt
                                                                            .length >
                                                                        150
                                                                            ? article.excerpt.substring(
                                                                                  0,
                                                                                  150,
                                                                              ) +
                                                                              '...'
                                                                            : article.excerpt}
                                                                    </p>
                                                                )}

                                                                <div className="entry-meta meta-1 font-x-small text-uppercase">
                                                                    <span className="post-on">
                                                                        {formatDate(
                                                                            article.published_at ||
                                                                                article.created_at,
                                                                        )}
                                                                    </span>
                                                                    <span className="time-reading has-dot">
                                                                        {formatReadingTime(
                                                                            article.reading_time,
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <div className="py-30 text-center">
                                        <p className="text-muted">
                                            Ainda não há artigos publicados
                                            nesta série.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            {/* Outras Séries */}
                            {relatedSeries.length > 0 && (
                                <div className="sidebar-widget mb-30">
                                    <div className="widget-header-2 position-relative mb-30">
                                        <h5 className="mt-5 mb-30">
                                            Outras Séries
                                        </h5>
                                    </div>
                                    <div className="post-block-list post-module-1 post-module-5">
                                        <ul className="list-post">
                                            {relatedSeries
                                                .slice(0, 4)
                                                .map((related) => {
                                                    const relatedProgress =
                                                        related.total_articles
                                                            ? Math.round(
                                                                  ((related
                                                                      .articles
                                                                      ?.length ||
                                                                      0) /
                                                                      related.total_articles) *
                                                                      100,
                                                              )
                                                            : 0;

                                                    return (
                                                        <li
                                                            key={related.id}
                                                            className="mb-30"
                                                        >
                                                            <div className="d-flex hover-up-2 transition-normal">
                                                                <div className="post-thumb post-thumb-80 d-flex border-radius-5 img-hover-scale mr-15 overflow-hidden">
                                                                    <Link
                                                                        className="color-white"
                                                                        href={`/series/${related.slug}`}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                related.cover_image ||
                                                                                '/stories/assets/imgs/series/default.jpg'
                                                                            }
                                                                            alt={
                                                                                related.title
                                                                            }
                                                                        />
                                                                    </Link>
                                                                </div>
                                                                <div className="post-content media-body">
                                                                    <h6 className="post-title text-limit-2-row mb-10 font-medium">
                                                                        <Link
                                                                            href={`/series/${related.slug}`}
                                                                        >
                                                                            {
                                                                                related.title
                                                                            }
                                                                        </Link>
                                                                    </h6>
                                                                    <div className="entry-meta meta-1 font-x-small text-uppercase mb-10">
                                                                        <span className="post-on">
                                                                            {
                                                                                related
                                                                                    .articles
                                                                                    ?.length
                                                                            }{' '}
                                                                            artigos
                                                                        </span>
                                                                        <span className="post-by has-dot">
                                                                            {
                                                                                relatedProgress
                                                                            }
                                                                            %
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* CTA - Ver Todas as Séries */}
                            <div className="sidebar-widget border-radius-10 mb-30 bg-white p-20">
                                <div className="text-center">
                                    <h6 className="font-weight-bold mb-15">
                                        📚 Explore Mais Séries
                                    </h6>
                                    <p className="font-small mb-20 text-muted">
                                        Descubra outros estudos bíblicos
                                        organizados por tema
                                    </p>
                                    <Link
                                        href="/series"
                                        className="btn btn-primary btn-sm"
                                    >
                                        Ver Todas as Séries
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </BlogLayout>
    );
}
