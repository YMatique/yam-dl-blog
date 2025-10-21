<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug'
    ];

    // Relationships
    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class)->withTimestamps();
    }

    // Accessors
    public function getArticlesCountAttribute(): int
    {
        return $this->articles()->published()->count();
    }

    // Methods
    public function getUrl(): string
    {
        return route('tags.show', $this->slug);
    }
}
