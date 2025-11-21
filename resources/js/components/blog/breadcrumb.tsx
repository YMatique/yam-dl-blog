import React from 'react';
// Importamos o Link do Inertia para a navegação do Breadcrumb
// Usamos um ícone da Lucide-React para o Breadcrumb, assumindo que você o tem instalado.

interface ContactPageHeaderProps {
    title: string;
    // Opcional: URL da imagem de fundo
    imageUrl?: string;
    className?: string;
}

/**
 * Componente de cabeçalho (hero) para a página de contato, incluindo Breadcrumb.
 */
const DefaultPageHeader: React.FC<ContactPageHeaderProps> = ({
    title,
    imageUrl = '/imgs/default-breadcrumb.jpg',
    className = 'mb-50',
}) => {
    // Define o estilo da imagem de fundo
    const headerStyle = {
        backgroundImage: `url(${imageUrl})`,
        // backgroundColor: 'white',
    };

    return (
        <div
            className={`entry-header entry-header-style-2 pt-80 pb-80 text-white ${className}`}
            style={headerStyle}
        >
            <div className="entry-header-content container">
                {/* ===============
                  BREADCRUMB
                  ===============
                */}
                <div className="entry-meta meta-0 font-small text-uppercase mb-20"></div>

                {/* ===============
                  TÍTULO PRINCIPAL
                  ===============
                */}
                <h1 className="entry-title font-weight-900 mb-50">{title}</h1>
            </div>
        </div>
    );
};

export default DefaultPageHeader;
