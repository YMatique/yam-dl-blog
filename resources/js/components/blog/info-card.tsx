import React from 'react';

interface InfoCardProps {
    icon: string; // classe do ícone (ex: 'icon_compass')
    title: string;
    description: string;
    color?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
}

/**
 * Card informativo com ícone, título e descrição
 * Usado para Missão, Visão, Valores, etc.
 */
const InfoCard: React.FC<InfoCardProps> = ({
    icon,
    title,
    description,
    color = 'primary',
}) => {
    return (
        <div
            className="wow fadeInUp animated mb-30"
            style={{ visibility: 'visible' }}
        >
            <div className="border-radius-10 hover-up h-100 bg-white p-30 text-center">
                {/* Ícone */}
                <div className={`icon-big text-${color} mb-15`}>
                    <i
                        className={`elegant-icon ${icon}`}
                        style={{ fontSize: '48px' }}
                    ></i>
                </div>

                {/* Título */}
                <h5 className="font-weight-900 mb-20">{title}</h5>

                {/* Descrição */}
                <p className="font-medium text-muted">{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;
