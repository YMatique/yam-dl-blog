<?php

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
Route::prefix('admin')
    ->group(function () {
        Route::get('/', function () {
            return Inertia::render('admin/dashboard');
        })->name('admin.dashboard');
    });
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
