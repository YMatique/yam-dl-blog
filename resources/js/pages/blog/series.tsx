import DefaultPageHeader from '@/components/blog/breadcrumb';
import SeriesCard from '@/components/blog/series-card';
import SeriesHighlight from '@/components/blog/series-highlight';
import BlogLayout from '@/layouts/blog-layout';
import { Series } from '@/types/blog';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface SeriesIndexProps {
    featuredSeries: Series[];
    series: Series[];
}

/**
 * Página de listagem de todas as séries
 */
export default function Index({ featuredSeries, series }: SeriesIndexProps) {
    const [activeFilter, setActiveFilter] = useState<
        'all' | 'complete' | 'in_progress'
    >('all');

    /**
     * Calcula o progresso da série
     */
    const getProgress = (serie: Series): number => {
        if (!serie.total_articles || serie.total_articles === 0) return 0;
        const published = serie.articles?.length || 0;
        return Math.round((published / serie.total_articles) * 100);
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

    /**
     * Filtra séries baseado no status
     */
    const filteredSeries = series.filter((serie) => {
        if (activeFilter === 'complete') return serie.is_complete;
        if (activeFilter === 'in_progress') return !serie.is_complete;
        return true;
    });

    return (
        <BlogLayout
            title="Séries de Estudos - Yuvi Matique Digital Library"
            description="Explore nossos estudos organizados em séries temáticas. Cada série oferece um mergulho profundo em tópicos específicos da Palavra de Deus."
            ogTitle="Séries de Estudos - Yuvi Matique Digital Library"
            ogDescription="Explore nossos estudos organizados em séries temáticas. Cada série oferece um mergulho profundo em tópicos específicos da Palavra de Deus."
            keywords={['Séries de Estudos', 'Estudos Bíblicos']}
        >
            <DefaultPageHeader title="Séries de Artigos" />
            {/* <Head title="Séries de Estudos - YMDL Blog" /> */}

            <main className="bg-white pb-30">
                <div className="container">
                    {/* Breadcrumb */}
                    {/* <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb mt-30 mb-30">
                                <Link href="/">Home</Link>
                                <span className="mx-2">/</span>
                                <span className="text-muted">Séries</span>
                            </div>
                        </div>
                    </div> */}

                    {/* Header */}
                    <div className="row mb-30">
                        <div className="col-lg-8">
                            <h1 className="font-weight-900 mb-20">
                                📚 Séries de Estudos Bíblicos
                            </h1>
                            <p className="text-muted">
                                Explore nossos estudos organizados em séries
                                temáticas. Cada série oferece um mergulho
                                profundo em tópicos específicos da Palavra de
                                Deus.
                            </p>
                        </div>
                        <div className="col-lg-4 text-lg-right">
                            <div className="btn-group" role="group">
                                <button
                                    type="button"
                                    className={`btn btn-sm ${
                                        activeFilter === 'all'
                                            ? 'btn-primary'
                                            : 'btn-outline-primary'
                                    }`}
                                    onClick={() => setActiveFilter('all')}
                                >
                                    Todas
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-sm ${
                                        activeFilter === 'complete'
                                            ? 'btn-success'
                                            : 'btn-outline-success'
                                    }`}
                                    onClick={() => setActiveFilter('complete')}
                                >
                                    ✓ Completas
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-sm ${
                                        activeFilter === 'in_progress'
                                            ? 'btn-warning'
                                            : 'btn-outline-warning'
                                    }`}
                                    onClick={() =>
                                        setActiveFilter('in_progress')
                                    }
                                >
                                    ⏰ Em Andamento
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Séries em Destaque (Highlight) */}
                    {featuredSeries.length > 0 && (
                        <div className="row mb-30">
                            <SeriesHighlight series={featuredSeries} />
                            <div className="col-lg-4 text-lg-right- desapear-small">
                                <div className="widget-area">
                                    <div
                                        className="sidebar-widget widget-about border-radius-5 has-border wow fadeInUp animated mb-50 bg-white pt-30 pr-30 pb-30 pl-30"
                                        style={{
                                            visibility: 'visible',
                                            animationName: 'fadeInUp',
                                        }}
                                    >
                                        <img
                                            className="about-author-img mb-25"
                                            src="/imgs/author.jpg"
                                            alt=""
                                        />
                                        <h5 className="mb-20">
                                            Shalom, Sou Yuvi
                                        </h5>
                                        <p className="font-medium text-muted">
                                            {`Servo de Deus, apaixonado pela Palavra e pela tecnologia. Criador da YAMDL, unindo a tecnologia e a Palavra de Deus, dedico-me em criar recursos que edificam e transformam vidas através da Palavra de Deus.`}
                                            {/* {`Com formação em Engenharia Informática e conhecimento da Palavra de Deus`} */}
                                        </p>
                                        <strong>Siga-me: </strong>
                                        <ul className="header-social-network d-inline-block list-inline color-white mb-20">
                                            <li className="list-inline-item">
                                                <a
                                                    className="fb"
                                                    href="#"
                                                    target="_blank"
                                                    title="Facebook"
                                                >
                                                    <i className="elegant-icon social_facebook"></i>
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="tw"
                                                    href="#"
                                                    target="_blank"
                                                    title="Tweet now"
                                                >
                                                    <i className="elegant-icon social_twitter"></i>
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="pt social-icon yt"
                                                    href="https://www.youtube.com/@yuvimatique"
                                                    target="_blank"
                                                    title="Youtube"
                                                >
                                                    <i className="elegant-icon social_youtube"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <InfoCard
                                    icon="icon_ribbon_alt"
                                    title="Por que Séries?"
                                    description="As séries permitem um estudo continuado e profundo sobre temas específicos, ajudando a construir uma base sólida de conhecimento bíblico."
                                    color="primary"
                                /> */}
                                {/* <NewsletterWidget
                                    title="Não perca nenhum episódio"
                                    description="Seja notificado sempre que uma nova parte de uma série for publicada."
                                    className="sidebar-widget widget_newsletter wow fadeInUp animated border-radius-10 mb-30 bg-white p-30"
                                /> */}
                            </div>
                        </div>
                    )}

                    {/* Título da seção de todas as séries */}
                    <div className="row mb-30">
                        <div className="col-12">
                            <div className="widget-header-2 position-relative">
                                <h5 className="mt-5 mb-30">Todas as Séries</h5>
                            </div>
                        </div>
                    </div>

                    {/* Grid de Séries */}
                    <div className="row">
                        {filteredSeries.length > 0 ? (
                            filteredSeries.map((serie) => (
                                <div
                                    key={serie.id}
                                    className="col-lg-4 col-md-6 mb-30"
                                >
                                    <SeriesCard series={serie} />
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <div className="py-50 text-center">
                                    <h4 className="mb-20 text-muted">
                                        📚 Nenhuma série encontrada
                                    </h4>
                                    <p className="text-muted">
                                        Tente ajustar os filtros ou volte mais
                                        tarde.
                                    </p>
                                    <Link
                                        href="/"
                                        className="btn btn-primary mt-20"
                                    >
                                        Voltar à Home
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </BlogLayout>
    );
}
