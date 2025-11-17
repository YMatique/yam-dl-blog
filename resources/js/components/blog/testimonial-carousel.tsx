import React from 'react';

interface Testimonial {
    id: number;
    name: string;
    role?: string;
    avatar?: string;
    content: string;
    rating?: number;
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

/**
 * Carousel de testemunhos
 */
const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
    testimonials,
}) => {
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <div className="testimonial-carousel bg-grey row pt-50 pb-50">
            <div className="container">
                <div className="row mb-30">
                    <div className="col-12 text-center">
                        <h3 className="font-weight-900 mb-20">Testemunhos</h3>
                        <p className="text-muted">
                            O que os leitores dizem sobre nós
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="carausel-post-1 hover-up border-radius-10 position-relative wow fadeInUp animated overflow-hidden transition-normal">
                            <div className="arrow-cover"></div>
                            <div className="slide-fade testimonial-slides">
                                {testimonials.map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="testimonial-slide p-50"
                                    >
                                        <div className="testimonial-content border-radius-10 bg-white p-40 text-center">
                                            {/* Avatar */}
                                            {testimonial.avatar && (
                                                <div className="testimonial-avatar mb-20">
                                                    <img
                                                        src={testimonial.avatar}
                                                        alt={testimonial.name}
                                                        className="rounded-circle"
                                                        style={{
                                                            width: '80px',
                                                            height: '80px',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {/* Rating (se houver) */}
                                            {testimonial.rating && (
                                                <div className="testimonial-rating mb-15">
                                                    {[...Array(5)].map(
                                                        (_, index) => (
                                                            <i
                                                                key={index}
                                                                className={`elegant-icon ${
                                                                    index <
                                                                    testimonial.rating
                                                                        ? 'icon_star'
                                                                        : 'icon_star_alt'
                                                                } text-warning`}
                                                            ></i>
                                                        ),
                                                    )}
                                                </div>
                                            )}

                                            {/* Conteúdo */}
                                            <p className="font-large mb-30 font-medium text-muted">
                                                "{testimonial.content}"
                                            </p>

                                            {/* Nome e Role */}
                                            <h5 className="font-weight-900 mb-5">
                                                {testimonial.name}
                                            </h5>
                                            {testimonial.role && (
                                                <p className="font-small text-muted">
                                                    {testimonial.role}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCarousel;
