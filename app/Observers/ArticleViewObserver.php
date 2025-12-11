<?php

namespace App\Observers;

use App\Models\Article;
use App\Models\ArticleView;

class ArticleViewObserver
{
    /**
     * Handle the ArticleView "created" event.
     */
    public function created(ArticleView $articleView): void
    {
        $article = $articleView->article;
        if ($article) {
            $article->increment('views_count');
        }
    }

    /**
     * Handle the ArticleView "deleted" event.
     */
    public function deleted(ArticleView $articleView): void
    {
        $article = $articleView->article;
        if ($article) {
            $article->decrement('views_count');
        }
    }
}
