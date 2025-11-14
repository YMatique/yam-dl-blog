<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Category;
use App\Models\Series;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Str;

class BlogGospelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Usuário Admin (ou crie um real)
        $author = User::first() ?? User::factory()->create([
            'name' => 'Irmão Yuvi Matique',
            'email' => 'yuvimatique@email.com',
        ]);

        // === CATEGORIAS ===
        $estudos = Category::create([
            'name' => 'Estudos Bíblicos',
            'slug' => 'estudos-biblicos',
            'description' => 'Aprofundamento nas Escrituras Sagradas',
            'order' => 1,
        ]);

        $devocional = Category::create([
            'name' => 'Devocional Diário',
            'slug' => 'devocional',
            'description' => 'Reflexões diárias para sua caminhada com Deus',
            'order' => 2,
        ]);

        $vidaCrista = Category::create([
            'name' => 'Vida Cristã',
            'slug' => 'vida-crista',
            'description' => 'Crescimento espiritual e testemunhos',
            'order' => 3,
        ]);

        // Subcategorias
        Category::create([
            'name' => 'Antigo Testamento',
            'slug' => 'antigo-testamento',
            'parent_id' => $estudos->id,
            'order' => 1,
        ]);

        Category::create([
            'name' => 'Novo Testamento',
            'slug' => 'novo-testamento',
            'parent_id' => $estudos->id,
            'order' => 2,
        ]);

        Category::create([
            'name' => 'Oração e Jejum',
            'slug' => 'oracao-e-jejum',
            'parent_id' => $vidaCrista->id,
            'order' => 1,
        ]);

        // === TAGS ===
        Tag::insert([
            ['name' => 'Fé', 'slug' => 'fe'],
            ['name' => 'Oração', 'slug' => 'oracao'],
            ['name' => 'Graça', 'slug' => 'graca'],
            ['name' => 'Salvação', 'slug' => 'salvacao'],
            ['name' => 'Testemunho', 'slug' => 'testemunho'],
        ]);

        $tagIds = Tag::pluck('id')->toArray();

        // === SÉRIES ===
        $serieRomanos = Series::create([
            'title' => 'Romanos: A Justiça de Deus',
            'slug' => 'romanos-justica-de-deus',
            'description' => 'Estudo profundo da carta aos Romanos',
            'cover_image' => 'series/romanos.jpg',
            'total_articles' => 8,
            'is_complete' => false,
        ]);

        $serieOracao = Series::create([
            'title' => 'O Poder da Oração',
            'slug' => 'poder-da-oracao',
            'description' => '7 dias de ensino e prática sobre oração',
            'cover_image' => 'series/oracao.jpg',
            'total_articles' => 7,
            'is_complete' => true,
        ]);

        // === ARTIGOS ===
        $articles = [
            // Série: Romanos
            [
                'title' => 'Romanos 1: A Revelação da Ira de Deus',
                'content' => $this->getLongContent('romanos-ira'),
                'category_id' => $estudos->id,
                'series_id' => $serieRomanos->id,
                'series_order' => 1,
                'status' => 'published',
                'published_at' => now()->subDays(30),
                'featured_image' => 'articles/romanos-1.jpg',
            ],
            [
                'title' => 'Romanos 3: Justificados pela Fé',
                'content' => $this->getLongContent('romanos-fe'),
                'category_id' => $estudos->id,
                'series_id' => $serieRomanos->id,
                'series_order' => 2,
                'status' => 'published',
                'published_at' => now()->subDays(25),
                'featured_image' => 'articles/romanos-3.jpg',
            ],

            // Série: Oração
            [
                'title' => 'Dia 1: O Que é Oração?',
                'content' => $this->getLongContent('oracao-dia1'),
                'category_id' => $vidaCrista->id,
                'series_id' => $serieOracao->id,
                'series_order' => 1,
                'status' => 'published',
                'published_at' => now()->subDays(15),
                'featured_image' => 'articles/oracao-dia1.jpg',
            ],
            [
                'title' => 'Dia 7: Oração de Guerra Espiritual',
                'content' => $this->getLongContent('oracao-guerra'),
                'category_id' => $vidaCrista->id,
                'series_id' => $serieOracao->id,
                'series_order' => 7,
                'status' => 'published',
                'published_at' => now()->subDays(8),
                'featured_image' => 'articles/oracao-guerra.jpg',
            ],

            // Devocionais
            [
                'title' => 'Devocional: A Armadura de Deus (Efésios 6)',
                'content' => $this->getLongContent('armadura-de-deus'),
                'category_id' => $devocional->id,
                'status' => 'published',
                'published_at' => now()->subHours(5),
                'featured_image' => 'articles/armadura.jpg',
            ],
            [
                'title' => 'Como Ouvir a Voz de Deus Hoje',
                'content' => $this->getLongContent('voz-de-deus'),
                'category_id' => $devocional->id,
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'featured_image' => 'articles/voz-de-deus.jpg',
            ],

            // Artigos avulsos
            [
                'title' => 'Testemunho: Como Deus Me Libertou do Vício',
                'content' => $this->getLongContent('testemunho-libertacao'),
                'category_id' => $vidaCrista->id,
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'featured_image' => 'articles/testemunho.jpg',
            ],
            [
                'title' => 'O Que a Bíblia Diz Sobre o Dízimo?',
                'content' => $this->getLongContent('dizimo'),
                'category_id' => $estudos->id,
                'status' => 'published',
                'published_at' => now()->subDays(18),
                'featured_image' => 'articles/dizimo.jpg',
            ],
        ];

        foreach ($articles as $i => $data) {
            $data['author_id'] = $author->id;
            $data['slug'] = Str::slug($data['title']) . '-' . Str::random(3);

            $article = Article::create($data);

            // Tags aleatórias
            $article->tags()->attach(fake()->randomElements($tagIds, random_int(1, 3)));

            // Views simuladas
            $views = random_int(50, 800);
            $article->update(['views_count' => $views]);
        }

        // Artigos agendados (futuro)
        Article::create([
            'title' => 'Romanos 8: A Vida no Espírito (Em Breve)',
            'content' => $this->getLongContent('romanos-8'),
            'author_id' => $author->id,
            'category_id' => $estudos->id,
            'series_id' => $serieRomanos->id,
            'series_order' => 3,
            'status' => 'scheduled',
            'published_at' => now()->addDays(3),
            'slug' => 'romanos-8-vida-no-espirito-' . Str::random(3),
            'featured_image' => 'articles/romanos-8.jpg',
        ]);
    }

    private function getLongContent(string $theme): string
    {
        $contents = [
            'romanos-ira' => "<p>Paulo inicia sua carta aos Romanos com uma declaração poderosa sobre a ira de Deus contra toda impiedade...</p><p>A criação testifica do poder eterno de Deus, e ninguém tem desculpa...</p>",
            'romanos-fe' => "<p>Justificados gratuitamente pela graça, mediante a redenção que há em Cristo Jesus...</p><p>O justo viverá pela fé...</p>",
            'oracao-dia1' => "<p>Oração não é monólogo, é diálogo. É o filho falando com o Pai...</p><p>Jesus nos ensinou a orar: 'Pai Nosso'...</p>",
            'oracao-guerra' => "<p>Não lutamos contra carne e sangue, mas contra principados e potestades...</p><p>Use a espada do Espírito...</p>",
            'armadura-de-deus' => "<p>Revesti-vos de toda a armadura de Deus...</p><p>Cinto da verdade, couraça da justiça...</p>",
            'voz-de-deus' => "<p>Minhas ovelhas ouvem a minha voz...</p><p>Como discernir a voz de Deus na correria do dia a dia...</p>",
            'testemunho-libertacao' => "<p>Eu era escravo do vício, mas Jesus me libertou...</p><p>Hoje vivo para glorificar Seu nome...</p>",
            'dizimo' => "<p>Trazei todos os dízimos à casa do tesouro...</p><p>Dízimo é reconhecimento de que tudo é de Deus...</p>",
            'romanos-8' => "<p>Nenhuma condenação há para os que estão em Cristo Jesus...</p><p>Todas as coisas cooperam para o bem...</p>",
        ];

        $base = $contents[$theme] ?? $contents['romanos-ira'];

        // Adiciona parágrafos extras
        $extra = '';
        for ($i = 0; $i < 5; $i++) {
            $extra .= "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>";
        }

        return $base . $extra;
    }
}
