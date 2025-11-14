import React from 'react';

// 1. Interface para definir a estrutura de um post
interface Post {
    id: number;
    title: string;
    categories: { name: string; style: string; link: string }[];
    date: string;
    views: string;
    imageUrl: string;
    link: string;
}

// 2. Interface para definir as props do componente (Obrigatório)
interface FeaturedSliderProps {
    posts: Post[]; // Agora posts é uma prop OBRIGATÓRIA
}

/**
 * Componente funcional para o slider de posts em destaque.
 * Apenas exibe o que recebe via props.
 */
const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ posts }) => {
    // Se a prop for um array vazio, não renderiza nada ou exibe uma mensagem.
    if (!posts || posts.length === 0) {
        return (
            <div className="featured-slider-empty">
                Nenhum destaque encontrado.
            </div>
        );
    }

    return (
        <div className="featured-slider-3 position-relative">
            <div className="slider-3-arrow-cover"></div>

            <div className="featured-slider-3-items">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="slider-single border-radius-10 overflow-hidden"
                    >
                        <div className="post-thumb position-relative">
                            <div
                                className="thumb-overlay position-relative"
                                style={{
                                    backgroundImage: `url(${post.imageUrl})`,
                                }}
                            >
                                <div className="post-content-overlay">
                                    <div className="container">
                                        {/* Metadados de Categoria */}
                                        <div className="entry-meta meta-0 font-small mb-20">
                                            {post.categories.map(
                                                (category, index) => (
                                                    <a
                                                        href={category.link}
                                                        tabIndex={0}
                                                        key={index}
                                                    >
                                                        <span
                                                            className={`post-cat ${category.style} text-uppercase`}
                                                        >
                                                            {category.name}
                                                        </span>
                                                    </a>
                                                ),
                                            )}
                                        </div>

                                        {/* Título do Post */}
                                        <h1 className="post-title font-weight-900 mb-20 text-white">
                                            <a
                                                className="text-white"
                                                href={post.link}
                                                tabIndex={0}
                                            >
                                                {post.title}
                                            </a>
                                        </h1>

                                        {/* Data e Visualizações */}
                                        <div className="entry-meta meta-1 font-small mt-10 pr-5 pl-5 text-white">
                                            <span className="post-on">
                                                {post.date}
                                            </span>
                                            <span className="hit-count has-dot">
                                                {post.views}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedSlider;

// Exportamos a interface Post para que o componente Home possa importá-la
export type { FeaturedSliderProps, Post };
