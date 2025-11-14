import FeaturedSlider, { Post } from '@/components/blog/featured-slider';
import BlogLayout from '@/layouts/blog-layout';

const mockPosts: Post[] = [
    {
        id: 1,
        title: 'A Profundidade do Estudo de Gênesis 1: Criando a Criação',
        categories: [
            { name: 'Séries', style: 'text-info', link: '/series/genesis' },
            {
                name: 'Estudo Bíblico',
                style: 'text-warning',
                link: '/categorias/estudo',
            },
        ],
        date: '14 de Novembro de 2025',
        views: '1.5k Views',
        imageUrl: 'stories/assets/imgs/news/news-16.jpg',
        link: '/post/profundidade-genesis-1',
    },
    {
        id: 2,
        title: 'A Graça em Romanos: Experiências Transformadoras da Palavra',
        categories: [
            {
                name: 'Doutrina',
                style: 'text-info',
                link: '/categorias/doutrina',
            },
            {
                name: 'Experiências',
                style: 'text-warning',
                link: '/categorias/experiencias',
            },
        ],
        date: '05 de Novembro de 2025',
        views: '2.3k Views',
        imageUrl: 'stories/assets/imgs/news/news-17.jpg',
        link: '/post/graca-em-romanos',
    },
    {
        id: 3,
        title: 'Os Dons Espirituais: Capacidades Divinas para o Serviço Cristão',
        categories: [
            {
                name: 'Doutrina',
                style: 'text-info',
                link: '/categorias/doutrina',
            },
            {
                name: 'Experiências',
                style: 'text-warning',
                link: '/categorias/experiencias',
            },
        ],
        date: '05 de Novembro de 2025',
        views: '2.3k Views',
        imageUrl: 'stories/assets/imgs/news/news-17.jpg',
        link: '/post/graca-em-romanos',
    },
    // ... adicione o restante dos seus posts mockados aqui
];
export default function Home() {
    const featuredPosts: Post[] = mockPosts;
    return (
        <BlogLayout title="YAMDL - Yuvi Matique Digital Library">
            <div className="blog-home container pt-30">
                <FeaturedSlider posts={featuredPosts} />
            </div>
        </BlogLayout>
    );
}
