<?php

use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SeriesController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\SubscriberController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\FeaturedItemController;
use App\Http\Controllers\Blog\ArticleController;
use App\Http\Controllers\Blog\CategoryController;
use App\Http\Controllers\Blog\ContactController;
use App\Http\Controllers\Blog\HomeController;
use App\Http\Controllers\Blog\NewsletterController;
use App\Http\Controllers\Blog\SerieController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', HomeController::class)->name('blog.home');
Route::get('/contacto', fn() => Inertia::render('blog/contact'))->name('contact');
Route::post('/contacto',[ContactController::class,'store'])->name('');
Route::get('/sobre-nos', fn() => Inertia::render('blog/about'))->name('about');
Route::get('/artigos',[ArticleController::class,'index'])->name('');
Route::get('/artigos/{slug}',[ArticleController::class,'show'])->name('');
Route::get('/series',[SerieController::class,'index'])->name('');
Route::get('/series/{slug}',[SerieController::class,'show'])->name('');
Route::get('/categorias',[CategoryController::class,'index'])->name('');
Route::get('/categoria/{slug}',[CategoryController::class,'show'])->name('');



// Subscrever ao newsletter
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe'])
    ->name('newsletter.subscribe');

// Confirmar subscrição
Route::get('/newsletter/confirm/{token}', [NewsletterController::class, 'confirm'])
    ->name('newsletter.confirm');

// Cancelar subscrição
Route::get('/newsletter/unsubscribe/{token}', [NewsletterController::class, 'unsubscribe'])
    ->name('newsletter.unsubscribe');

// Route::get('/post', fn() => Inertia::render('blog/post'))->name('post');
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });
Route::prefix('admin')->name('admin.')
    ->group(function () {
        // Route::get('/', function () {
        //     return Inertia::render('admin/dashboard');
        // })->name('dashboard');
        Route::get('/',[DashboardController::class,'index'])->name('dashboard');

        Route::resource('articles', AdminArticleController::class);
        Route::resource('series',SeriesController::class);
        Route::resource('categories', AdminCategoryController::class);
        Route::resource('featured-items', FeaturedItemController::class)->except(['show', 'edit', 'create']);
        Route::post('featured-items/reorder', [FeaturedItemController::class, 'reorder'])->name('featured-items.reorder');
        
        Route::delete('subscribers/{subscriber}', [SubscriberController::class, 'destroy'])
            ->name('subscribers.destroy');
        Route::get('settings',[SettingsController::class,'index'])->name('settings');
        Route::post('/admin/settings', [SettingsController::class, 'update'])
    ->name('settings.update');
        Route::get('subscribers/export', [SubscriberController::class, 'export'])
            ->name('subscribers.export');
        Route::get('series/{series}/articles', [SeriesController::class, 'getArticles'])
            ->name('series.articles');
        
        Route::post('series/{series}/articles', [SeriesController::class, 'addArticle'])
            ->name('series.articles.add');
        
        Route::delete('series/{series}/articles/{article}', [SeriesController::class, 'removeArticle'])
            ->name('series.articles.remove');
        
        Route::put('series/{series}/articles/order', [SeriesController::class, 'updateArticlesOrder'])
            ->name('series.articles.order');
    });

require __DIR__.'/upload-routes.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::get('/test-newsletter', function () {
    try {
        // Create dummy subscriber if not exists
        $subscriber = \App\Models\Subscriber::firstOrCreate(
            ['email' => 'test-newsletter@example.com'],
            [
                'name' => 'Test User',
                'status' => 'active',
                'verified_at' => now(),
            ]
        );

        // Create dummy article
        $article = \App\Models\Article::create([
            'title' => 'Test Article ' . rand(1000, 9999),
            'slug' => 'test-article-' . rand(1000, 9999),
            'content' => 'This is a test article content.',
            'excerpt' => 'Test excerpt',
            'status' => 'draft',
            'author_id' => \App\Models\User::first()->id,
            'category_id' => \App\Models\Category::first()->id,
        ]);

        // Update to published to trigger event
        $article->update([
            'status' => 'published',
            'published_at' => now(),
        ]);
        
        // Wait a bit if queue is async (though usually sync in dev unless configured otherwise)
        // sleep(1);

        // Reload article
        $article->refresh();

        return [
            'message' => 'Test executed',
            'article_id' => $article->id,
            'newsletter_sent_at' => $article->newsletter_sent_at,
            'subscriber_count' => \App\Models\Subscriber::active()->verified()->count(),
            'queue_connection' => config('queue.default'),
        ];
    } catch (\Exception $e) {
        return ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()];
    }
});
