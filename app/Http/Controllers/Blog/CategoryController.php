<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    //
    public function index()
    {
        $category = Category::get();

        return Inertia::render('blog/category',[
            'categories'=>$category
        ]);

    }
    public function show($slug)
    {
 // Buscar categoria
        $category = Category::where('slug', $slug)
            ->withCount(['articles' => function ($query) {
                $query->published();
            }])
            ->firstOrFail();

        // Artigos da categoria com paginação
        $articles = Article::with(['author', 'category', 'tags'])
            ->where('category_id', $category->id)
            ->published()
            ->latest('published_at')
            ->paginate(12);

        // Categorias relacionadas (mesma parent ou similares)
        $relatedCategories = Category::where('id', '!=', $category->id)
            ->withCount(['articles' => function ($query) {
                $query->published();
            }])
            ->orderBy('articles_count', 'desc')
            ->take(5)
            ->get();

        // Artigos populares desta categoria
        $popularArticles = Article::with(['author', 'category'])
            ->where('category_id', $category->id)
            ->published()
            ->orderBy('views_count', 'desc')
            ->take(5)
            ->get();
        return Inertia::render('blog/category-show',[
             'category' => $category,
            'articles' => $articles,
            'relatedCategories' => $relatedCategories,
            'popularArticles' => $popularArticles,
        ]);
    }
}
