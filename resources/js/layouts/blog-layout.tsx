import TemplateScripts from '@/components/blog/template-scripts';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

interface BlogLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function BlogLayout({
    children,
    title = 'Stories - Single post default',
}: BlogLayoutProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <title>{title}</title>
                <meta name="description" content="" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="shortcut icon"
                    type="image/x-icon"
                    href="/stories/assets/imgs/theme/favicon.png"
                />
                <link rel="stylesheet" href="/stories/assets/css/style.css" />
                <link rel="stylesheet" href="/stories/assets/css/widgets.css" />
                <link
                    rel="stylesheet"
                    href="/stories/assets/css/responsive.css"
                />
                <link rel="stylesheet" href="override.css" />
            </Head>

            <div className="scroll-progress primary-bg"></div>

            {/* OFFCANVAS SIDEBAR */}
            <aside
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
                                    <a href="#">Dons Espirituais</a>{' '}
                                    <span className="post-count">30</span>
                                </li>
                                <li className="cat-item cat-item-3">
                                    <a href="#">Pensamentos Soltos</a>{' '}
                                    <span className="post-count">30</span>
                                </li>
                                <li className="cat-item cat-item-4">
                                    <a href="#">Profecia</a>{' '}
                                    <span className="post-count">30</span>
                                </li>
                                <li className="cat-item cat-item-5">
                                    <a href="#">Ministros do Evangelho</a>{' '}
                                    <span className="post-count">30</span>
                                </li>
                                <li className="cat-item cat-item-6">
                                    <a href="#">Seminários</a>{' '}
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
                                            <a className="color-white" href="#">
                                                <img
                                                    src="stories/assets/imgs/news/thumb-1.jpg"
                                                    alt=""
                                                />
                                            </a>
                                        </div>
                                        <div className="post-content media-body">
                                            <h6 className="post-title text-limit-2-row mb-15 font-medium">
                                                <a href="#">
                                                    The Life of a Travel Writer
                                                    with David Farley
                                                </a>
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
                                            <a className="color-white" href="#">
                                                <img
                                                    src="stories/assets/imgs/news/thumb-2.jpg"
                                                    alt=""
                                                />
                                            </a>
                                        </div>
                                        <div className="post-content media-body">
                                            <h6 className="post-title text-limit-2-row mb-15 font-medium">
                                                <a href="#">
                                                    Why Don’t More Black
                                                    American Women Travel Solo?
                                                </a>
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
                                            <a className="color-white" href="#">
                                                <img
                                                    src="stories/assets/imgs/news/thumb-3.jpg"
                                                    alt=""
                                                />
                                            </a>
                                        </div>
                                        <div className="post-content media-body">
                                            <h6 className="post-title text-limit-2-row mb-15 font-medium">
                                                <a href="#">
                                                    The 22 Best Things to See
                                                    and Do in Bangkok
                                                </a>
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
            </aside>

            {/* HEADER */}
            <header className="main-header header-style-1 font-heading">
                <div className="header-top">
                    <div className="container">
                        <div className="row pt-20 pb-20">
                            <div className="col-md-3 col-xs-6">
                                <a href="index.html">
                                    <img
                                        className="logo"
                                        src="/stories/assets/imgs/theme/logo.png"
                                        alt=""
                                    />
                                </a>
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
                                    <li className="">
                                        <a href="">
                                            <i className="elegant-icon icon_house_alt mr-5"></i>{' '}
                                            Página Inicial
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">Artigos</a>
                                    </li>
                                    <li className="">
                                        <a href="">Categorias</a>
                                    </li>
                                    <li>
                                        <a href="">Séries</a>
                                    </li>
                                    <li>
                                        <a href="">Contacto</a>
                                    </li>
                                </ul>

                                {/* MOBILE MENU */}
                                <ul
                                    id="mobile-menu"
                                    className="d-block d-lg-none text-muted"
                                >
                                    <li className="">
                                        <a href="">
                                            <i className="elegant-icon icon_house_alt mr-5"></i>{' '}
                                            Página Inicial
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">Artigos</a>
                                    </li>
                                    <li className="">
                                        <a href="">Categorias</a>
                                    </li>
                                    <li>
                                        <a href="">Séries</a>
                                    </li>
                                    <li>
                                        <a href="">Contacto</a>
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
                                    >
                                        <i className="elegant-icon social_facebook"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        className="social-icon tw text-xs-center"
                                        target="_blank"
                                        href="#"
                                    >
                                        <i className="elegant-icon social_twitter"></i>
                                    </a>
                                </li>
                            </ul>
                            <div className="off-canvas-toggle-cover d-inline-block">
                                <div
                                    className="off-canvas-toggle d-inline-block hidden"
                                    id="off-canvas-toggle"
                                >
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="bg-grey pb-30">{children}</main>

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
                                                title="Pin it"
                                            >
                                                <i className="elegant-icon social_youtube"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Outros blocos do footer (Quick link, Tagcloud, Newsletter) */}
                        <div className="col-lg-2 col-md-6">
                            <div className="sidebar-widget widget_categories wow fadeInUp animated mb-30">
                                <div className="widget-header-2 position-relative mb-30">
                                    <h5 className="mt-5 mb-30">
                                        Links Rápidos
                                    </h5>
                                </div>
                                <ul className="font-small">
                                    <li className="cat-item cat-item-2">
                                        <a href="#">Página Inicial</a>
                                    </li>
                                    <li className="cat-item cat-item-4">
                                        <a href="#">Sobre</a>
                                    </li>
                                    <li className="cat-item cat-item-5">
                                        <a href="#">Artigos</a>
                                    </li>
                                    <li className="cat-item cat-item-6">
                                        <a href="#">Séries</a>
                                    </li>
                                    <li className="cat-item cat-item-7">
                                        <a href="#">Categorias</a>
                                    </li>
                                    <li className="cat-item cat-item-7">
                                        <a href="#">Contacto</a>
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
                                    <a className="tag-cloud-link" href="">
                                        Fé e Amor
                                    </a>
                                    <a className="tag-cloud-link" href="">
                                        Salvação
                                    </a>
                                    <a className="tag-cloud-link" href="">
                                        Esperança
                                    </a>
                                    <a className="tag-cloud-link" href="">
                                        Igreja
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="sidebar-widget widget_newsletter wow fadeInUp animated mb-30">
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
                                                name="name"
                                                type="checkbox"
                                                value="1"
                                                required
                                            />{' '}
                                            Concordo com os termos e
                                            condições{' '}
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copy-right wow fadeInUp animated mt-20 pt-30">
                        <p className="float-md-left font-small text-muted">
                            © 2025, YAM DL - Yuvi Matique Digital Library{' '}
                        </p>
                        <p className="float-md-right font-small text-muted">
                            Desenvolvido com amor por{' '}
                            <a href="#" target="_blank">
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
