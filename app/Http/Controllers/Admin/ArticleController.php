<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles
     * GET /admin/articles
     */
    public function index(Request $request): Response
    {
        $query = Article::with(['category', 'author'])
            ->latest();

        // Busca
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        // Filtro por status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filtro por categoria
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // Paginação
        $articles = $query->paginate(15)->withQueryString();

        // Categorias para o filtro
        $categories = Category::orderBy('name')->get();

        return Inertia::render('admin/articles/index', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'category' => $request->category,
            ],
        ]);
    }

    /**
     * Show the form for creating a new article
     * GET /admin/articles/create
     */
    public function create(): Response
    {
        $categories = Category::orderBy('name')->get();
        
        return Inertia::render('admin/articles/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created article
     * POST /admin/articles
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:articles,slug',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'series_id' => 'nullable|exists:series,id',
            'status' => 'required|in:draft,published,scheduled',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
        ]);

        $validated['author_id'] = auth()->id();

        $article = Article::create($validated);

        // Sync tags if provided
        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        }

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Artigo criado com sucesso!');
    }

    /**
     * Show the form for editing the specified article
     * GET /admin/articles/{id}/edit
     */
    public function edit(Article $article): Response
    {
        $article->load(['category', 'series', 'tags']);
        
        $categories = Category::orderBy('name')->get();
        
        return Inertia::render('admin/articles/Edit', [
            'article' => $article,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified article
     * PUT /admin/articles/{id}
     */
    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:articles,slug,' . $article->id,
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'series_id' => 'nullable|exists:series,id',
            'status' => 'required|in:draft,published,scheduled',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
        ]);

        $article->update($validated);

        // Sync tags if provided
        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        }

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Artigo atualizado com sucesso!');
    }

    /**
     * Remove the specified article
     * DELETE /admin/articles/{id}
     */
    public function destroy(Article $article)
    {
        // Deletar imagem se existir
        if ($article->featured_image) {
            // Extract path from URL
            $path = str_replace('/storage/', '', parse_url($article->featured_image, PHP_URL_PATH));
            Storage::disk('public')->delete($path);
        }

        $article->delete();

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Artigo deletado com sucesso!');
    }
}
