// resources/js/types/blog.d.ts

/**
 * Types do Blog YMDL
 * Baseados nos models Laravel
 */

// ============================================
// USER
// ============================================
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
}

// ============================================
// CATEGORY
// ============================================
export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    parent_id?: number;
    image?: string;
    color?: string;
    order: number;
    created_at: string;
    updated_at: string;

    // Relationships (quando carregados)
    parent?: Category;
    children?: Category[];
    articles?: Article[];

    // Computed
    articles_count?: number;
}

// ============================================
// TAG
// ============================================
export interface Tag {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;

    // Computed
    articles_count?: number;
}

// ============================================
// SERIES
// ============================================
export interface Series {
    id: number;
    title: string;
    slug: string;
    description?: string;
    cover_image?: string;
    is_complete: boolean;
    total_articles: number;
    created_at: string;
    updated_at: string;

    // Relationships
    articles?: Article[];

    // Computed
    progress?: number;
}

// ============================================
// ARTICLE (Principal)
// ============================================
export interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featured_image?: string;
    author_id: number;
    category_id: number;
    series_id?: number;
    series_order?: number;
    status: 'draft' | 'published' | 'scheduled';
    published_at?: string;
    reading_time: number; // em minutos
    views_count: number;
    likes_count: number;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    created_at: string;
    updated_at: string;

    // Relationships (quando carregados com ->with())
    author: User;
    category: Category;
    series?: Series;
    tags?: Tag[];

    // Computed
    is_published?: boolean;
}

// ============================================
// ARTICLE VIEW
// ============================================
export interface ArticleView {
    id: number;
    article_id: number;
    user_id?: number;
    ip_address: string;
    user_agent?: string;
    created_at: string;
}

// ============================================
// NEWS
// ============================================
export interface News {
    id: number;
    title: string;
    content: string;
    external_link?: string;
    is_featured: boolean;
    author_id: number;
    published_at?: string;
    views_count: number;
    created_at: string;
    updated_at: string;

    // Relationships
    author?: User;
}

// ============================================
// EVENT
// ============================================
export interface Event {
    id: number;
    title: string;
    slug: string;
    description: string;
    start_date: string;
    end_date?: string;
    location?: string;
    is_online: boolean;
    registration_link?: string;
    max_attendees?: number;
    current_attendees: number;
    thumbnail?: string;
    status: 'draft' | 'published' | 'cancelled';
    created_at: string;
    updated_at: string;

    // Computed
    is_full?: boolean;
    available_spots?: number;
}

// ============================================
// PAGINATION (Inertia/Laravel)
// ============================================
export interface PaginationLinks {
    url?: string;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLinks[];
    next_page_url?: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
}

// ============================================
// TYPES AUXILIARES
// ============================================

/**
 * Props de páginas Inertia (exemplo)
 */
export interface BlogIndexProps {
    articles: PaginatedData<Article>;
    featuredPosts: Article[];
    categories: Category[];
    popularTags: Tag[];
    filters?: {
        category?: number;
        tag?: number;
        search?: string;
    };
}

export interface ArticleShowProps {
    article: Article;
    relatedArticles: Article[];
}

export interface CategoryShowProps {
    category: Category;
    articles: PaginatedData<Article>;
}

export interface SeriesShowProps {
    series: Series;
    articles: Article[];
}
