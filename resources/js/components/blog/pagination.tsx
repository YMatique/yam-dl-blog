import { PaginatedData } from '@/types/blog';
import { Link } from '@inertiajs/react';
import React from 'react';

interface PaginationProps {
    data: PaginatedData<any>;
}

/**
 * Componente de paginação reutilizável
 */
const Pagination: React.FC<PaginationProps> = ({ data }) => {
    // Se só houver 1 página, não mostrar paginação
    if (data.last_page <= 1) {
        return null;
    }

    const { current_page, last_page, links } = data;

    return (
        <div className="pagination-area wow fadeInUp animated mb-30">
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-start">
                    {/* Botão Anterior */}
                    <li
                        className={`page-item ${current_page === 1 ? 'disabled' : ''}`}
                    >
                        <Link
                            className="page-link"
                            href={links[0]?.url || '#'}
                            preserveScroll
                        >
                            <i className="elegant-icon arrow_left"></i>
                        </Link>
                    </li>

                    {/* Números das páginas */}
                    {links.slice(1, -1).map((link, index) => {
                        // Se for "..."
                        if (link.label === '...') {
                            return (
                                <li
                                    key={`dots-${index}`}
                                    className="page-item disabled"
                                >
                                    <span className="page-link">...</span>
                                </li>
                            );
                        }

                        return (
                            <li
                                key={index}
                                className={`page-item ${link.active ? 'active' : ''}`}
                            >
                                <Link
                                    className="page-link"
                                    href={link.url || '#'}
                                    preserveScroll
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}

                    {/* Botão Próximo */}
                    <li
                        className={`page-item ${
                            current_page === last_page ? 'disabled' : ''
                        }`}
                    >
                        <Link
                            className="page-link"
                            href={links[links.length - 1]?.url || '#'}
                            preserveScroll
                        >
                            <i className="elegant-icon arrow_right"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
