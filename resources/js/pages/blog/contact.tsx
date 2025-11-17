import DefaultPageHeader from '@/components/blog/breadcrumb';
import BlogLayout from '@/layouts/blog-layout';

export default function Contact() {
    return (
        <BlogLayout title="YAM DL - Contactos">
            <DefaultPageHeader title="Contactos" />
            <div className="single-content container">
                <div className="mt-50">
                    <p className="font-large">
                        YAM DL (Yuvi Albino Matique - Digital Library) é uma
                        plataforma dedicada a fornecer recursos digitais de alta
                        qualidade para o crescimento e edificação espiritual.
                        Nossa missão é disponibilizar estudos bíblicos
                        aprofundados, artigos teológicos e ferramentas práticas
                        para uma jornada cristã empolgante. Acreditamos no poder
                        da Palavra para transformar vidas e trabalhamos com
                        paixão, buscando a excelência em cada recurso que
                        oferecemos.
                    </p>

                    <hr className="wp-block-separator is-style-wide" />

                    {/* ÍCONES: Mantidos como placeholders para rápida visualização. 
                    Recomendado substituir por ícones Lucide-React ou FontAwesome. */}

                    <p>
                        <span className="mr-5">
                            {/* [Ícone de Localização] */} 🗺️
                        </span>
                        <strong>Sede Ministerial</strong>: Av. Samora Machel,
                        Bairro de Esturro, Beira, Moçambique
                    </p>
                    <p>
                        <span className="mr-5">
                            {/* [Ícone de Website] */} 🌐
                        </span>
                        <strong>Nossa Plataforma</strong>:{' '}
                        <a href="https://yamdl.com">https://yamdl.com</a>
                    </p>
                    <p>
                        <span className="mr-5">
                            {/* [Ícone de Suporte] */} 📧
                        </span>
                        <strong>Apoio ao Usuário</strong>:{' '}
                        <a href="https://suporte.yamdl.com">
                            https://suporte.yamdl.com
                        </a>
                    </p>

                    <h3 className="mt-30">Parcerias e Missões</h3>
                    <hr className="wp-block-separator is-style-wide" />
                    <p>
                        Se você se identifica ou compartilha da nossa visão de
                        impacto e crescimento espiritual, entre em contacto para
                        parceria. <br />
                        Para deixar testemunho de como foi impactado através das
                        mensagens nesta plataforma, entre em contacto ou
                        escreva-nos um e-mail.
                    </p>

                    <h1 className="mt-30">Entre em contato</h1>
                    <hr className="wp-block-separator is-style-wide" />

                    {/* FORMULÁRIO DE CONTATO */}
                    <form
                        className="form-contact comment_form"
                        onSubmit={(e) => e.preventDefault()}
                        id="commentForm"
                    >
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        type="text"
                                        placeholder="Nome Completo"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="subject"
                                        id="subject"
                                        type="text"
                                        placeholder="Assunto da Mensagem"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <textarea
                                        className="form-control w-100"
                                        name="comment"
                                        id="comment"
                                        cols={30}
                                        rows={9}
                                        placeholder="Sua Mensagem / Pedido de Oração"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="button button-contactForm"
                            >
                                Enviar Mensagem
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BlogLayout>
    );
}
