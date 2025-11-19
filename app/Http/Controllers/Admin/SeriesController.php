<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Series;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
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
            ->route('admin.series')
            ->with('success', 'Série criada com sucesso!');
    }

    /**
     * Show the form for editing
     */
    public function edit(Series $series): Response
    {
        $series->loadCount('articles');
        
        return Inertia::render('admin/series/Edit', [
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
}
