import ArticleHighlight from '@/components/blog/article-highlight';
import FeaturedSlider from '@/components/blog/featured-slider';
import PostList from '@/components/blog/post-list';
import SeriesHighlight from '@/components/blog/series-highlight';
import BlogLayout from '@/layouts/blog-layout';
import { BlogIndexProps } from '@/types/blog';
import { Link } from '@inertiajs/react';

/**
 * Página Home do Blog YMDL
 * Recebe dados do Laravel via Inertia.js
 */
export default function Home({
    articles,
    featuredPosts,
    categories,
    popularTags,
    featuredSeries,
}: BlogIndexProps) {
    return (
        <BlogLayout title="YAMDL - Yuvi Matique Digital Library">
            <div className="bg-white">
                <div className="container pt-30">
                    {/* ========== SLIDER DE ARTIGOS EM DESTAQUE ========== */}
                    <FeaturedSlider articles={featuredPosts} />

                    {/* ========== TAGS POPULARES ========== */}
                    <div className="hot-tags font-small align-self-center pt-30 pb-30">
                        <div className="widget-header-3">
                            <div className="row align-self-center">
                                <div className="col-md-4 align-self-center">
                                    <h5 className="widget-title">
                                        Últimos Lançamentos e Estudos
                                    </h5>
                                </div>
                                <div className="col-md-8 text-md-right font-small align-self-center">
                                    <p className="d-inline-block mr-5 mb-0">
                                        <i className="elegant-icon icon_tag_alt mr-5 text-muted"></i>
                                        Tags Populares:
                                    </p>
                                    <ul className="list-inline d-inline-block tags">
                                        {popularTags?.slice(0, 5).map((tag) => (
                                            <li
                                                key={tag.id}
                                                className="list-inline-item"
                                            >
                                                <Link
                                                    href={`/tags/${tag.slug}`}
                                                >
                                                    # {tag.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========== GRID DE ARTIGOS RECENTES ========== */}
                    <div className="loop-grid mb-30">
                        <div className="row">
                            {/* ArticleHighlight - 2 Artigos em Destaque */}
                            <div className="col-lg-8">
                                <ArticleHighlight articles={featuredPosts} />
                                <div className="mt-40 mb-30">
                                    <PostList
                                        articles={articles.data.slice(0, 2)}
                                        columns={2}
                                        showExcerpt={false}
                                        showSocial={true}
                                    />
                                </div>
                            </div>

                            {/* Cards Individuais (restantes) */}
                            <div className="col-lg-4">
                                <PostList
                                    articles={articles.data.slice(0, 2)}
                                    columns={1}
                                    showExcerpt={false}
                                    showSocial={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ========== MAIS ARTIGOS (Grid 3 colunas) ========== */}
                    {/* {articles.data.length > 3 && (
                    <div className="mb-50">
                        <div className="widget-header-1 position-relative mb-30">
                            <h5 className="mt-5 mb-30">Mais Artigos</h5>
                        </div>
                        <PostList
                            articles={articles.data.slice(3)}
                            columns={3}
                            showExcerpt={false}
                            showSocial={true}
                        />
                    </div>
                )} */}
                </div>
            </div>
            <div className="container">
                {/* ========== SEÇÃO DE SÉRIES E SIDEBAR ========== */}
                <div className="bg-grey pt-50 pb-50">
                    <div className="container">
                        <div className="row">
                            {/* Últimas Séries */}
                            <div className="col-lg-8">
                                <div className="post-module-2">
                                    <div className="widget-header-1 position-relative wow fadeInUp animated mb-30">
                                        <h5 className="mt-5 mb-30">
                                            Últimas Séries de Estudos
                                        </h5>
                                    </div>
                                    <div className="loop-list loop-list-style-1">
                                        <div className="row">
                                            <SeriesHighlight
                                                className="col-12"
                                                series={featuredSeries}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar - Categorias Populares */}
                            <div className="col-lg-4">
                                <div className="widget-area">
                                    <div className="sidebar-widget widget-latest-posts wow fadeInUp animated mb-50">
                                        <div className="widget-header-1 position-relative mb-30">
                                            <h5 className="mt-5 mb-30">
                                                Categorias Populares
                                            </h5>
                                        </div>
                                        <div className="post-block-list post-module-1">
                                            <ul className="list-post">
                                                {categories
                                                    ?.slice(0, 5)
                                                    .map((category) => (
                                                        <li
                                                            key={category.id}
                                                            className="wow fadeInUp mb-30"
                                                        >
                                                            <div className="d-flex has-border hover-up border-radius-5 bg-white p-25 transition-normal">
                                                                <div className="post-content media-body">
                                                                    <h6 className="post-title mb-15 font-medium">
                                                                        <Link
                                                                            href={`/categorias/${category.slug}`}
                                                                        >
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </Link>
                                                                    </h6>
                                                                    {category.description && (
                                                                        <p className="font-small mb-10 text-muted">
                                                                            {
                                                                                category.description
                                                                            }
                                                                        </p>
                                                                    )}
                                                                    <div className="entry-meta meta-1 font-x-small text-uppercase">
                                                                        <span className="post-by">
                                                                            {category.articles_count ||
                                                                                0}{' '}
                                                                            artigo
                                                                            {(category.articles_count ||
                                                                                0) !==
                                                                            1
                                                                                ? 's'
                                                                                : ''}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row bg-white">
                <div className="container">
                    {/* ========== ÚLTIMOS ARTIGOS - SEÇÃO FINAL (Grid 3x2) ========== */}
                    <div className="container pt-50 pb-50">
                        <div className="row">
                            <div className="col-12">
                                <div className="widget-header-1 position-relative mb-30">
                                    <h5 className="mt-5 mb-30">
                                        Artigos Recentes
                                    </h5>
                                </div>
                            </div>
                        </div>

                        {/* Grid 3 colunas x 2 linhas (6 artigos) */}
                        <PostList
                            articles={articles.data.slice(6, 12)}
                            columns={3}
                            showExcerpt={false}
                            showSocial={true}
                        />

                        {/* Botão Ver Mais */}
                        {articles.total > 12 && (
                            <div className="row">
                                <div className="col-12 mt-40 text-center">
                                    <Link
                                        href="/blog/artigos"
                                        className="btn btn-lg btn-primary text-white"
                                    >
                                        Ver Todos os Artigos →
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BlogLayout>
    );
}
