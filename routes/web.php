<?php

use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SeriesController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\SubscriberController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\FeaturedItemController;
use App\Http\Controllers\Admin\UserController;
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
Route::middleware(['auth', 'verified'])->prefix('scm')->name('admin.')
    ->group(function () {
        // Route::get('/', function () {
        //     return Inertia::render('admin/dashboard');
        // })->name('dashboard');
        Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');
        Route::resource('tags', TagController::class);
        Route::resource('articles', AdminArticleController::class);
        Route::resource('series',SeriesController::class);
        Route::resource('categories', AdminCategoryController::class);
        Route::resource('featured-items', FeaturedItemController::class)->except(['show', 'edit', 'create']);
        Route::post('featured-items/reorder', [FeaturedItemController::class, 'reorder'])->name('featured-items.reorder');
        Route::resource('users', UserController::class)->except(['show', 'create', 'edit']);
        Route::get('subscribers', [SubscriberController::class, 'index']);
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


        Route::get('/profile', [App\Http\Controllers\Admin\ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [App\Http\Controllers\Admin\ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [App\Http\Controllers\Admin\ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::post('settings', [SettingsController::class, 'update'])
            ->name('settings.update');
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

// Fortify 2FA Routes (Manually registered to replace Fortify::ignoreRoutes())
Route::group(['prefix' => 'yamdl-auth', 'middleware' => ['web']], function () {
    $guard = 'web';

    // Authentication...
    Route::get('/login', [\Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::class, 'create'])
        ->middleware(['guest:'.$guard])
        ->name('login');

    $limiter = config('fortify.limiters.login');

    Route::post('/login', [\Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::class, 'store'])
        ->middleware(array_filter([
            'guest:'.$guard,
            $limiter ? 'throttle:'.$limiter : null,
        ]))
        ->name('login.store');

    Route::post('/logout', [\Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    // Password Update...
    Route::put('/user/password', [\Laravel\Fortify\Http\Controllers\PasswordController::class, 'update'])
        ->middleware(['auth:'.$guard])
        ->name('user-password.update');

    // Password Confirmation...
    Route::get('/user/confirm-password', [\Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::class, 'show'])
        ->middleware(['auth:'.$guard])
        ->name('password.confirm');

    Route::post('/user/confirm-password', [\Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::class, 'store'])
        ->middleware(['auth:'.$guard])
        ->name('password.confirm.store');

    Route::get('/user/confirmed-password-status', [\Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::class, 'show'])
        ->middleware(['auth:'.$guard])
        ->name('password.confirmation');

    // Email Verification...
    Route::get('/email/verify', [\Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::class, '__invoke'])
        ->middleware(['auth:'.$guard])
        ->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', [\Laravel\Fortify\Http\Controllers\VerifyEmailController::class, '__invoke'])
        ->middleware(['auth:'.$guard, 'signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('/email/verification-notification', [\Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController::class, 'store'])
        ->middleware(['auth:'.$guard, 'throttle:6,1'])
        ->name('verification.send');

    // Two Factor Authentication...
    Route::middleware(['auth:'.$guard, 'password.confirm'])->group(function () {
        Route::get('/user/two-factor-qr-code', [\Laravel\Fortify\Http\Controllers\TwoFactorQrCodeController::class, 'show'])
            ->name('two-factor.qr-code');

        Route::get('/user/two-factor-secret-key', [\Laravel\Fortify\Http\Controllers\TwoFactorSecretKeyController::class, 'show'])
             ->name('two-factor.secret-key');

        Route::get('/user/two-factor-recovery-codes', [\Laravel\Fortify\Http\Controllers\RecoveryCodeController::class, 'index'])
            ->name('two-factor.recovery-codes');

        Route::post('/user/two-factor-recovery-codes', [\Laravel\Fortify\Http\Controllers\RecoveryCodeController::class, 'store'])
            ->name('two-factor.regenerate-recovery-codes');

        Route::post('/user/two-factor-authentication', [\Laravel\Fortify\Http\Controllers\TwoFactorAuthenticationController::class, 'store'])
            ->name('two-factor.enable');

        Route::delete('/user/two-factor-authentication', [\Laravel\Fortify\Http\Controllers\TwoFactorAuthenticationController::class, 'destroy'])
            ->name('two-factor.disable');

        Route::post('/user/confirmed-two-factor-authentication', [\Laravel\Fortify\Http\Controllers\ConfirmedTwoFactorAuthenticationController::class, 'store'])
            ->name('two-factor.confirm');
    });

    Route::middleware(['guest:'.$guard])->group(function () {
        Route::get('/two-factor-challenge', [\Laravel\Fortify\Http\Controllers\TwoFactorAuthenticatedSessionController::class, 'create'])
            ->name('two-factor.login');

        Route::post('/two-factor-challenge', [\Laravel\Fortify\Http\Controllers\TwoFactorAuthenticatedSessionController::class, 'store'])
            ->middleware(['throttle:two-factor'])
            ->name('two-factor.login.store');
    });
});
