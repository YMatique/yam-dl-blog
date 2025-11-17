import BlogLayout from '@/layouts/blog-layout';

export default function Contact() {
    return (
        <BlogLayout title="YAM DL - Contactos">
            <div
                className="entry-header entry-header-style-2 mb-50 pt-80 pb-80 text-white"
                style={{
                    backgroundImage:
                        'url(stories/assets/imgs/news/news-17.jpg)',
                }}
            >
                <div className="entry-header-content container">
                    <h1 className="entry-title font-weight-900 mb-50">
                        Contactos
                    </h1>
                </div>
            </div>
        </BlogLayout>
    );
}
