<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    /**
     * Display a listing of tags
     */
    public function index(Request $request): Response
    {
        $query = Tag::withCount('articles');

        // Busca
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $tags = $query->orderBy('name')->paginate(50)->withQueryString();

        return Inertia::render('admin/tags/index', [
            'tags' => $tags,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Store a newly created tag
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name',
            'slug' => 'nullable|string|unique:tags,slug',
        ]);

        $tag = Tag::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tag criada com sucesso!',
            'tag' => $tag->loadCount('articles'),
        ]);
    }

    /**
     * Update the specified tag
     */
    public function update(Request $request, Tag $tag): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,' . $tag->id,
            'slug' => 'nullable|string|unique:tags,slug,' . $tag->id,
        ]);

        $tag->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tag atualizada com sucesso!',
            'tag' => $tag->loadCount('articles'),
        ]);
    }

    /**
     * Remove the specified tag
     */
    public function destroy(Tag $tag): JsonResponse
    {
        if ($tag->articles()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Não é possível deletar uma tag com artigos.',
            ], 400);
        }

        $tag->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tag deletada com sucesso!',
        ]);
    }
}
