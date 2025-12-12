import ArticleContent from '@/components/blog/article-content';
import ArticleNavigation from '@/components/blog/article-navigation';
import AuthorBox from '@/components/blog/author-box';
import PostCard from '@/components/blog/post-card';
import SeriesNavigation from '@/components/blog/serie-navigation';
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

    // Meta Keywords logic
    const keywords: string[] = [];
    if (article.meta_keywords && typeof article.meta_keywords === 'string') {
        keywords.push(...article.meta_keywords.split(',').map((k) => k.trim()));
    } else if (Array.isArray(article.tags)) {
        keywords.push(...article.tags.map((tag) => String(tag.name)));
    }

    return (
        <BlogLayout
            title={article.title}
            description={article.meta_description || article.excerpt}
            keywords={keywords}
            // ogType="article"
            ogImage={article.featured_image}
            articlePublishedTime={article.published_at}
            articleModifiedTime={article.updated_at}
            articleAuthor={article.author.name}
            articleSection={article.category.name}
            articleTags={article.tags?.map((tag) => tag.name)}
        >
            <div className="container pt-50">
                <div className="row">
                    {/* Conteúdo Principal */}
                    <div className="col-lg-8">
                        {article.series && (
                            <SeriesNavigation
                                series={article.series}
                                currentArticle={article}
                            />
                        )}
                        {/* Conteúdo do Artigo */}
                        <ArticleContent article={article} />

                        {/* Box do Autor */}
                        <AuthorBox author={article.author} />

                        {/* Navegação Anterior/Próximo */}
                        <ArticleNavigation
                            previousArticle={previousArticle}
                            nextArticle={nextArticle}
                        />
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
                                            href={`/series/${article.series.slug}`}
                                            className="btn btn-sm btn-primary w-100"
                                        >
                                            Ver Série Completa →
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </BlogLayout>
    );
}
