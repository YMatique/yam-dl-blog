<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Series extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'cover_image',
        'is_complete',
        'total_articles'
    ];

    protected $casts = [
        'is_complete' => 'boolean',
        'total_articles' => 'integer'
    ];

    // Relationships
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class)->orderBy('series_order');
    }

    // Scopes
    public function scopeComplete($query)
    {
        return $query->where('is_complete', true);
    }

    public function scopeIncomplete($query)
    {
        return $query->where('is_complete', false);
    }

    // Accessors
    public function getProgressAttribute(): int
    {
        if ($this->total_articles === 0) {
            return 0;
        }
        
        $publishedCount = $this->articles()->published()->count();
        return round(($publishedCount / $this->total_articles) * 100);
    }

    // Methods
    public function getUrl(): string
    {
        return route('series.show', $this->slug);
    }

    public function getNextArticle(Article $currentArticle): ?Article
    {
        return $this->articles()
            ->published()
            ->where('series_order', '>', $currentArticle->series_order)
            ->first();
    }

    public function getPreviousArticle(Article $currentArticle): ?Article
    {
        return $this->articles()
            ->published()
            ->where('series_order', '<', $currentArticle->series_order)
            ->orderBy('series_order', 'desc')
            ->first();
    }
}
