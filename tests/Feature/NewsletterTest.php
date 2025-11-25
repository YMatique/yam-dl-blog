<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NewsletterTest extends TestCase
{
    use RefreshDatabase;

    public function test_newsletter_job_is_dispatched_when_article_is_published(): void
    {
        \Illuminate\Support\Facades\Queue::fake();

        $article = \App\Models\Article::factory()->create([
            'status' => 'draft',
            'published_at' => null,
        ]);

        $article->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        \Illuminate\Support\Facades\Queue::assertPushed(\App\Jobs\SendArticleNewsletter::class);
    }

    public function test_newsletter_job_is_not_dispatched_when_article_is_draft(): void
    {
        \Illuminate\Support\Facades\Queue::fake();

        \App\Models\Article::factory()->create([
            'status' => 'draft',
            'published_at' => null,
        ]);

        \Illuminate\Support\Facades\Queue::assertNotPushed(\App\Jobs\SendArticleNewsletter::class);
    }
}
