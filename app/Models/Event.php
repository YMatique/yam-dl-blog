<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'start_date',
        'end_date',
        'location',
        'is_online',
        'registration_link',
        'max_attendees',
        'current_attendees',
        'thumbnail',
        'status'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_online' => 'boolean',
        'max_attendees' => 'integer',
        'current_attendees' => 'integer'
    ];

    // Relationships
    public function registrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class);
    }

    // Scopes
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->published()
                     ->where('start_date', '>', now())
                     ->orderBy('start_date');
    }

    public function scopePast(Builder $query): Builder
    {
        return $query->published()
                     ->where('end_date', '<', now())
                     ->orderBy('start_date', 'desc');
    }

    public function scopeOngoing(Builder $query): Builder
    {
        return $query->published()
                     ->where('start_date', '<=', now())
                     ->where(function ($q) {
                         $q->whereNull('end_date')
                           ->orWhere('end_date', '>=', now());
                     });
    }

    // Accessors
    public function getIsFullAttribute(): bool
    {
        return $this->max_attendees && $this->current_attendees >= $this->max_attendees;
    }

    public function getAvailableSpotsAttribute(): ?int
    {
        if (!$this->max_attendees) {
            return null;
        }
        return max(0, $this->max_attendees - $this->current_attendees);
    }

    // Methods
    public function getUrl(): string
    {
        return route('events.show', $this->slug);
    }

    public function registerAttendee(array $data): EventRegistration
    {
        $registration = $this->registrations()->create($data);
        $this->increment('current_attendees');
        
        return $registration;
    }
}
