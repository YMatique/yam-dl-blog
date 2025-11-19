<?php

use App\Http\Controllers\Admin\UploadController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->middleware(['auth'])
    ->group(function () {
        
        // Upload de imagem
        Route::post('/upload/image', [UploadController::class, 'uploadImage'])
            ->name('admin.upload.image');
        
        // Upload de arquivo genérico
        Route::post('/upload/file', [UploadController::class, 'uploadFile'])
            ->name('admin.upload.file');
        
        // Deletar imagem
        Route::delete('/upload/image', [UploadController::class, 'deleteImage'])
            ->name('admin.upload.delete');
    });
