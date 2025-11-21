import NewsletterWidget from '@/components/blog/newsletter-widget';
import SEOHead from '@/components/blog/seo-head';
import TemplateScripts from '@/components/blog/template-scripts';
import { SEOProps } from '@/types/seo';
import { Link } from '@inertiajs/react';
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

            {/* OFFCANVAS SIDEBAR */}
            {/* <aside
                id="sidebar-wrapper"
                className="custom-scrollbar offcanvas-sidebar"
            >
                <button className="off-canvas-close">
                    <i className="elegant-icon icon_close"></i>
                </button>
                <div className="sidebar-inner">
                    <div className="sidebar-widget widget_categories mt-30 mb-50">
                        <div className="widget-header-2 position-relative">
                            <h5 className="mt-5 mb-15">Mais Populares</h5>
                        </div>
                        <div className="widget_nav_menu">
                            <ul>
                                <li className="cat-item cat-item-2">
                                    <Link href="/blog/categoria/dons-espirituais">
                                        Dons Espirituais
                                    </Link>
                                    <span className="post-count">30</span>
                                </li>
                                <li className="cat-item cat-item-3">
                                    <Link href="/blog/categoria/pensamentos">
                                        Pensamentos Soltos
                                    </Link>
                                    <span className="post-count">30</span>
                                </li>
                                <li className="cat-item cat-item-4">
                                    <Link href="/blog/categoria/profecia">
                                        Profecia
                                    </Link>
                                    <span className="post-count">30</span>
                                </li>
                                <li className="cat-item cat-item-5">
                                    <Link href="/blog/categoria/ministros">
                                        Ministros do Evangelho
                                    </Link>
                                    <span className="post-count">30</span>
                                </li>
                                <li className="cat-item cat-item-6">
                                    <Link href="/blog/categoria/seminarios">
                                        Seminários
                                    </Link>
                                    <span className="post-count">30</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="sidebar-widget widget-latest-posts mb-50">
                        <div className="widget-header-2 position-relative mb-30">
                            <h5 className="mt-5 mb-30">Não perca</h5>
                        </div>
                        <div className="post-block-list post-module-1 post-module-5">
                            <ul className="list-post">
                                <li className="mb-30">
                                    <div className="d-flex hover-up-2 transition-normal">
                                        <div className="post-thumb post-thumb-80 d-flex border-radius-5 img-hover-scale mr-15 overflow-hidden">
                                            <Link
                                                className="color-white"
                                                href="#"
                                            >
                                                <img
                                                    src="stories/assets/imgs/news/thumb-1.jpg"
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="post-content media-body">
                                            <h6 className="post-title text-limit-2-row mb-15 font-medium">
                                                <Link href="#">
                                                    The Life of a Travel Writer
                                                    with David Farley
                                                </Link>
                                            </h6>
                                            <div className="entry-meta meta-1 font-x-small text-uppercase float-left">
                                                <span className="post-on">
                                                    05 August
                                                </span>
                                                <span className="post-by has-dot">
                                                    300 views
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="mb-30">
                                    <div className="d-flex hover-up-2 transition-normal">
                                        <div className="post-thumb post-thumb-80 d-flex border-radius-5 img-hover-scale mr-15 overflow-hidden">
                                            <Link
                                                className="color-white"
                                                href="#"
                                            >
                                                <img
                                                    src="stories/assets/imgs/news/thumb-2.jpg"
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="post-content media-body">
                                            <h6 className="post-title text-limit-2-row mb-15 font-medium">
                                                <Link href="#">
                                                    Why Don't More Black
                                                    American Women Travel Solo?
                                                </Link>
                                            </h6>
                                            <div className="entry-meta meta-1 font-x-small text-uppercase float-left">
                                                <span className="post-on">
                                                    12 August
                                                </span>
                                                <span className="post-by has-dot">
                                                    23k views
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="mb-30">
                                    <div className="d-flex hover-up-2 transition-normal">
                                        <div className="post-thumb post-thumb-80 d-flex border-radius-5 img-hover-scale mr-15 overflow-hidden">
                                            <Link
                                                className="color-white"
                                                href="#"
                                            >
                                                <img
                                                    src="stories/assets/imgs/news/thumb-3.jpg"
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="post-content media-body">
                                            <h6 className="post-title text-limit-2-row mb-15 font-medium">
                                                <Link href="#">
                                                    The 22 Best Things to See
                                                    and Do in Bangkok
                                                </Link>
                                            </h6>
                                            <div className="entry-meta meta-1 font-x-small text-uppercase float-left">
                                                <span className="post-on">
                                                    27 August
                                                </span>
                                                <span className="post-by has-dot">
                                                    23k views
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside> */}

            {/* HEADER */}
            <header className="main-header header-style-1 font-heading">
                <div className="header-top">
                    <div className="container">
                        <div className="row pt-20 pb-20">
                            <div className="col-md-3 col-xs-6">
                                <Link href="/">
                                    <img
                                        className="logo"
                                        src="/stories/assets/imgs/theme/logo.png"
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
                                        <Link href="/">
                                            <i className="elegant-icon icon_house_alt mr-5"></i>{' '}
                                            Página Inicial
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/artigos">Artigos</Link>
                                    </li>
                                    <li>
                                        <Link href="/categorias">
                                            Categorias
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/series">Séries</Link>
                                    </li>
                                    <li>
                                        <Link href="/contacto">Contacto</Link>
                                    </li>
                                </ul>

                                {/* MOBILE MENU */}
                                <ul
                                    id="mobile-menu"
                                    className="d-block d-lg-none text-muted"
                                >
                                    <li>
                                        <Link href="/">
                                            <i className="elegant-icon icon_house_alt mr-5"></i>{' '}
                                            Página Inicial
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/artigos">Artigos</Link>
                                    </li>
                                    <li>
                                        <Link href="/categorias">
                                            Categorias
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/series">Séries</Link>
                                    </li>
                                    <li>
                                        <Link href="/contacto">Contacto</Link>
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
                                <div className="textwidget">
                                    <p>
                                        YAMDL sua biblioteca digital para
                                        aprofundamento bíblico.
                                    </p>
                                    <p>
                                        <strong className="color-black">
                                            Endereço
                                        </strong>
                                        <br />
                                        Av 24 Julho
                                        <br />
                                        Beira, Moçambique
                                    </p>
                                    <p>
                                        <strong className="color-black">
                                            Siga-me
                                        </strong>
                                        <br />
                                    </p>
                                    <ul className="header-social-network d-inline-block list-inline color-white mb-20">
                                        <li className="list-inline-item">
                                            <a
                                                className="fb"
                                                href="#"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Facebook"
                                            >
                                                <i className="elegant-icon social_facebook"></i>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a
                                                className="tw"
                                                href="#"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Tweet now"
                                            >
                                                <i className="elegant-icon social_twitter"></i>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a
                                                className="pt"
                                                href="#"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="YouTube"
                                            >
                                                <i className="elegant-icon social_youtube"></i>
                                            </a>
                                        </li>
                                    </ul>
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
                                    <li className="cat-item">
                                        <Link href="/sobre-nos">Sobre</Link>
                                    </li>
                                    <li className="cat-item">
                                        <Link href="/artigos">Artigos</Link>
                                    </li>
                                    <li className="cat-item">
                                        <Link href="/series">Séries</Link>
                                    </li>
                                    <li className="cat-item">
                                        <Link href="/categorias">
                                            Categorias
                                        </Link>
                                    </li>
                                    <li className="cat-item">
                                        <Link href="/contacto">Contacto</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="sidebar-widget widget_tagcloud wow fadeInUp animated mb-30">
                                <div className="widget-header-2 position-relative mb-30">
                                    <h5 className="mt-5 mb-30">Tags</h5>
                                </div>
                                <div className="tagcloud mt-50">
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
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            {/* <div className="sidebar-widget widget_newsletter wow fadeInUp animated mb-30">
                                <div className="widget-header-2 position-relative mb-30">
                                    <h5 className="mt-5 mb-30">Newsletter</h5>
                                </div>
                                <div className="newsletter">
                                    <p className="font-medium">
                                        Subscreva-se ao newsletter e receba
                                        notificações de novos artigos no seu
                                        email.
                                    </p>
                                    <form className="input-group form-subcriber d-flex mt-30">
                                        <input
                                            type="email"
                                            className="form-control font-small bg-white"
                                            placeholder="Seu email"
                                        />
                                        <button
                                            className="btn bg-primary text-white"
                                            type="submit"
                                        >
                                            Subscrever
                                        </button>
                                        <label className="mt-20">
                                            <input
                                                className="mr-5"
                                                name="terms"
                                                type="checkbox"
                                                value="1"
                                                required
                                            />{' '}
                                            Concordo com os termos e
                                            condições{' '}
                                        </label>
                                    </form>
                                </div>
                            </div> */}
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
