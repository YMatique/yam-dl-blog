<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Article;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewArticlePublished;

class SendArticleNewsletter implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Article $article
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Prevent double sending
        if ($this->article->newsletter_sent_at) {
            return;
        }

        $subscribers = Subscriber::active()->verified()->get();

        foreach ($subscribers as $subscriber) {
            Mail::to($subscriber->email)->send(new NewArticlePublished($this->article, $subscriber));
        }

        $this->article->update([
            'newsletter_sent_at' => now()
        ]);
    }
}
