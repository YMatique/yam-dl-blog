<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\FeaturedItem;
use App\Models\Series;
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

    // Featured items
    $heroArticles = FeaturedItem::where('type', 'hero_article')
        ->orderBy('position')
        ->with('featuredable.category')
        ->take(3)
        ->get()
        ->map->featuredable;
        // dd($heroArticles);

    $featuredArticles = FeaturedItem::where('type', 'featured_article')
        ->orderBy('position')
        ->with('featuredable.category')
        ->take(2)
        ->get()
        ->map->featuredable;

    $featuredSeries = FeaturedItem::where('type', 'featured_series')
        ->orderBy('position')
        ->with('featuredable.articles')
        ->take(2)
        ->get()
        ->map->featuredable;


    $categories = Category::orderBy('order')->take(3)->get();
    
    $popularTags = Tag::take(10)->get();
    // $series = Series::take(2)->get();
    // $featuredSeriesOld = Series::with(['articles' => function ($query) {
    //             $query->published()->orderBy('series_order');
    //         }])
    //         ->orderBy('created_at', 'desc')
    //         ->take(2)
    //         ->get();
    return Inertia::render('blog/home', [
        'articles' => $articles,
        // 'featuredPosts' => $featuredPosts,
        'categories' => $categories,
        'popularTags' => $popularTags,
        // 'series' => $series,
         'featuredSeries' => $featuredSeries,
        // New featured items
        'heroArticles' => $heroArticles,
        'featuredArticles' => $featuredArticles,
        // 'featuredSeriesItems' => $featuredSeries,
    ]);
    } 
}
