<?php

use App\Http\Controllers\Blog\CategoryController;
use App\Http\Controllers\Blog\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', HomeController::class)->name('blog.home');
Route::get('/contacto', fn() => Inertia::render('blog/contact'))->name('contact');
Route::get('/about', fn() => Inertia::render('blog/about'))->name('about');
Route::get('/artigos',fn()=>Inertia::render('blog/articles'))->name('');
Route::get('/series',fn()=>Inertia::render('blog/series'))->name('');
Route::get('/categorias',[CategoryController::class,'index'])->name('');
Route::get('/categorias/{slug}',[CategoryController::class,'index'])->name('');

Route::get('/post', fn() => Inertia::render('blog/post'))->name('post');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
