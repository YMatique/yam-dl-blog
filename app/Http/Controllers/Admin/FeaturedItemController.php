<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FeaturedItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeaturedItemController extends Controller
{
    /**
     * Display a listing of the featured items.
     */
    public function index()
    {
        $items = FeaturedItem::with('featuredable')->orderBy('type')->orderBy('position')->get();
        // Load articles and series for autocomplete
        $articles = \App\Models\Article::where('status', 'published')->select('id', 'title')->orderBy('title')->get();
        $series = \App\Models\Series::select('id', 'title')->orderBy('title')->get();
        return Inertia::render('admin/featured-items', [
            'items' => $items,
            'articles' => $articles,
            'series' => $series,
        ]);
    }


    /**
     * Store a newly created featured item.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:hero_article,featured_article,featured_series',
            'featuredable_type' => 'required|string', // e.g., App\\Models\\Article or App\\Models\\Series
            'featuredable_id' => 'required|integer',
            'position' => 'required|integer',
        ]);
        // $validated['featuredable_type'] = $validated['type'] === 'hero_article' ? 'App\\Models\\Article' : 'App\\Models\\Series';

        FeaturedItem::create($validated);
        return redirect()->back();
    }

    /**
     * Update the specified featured item.
     */
    public function update(Request $request, FeaturedItem $featuredItem)
    {
        $validated = $request->validate([
            'type' => 'sometimes|in:hero_article,featured_article,featured_series',
            'featuredable_type' => 'sometimes|string',
            'featuredable_id' => 'sometimes|integer',
            'position' => 'sometimes|integer',
        ]);
        // $validated['featuredable_type'] = $validated['type'] === 'hero_article' ? 'App\\Models\\Article' : 'App\\Models\\Series';

        $featuredItem->update($validated);
        return redirect()->back();
    }

    /**
     * Remove the specified featured item.
     */
    public function destroy(FeaturedItem $featuredItem)
    {
        $featuredItem->delete();
        return redirect()->back();
    }

    /**
     * Reorder items of a given type.
     * Expected payload: [{id: 1, position: 0}, {id: 2, position: 1}, ...]
     */
    public function reorder(Request $request)
    {
        $items = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:featured_items,id',
            'items.*.position' => 'required|integer',
        ]);

        foreach ($items['items'] as $item) {
            FeaturedItem::where('id', $item['id'])->update(['position' => $item['position']]);
        }

        return response()->json(['status' => 'ok']);
    }
}
