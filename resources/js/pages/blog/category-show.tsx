import DefaultPageHeader from '@/components/blog/breadcrumb';
import CategoryHeader from '@/components/blog/category-header';
import Pagination from '@/components/blog/pagination';
import PostCard from '@/components/blog/post-card';
import PostList from '@/components/blog/post-list';
import BlogLayout from '@/layouts/blog-layout';
import { CategoryShowProps } from '@/types/blog';
import { generateCategorySEO } from '@/utils/seo-helpers';
import { Link } from '@inertiajs/react';

/**
 * Página de Categoria
 * Mostra todos os artigos de uma categoria específica
 */
export default function CategoryShow({
    category,
    articles,
    relatedCategories = [],
    popularArticles = [],
}: CategoryShowProps) {
    // Gerar SEO automaticamente
    const seoProps = generateCategorySEO(category);

    return (
        <BlogLayout {...seoProps}>
            <DefaultPageHeader title={`Categoria - ${category.name}`} />
            {/* Header da Categoria */}
            <CategoryHeader category={category} />

            <div className="container">
                <div className="row">
                    {/* Conteúdo Principal - Lista de Artigos */}
                    <div className="col-lg-8">
                        {/* Filtro/Ordenação (opcional) */}
                        <div className="row mb-30">
                            <div className="col-12">
                                <div className="shop-product-fillter">
                                    <div className="totall-product">
                                        <p>
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
                                    {/* <div className="sort-by-product-area">
                                        <div className="sort-by-cover">
                                            <span className="sort-by">
                                                <i className="elegant-icon icon_adjust-horiz"></i>{' '}
                                                Ordenar por:
                                            </span>
                                            <select className="sort-by-product">
                                                <option value="">
                                                    Mais Recentes
                                                </option>
                                                <option value="popular">
                                                    Mais Populares
                                                </option>
                                                <option value="oldest">
                                                    Mais Antigos
                                                </option>
                                            </select>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Lista de Artigos */}
                        {articles.data.length > 0 ? (
                            <>
                                <PostList
                                    articles={articles.data}
                                    columns={2}
                                    showExcerpt={true}
                                    showSocial={false}
                                />

                                {/* Paginação */}
                                <Pagination data={articles} />
                            </>
                        ) : (
                            <div className="py-50 text-center">
                                <i
                                    className="elegant-icon icon_folder-alt mb-20 text-muted"
                                    style={{ fontSize: '64px' }}
                                ></i>
                                <h5 className="text-muted">
                                    Nenhum artigo encontrado nesta categoria
                                </h5>
                                <p className="mb-30 text-muted">
                                    Volte em breve para novos conteúdos!
                                </p>
                                <Link href="/" className="btn btn-primary">
                                    <i className="elegant-icon icon_house_alt mr-5"></i>
                                    Voltar à Home
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-4">
                        <div className="widget-area">
                            {/* Categorias Relacionadas */}
                            {relatedCategories.length > 0 && (
                                <div className="sidebar-widget widget_categories wow fadeInUp animated mb-50">
                                    <div className="widget-header-2 position-relative mb-30">
                                        <h5 className="mt-5 mb-30">
                                            Categorias Relacionadas
                                        </h5>
                                    </div>
                                    <ul className="font-small">
                                        {relatedCategories.map((cat) => (
                                            <li
                                                key={cat.id}
                                                className="cat-item mb-10"
                                            >
                                                <Link
                                                    href={`/blog/categoria/${cat.slug}`}
                                                >
                                                    <span
                                                        className="badge mr-10"
                                                        style={{
                                                            backgroundColor:
                                                                cat.color ||
                                                                '#007bff',
                                                        }}
                                                    >
                                                        {cat.icon && (
                                                            <i
                                                                className={`elegant-icon ${cat.icon}`}
                                                            ></i>
                                                        )}
                                                    </span>
                                                    {cat.name}
                                                </Link>
                                                <span className="post-count float-right">
                                                    {cat.articles_count || 0}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Artigos Populares */}
                            {popularArticles.length > 0 && (
                                <div className="sidebar-widget widget-latest-posts wow fadeInUp animated mb-50">
                                    <div className="widget-header-2 position-relative mb-30">
                                        <h5 className="mt-5 mb-30">
                                            Artigos Populares
                                        </h5>
                                    </div>
                                    <div className="post-block-list post-module-1">
                                        {popularArticles.map((article) => (
                                            <PostCard
                                                key={article.id}
                                                article={article}
                                                className="mb-30"
                                                showExcerpt={false}
                                                showSocial={false}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Newsletter */}
                            {/* <div className="sidebar-widget widget_newsletter wow fadeInUp animated">
                                <div className="widget-header-2 position-relative mb-30">
                                    <h5 className="mt-5 mb-30">Newsletter</h5>
                                </div>
                                <div className="newsletter">
                                    <p className="font-medium">
                                        Receba atualizações desta categoria no
                                        seu email.
                                    </p>
                                    <form className="input-group form-subcriber mt-30">
                                        <input
                                            type="email"
                                            className="form-control font-small bg-white"
                                            placeholder="Seu email"
                                        />
                                        <button
                                            className="btn bg-primary text-white"
                                            type="submit"
                                        >
                                            Subscrever
                                        </button>
                                    </form>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </BlogLayout>
    );
}
