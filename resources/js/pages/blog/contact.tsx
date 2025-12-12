import DefaultPageHeader from '@/components/blog/breadcrumb';
import BlogLayout from '@/layouts/blog-layout';
import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contacto', {
            onSuccess: () => {
                // Limpar formulário após sucesso
                setData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            },
        });
    };

    return (
        <BlogLayout title="Contacto - YAM DL">
            <DefaultPageHeader title="Entre em Contacto" />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="single-content border-radius-10 mt-50 mb-50 bg-white p-30">
                            {/* Introdução */}
                            <div className="mb-30 text-center">
                                <p className="font-large text-muted">
                                    Tem alguma dúvida, sugestão ou pedido de
                                    oração? Ficaremos felizes em ouvir você!
                                </p>
                            </div>

                            {/* Informações de Contato */}
                            <div className="row mb-40">
                                <div className="col-md-4 mb-md-0 mb-3 text-center">
                                    <div className="contact-info-card p-20">
                                        <div className="mb-10">
                                            <i className="elegant-icon icon_pin_alt font-large text-primary"></i>
                                        </div>
                                        <h6 className="font-weight-bold mb-10">
                                            Localização
                                        </h6>
                                        <p className="font-small text-muted">
                                            Beira, Moçambique
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-md-0 mb-3 text-center">
                                    <div className="contact-info-card p-20">
                                        <div className="mb-10">
                                            <i
                                                className="elegant-icon icon_mail_alt font-large text-primary"
                                                // style={{ fontSize: '1.5rem' }}
                                            ></i>
                                        </div>
                                        <h6 className="font-weight-bold mb-10">
                                            Email
                                        </h6>
                                        <p className="font-small text-muted">
                                            <a href="mailto:contato@yamdl.com">
                                                contato@yamdl.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 text-center">
                                    <div className="contact-info-card p-20">
                                        <div className="mb-10">
                                            <i className="elegant-icon icon_link font-large text-primary"></i>
                                        </div>
                                        <h6 className="font-weight-bold mb-10">
                                            Suporte
                                        </h6>
                                        <p className="font-small text-muted">
                                            <a
                                                href="https://suporte.yamdl.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                suporte.yamdl.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <hr className="wp-block-separator is-style-wide mb-40" />

                            {/* Formulário de Contato */}
                            <h4 className="font-weight-bold mb-30 text-center">
                                Envie sua Mensagem
                            </h4>

                            <form
                                className="form-contact comment_form"
                                onSubmit={handleSubmit}
                                id="contactForm"
                            >
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input
                                                className={`form-control ${
                                                    errors.name
                                                        ? 'is-invalid'
                                                        : ''
                                                }`}
                                                name="name"
                                                type="text"
                                                placeholder="Nome Completo *"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            {errors.name && (
                                                <div className="invalid-feedback">
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input
                                                className={`form-control ${
                                                    errors.email
                                                        ? 'is-invalid'
                                                        : ''
                                                }`}
                                                name="email"
                                                type="email"
                                                placeholder="Email *"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input
                                                className={`form-control ${
                                                    errors.subject
                                                        ? 'is-invalid'
                                                        : ''
                                                }`}
                                                name="subject"
                                                type="text"
                                                placeholder="Assunto *"
                                                value={data.subject}
                                                onChange={(e) =>
                                                    setData(
                                                        'subject',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            {errors.subject && (
                                                <div className="invalid-feedback">
                                                    {errors.subject}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea
                                                className={`form-control w-100 ${
                                                    errors.message
                                                        ? 'is-invalid'
                                                        : ''
                                                }`}
                                                name="message"
                                                cols={30}
                                                rows={9}
                                                placeholder="Sua Mensagem / Pedido de Oração *"
                                                value={data.message}
                                                onChange={(e) =>
                                                    setData(
                                                        'message',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            ></textarea>
                                            {errors.message && (
                                                <div className="invalid-feedback">
                                                    {errors.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <button
                                        type="submit"
                                        className="button button-contactForm"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Enviando...'
                                            : 'Enviar Mensagem'}
                                    </button>
                                </div>
                            </form>

                            {/* Nota sobre Parcerias */}
                            <div className="bg-grey border-radius-5 mt-40 p-20 text-center">
                                <p className="font-small mb-0 text-muted">
                                    💼 Interessado em parcerias ou deseja
                                    compartilhar seu testemunho?{' '}
                                    <a
                                        href="/sobre-nos"
                                        className="font-weight-bold text-primary"
                                    >
                                        Conheça mais sobre nós
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BlogLayout>
    );
}
