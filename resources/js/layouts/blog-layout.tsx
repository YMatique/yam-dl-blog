import NewsletterWidget from '@/components/blog/newsletter-widget';
import SEOHead from '@/components/blog/seo-head';
import TemplateScripts from '@/components/blog/template-scripts';
import { SEOProps } from '@/types/seo';
import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface BlogLayoutProps extends SEOProps {
    children: ReactNode;
}

export default function BlogLayout({
    children,
    title = 'YAMDL - Biblioteca Digital',
    description,
    keywords,
    ogType,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterSite,
    twitterCreator,
    articlePublishedTime,
    articleModifiedTime,
    articleAuthor,
    articleSection,
    articleTags,
    canonical,
    robots,
    locale,
    alternateLocales,
}: BlogLayoutProps) {
    const { url } = usePage();
    const isActive = (path: string) =>
        path === '/' ? url === '/' : url.startsWith(path);

    return (
        <>
            {/* SEO Head - Todas as meta tags otimizadas */}
            <SEOHead
                title={title}
                description={description}
                keywords={keywords}
                ogType={ogType}
                ogTitle={ogTitle}
                ogDescription={ogDescription}
                ogImage={ogImage}
                ogUrl={ogUrl}
                twitterCard={twitterCard}
                twitterTitle={twitterTitle}
                twitterDescription={twitterDescription}
                twitterImage={twitterImage}
                twitterSite={twitterSite}
                twitterCreator={twitterCreator}
                articlePublishedTime={articlePublishedTime}
                articleModifiedTime={articleModifiedTime}
                articleAuthor={articleAuthor}
                articleSection={articleSection}
                articleTags={articleTags}
                canonical={canonical}
                robots={robots}
                locale={locale}
                alternateLocales={alternateLocales}
            />

            <div className="scroll-progress primary-bg"></div>

            {/* HEADER */}
            <header className="main-header header-style-1 font-heading">
                <div className="header-top">
                    <div className="container">
                        <div className="row pt-20 pb-20">
                            <div className="col-md-3 col-xs-6">
                                <Link href="/">
                                    <img
                                        className="logo"
                                        src="/logo.png"
                                        alt="YAMDL Logo"
                                    />
                                </Link>
                            </div>
                            <div className="col-md-9 col-xs-6 header-top-right text-right">
                                <span className="vertical-divider d-none d-md-inline mr-20 ml-20"></span>
                                <button className="search-icon d-none d-md-inline">
                                    <span className="font-small mr-15 text-muted">
                                        <i className="elegant-icon icon_search mr-5"></i>
                                        Pesquisar
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-sticky">
                    <div className="align-self-center position-relative container">
                        <div className="mobile_menu d-lg-none d-block"></div>
                        <div className="main-nav d-none d-lg-block float-left">
                            <nav>
                                {/* DESKTOP MENU */}
                                <ul className="main-menu d-none d-lg-inline font-small">
                                    <li>
                                        <Link
                                            href="/"
                                            className={
                                                isActive('/')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            <i className="elegant-icon icon_house_alt mr-5"></i>{' '}
                                            Página Inicial
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/sobre-nos"
                                            className={
                                                isActive('/sobre-nos')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            Sobre
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/artigos"
                                            className={
                                                isActive('/artigos')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            Artigos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/categorias"
                                            className={
                                                isActive('/categorias')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            Categorias
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/series"
                                            className={
                                                isActive('/series')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            Séries
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contacto"
                                            className={
                                                isActive('/contacto')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            Contacto
                                        </Link>
                                    </li>
                                </ul>

                                {/* MOBILE MENU */}
                                <ul
                                    id="mobile-menu"
                                    className="d-block d-lg-none text-muted"
                                >
                                    <li>
                                        <Link
                                            href="/"
                                            className={
                                                isActive('/')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            <i className="elegant-icon icon_house_alt mr-5"></i>{' '}
                                            Página Inicial
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/artigos"
                                            className={
                                                isActive('/artigos')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            Artigos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/categorias"
                                            className={
                                                isActive('/categorias')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            Categorias
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/series"
                                            className={
                                                isActive('/series')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            Séries
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contacto"
                                            className={
                                                isActive('/contacto')
                                                    ? 'active-link'
                                                    : ''
                                            }
                                        >
                                            Contacto
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-tools font-small float-right text-muted">
                            <ul className="header-social-network d-inline-block list-inline mr-15">
                                <li className="list-inline-item">
                                    <a
                                        className="social-icon fb text-xs-center"
                                        target="_blank"
                                        href="#"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="elegant-icon social_facebook"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        className="social-icon tw text-xs-center"
                                        target="_blank"
                                        href="#"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="elegant-icon social_twitter"></i>
                                    </a>
                                </li>
                            </ul>
                            {/* <div className="off-canvas-toggle-cover d-inline-block">
                                <div
                                    className="off-canvas-toggle d-inline-block hidden"
                                    id="off-canvas-toggle"
                                >
                                    <span></span>
                                </div>
                            </div> */}
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="pb-30">{children}</main>

            {/* FOOTER */}
            <footer className="bg-grey pt-50 pb-20">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="sidebar-widget wow fadeInUp animated mb-30">
                                <div className="widget-header-2 position-relative mb-30">
                                    <h5 className="mt-5 mb-30">Sobre nós</h5>
                                </div>
                                <img
                                    src="/logo.png"
                                    alt="YAMDL Logo"
                                    className="mb-10"
                                    width={100}
                                    height={100}
                                />
                                <div className="textwidget">
                                    <p>
                                        YAMDL sua biblioteca digital para
                                        aprofundamento na Palavra de Deus.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="sidebar-widget widget_categories wow fadeInUp animated mb-30">
                                <div className="widget-header-2 position-relative mb-30">
                                    <h5 className="mt-5 mb-30">
                                        Links Rápidos
                                    </h5>
                                </div>
                                <ul className="font-small">
                                    <li className="cat-item">
                                        <Link href="/">Página Inicial</Link>
                                    </li>
                                    {/* <li className="cat-item">
                                        <Link href="/sobre-nos">Sobre</Link>
                                    </li> */}
                                    <li className="cat-item">
                                        <Link href="/artigos">Artigos</Link>
                                    </li>
                                    <li className="cat-item">
                                        <Link href="/series">Séries</Link>
                                    </li>
                                    {/* <li className="cat-item">
                                        <Link href="/categorias">
                                            Categorias
                                        </Link>
                                    </li> */}
                                    <li className="cat-item">
                                        <Link href="/contacto">Contacto</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="sidebar-widget widget_tagcloud wow fadeInUp animated mb-30">
                                <div className="widget-header-2 position-relative mb-30">
                                    <h5 className="mt-5 mb-30">Adicional</h5>
                                </div>
                                <div className="textwidget">
                                    <p>
                                        <strong className="color-black">
                                            Endereço
                                        </strong>
                                        : Av 24 Julho
                                        <br />
                                        Beira, Moçambique
                                    </p>
                                    <p>
                                        <strong>Email</strong>: info@yamdl.com
                                    </p>
                                    <p>
                                        <strong>Contactos:</strong> +258 84 123
                                        4567
                                    </p>
                                </div>
                                {/* <div className="tagcloud mt-50">
                                    <Link
                                        className="tag-cloud-link"
                                        href="/blog/tag/fe"
                                    >
                                        Fé e Amor
                                    </Link>
                                    <Link
                                        className="tag-cloud-link"
                                        href="/blog/tag/salvacao"
                                    >
                                        Salvação
                                    </Link>
                                    <Link
                                        className="tag-cloud-link"
                                        href="/blog/tag/esperanca"
                                    >
                                        Esperança
                                    </Link>
                                    <Link
                                        className="tag-cloud-link"
                                        href="/blog/tag/igreja"
                                    >
                                        Igreja
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <NewsletterWidget />
                        </div>
                    </div>
                    <div className="footer-copy-right wow fadeInUp animated mt-20 pt-30">
                        <p className="float-md-left font-small text-muted">
                            © 2025, YAM DL - Yuvi Matique Digital Library{' '}
                        </p>
                        <p className="float-md-right font-small text-muted">
                            Desenvolvido com amor por{' '}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Yuvi Matique
                            </a>
                        </p>
                    </div>
                </div>
            </footer>

            <div className="dark-mark"></div>
            <TemplateScripts />
        </>
    );
}
