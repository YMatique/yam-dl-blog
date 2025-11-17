/**
 * Utilitários reutilizáveis para o Blog YMDL
 * Funções de formatação e helpers
 */

/**
 * Formata data para o padrão brasileiro
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

/**
 * Formata data de forma curta (dd/mm/yyyy)
 */
export const formatDateShort = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
};

/**
 * Formata número de visualizações
 */
export const formatViews = (views: number): string => {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M Views`;
    }
    if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}k Views`;
    }
    return `${views} Views`;
};

/**
 * Formata tempo de leitura
 */
export const formatReadingTime = (minutes: number): string => {
    if (minutes < 1) {
        return 'Menos de 1 min';
    }
    return `${minutes} min${minutes > 1 ? 's' : ''} de leitura`;
};

/**
 * Gera URL para artigo
 */
export const getArticleUrl = (slug: string): string => {
    return `/artigos/${slug}`;
};

/**
 * Gera URL para categoria
 */
export const getCategoryUrl = (slug: string): string => {
    return `/categorias/${slug}`;
};

/**
 * Gera URL para tag
 */
export const getTagUrl = (slug: string): string => {
    return `/tags/${slug}`;
};

/**
 * Gera URL para série
 */
export const getSeriesUrl = (slug: string): string => {
    return `/series/${slug}`;
};

/**
 * Trunca texto com elipse
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Remove tags HTML de um texto
 */
export const stripHtml = (html: string): string => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

/**
 * Calcula tempo relativo (ex: "há 2 dias")
 */
export const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
        ano: 31536000,
        mês: 2592000,
        semana: 604800,
        dia: 86400,
        hora: 3600,
        minuto: 60,
    };

    for (const [name, secondsInInterval] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInInterval);
        if (interval >= 1) {
            return `há ${interval} ${name}${interval > 1 ? 's' : ''}`;
        }
    }

    return 'agora mesmo';
};

/**
 * Valida se uma imagem existe (retorna default se não existir)
 */
export const getImageUrl = (
    imagePath?: string | null,
    defaultImage: string = '/stories/assets/imgs/news/default.jpg',
): string => {
    return imagePath || defaultImage;
};

/**
 * Gera cor aleatória para categorias sem cor
 */
export const getRandomColor = (): string => {
    const colors = [
        '#3B82F6', // blue
        '#10B981', // green
        '#F59E0B', // yellow
        '#EF4444', // red
        '#8B5CF6', // purple
        '#EC4899', // pink
        '#06B6D4', // cyan
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
