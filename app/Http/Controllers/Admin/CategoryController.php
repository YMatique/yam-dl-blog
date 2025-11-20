<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
     /**
     * Display a listing of categories
     */
    public function index(Request $request): Response
    {
        $query = Category::withCount('articles')->orderBy('order');

        // Busca
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $categories = $query->paginate(15)->withQueryString();

        return Inertia::render('admin/category/index', [
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new category
     */
    public function create(): Response
    {
        return Inertia::render('admin/categories/Create');
    }

    /**
     * Store a newly created category
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'color' => 'nullable|string|max:7',
            'order' => 'nullable|integer',
        ]);

        // Se não informou ordem, pega a próxima
        if (!isset($validated['order'])) {
            $validated['order'] = Category::max('order') + 1;
        }

        Category::create($validated);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Categoria criada com sucesso!');
    }

    /**
     * Show the form for editing
     */
    public function edit(Category $category): Response
    {
        $category->loadCount('articles');
        
        return Inertia::render('admin/categories/Edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified category
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug,' . $category->id,
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'color' => 'nullable|string|max:7',
            'order' => 'nullable|integer',
        ]);

        // Deletar imagem antiga se houver nova
        if ($validated['image'] && $validated['image'] !== $category->image) {
            $this->deleteImage($category->image);
        }

        if (empty($validated['image']) && $category->image) {
            $this->deleteImage($category->image);
        }

        $category->update($validated);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Categoria atualizada com sucesso!');
    }

    /**
     * Remove the specified category
     */
    public function destroy(Category $category)
    {
        if ($category->articles()->count() > 0) {
            return back()->withErrors([
                'error' => 'Não é possível deletar uma categoria com artigos.',
            ]);
        }

        if ($category->image) {
            $this->deleteImage($category->image);
        }

        $category->delete();

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Categoria deletada com sucesso!');
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
