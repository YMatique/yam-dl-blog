<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'author_id',
        'category_id',
        'series_id',
        'series_order',
        'status',
        'published_at',
        'reading_time',
        'views_count',
        'likes_count',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'newsletter_sent_at'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'newsletter_sent_at' => 'datetime',
        'series_order' => 'integer',
        'reading_time' => 'integer',
        'views_count' => 'integer',
        'likes_count' => 'integer'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->excerpt)) {
                $article->excerpt = Str::limit(strip_tags($article->content), 160);
            }
            
            if (empty($article->reading_time)) {
                $article->reading_time = ceil(str_word_count($article->content) / 200);
            }

            if (empty($article->meta_title)) {
                $article->meta_title = $article->title;
            }

            if (empty($article->meta_description)) {
                $article->meta_description = $article->excerpt;
            }
        });

        static::updating(function ($article) {
            // Recalcular tempo de leitura se o conteúdo mudou
            if ($article->isDirty('content')) {
                $article->reading_time = ceil(str_word_count($article->content) / 200);
            }

            // Atualizar excerpt se estiver vazio ou se o conteúdo mudou
            if (empty($article->excerpt) || $article->isDirty('content')) {
                $article->excerpt = Str::limit(strip_tags($article->content), 160);
            }
        });
        

        
        static::saved(function ($article) {
            if ($article->status === 'published' 
                && $article->published_at <= now() 
                && is_null($article->newsletter_sent_at)) {
                
                \App\Jobs\SendArticleNewsletter::dispatch($article);
            }
        });
    }

    // Featured items relationship
    public function featuredItems(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(FeaturedItem::class, 'featuredable');
    }
 public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function series(): BelongsTo
    {
        return $this->belongsTo(Series::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }

    public function views(): HasMany
    {
        return $this->hasMany(ArticleView::class);
    }

    // Scopes
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
                     ->where('published_at', '<=', now());
    }

    public function scopeDraft(Builder $query): Builder
    {
        return $query->where('status', 'draft');
    }

    public function scopeScheduled(Builder $query): Builder
    {
        return $query->where('status', 'scheduled')
                     ->where('published_at', '>', now());
    }

    public function scopeRecent(Builder $query): Builder
    {
        return $query->orderBy('published_at', 'desc');
    }

    public function scopePopular(Builder $query): Builder
    {
        return $query->orderBy('views_count', 'desc');
    }

    public function scopeInSeries(Builder $query, $seriesId): Builder
    {
        return $query->where('series_id', $seriesId)
                     ->orderBy('series_order');
    }

    // Accessors
    public function getIsPublishedAttribute(): bool
    {
        return $this->status === 'published' && $this->published_at <= now();
    }

    // Methods
    public function getUrl(): string
    {
        if ($this->series_id) {
            return route('series.article', [$this->series->slug, $this->slug]);
        }
        return route('articles.show', $this->slug);
    }

    public function recordView(string $ipAddress, ?string $userAgent = null, ?int $userId = null): void
    {
        $this->views()->create([
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'user_id' => $userId
        ]);

        $this->increment('views_count');
    }

    public function syncTags(array $tagIds): void
    {
        $this->tags()->sync($tagIds);
    }
}
