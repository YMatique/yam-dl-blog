import DefaultPageHeader from '@/components/blog/breadcrumb';
import CategoryCard from '@/components/blog/category-card';
import BlogLayout from '@/layouts/blog-layout';
import { Category } from '@/types/blog';
import { useState } from 'react';

interface CategoryIndexProps {
    categories: Category[];
}

/**
 * Página de listagem de categorias com busca e filtros
 */
export default function CategoryIndexAdvanced({
    categories,
}: CategoryIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'articles' | 'popular'>(
        'name',
    );

    // Filtrar categorias
    const filteredCategories = categories
        .filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'articles':
                    return (b.articles_count || 0) - (a.articles_count || 0);
                case 'popular':
                    return (b.articles_count || 0) - (a.articles_count || 0);
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

    return (
        <BlogLayout
            title="Todas as Categorias - YAMDL"
            description="Explore todas as categorias de artigos e estudos bíblicos disponíveis na YAMDL."
            keywords={['categorias', 'temas', 'estudos bíblicos', 'artigos']}
        >
            <DefaultPageHeader title="Todas as Categorias" />

            <div className="container">
                {/* Header com busca */}
                <div className="row mb-50">
                    <div className="col-12 mb-30 text-center">
                        <h2 className="font-weight-900 mb-20">
                            Explore Nossos Temas
                        </h2>
                        <p className="font-large mb-30 text-muted">
                            Escolha uma categoria e aprofunde-se em estudos
                            bíblicos
                        </p>

                        {/* Busca e Filtros */}
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="input-group mb-20">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Buscar categoria..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                        >
                                            <i className="elegant-icon icon_search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ordenação */}
                        <div className="d-inline-block">
                            <select
                                className="form-control"
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(e.target.value as typeof sortBy)
                                }
                            >
                                <option value="name">Ordenar: A-Z</option>
                                <option value="articles">Mais Artigos</option>
                                <option value="popular">Mais Populares</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Resultado da busca */}
                {searchTerm && (
                    <div className="row mb-30">
                        <div className="col-12">
                            <p className="text-muted">
                                Mostrando{' '}
                                <strong>{filteredCategories.length}</strong> de{' '}
                                <strong>{categories.length}</strong> categorias
                            </p>
                        </div>
                    </div>
                )}

                {/* Grid de Categorias */}
                {filteredCategories.length > 0 ? (
                    <div className="row">
                        {filteredCategories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                className="col-lg-4 col-md-6 col-12 mb-30"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-12 py-50 text-center">
                            <i
                                className="elegant-icon icon_search mb-20 text-muted"
                                style={{ fontSize: '64px' }}
                            ></i>
                            <h5 className="text-muted">
                                Nenhuma categoria encontrada
                            </h5>
                            <p className="text-muted">
                                Tente buscar com outros termos
                            </p>
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="row mt-50">
                    <div className="col-12">
                        <div className="border-radius-10 bg-primary p-40 text-center">
                            <h3 className="font-weight-900 mb-20 text-white">
                                Não encontrou o que procurava?
                            </h3>
                            <p className="mb-30 text-white">
                                Entre em contato conosco e sugira novos temas!
                            </p>
                            <a
                                href="/contacto"
                                className="btn btn-lg btn-light font-weight-bold text-primary"
                            >
                                Enviar Sugestão →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </BlogLayout>
    );
}
