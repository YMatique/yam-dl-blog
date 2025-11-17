import { Article } from '@/types/blog';
import React from 'react';
import PostCard from './post-card';

/**
 * Props do componente PostList
 */
interface PostListProps {
    articles: Article[];
    columns?: 1 | 2 | 3 | 4;
    showExcerpt?: boolean;
    showSocial?: boolean;
    emptyMessage?: string;
}

/**
 * Componente reutilizável para listar artigos em grid
 * Usa PostCard internamente
 */
const PostList: React.FC<PostListProps> = ({
    articles,
    columns = 2,
    showExcerpt = true,
    showSocial = true,
    emptyMessage = 'Nenhum artigo encontrado.',
}) => {
    // Mapear número de colunas para classes Bootstrap
    const getColumnClass = (): string => {
        const colMap = {
            1: 'col-12',
            2: 'col-md-6',
            3: 'col-md-4',
            4: 'col-md-3',
        };
        return colMap[columns];
    };

    // Validação
    if (!articles || articles.length === 0) {
        return (
            <div className="col-12 py-50 text-center">
                <p className="text-muted">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="row">
            {articles.map((article) => (
                <PostCard
                    key={article.id}
                    article={article}
                    className={`${getColumnClass()} mb-40`}
                    showExcerpt={showExcerpt}
                    showSocial={showSocial}
                />
            ))}
        </div>
    );
};

export default PostList;
