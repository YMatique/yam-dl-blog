<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class SubscriberController extends Controller
{
     /**
     * Display a listing of subscribers
     */
    public function index(Request $request): Response
    {
        $query = Subscriber::query();

        // Busca
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('email', 'like', '%' . $request->search . '%')
                  ->orWhere('name', 'like', '%' . $request->search . '%');
            });
        }

        // Filtro por status
        if ($request->filled('status')) {
            if ($request->status === 'verified') {
                $query->verified();
            } elseif ($request->status === 'pending') {
                $query->whereNull('verified_at');
            } elseif ($request->status === 'unsubscribed') {
                $query->where('status', 'unsubscribed');
            } elseif ($request->status === 'active') {
                $query->active()->verified();
            }
        }

        $subscribers = $query->latest()->paginate(20)->withQueryString();

        // Stats
        $stats = [
            'total' => Subscriber::count(),
            'active' => Subscriber::active()->verified()->count(),
            'pending' => Subscriber::whereNull('verified_at')->count(),
            'unsubscribed' => Subscriber::where('status', 'unsubscribed')->count(),
        ];

        return Inertia::render('admin/subscriber/index', [
            'subscribers' => $subscribers,
            'stats' => $stats,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Remove the specified subscriber
     */
    public function destroy(Subscriber $subscriber): JsonResponse
    {
        $subscriber->delete();

        return response()->json([
            'success' => true,
            'message' => 'Subscriber removido com sucesso!',
        ]);
    }

    /**
     * Export subscribers to CSV
     */
    public function export(Request $request)
    {
        $query = Subscriber::query();

        // Aplicar mesmos filtros da listagem
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('email', 'like', '%' . $request->search . '%')
                  ->orWhere('name', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('status')) {
            if ($request->status === 'verified') {
                $query->verified();
            } elseif ($request->status === 'pending') {
                $query->whereNull('verified_at');
            } elseif ($request->status === 'unsubscribed') {
                $query->where('status', 'unsubscribed');
            } elseif ($request->status === 'active') {
                $query->active()->verified();
            }
        }

        $subscribers = $query->get(['email', 'name', 'status', 'verified_at', 'created_at']);

        $filename = 'subscribers_' . now()->format('Y-m-d_His') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($subscribers) {
            $file = fopen('php://output', 'w');
            
            // Header
            fputcsv($file, ['Email', 'Nome', 'Status', 'Verificado em', 'Inscrito em']);
            
            // Dados
            foreach ($subscribers as $subscriber) {
                fputcsv($file, [
                    $subscriber->email,
                    $subscriber->name ?? '',
                    $subscriber->status,
                    $subscriber->verified_at ? $subscriber->verified_at->format('d/m/Y H:i') : '',
                    $subscriber->created_at->format('d/m/Y H:i'),
                ]);
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
