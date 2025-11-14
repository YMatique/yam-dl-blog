import BlogLayout from '@/layouts/blog-layout';

export default function Home() {
    return (
        <BlogLayout title="YAMDL - Yuvi Matique Digital Library">
            <div className="blog-home container">
                <h1 className="entry-title font-weight-900 mb-50 pt-50">
                    Welcome to the Blog Home Page
                </h1>
            </div>
        </BlogLayout>
    );
}
