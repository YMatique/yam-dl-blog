<?php

use App\Http\Controllers\Blog\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', HomeController::class)->name('blog.home');
Route::get('/contact', fn() => Inertia::render('blog/contact'))->name('contact');
Route::get('/about', fn() => Inertiqa::render('blog/about'))->name('about');

Route::get('/post', fn() => Inertia::render('blog/post'))->name('post');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
