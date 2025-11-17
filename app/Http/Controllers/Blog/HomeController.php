<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
   public function __invoke()
    {
         $articles = Article::with(['author', 'category'])
        ->published()
        ->latest('published_at')
        ->paginate(12);

    $featuredPosts = Article::with(['author', 'category'])
        ->published()
        ->orderBy('views_count', 'desc')
        ->take(5)
        ->get();

    $categories = Category::orderBy('order')->get();
    
    $popularTags = Tag::take(10)->get();

    return Inertia::render('blog/home', [
        'articles' => $articles,
        'featuredPosts' => $featuredPosts,
        'categories' => $categories,
        'popularTags' => $popularTags,
    ]);
    } 
}
