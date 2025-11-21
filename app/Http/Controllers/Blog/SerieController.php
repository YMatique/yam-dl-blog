<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Series;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SerieController extends Controller
{
    //
    public function index()
    {
        // Séries em destaque (2 mais recentes completas ou com mais artigos)
        $featuredSeries = Series::with(['articles' => function ($query) {
                $query->where('status', 'published')
                      ->orderBy('series_order', 'asc');
            }])
            ->withCount(['articles' => function ($query) {
                $query->where('status', 'published');
            }])
            ->where(function ($query) {
                // Prioriza séries completas
                $query->where('is_complete', true)
                      ->orWhereRaw('(SELECT COUNT(*) FROM articles WHERE articles.series_id = series.id AND articles.status = "published") >= 3');
            })
            ->orderByDesc('is_complete')
            ->orderByDesc('articles_count')
            ->having('articles_count', '>=', 1)
            ->take(2)
            ->get();

        // Todas as séries (para o grid)
        $allSeries = Series::with(['articles' => function ($query) {
                $query->where('status', 'published')
                      ->orderBy('series_order', 'asc');
            }])
            ->withCount(['articles' => function ($query) {
                $query->where('status', 'published');
            }])
            ->having('articles_count', '>=', 1)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('blog/series', [
            'featuredSeries' => $featuredSeries,
            'series' => $allSeries,
        ]);
    }
    public function show(string $slug)
    {
         // Busca a série com seus artigos publicados
        $series = Series::where('slug', $slug)
            ->with(['articles' => function ($query) {
                $query->where('status', 'published')
                      ->orderBy('series_order', 'asc')
                      ->with(['author', 'category']);
            }])
            ->withCount(['articles' => function ($query) {
                $query->where('status', 'published');
            }])
            ->firstOrFail();

        // Séries relacionadas (mesma categoria ou tags similares, excluindo a atual)
        $relatedSeries = Series::where('id', '!=', $series->id)
            ->with(['articles' => function ($query) {
                $query->where('status', 'published')
                      ->orderBy('series_order', 'asc');
            }])
            ->withCount(['articles' => function ($query) {
                $query->where('status', 'published');
            }])
            ->orderByDesc('articles_count')
            ->having('articles_count', '>=', 1)
            ->take(4)
            ->get();

        return Inertia::render('blog/serie-show', [
            'series' => $series,
            'relatedSeries' => $relatedSeries,
        ]);

    }
}
