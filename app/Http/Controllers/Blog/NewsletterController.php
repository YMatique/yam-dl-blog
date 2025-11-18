<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Mail\NewsletterConfirmation;
use App\Mail\NewsletterWelcome;
use App\Models\Subscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{
    /**
     * Subscreve um novo email
     * POST /newsletter/subscribe
     */
    public function subscribe(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'terms' => 'accepted',
        ], [
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'Por favor, insira um email válido.',
            'terms.accepted' => 'Você deve aceitar os termos e condições.',
        ]);

        // Verifica se já existe
        $subscriber = Subscriber::where('email', $validated['email'])->first();

        if ($subscriber) {
            // Se já está ativo
            if ($subscriber->status === 'active') {
                return back()->withErrors([
                    'email' => 'Este email já está subscrito.',
                ]);
            }

            // Se estava inativo, reativa
            if ($subscriber->status === 'unsubscribed') {
                $subscriber->update([
                    'status' => 'pending',
                    'unsubscribed_at' => null,
                ]);
            }
        } else {
            // Cria novo subscriber
            $subscriber = Subscriber::create([
                'email' => $validated['email'],
                'status' => 'pending',
            ]);
        }

        // Envia email de confirmação
        try {
            Mail::to($subscriber->email)
                ->send(new NewsletterConfirmation($subscriber));
        } catch (\Exception $e) {
            \Log::error('Erro ao enviar email de confirmação de newsletter: ' . $e->getMessage());
            
            return back()->withErrors([
                'email' => 'Erro ao enviar email de confirmação. Tente novamente.',
            ]);
        }

        return back()->with('success', 'Subscrição realizada! Verifique seu email para confirmar.');
    }

    /**
     * Confirma a subscrição via token
     * GET /newsletter/confirm/{token}
     */
    public function confirm(string $token): RedirectResponse
    {
        $subscriber = Subscriber::where('confirmation_token', $token)->firstOrFail();

        if ($subscriber->status === 'active') {
            return redirect('/')->with('info', 'Sua subscrição já foi confirmada anteriormente.');
        }

        // Ativa o subscriber
        $subscriber->verify();

        // Envia email de boas-vindas
        try {
            Mail::to($subscriber->email)
                ->send(new NewsletterWelcome($subscriber));
        } catch (\Exception $e) {
            \Log::error('Erro ao enviar email de boas-vindas: ' . $e->getMessage());
        }

        return redirect('/')->with('success', 'Subscrição confirmada! Obrigado por se juntar a nós. 🎉');
    }

    /**
     * Cancela subscrição via token
     * GET /newsletter/unsubscribe/{token}
     */
    public function unsubscribe(string $token): RedirectResponse
    {
        $subscriber = Subscriber::where('unsubscribe_token', $token)->firstOrFail();

        if ($subscriber->status === 'unsubscribed') {
            return redirect('/')->with('info', 'Você já havia cancelado a subscrição anteriormente.');
        }

        // Cancela a subscrição
        $subscriber->unsubscribe();

        return redirect('/')->with('success', 'Subscrição cancelada com sucesso. Sentiremos sua falta! 😢');
    }
}
