<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    //
    public function index(Request $request)
    {
          $query = Article::with(['author', 'category', 'tags'])
            ->published();

        // Filtro por categoria
        if ($request->has('category')) {
            $category = Category::where('slug', $request->category)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        // Filtro por tag
        if ($request->has('tag')) {
            $tag = Tag::where('slug', $request->tag)->first();
            if ($tag) {
                $query->whereHas('tags', function ($q) use ($tag) {
                    $q->where('tags.id', $tag->id);
                });
            }
        }

        // Busca por texto
        if ($request->has('search') && $request->search) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                    ->orWhere('excerpt', 'like', "%{$searchTerm}%")
                    ->orWhere('content', 'like', "%{$searchTerm}%");
            });
        }

        // Ordenação
        $sortBy = $request->get('sort', 'recent');
        switch ($sortBy) {
            case 'popular':
                $query->orderBy('views_count', 'desc');
                break;
            case 'oldest':
                $query->oldest('published_at');
                break;
            case 'az':
                $query->orderBy('title', 'asc');
                break;
            case 'za':
                $query->orderBy('title', 'desc');
                break;
            case 'recent':
            default:
                $query->latest('published_at');
        }

        // Paginação
        $articles = $query->paginate(12)->withQueryString();

        // Dados da sidebar
        $categories = Category::withCount(['articles' => function ($q) {
                $q->published();
            }])
            ->orderBy('order')
            ->get();

        $popularTags = Tag::withCount(['articles' => function ($q) {
                $q->published();
            }])
            ->orderBy('articles_count', 'desc')
            ->take(15)
            ->get();

        return Inertia::render('blog/articles', [
            'articles' => $articles,
            'categories' => $categories,
            'popularTags' => $popularTags,
            'filters' => [
                'category' => $request->category,
                'tag' => $request->tag,
                'search' => $request->search,
                'sort' => $sortBy,
            ],
        ]);

    }
    public function show($slug)
    {

    }
}
