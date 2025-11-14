// import BlogLayout from '@/Layouts/BlogLayout';
import BlogLayout from '@/layouts/blog-layout';
export default function Post() {
    return (
        <BlogLayout title="The effect of livestock...">
            <div className="single-content container">
                <div className="entry-header entry-header-style-1 mb-50 pt-50">
                    <h1 className="entry-title font-weight-900 mb-50">
                        The effect of livestock on the physiological condition
                        of roe deer is modulated by habitat quality
                    </h1>
                </div>

                <figure className="image border-radius-10 m-auto mb-30 text-center">
                    <img
                        className="border-radius-10"
                        src="/stories/assets/imgs/news/news-1.jpg"
                        alt="post"
                    />
                </figure>

                <article className="entry-wraper mb-50">
                    <div className="excerpt mb-30">
                        <p>
                            Gosh jaguar ostrich quail one excited dear hello...
                        </p>
                    </div>
                </article>
            </div>
        </BlogLayout>
    );
}
