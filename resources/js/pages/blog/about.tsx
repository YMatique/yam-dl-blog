import DefaultPageHeader from '@/components/blog/breadcrumb';
import BlogLayout from '@/layouts/blog-layout';

export default function About() {
    return (
        <BlogLayout title="YAM DL - Sobre">
            <DefaultPageHeader title="Sobre nós" />
            <div className="container">
                <div className="hot-tags font-small align-self-center pt-30 pb-30">
                    <div className="widget-header-3">
                        <div className="row align-self-center">
                            <div className="col-md-4 align-self-center">
                                <h5 className="widget-title">Sobre nós</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-30">
                    <div className="col-lg-7">
                        <p>
                            YAM DL (Yuvi Albino Matique - Digital Library) é uma
                            plataforma dedicada a fornecer recursos digitais de
                            alta qualidade para o crescimento e edificação
                            espiritual. Nossa missão é disponibilizar estudos
                            bíblicos aprofundados, artigos teológicos e
                            ferramentas práticas para uma jornada cristã
                            empolgante. Acreditamos no poder da Palavra para
                            transformar vidas e trabalhamos com paixão, buscando
                            a excelência em cada recurso que oferecemos.
                        </p>
                    </div>
                    <div className="col-lg-5">
                        <img
                            src="stories/assets/imgs/authors/author.jpg"
                            alt=""
                        />
                    </div>
                </div>

                <div className="row mb-30">
                    <div className="col-md-4 col-sm-6 col-12">
                        Missão DEVE SER UM CARD COM ICONE CENTRALIZADO, TITULO
                        POR BAIXO DO ICONE, DESCRIÇÃO POR BAIXO.
                    </div>
                    <div className="col-md-4 col-sm-6 col-12">Visão</div>
                    <div className="col-md-4 col-sm-6 col-12">Valores</div>
                </div>

                <div className="row mb-30">
                    <div className="col-12">
                        FUNDADOR <br />
                    </div>
                    <div className="col-md-5">
                        <img
                            src="stories/assets/imgs/authors/author.jpg"
                            alt=""
                        />
                    </div>
                    <div className="col-md-7">
                        <h3>Yuvi Albino Matique</h3>
                        <p>Descrição .....</p>
                        <div>Links de redes sociais</div>
                    </div>
                </div>
            </div>

            <div className="row mb-30">
                testemunhos.... um carousel de testemunhos
            </div>
        </BlogLayout>
    );
}
