import { Category, Tag } from '@/types/blog';
import { Link } from '@inertiajs/react';
import React from 'react';

interface FilterSidebarProps {
    categories: Category[];
    popularTags: Tag[];
    activeCategory?: string;
    activeTag?: string;
}

/**
 * Sidebar com filtros de categoria e tags
 */
const FilterSidebar: React.FC<FilterSidebarProps> = ({
    categories,
    popularTags,
    activeCategory,
    activeTag,
}) => {
    return (
        <div className="widget-area">
            {/* Categorias */}
            <div className="sidebar-widget widget_categories wow fadeInUp animated mb-50">
                <div className="widget-header-2 position-relative mb-30">
                    <h5 className="mt-5 mb-30">Categorias</h5>
                </div>
                <ul className="font-small">
                    {/* Todas as categorias */}
                    <li
                        className={`cat-item mb-10 ${!activeCategory ? 'active' : ''}`}
                    >
                        <Link href="/blog/artigos">
                            <span className="mr-10">📚</span>
                            Todas as Categorias
                        </Link>
                    </li>

                    {/* Lista de categorias */}
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className={`cat-item mb-10 ${
                                activeCategory === category.slug ? 'active' : ''
                            }`}
                        >
                            <Link
                                href={`/blog/artigos?category=${category.slug}`}
                            >
                                {category.icon && (
                                    <i
                                        className={`elegant-icon ${category.icon} mr-10`}
                                        style={{ color: category.color }}
                                    ></i>
                                )}
                                {category.name}
                            </Link>
                            <span className="post-count float-right">
                                {category.articles_count || 0}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tags Populares */}
            <div className="sidebar-widget widget_tagcloud wow fadeInUp animated mb-50">
                <div className="widget-header-2 position-relative mb-30">
                    <h5 className="mt-5 mb-30">Tags Populares</h5>
                </div>
                <div className="tagcloud">
                    {popularTags.map((tag) => (
                        <Link
                            key={tag.id}
                            href={`/blog/artigos?tag=${tag.slug}`}
                            className={`tag-cloud-link ${
                                activeTag === tag.slug ? 'active' : ''
                            }`}
                        >
                            # {tag.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="sidebar-widget widget_newsletter wow fadeInUp animated">
                <div className="widget-header-2 position-relative mb-30">
                    <h5 className="mt-5 mb-30">Newsletter</h5>
                </div>
                <div className="newsletter">
                    <p className="font-medium">
                        Receba novos artigos diretamente no seu email.
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
            </div>
        </div>
    );
};

export default FilterSidebar;
