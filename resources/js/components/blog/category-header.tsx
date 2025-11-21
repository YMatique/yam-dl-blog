import { Category } from '@/types/blog';
import React from 'react';

interface CategoryHeaderProps {
    category: Category;
}

/**
 * Header da página de categoria com imagem, nome e descrição
 */
const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category }) => {
    return (
        <div className="category-header position-relative mb-50">
            {/* Background Image (se houver) */}
            {category.image && (
                <div
                    className="category-header-bg"
                    style={{
                        backgroundImage: `url(${category.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '300px',
                        position: 'relative',
                    }}
                >
                    <div
                        className="overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.5)',
                        }}
                    ></div>
                </div>
            )}

            {/* Content */}
            <div className="container">
                <div
                    className={`category-header-content text-center ${
                        category.image ? 'position-absolute' : 'pt-20'
                    }`}
                    style={
                        category.image
                            ? {
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  width: '100%',
                                  color: 'white',
                              }
                            : {}
                    }
                >
                    {/* Badge/Icon da Categoria */}
                    <div className="category-icon mb-20">
                        <span
                            className="badge badge-lg"
                            style={{
                                backgroundColor: category.color || '#007bff',
                                fontSize: '16px',
                                padding: '10px 20px',
                            }}
                        >
                            {category.icon && (
                                <i
                                    className={`elegant-icon ${category.icon} mr-10`}
                                ></i>
                            )}
                            {/* {category.name} */}
                        </span>
                    </div>

                    {/* Nome da Categoria */}
                    <h1
                        className="category-title font-weight-900 mb-20"
                        style={category.image ? { color: 'white' } : {}}
                    >
                        {category.name}
                    </h1>

                    {/* Descrição */}
                    {category.description && (
                        <p
                            className="category-description font-large mb-20"
                            style={
                                category.image
                                    ? { color: 'rgba(255,255,255,0.9)' }
                                    : { color: '#6c757d' }
                            }
                        >
                            {category.description}
                        </p>
                    )}

                    {/* Contador de Artigos */}
                    <p
                        className="category-count font-medium"
                        style={
                            category.image
                                ? { color: 'white' }
                                : { color: '#6c757d' }
                        }
                    >
                        <i className="elegant-icon icon_documents_alt mr-5"></i>
                        {category.articles_count || 0} artigo
                        {(category.articles_count || 0) !== 1 ? 's' : ''} nesta
                        categoria
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CategoryHeader;
