import DefaultPageHeader from '@/components/blog/breadcrumb';
import InfoCard from '@/components/blog/info-card';
import BlogLayout from '@/layouts/blog-layout';

// Mock de testemunhos (depois virá do backend)
const testimonials = [
    {
        id: 1,
        name: 'João Silva',
        role: 'Pastor',
        avatar: '/stories/assets/imgs/authors/author.jpg',
        content:
            'A YAMDL tem sido uma bênção para o meu ministério. Os estudos são profundos e práticos, ajudando-me a preparar mensagens que realmente transformam vidas.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Maria Santos',
        role: 'Líder de Célula',
        avatar: '/stories/assets/imgs/authors/author-2.jpg',
        content:
            'Os recursos disponibilizados são de altíssima qualidade. Tenho crescido muito espiritualmente através dos artigos e séries de estudos.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Pedro Costa',
        role: 'Estudante de Teologia',
        avatar: '/stories/assets/imgs/authors/author-3.jpg',
        content:
            'Como estudante de teologia, encontrei na YAMDL uma fonte confiável de conhecimento bíblico. Recomendo a todos que desejam aprofundar sua fé.',
        rating: 5,
    },
];

export default function About() {
    return (
        <BlogLayout
            title="Sobre Nós - YAMDL"
            description="Conheça a YAMDL, sua biblioteca digital de estudos bíblicos e recursos cristãos. Nossa missão, visão e valores."
            keywords={[
                'sobre',
                'yamdl',
                'missão',
                'visão',
                'valores',
                'yuvi matique',
            ]}
        >
            <DefaultPageHeader title="Sobre Nós" />

            <div className="container">
                {/* Introdução */}
                {/* <div className="hot-tags font-small align-self-center pt-30 pb-30">
                    <div className="widget-header-3">
                        <div className="row align-self-center">
                            <div className="col-12">
                                <h2 className="widget-title mb-30">
                                    Bem-vindo à YAMDL
                                </h2>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Quem Somos */}
                <div className="row mb-50 pt-30 pb-30">
                    <div className="col-lg-7">
                        <h3 className="font-weight-900 mb-30">Quem Somos</h3>
                        <p className="font-large mb-20">
                            <strong>YAM DL</strong> (Yuvi Albino Matique -
                            Digital Library) é uma plataforma dedicada a
                            fornecer recursos digitais de alta qualidade para o
                            crescimento e edificação espiritual.
                        </p>
                        <p className="mb-20">
                            Nossa missão é disponibilizar estudos bíblicos
                            aprofundados, artigos teológicos e ferramentas
                            práticas para uma jornada cristã empolgante.
                            Acreditamos no poder da Palavra para transformar
                            vidas e trabalhamos com paixão, buscando a
                            excelência em cada recurso que oferecemos.
                        </p>
                        <p>
                            Seja você um pastor, líder de célula, estudante de
                            teologia ou simplesmente alguém que deseja crescer
                            na fé, a YAMDL é o lugar certo para encontrar
                            conteúdo de qualidade.
                        </p>
                    </div>
                    <div className="col-lg-5">
                        <div className="border-radius-10 overflow-hidden">
                            <img
                                src="/stories/assets/imgs/authors/author.jpg"
                                alt="YAMDL"
                                className=""
                            />
                        </div>
                    </div>
                </div>

                {/* Missão, Visão e Valores */}
                <div className="row mb-50">
                    <div className="col-12 mb-30 pt-30 pb-30">
                        <h3 className="font-weight-900 text-center">
                            Nossa Essência
                        </h3>
                    </div>

                    {/* Missão */}
                    <div className="col-md-4 col-sm-6 col-12">
                        <InfoCard
                            icon="icon_compass"
                            title="Missão"
                            description="Disponibilizar recursos digitais de alta qualidade que promovam o crescimento espiritual e o aprofundamento no conhecimento da Palavra de Deus."
                            color="primary"
                        />
                    </div>

                    {/* Visão */}
                    <div className="col-md-4 col-sm-6 col-12">
                        <InfoCard
                            icon="icon_lightbulb_alt"
                            title="Visão"
                            description="Ser a principal referência em recursos digitais cristãos na língua portuguesa, impactando milhares de vidas através do ensino bíblico sólido."
                            color="success"
                        />
                    </div>

                    {/* Valores */}
                    <div className="col-md-4 col-sm-6 col-12">
                        <InfoCard
                            icon="icon_heart_alt"
                            title="Valores"
                            description="Fidelidade bíblica, excelência no conteúdo, acessibilidade para todos, compromisso com a verdade e amor pela igreja de Cristo."
                            color="warning"
                        />
                    </div>
                </div>
            </div>

            {/* Fundador */}
            <div className="row border-radius-10 mb-50 bg-white pt-50 pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-30">
                            <h3 className="font-weight-900">Fundador</h3>
                        </div>

                        <div className="col-md-5 mb-30">
                            <div className="border-radius-50 overflow-hidden">
                                <img
                                    src="/stories/assets/imgs/authors/author.jpg"
                                    alt="Yuvi Albino Matique"
                                    className="w-50"
                                />
                            </div>
                        </div>

                        <div className="col-md-7">
                            <h4 className="font-weight-900 mb-20">
                                Yuvi Albino Matique
                            </h4>

                            <p className="mb-20 font-medium">
                                Servo de Deus, apaixonado pela Palavra e pela
                                tecnologia. Fundador da YAMDL, dedica-se a criar
                                recursos que edificam e transformam vidas
                                através do ensino bíblico.
                            </p>

                            <p className="mb-30">
                                Com formação em teologia e experiência em
                                desenvolvimento web, Yuvi combina conhecimento
                                bíblico com habilidades tecnológicas para tornar
                                o estudo da Palavra acessível a todos.
                            </p>

                            {/* Redes Sociais */}
                            <div className="author-social">
                                <h6 className="font-weight-700 mb-15">
                                    Conecte-se:
                                </h6>
                                <ul className="header-social-network d-inline-block list-inline">
                                    <li className="list-inline-item">
                                        <a
                                            className="social-icon fb"
                                            href="https://facebook.com/yuvimatique"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Facebook"
                                        >
                                            <i className="elegant-icon social_facebook"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            className="social-icon tw"
                                            href="https://twitter.com/yuvimatique"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Twitter"
                                        >
                                            <i className="elegant-icon social_twitter"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            className="social-icon ig"
                                            href="https://instagram.com/yuvimatique"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Instagram"
                                        >
                                            <i className="elegant-icon social_instagram"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            className="social-icon yt"
                                            href="https://youtube.com/@yuvimatique"
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
                </div>
            </div>

            <div className="row">
                <div className="container">
                    {/* Estatísticas */}
                    <div className="row mb-50 text-center">
                        <div className="col-md-3 col-sm-6 col-12 mb-30">
                            <div className="border-radius-10 hover-up bg-white p-30">
                                <h2 className="font-weight-900 mb-10 text-primary">
                                    500+
                                </h2>
                                <p className="text-muted">Artigos Publicados</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-30">
                            <div className="border-radius-10 hover-up bg-white p-30">
                                <h2 className="font-weight-900 text-success mb-10">
                                    50+
                                </h2>
                                <p className="text-muted">Séries Completas</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-30">
                            <div className="border-radius-10 hover-up bg-white p-30">
                                <h2 className="font-weight-900 text-warning mb-10">
                                    10k+
                                </h2>
                                <p className="text-muted">Leitores Mensais</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-30">
                            <div className="border-radius-10 hover-up bg-white p-30">
                                <h2 className="font-weight-900 text-info mb-10">
                                    20+
                                </h2>
                                <p className="text-muted">Categorias</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Testemunhos */}
            {/* <TestimonialCarousel testimonials={testimonials} /> */}
        </BlogLayout>
    );
}
