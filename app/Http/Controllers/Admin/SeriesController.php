<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Series;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class SeriesController extends Controller
{
    /**
     * Display a listing of series
     */
    public function index(Request $request): Response
    {
        $query = Series::withCount('articles')->latest();

        // Busca
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filtro por status
        if ($request->filled('status')) {
            if ($request->status === 'complete') {
                $query->where('is_complete', true);
            } elseif ($request->status === 'incomplete') {
                $query->where('is_complete', false);
            }
        }

        $series = $query->paginate(15)->withQueryString();

        return Inertia::render('admin/series/index', [
            'series' => $series,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new series
     */
    public function create(): Response
    {
        return Inertia::render('admin/series/create');
    }

    /**
     * Store a newly created series
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:series,slug',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string',
            'is_complete' => 'boolean',
        ]);

        Series::create($validated);

        return redirect()
            ->route('admin.series.index')
            ->with('success', 'Série criada com sucesso!');
    }

    /**
     * Show the form for editing
     */
    public function edit(Series $series): Response
    {
        $series->loadCount('articles');
        
        return Inertia::render('admin/series/edit', [
            'series' => $series,
        ]);
    }

    /**
     * Update the specified series
     */
    public function update(Request $request, Series $series)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:series,slug,' . $series->id,
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string',
            'is_complete' => 'boolean',
        ]);

        // Deletar imagem antiga se houver nova
        if ($validated['cover_image'] && $validated['cover_image'] !== $series->cover_image) {
            $this->deleteImage($series->cover_image);
        }

        if (empty($validated['cover_image']) && $series->cover_image) {
            $this->deleteImage($series->cover_image);
        }

        $series->update($validated);

        return redirect()
            ->route('admin.series.index')
            ->with('success', 'Série atualizada com sucesso!');
    }

    /**
     * Remove the specified series
     */
    public function destroy(Series $series)
    {
        if ($series->articles()->count() > 0) {
            return back()->withErrors([
                'error' => 'Não é possível deletar uma série com artigos.',
            ]);
        }

        if ($series->cover_image) {
            $this->deleteImage($series->cover_image);
        }

        $series->delete();

        return redirect()
            ->route('admin.series.index')
            ->with('success', 'Série deletada com sucesso!');
    }

    private function deleteImage(?string $imageUrl): void
    {
        if (!$imageUrl) return;

        try {
            $path = str_replace('/storage/', '', parse_url($imageUrl, PHP_URL_PATH));
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        } catch (\Exception $e) {
            \Log::error('Erro ao deletar imagem: ' . $e->getMessage());
        }
    }



     /**
     * Get articles for series management
     * GET /admin/series/{id}/articles
     */
    public function getArticles(Series $series): JsonResponse
    {
        // Artigos da série (ordenados)
        $seriesArticles = $series->articles()
            ->orderBy('series_order')
            ->get(['id', 'title', 'status', 'series_order']);

        // Artigos disponíveis (sem série)
        $availableArticles = Article::whereNull('series_id')
            ->orWhere('series_id', $series->id)
            ->orderBy('title')
            ->get(['id', 'title', 'status']);

        return response()->json([
            'seriesArticles' => $seriesArticles,
            'availableArticles' => $availableArticles,
        ]);
    }

    /**
     * Add article to series
     * POST /admin/series/{id}/articles
     */
    public function addArticle(Request $request, Series $series): JsonResponse
    {
        $request->validate([
            'article_id' => 'required|exists:articles,id',
        ]);

        $article = Article::findOrFail($request->article_id);

        // Pegar a última ordem da série
        $maxOrder = $series->articles()->max('series_order') ?? 0;

        // Adicionar artigo à série
        $article->update([
            'series_id' => $series->id,
            'series_order' => $maxOrder + 1,
        ]);

        // Atualizar contagem
        $series->updateArticlesCount();

        return response()->json([
            'success' => true,
            'message' => 'Artigo adicionado à série',
            'article' => $article->only(['id', 'title', 'status', 'series_order']),
        ]);
    }

    /**
     * Remove article from series
     * DELETE /admin/series/{series}/articles/{article}
     */
    public function removeArticle(Series $series, Article $article): JsonResponse
    {
        if ($article->series_id !== $series->id) {
            return response()->json([
                'success' => false,
                'message' => 'Artigo não pertence a esta série',
            ], 400);
        }

        // Remover da série
        $article->update([
            'series_id' => null,
            'series_order' => null,
        ]);

        // Reordenar os artigos restantes
        $this->reorderSeriesArticles($series);

        // Atualizar contagem
        $series->updateArticlesCount();

        return response()->json([
            'success' => true,
            'message' => 'Artigo removido da série',
        ]);
    }

    /**
     * Update articles order
     * PUT /admin/series/{id}/articles/order
     */
    public function updateArticlesOrder(Request $request, Series $series): JsonResponse
    {
        $request->validate([
            'articles' => 'required|array',
            'articles.*.id' => 'required|exists:articles,id',
            'articles.*.order' => 'required|integer',
        ]);

        DB::beginTransaction();

        try {
            foreach ($request->articles as $articleData) {
                Article::where('id', $articleData['id'])
                    ->where('series_id', $series->id)
                    ->update(['series_order' => $articleData['order']]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Ordem atualizada com sucesso',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar ordem',
            ], 500);
        }
    }

    /**
     * Reordenar artigos da série após remoção
     */
    private function reorderSeriesArticles(Series $series): void
    {
        $articles = $series->articles()->orderBy('series_order')->get();

        foreach ($articles as $index => $article) {
            $article->update(['series_order' => $index + 1]);
        }
    }

    // private function deleteImage(?string $imageUrl): void
    // {
    //     if (!$imageUrl) return;

    //     try {
    //         $path = str_replace('/storage/', '', parse_url($imageUrl, PHP_URL_PATH));
    //         if (Storage::disk('public')->exists($path)) {
    //             Storage::disk('public')->delete($path);
    //         }
    //     } catch (\Exception $e) {
    //         \Log::error('Erro ao deletar imagem: ' . $e->getMessage());
    //     }
    // }
}
