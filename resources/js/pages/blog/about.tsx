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
            </div>
        </BlogLayout>
    );
}
