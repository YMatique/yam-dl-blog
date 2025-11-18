import { router } from '@inertiajs/react';
import React, { useState } from 'react';

interface SearchBarProps {
    initialSearch?: string;
    placeholder?: string;
}

/**
 * Barra de busca para artigos
 */
const SearchBar: React.FC<SearchBarProps> = ({
    initialSearch = '',
    placeholder = 'Buscar artigos...',
}) => {
    const [search, setSearch] = useState(initialSearch);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.visit('/artigos', {
            data: { search },
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="search-form mb-30">
            <div className="input-group input-group-lg">
                <input
                    type="text"
                    className="form-control yam-input bg-white"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary yam-btn" type="submit">
                        <i className="elegant-icon icon_search"></i>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
