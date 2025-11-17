import { Category } from '@/types/blog';
import { Link } from '@inertiajs/react';
import React from 'react';

interface CategoryCardProps {
    category: Category;
    className?: string;
}

/**
 * Card de categoria para a página de listagem
 */
const CategoryCard: React.FC<CategoryCardProps> = ({
    category,
    className = 'col-md-4 col-sm-6 col-12 mb-30',
}) => {
    return (
        <div className={className}>
            <div className="category-card border-radius-10 hover-up wow fadeInUp animated h-100 overflow-hidden bg-white">
                {/* Imagem de fundo (se houver) */}
                {category.image ? (
                    <Link href={`/blog/categoria/${category.slug}`}>
                        <div
                            className="category-card-image"
                            style={{
                                backgroundImage: `url(${category.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '200px',
                                position: 'relative',
                            }}
                        >
                            {/* Overlay */}
                            <div
                                className="overlay"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                }}
                            ></div>

                            {/* Badge no canto */}
                            <div
                                className="position-absolute"
                                style={{ top: '15px', left: '15px' }}
                            >
                                <span
                                    className="badge badge-lg"
                                    style={{
                                        backgroundColor:
                                            category.color || '#007bff',
                                    }}
                                >
                                    {category.icon && (
                                        <i
                                            className={`elegant-icon ${category.icon} mr-5`}
                                        ></i>
                                    )}
                                    {category.articles_count || 0} artigos
                                </span>
                            </div>
                        </div>
                    </Link>
                ) : (
                    // Se não tiver imagem, apenas cor de fundo
                    <Link href={`/blog/categoria/${category.slug}`}>
                        <div
                            className="category-card-colored p-40 text-center"
                            style={{
                                backgroundColor: category.color || '#007bff',
                                height: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            {category.icon && (
                                <i
                                    className={`elegant-icon ${category.icon} mb-15 text-white`}
                                    style={{ fontSize: '48px' }}
                                ></i>
                            )}
                            <span className="font-weight-900 font-large text-white">
                                {category.articles_count || 0} artigos
                            </span>
                        </div>
                    </Link>
                )}

                {/* Conteúdo */}
                <div className="category-card-content p-30">
                    {/* Nome */}
                    <h5 className="category-card-title font-weight-900 mb-15">
                        <Link href={`/blog/categoria/${category.slug}`}>
                            {category.name}
                        </Link>
                    </h5>

                    {/* Descrição */}
                    {category.description && (
                        <p className="category-card-description font-small mb-20 text-muted">
                            {category.description.length > 100
                                ? category.description.substring(0, 100) + '...'
                                : category.description}
                        </p>
                    )}

                    {/* Link "Ver Artigos" */}
                    <Link
                        href={`/blog/categoria/${category.slug}`}
                        className="font-small font-weight-bold text-primary"
                    >
                        Ver artigos →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
