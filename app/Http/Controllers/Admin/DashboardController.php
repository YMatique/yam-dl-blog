<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\Series;
use App\Models\Subscriber;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
      public function index(): Response
    {
        // Stats principais
        $stats = [
            'articles' => [
                'total' => Article::count(),
                'published' => Article::where('status', 'published')->count(),
                'draft' => Article::where('status', 'draft')->count(),
                'views' => Article::sum('views_count'),
            ],
            'categories' => Category::count(),
            'series' => Series::count(),
            'subscribers' => [
                'total' => Subscriber::count(),
                'active' => Subscriber::active()->verified()->count(),
                'pending' => Subscriber::whereNull('verified_at')->count(),
            ],
        ];

        // Artigos recentes
        $recentArticles = Article::with(['author', 'category'])
            ->latest()
            ->take(5)
            ->get(['id', 'title', 'status', 'views_count', 'category_id', 'created_at']);

        // Artigos mais vistos (últimos 30 dias)
        $popularArticles = Article::with('category')
            ->where('created_at', '>=', now()->subDays(30))
            ->orderBy('views_count', 'desc')
            ->take(5)
            ->get(['id', 'title', 'views_count', 'category_id']);

        // Categorias com mais artigos
        $topCategories = Category::withCount('articles')
            ->having('articles_count', '>', 0)
            ->orderBy('articles_count', 'desc')
            ->take(5)
            ->get(['id', 'name', 'color']);

        // Crescimento de subscribers (últimos 7 dias)
        $subscribersGrowth = Subscriber::where('created_at', '>=', now()->subDays(7))
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Artigos publicados por mês (últimos 6 meses)
        $articlesPerMonth = Article::where('status', 'published')
            ->where('published_at', '>=', now()->subMonths(6))
            ->selectRaw('YEAR(published_at) as year, MONTH(published_at) as month, COUNT(*) as count')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                $date = \Carbon\Carbon::create($item->year, $item->month, 1);
                return [
                    'month' => $date->format('M'),
                    'count' => $item->count,
                ];
            });

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentArticles' => $recentArticles,
            'popularArticles' => $popularArticles,
            'topCategories' => $topCategories,
            'subscribersGrowth' => $subscribersGrowth,
            'articlesPerMonth' => $articlesPerMonth,
        ]);
    }
}
