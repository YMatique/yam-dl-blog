import DefaultPageHeader from '@/components/blog/breadcrumb';
import FilterSidebar from '@/components/blog/filter-sidebar';
import Pagination from '@/components/blog/pagination';
import PostList from '@/components/blog/post-list';
import SearchBar from '@/components/blog/search-bar';
import BlogLayout from '@/layouts/blog-layout';
import { Article, Category, PaginatedData, Tag } from '@/types/blog';
import { router } from '@inertiajs/react';
import React from 'react';

/**
 * Props da página de artigos
 */
interface ArticleIndexProps {
    articles: PaginatedData<Article>;
    categories: Category[];
    popularTags: Tag[];
    filters?: {
        category?: string;
        tag?: string;
        search?: string;
        sort?: string;
    };
}

/**
 * Página de listagem de artigos
 * Com busca, filtros e paginação
 */
export default function ArticleIndex({
    articles,
    categories,
    popularTags,
    filters = {},
}: ArticleIndexProps) {
    // Handler para ordenação
    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.visit('/artigos', {
            data: { ...filters, sort: e.target.value },
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Handler para view mode (grid/list)
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

    return (
        <BlogLayout
            title="Todos os Artigos - YAMDL"
            description="Explore todos os artigos, estudos bíblicos e recursos cristãos disponíveis na YAMDL."
            keywords={[
                'artigos',
                'estudos bíblicos',
                'blog cristão',
                'recursos',
            ]}
        >
            <DefaultPageHeader title="Todos os Artigos" />

            <div className="container">
                <div className="row">
                    {/* Conteúdo Principal */}
                    <div className="col-lg-8">
                        {/* Barra de Busca */}
                        <SearchBar
                            initialSearch={filters.search}
                            placeholder="Buscar artigos por título, conteúdo..."
                        />

                        {/* Filtros Ativos */}
                        {(filters.category ||
                            filters.tag ||
                            filters.search) && (
                            <div className="active-filters mb-30">
                                <div className="d-flex align-items-center flex-wrap">
                                    <span className="font-small mr-10 text-muted">
                                        Filtros ativos:
                                    </span>

                                    {filters.search && (
                                        <span className="badge badge-primary mr-10 mb-10">
                                            Busca: "{filters.search}"
                                            <a
                                                href="/artigos"
                                                className="ml-5 text-white"
                                            >
                                                ×
                                            </a>
                                        </span>
                                    )}

                                    {filters.category && (
                                        <span className="badge badge-success mr-10 mb-10">
                                            Categoria: {filters.category}
                                            <a
                                                href="/artigos"
                                                className="ml-5 text-white"
                                            >
                                                ×
                                            </a>
                                        </span>
                                    )}

                                    {filters.tag && (
                                        <span className="badge badge-info mr-10 mb-10">
                                            Tag: {filters.tag}
                                            <a
                                                href="/artigos"
                                                className="ml-5 text-white"
                                            >
                                                ×
                                            </a>
                                        </span>
                                    )}

                                    <a
                                        href="/artigos"
                                        className="font-small text-danger"
                                    >
                                        Limpar todos
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Barra de Ferramentas */}
                        <div className="shop-product-fillter mb-30">
                            <div className="row align-items-center">
                                {/* Contador */}
                                <div className="col-md-6 mb-10">
                                    <div className="totall-product">
                                        <p className="font-small">
                                            Mostrando{' '}
                                            <strong className="text-brand">
                                                {articles.from || 0}-
                                                {articles.to || 0}
                                            </strong>{' '}
                                            de{' '}
                                            <strong className="text-brand">
                                                {articles.total || 0}
                                            </strong>{' '}
                                            artigos
                                        </p>
                                    </div>
                                </div>

                                {/* Ordenação */}
                                <div className="col-md-6 text-md-right mb-10">
                                    <div className="sort-by-product-area d-inline-block">
                                        <div className="sort-by-cover">
                                            {/* View Toggle */}
                                            <div className="view-mode d-inline-block mr-15">
                                                <button
                                                    className={`btn btn-sm ${
                                                        viewMode === 'grid'
                                                            ? 'btn-primary'
                                                            : 'btn-outline-secondary'
                                                    }`}
                                                    onClick={() =>
                                                        setViewMode('grid')
                                                    }
                                                >
                                                    <i className="elegant-icon icon_grid-2x2"></i>
                                                </button>
                                                <button
                                                    className={`btn btn-sm ${
                                                        viewMode === 'list'
                                                            ? 'btn-primary'
                                                            : 'btn-outline-secondary'
                                                    }`}
                                                    onClick={() =>
                                                        setViewMode('list')
                                                    }
                                                >
                                                    <i className="elegant-icon icon_menu-square_alt"></i>
                                                </button>
                                            </div>

                                            {/* Ordenar */}
                                            <span className="sort-by font-small">
                                                <i className="elegant-icon icon_adjust-horiz mr-5"></i>
                                                Ordenar:
                                            </span>
                                            <select
                                                className="sort-by-product font-small"
                                                value={filters.sort || 'recent'}
                                                onChange={handleSort}
                                            >
                                                <option value="recent">
                                                    Mais Recentes
                                                </option>
                                                <option value="popular">
                                                    Mais Populares
                                                </option>
                                                <option value="oldest">
                                                    Mais Antigos
                                                </option>
                                                <option value="az">A-Z</option>
                                                <option value="za">Z-A</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lista de Artigos */}
                        {articles.data.length > 0 ? (
                            <>
                                <PostList
                                    articles={articles.data}
                                    columns={viewMode === 'grid' ? 2 : 1}
                                    showExcerpt={true}
                                    showSocial={false}
                                />

                                {/* Paginação */}
                                <Pagination data={articles} />
                            </>
                        ) : (
                            <div className="py-50 text-center">
                                <i
                                    className="elegant-icon icon_search mb-20 text-muted"
                                    style={{ fontSize: '64px' }}
                                ></i>
                                <h5 className="mb-20 text-muted">
                                    Nenhum artigo encontrado
                                </h5>
                                <p className="mb-30 text-muted">
                                    Tente ajustar seus filtros ou buscar por
                                    outros termos.
                                </p>
                                <a href="/artigos" className="btn btn-primary">
                                    Limpar Filtros
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Sidebar com Filtros */}
                    <div className="col-lg-4">
                        <FilterSidebar
                            categories={categories}
                            popularTags={popularTags}
                            activeCategory={filters.category}
                            activeTag={filters.tag}
                        />
                    </div>
                </div>
            </div>
        </BlogLayout>
    );
}
