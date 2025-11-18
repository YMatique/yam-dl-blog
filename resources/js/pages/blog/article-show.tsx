import ArticleContent from '@/components/blog/article-content';
import ArticleNavigation from '@/components/blog/article-navigation';
import AuthorBox from '@/components/blog/author-box';
import PostCard from '@/components/blog/post-card';
import BlogLayout from '@/layouts/blog-layout';
import { Article } from '@/types/blog';

/**
 * Props da página de artigo
 */
interface ArticleShowProps {
    article: Article;
    relatedArticles: Article[];
    previousArticle?: Article;
    nextArticle?: Article;
}

/**
 * Página de Artigo Individual
 * Exibe o conteúdo completo do artigo com sidebar
 */
export default function ArticleShow({
    article,
    relatedArticles,
    previousArticle,
    nextArticle,
}: ArticleShowProps) {
    // Gerar SEO automaticamente
    // const seoProps = generateArticleSEO(article);

    return (
        <BlogLayout title={article.title}>
            <div className="container pt-50">
                <div className="row">
                    {/* Conteúdo Principal */}
                    <div className="col-lg-8">
                        {/* Conteúdo do Artigo */}
                        <ArticleContent article={article} />

                        {/* Box do Autor */}
                        <AuthorBox author={article.author} />

                        {/* Navegação Anterior/Próximo */}
                        <ArticleNavigation
                            previousArticle={previousArticle}
                            nextArticle={nextArticle}
                        />

                        {/* Comentários (placeholder) */}
                        {/* <div className="comments-area border-radius-10 wow fadeInUp animated mb-30 bg-white p-30">
                            <h5 className="font-weight-900 mb-30">
                                Comentários
                            </h5>
                            <p className="py-30 text-center text-muted">
                                Sistema de comentários em breve...
                            </p>
                        </div> */}
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-4">
                        <div className="widget-area">
                            {/* Artigos Relacionados */}
                            {relatedArticles.length > 0 && (
                                <div className="sidebar-widget widget-latest-posts wow fadeInUp animated mb-50">
                                    <div className="widget-header-2 position-relative mb-30">
                                        <h5 className="mt-5 mb-30">
                                            Artigos Relacionados
                                        </h5>
                                    </div>
                                    <div className="post-block-list post-module-1">
                                        {relatedArticles.map(
                                            (relatedArticle) => (
                                                <div
                                                    key={relatedArticle.id}
                                                    className="mb-30"
                                                >
                                                    <PostCard
                                                        article={relatedArticle}
                                                        className=""
                                                        showExcerpt={false}
                                                        showSocial={false}
                                                    />
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Série (se o artigo faz parte de uma) */}
                            {article.series && (
                                <div className="sidebar-widget widget-series wow fadeInUp animated mb-50">
                                    <div className="widget-header-2 position-relative mb-30">
                                        <h5 className="mt-5 mb-30">
                                            Parte da Série
                                        </h5>
                                    </div>
                                    <div className="series-info border-radius-10 bg-white p-20">
                                        <h6 className="font-weight-900 mb-15">
                                            📚 {article.series.title}
                                        </h6>
                                        {article.series.description && (
                                            <p className="font-small mb-15 text-muted">
                                                {article.series.description.substring(
                                                    0,
                                                    100,
                                                )}
                                                {article.series.description
                                                    .length > 100 && '...'}
                                            </p>
                                        )}
                                        <a
                                            href={`/serie/${article.series.slug}`}
                                            className="btn btn-sm btn-primary w-100"
                                        >
                                            Ver Série Completa →
                                        </a>
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
                                        Receba novos artigos diretamente no seu
                                        email.
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
