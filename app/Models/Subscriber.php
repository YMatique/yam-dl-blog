<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subscriber extends Model
{
     use HasFactory;

    protected $fillable = [
        'email',
        'name',
        'preferences',
        'status',
        'confirmation_token',
        'verified_at',
        'unsubscribed_at',
        'unsubscribe_token'
    ];

    protected $casts = [
        'preferences' => 'array',
        'verified_at' => 'datetime',
        'unsubscribed_at' => 'datetime'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($subscriber) {
            $subscriber->confirmation_token = Str::random(32);
            $subscriber->unsubscribe_token = Str::random(32);
        });
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeVerified($query)
    {
        return $query->whereNotNull('verified_at');
    }

    // Methods
    public function verify(): void
    {
        $this->update([
            'status' => 'active',
            'verified_at' => now(),
            'confirmation_token' => null
        ]);
    }

    public function unsubscribe(): void
    {
        $this->update([
            'status' => 'unsubscribed',
            'unsubscribed_at' => now()
        ]);
    }

    public function getConfirmationUrl(): string
    {
        return route('newsletter.confirm', $this->confirmation_token);
    }

    public function getUnsubscribeUrl(): string
    {
        return route('newsletter.unsubscribe', $this->unsubscribe_token);
    }
}
