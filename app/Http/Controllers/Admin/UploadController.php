<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Intervention\Image\Image;
// use Intervention\Image\Facades\Image;

class UploadController extends Controller
{
     /**
     * Upload de imagem
     * POST /admin/upload/image
     */
    public function uploadImage(Request $request): JsonResponse
    {
       try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB
            ]);

            $file = $request->file('image');
            
            // Gerar nome único
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            
            // Path para salvar
            $path = 'images/articles/' . date('Y/m');
            
            // Salvar no storage/public
            $filePath = $file->storeAs($path, $filename, 'public');
            
            // URL pública
            // $url = Storage::disk('public')->url($filePath);
            $url = asset('storage/' . $filePath);
            
            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => $filePath,
            ]);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Arquivo inválido',
                'errors' => $e->errors(),
            ], 422);
            
        } catch (\Exception $e) {
            \Log::error('Erro no upload: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Upload de arquivo genérico
     * POST /admin/upload/file
     */
    public function uploadFile(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB
        ]);

        try {
            $file = $request->file('file');
            
            // Gerar nome único
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            
            // Path para salvar
            $path = 'files/' . date('Y/m');
            
            // Salvar no storage
            $filePath = $file->storeAs($path, $filename, 'public');
            
            $url = Storage::disk('public')->url($filePath);
            
            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => $filePath,
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Erro ao fazer upload de arquivo: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Erro ao fazer upload do arquivo',
            ], 500);
        }
    }

    /**
     * Deletar imagem
     * DELETE /admin/upload/image
     */
    public function deleteImage(Request $request): JsonResponse
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        try {
            Storage::disk('public')->delete($request->path);
            
            return response()->json([
                'success' => true,
                'message' => 'Imagem deletada com sucesso',
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Erro ao deletar imagem: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Erro ao deletar imagem',
            ], 500);
        }
    }
}
