import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

interface NewsletterWidgetProps {
    className?: string;
    title?: string;
    description?: string;
}

/**
 * Widget de Newsletter para subscrição
 */
const NewsletterWidget: React.FC<NewsletterWidgetProps> = ({
    className = 'sidebar-widget widget_newsletter wow fadeInUp animated mb-30',
    title = 'Newsletter',
    description = 'Subscreva-se ao newsletter e receba notificações de novos artigos no seu email.',
}) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        terms: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/newsletter/subscribe', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowSuccess(true);
                // Ocultar mensagem após 5 segundos
                setTimeout(() => setShowSuccess(false), 5000);
            },
        });
    };

    return (
        <div className={className}>
            <div className="widget-header-2 position-relative mb-30">
                <h5 className="mt-5 mb-30">{title}</h5>
            </div>
            <div className="newsletter">
                {/* Mensagem de Sucesso */}
                {showSuccess && (
                    <div
                        className="alert alert-success alert-dismissible fade show mb-20"
                        role="alert"
                    >
                        <strong>✅ Sucesso!</strong> Verifique seu email para
                        confirmar a subscrição.
                        <button
                            type="button"
                            className="close"
                            onClick={() => setShowSuccess(false)}
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )}

                {/* Descrição */}
                <p className="font-medium">{description}</p>

                {/* Formulário */}
                <form className="form-subcriber mt-30" onSubmit={handleSubmit}>
                    {/* Campo Email */}
                    <div className="input-group d-flex mb-20">
                        <input
                            type="email"
                            className={`form-control font-small bg-white ${
                                errors.email ? 'is-invalid' : ''
                            }`}
                            placeholder="Seu email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            disabled={processing}
                        />
                        <button
                            className="btn bg-primary text-white"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? 'Enviando...' : 'Subscrever'}
                        </button>
                    </div>

                    {/* Erro de Email */}
                    {errors.email && (
                        <div className="text-danger font-small mb-15">
                            {errors.email}
                        </div>
                    )}

                    {/* Checkbox Termos */}
                    <label className="d-block">
                        <input
                            className="mr-5"
                            name="terms"
                            type="checkbox"
                            checked={data.terms}
                            onChange={(e) => setData('terms', e.target.checked)}
                            required
                            disabled={processing}
                        />
                        Concordo com os{' '}
                        <a href="/termos" target="_blank" rel="noopener">
                            termos e condições
                        </a>
                    </label>

                    {/* Erro de Termos */}
                    {errors.terms && (
                        <div className="text-danger font-small mt-10">
                            {errors.terms}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default NewsletterWidget;
