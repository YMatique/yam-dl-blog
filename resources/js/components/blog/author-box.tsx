import { User } from '@/types/blog';
import { Link } from '@inertiajs/react';
import React from 'react';

interface AuthorBoxProps {
    author: User;
}

/**
 * Box com informações do autor
 */
const AuthorBox: React.FC<AuthorBoxProps> = ({ author }) => {
    return (
        <div className="author-bio border-radius-10 wow fadeIn animated mt-50 bg-white p-30">
            <div className="author-image mb-30">
                <Link href={`/autor/${author.id}`}>
                    {author.avatar ? (
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className="avatar"
                        />
                    ) : (
                        <img
                            src="/assets/imgs/authors/default.jpg"
                            alt={author.name}
                            className="avatar"
                        />
                    )}
                </Link>
            </div>
            <div className="author-info">
                <h4 className="font-weight-bold mb-20">
                    <span className="vcard author">
                        <span className="fn">
                            <Link
                                href={`#`}
                                title={`Postado por ${author.name}`}
                                rel="author"
                            >
                                {author.name}
                            </Link>
                        </span>
                    </span>
                </h4>
                <h5 className="text-muted">Sobre o autor</h5>
                <div className="author-description text-muted">
                    {author.bio ||
                        'Escritor, estudante da Palavra e apaixonado por compartilhar o conhecimento bíblico de forma clara e prática.'}
                </div>
                {/* <Link
                    href={`/autor/${author.id}`}
                    className="author-bio-link mb-md-0 mb-3"
                >
                    Ver todos os posts
                    {author.posts_count && ` (${author.posts_count})`}
                </Link> */}
                {/* {author.social_links && (
                    <div className="author-social">
                        <ul className="author-social-icons">
                            {author.social_links.facebook && (
                                <li className="author-social-link-facebook">
                                    <a
                                        href={author.social_links.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="ti-facebook"></i>
                                    </a>
                                </li>
                            )}
                            {author.social_links.twitter && (
                                <li className="author-social-link-twitter">
                                    <a
                                        href={author.social_links.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="ti-twitter-alt"></i>
                                    </a>
                                </li>
                            )}
                            {author.social_links.pinterest && (
                                <li className="author-social-link-pinterest">
                                    <a
                                        href={author.social_links.pinterest}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="ti-pinterest"></i>
                                    </a>
                                </li>
                            )}
                            {author.social_links.instagram && (
                                <li className="author-social-link-instagram">
                                    <a
                                        href={author.social_links.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="ti-instagram"></i>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default AuthorBox;
