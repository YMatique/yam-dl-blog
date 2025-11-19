<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;


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
        'total_articles' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
        /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'progress',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Gera slug automaticamente ao criar
        static::creating(function ($series) {
            if (empty($series->slug)) {
                $series->slug = Str::slug($series->title);
            }
        });

        // Atualiza slug ao editar título
        static::updating(function ($series) {
            if ($series->isDirty('title') && empty($series->slug)) {
                $series->slug = Str::slug($series->title);
            }
        });
    }

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
       /**
     * Verifica se a série está completa
     */
    public function getIsFullyPublishedAttribute(): bool
    {
        if (!$this->total_articles) {
            return false;
        }

        $publishedCount = $this->articles()
            ->where('status', 'published')
            ->count();

        return $publishedCount >= $this->total_articles;
    }

    // Methods
    

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



     /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    /**
     * Scope para séries completas
     */
    // public function scopeComplete($query)
    // {
    //     return $query->where('is_complete', true);
    // }

    /**
     * Scope para séries em andamento
     */
    public function scopeInProgress($query)
    {
        return $query->where('is_complete', false);
    }

    /**
     * Scope para séries com artigos publicados
     */
    public function scopeWithPublishedArticles($query)
    {
        return $query->whereHas('articles', function ($q) {
            $q->where('status', 'published');
        });
    }

    /**
     * Scope para ordenar por popularidade (mais artigos)
     */
    public function scopePopular($query)
    {
        return $query->withCount(['articles' => function ($q) {
            $q->where('status', 'published');
        }])->orderByDesc('articles_count');
    }

    /*
    |--------------------------------------------------------------------------
    | HELPER METHODS
    |--------------------------------------------------------------------------
    */

    /**
     * Obtém o próximo número de ordem para artigos desta série
     */
    public function getNextArticleOrder(): int
    {
        return $this->articles()->max('series_order') + 1;
    }

    /**
     * Verifica se a série tem artigos
     */
    public function hasArticles(): bool
    {
        return $this->articles()->exists();
    }

    /**
     * Obtém a contagem de artigos publicados
     */
    public function getPublishedArticlesCount(): int
    {
        return $this->articles()->where('status', 'published')->count();
    }
}
