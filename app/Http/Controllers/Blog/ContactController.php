<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Mail\ContactConfirmation;
use App\Mail\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    //
    public function store(Request $request)
    {
         $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ], [
            'name.required' => 'O nome é obrigatório.',
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'Por favor, insira um email válido.',
            'subject.required' => 'O assunto é obrigatório.',
            'message.required' => 'A mensagem é obrigatória.',
        ]);

        // Opção 1: Enviar email
        try {
            // 1️⃣ Envia email para o ADMIN (notificação de nova mensagem)
            Mail::to(config('mail.from.address'))
                ->send(new ContactMessage($validated));

            // 2️⃣ Envia email para o USUÁRIO (confirmação de recebimento)
            Mail::to($validated['email'])
                ->send(new ContactConfirmation($validated));

            // 3️⃣ OPCIONAL: Salva no banco de dados para histórico
            // Contact::create([
            //     ...$validated,
            //     'ip_address' => $request->ip(),
            //     'user_agent' => $request->userAgent(),
            //     'status' => 'pending',
            // ]);
        } catch (\Exception $e) {
             \Log::error('Erro ao enviar email de contato: ' . $e->getMessage());
            return back()
                ->withErrors(['email' => 'Erro ao enviar mensagem. Tente novamente.'])
                ->withInput();
        }

        // Opção 2 (Alternativa): Salvar no banco de dados
        // Contact::create($validated);

        return back()->with('success', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
   
    }
}
