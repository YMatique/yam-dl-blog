👑 ADMIN MASTER - Super Administração do Sistema

Painel de controlo central para gestão de todos os tenants, módulos, sistema e configurações globais

🎯 Conceito
O Admin Master é uma área separada do sistema multi-tenant, acessível apenas por super administradores da KUTENGA (você e sua equipe).
NÃO é acessível pelos clientes (tenants).

🏗️ Arquitetura
Separação Física
https://admin.kutenga.co.mz ← ADMIN MASTER (super admins)
https://empresa-abc.kutenga.co.mz ← Tenant (cliente)
https://empresa-xyz.kutenga.co.mz ← Tenant (cliente)
Autenticação Separada
php// Tabela: public.admin_users (separada de public.users)
// Não pertence a nenhum tenant
// Acesso apenas via subdomain 'admin'

📦 Estrutura de Dados

1. Tabelas Globais do Admin Master
   php// database/migrations/2024_01_01_create_admin_tables.php

// Super Admins (equipe KUTENGA)
Schema::create('admin_users', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->string('name');
$table->string('email')->unique();
$table->string('password');
$table->string('phone', 50)->nullable();
$table->string('photo')->nullable();

    // Permissões
    $table->enum('role', ['super_admin', 'admin', 'support', 'billing'])->default('admin');
    $table->json('permissions')->nullable();

    // 2FA
    $table->string('two_factor_secret')->nullable();
    $table->text('two_factor_recovery_codes')->nullable();

    // Status
    $table->boolean('is_active')->default(true);
    $table->timestamp('last_login_at')->nullable();
    $table->string('last_login_ip')->nullable();

    $table->timestamps();
    $table->softDeletes();

});

// Atividades/Auditoria do Admin
Schema::create('admin_activity_logs', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->uuid('admin_user_id')->nullable();
$table->string('action'); // 'tenant.created', 'module.activated', etc
$table->string('model_type')->nullable(); // Tenant, ModuleSubscription, etc
$table->uuid('model_id')->nullable();
$table->uuid('tenant_id')->nullable(); // Se ação relacionada a tenant
$table->json('old_values')->nullable();
$table->json('new_values')->nullable();
$table->text('description')->nullable();
$table->string('ip_address')->nullable();
$table->string('user_agent')->nullable();
$table->timestamps();

    $table->index(['admin_user_id', 'created_at']);
    $table->index(['tenant_id', 'created_at']);
    $table->index('action');

});

// Sistema de Notificações para Admins
Schema::create('admin_notifications', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->uuid('admin_user_id')->nullable(); // null = todos os admins
$table->string('type'); // 'new_tenant', 'payment_failed', 'system_alert'
$table->string('title');
$table->text('message');
$table->string('level')->default('info'); // info, warning, error, success
$table->json('data')->nullable(); // Dados extras
$table->string('action_url')->nullable();
$table->timestamp('read_at')->nullable();
$table->timestamps();

    $table->index(['admin_user_id', 'read_at']);

});

// Configurações Globais do Sistema
Schema::create('system_settings', function (Blueprint $table) {
$table->string('key')->primary();
$table->text('value')->nullable();
$table->string('type')->default('string'); // string, integer, boolean, json
$table->text('description')->nullable();
$table->boolean('is_public')->default(false); // Se tenants podem ver
$table->timestamps();
});

// Planos e Preços (gerenciamento)
Schema::create('pricing_plans', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->string('code', 50)->unique(); // 'starter', 'business', 'enterprise'
$table->string('name');
$table->text('description')->nullable();
$table->decimal('monthly_price', 10, 2);
$table->decimal('annual_price', 10, 2)->nullable(); // Desconto anual
$table->json('included_modules'); // ['customers', 'catalog', 'sales']
$table->json('features')->nullable(); // Descrição de features
$table->json('limits')->nullable(); // {max_users: 10, max_products: 1000}
$table->integer('trial_days')->default(30);
$table->boolean('is_active')->default(true);
$table->boolean('is_visible')->default(true); // Mostrar no site
$table->integer('sort_order')->default(0);
$table->timestamps();
});

// Cupons de Desconto
Schema::create('discount_coupons', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->string('code', 50)->unique();
$table->text('description')->nullable();
$table->enum('type', ['percentage', 'fixed']); // % ou valor fixo
$table->decimal('value', 10, 2);
$table->integer('max_uses')->nullable(); // null = ilimitado
$table->integer('uses_count')->default(0);
$table->date('valid_from')->nullable();
$table->date('valid_until')->nullable();
$table->json('applicable_to')->nullable(); // {modules: ['inventory'], plans: ['business']}
$table->boolean('is_active')->default(true);
$table->uuid('created_by_admin_user_id');
$table->timestamps();
});

// Tickets de Suporte (do tenant para KUTENGA)
Schema::create('support_tickets', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->string('ticket_number')->unique(); // TKT-2024-0001
$table->uuid('tenant_id');
$table->uuid('user_id'); // Usuário do tenant que abriu
$table->uuid('assigned_to_admin_id')->nullable(); // Admin responsável

    $table->string('category'); // technical, billing, feature_request, bug
    $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
    $table->enum('status', ['open', 'in_progress', 'waiting_customer', 'resolved', 'closed'])->default('open');

    $table->string('subject');
    $table->text('description');
    $table->json('attachments')->nullable();

    $table->timestamp('resolved_at')->nullable();
    $table->timestamp('closed_at')->nullable();
    $table->text('resolution')->nullable();

    $table->timestamps();

    $table->index(['tenant_id', 'status']);
    $table->index(['assigned_to_admin_id', 'status']);

});

Schema::create('support_ticket_messages', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->uuid('ticket_id');
$table->uuid('user_id')->nullable(); // Tenant user
$table->uuid('admin_user_id')->nullable(); // Admin
$table->text('message');
$table->json('attachments')->nullable();
$table->boolean('is_internal_note')->default(false); // Nota interna (só admins veem)
$table->timestamps();

    $table->foreign('ticket_id')->references('id')->on('support_tickets')->onDelete('cascade');

});

// Sistema de Manutenção
Schema::create('maintenance_windows', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->string('title');
$table->text('description');
$table->timestamp('starts_at');
$table->timestamp('ends_at');
$table->enum('type', ['full', 'partial']); // Sistema todo ou módulos específicos
$table->json('affected_modules')->nullable(); // Se partial
$table->boolean('notify_tenants')->default(true);
$table->timestamp('notified_at')->nullable();
$table->boolean('is_completed')->default(false);
$table->uuid('created_by_admin_id');
$table->timestamps();
});

// Estatísticas Agregadas (cache)
Schema::create('system_stats_cache', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->date('date');
$table->json('stats'); // {total_tenants: 100, active_tenants: 95, mrr: 10000, ...}
$table->timestamps();

    $table->unique('date');

});

🎨 Funcionalidades do Admin Master

1. Dashboard Principal
   typescript// Admin Master Dashboard

interface DashboardData {
// KPIs
totalTenants: number;
activeTenants: number;
trialTenants: number;
suspendedTenants: number;

    // Financeiro
    mrr: number; // Monthly Recurring Revenue
    arr: number; // Annual Recurring Revenue
    churnRate: number; // Taxa de cancelamento

    // Crescimento
    newTenantsThisMonth: number;
    growthRate: number; // % vs mês anterior

    // Sistema
    systemHealth: 'healthy' | 'degraded' | 'down';
    uptime: number; // %
    activeModules: Record<string, number>; // {catalog: 95, inventory: 78}

    // Suporte
    openTickets: number;
    averageResponseTime: number; // horas

    // Uso
    totalUsers: number;
    totalSales: number;
    totalInvoices: number;

}
Widgets:

📊 Gráfico de crescimento de tenants (últimos 12 meses)
💰 Receita recorrente (MRR/ARR)
🎯 Conversão de trial → pago
🔥 Tenants mais ativos (por uso)
⚠️ Alertas e notificações
🎫 Tickets pendentes
🖥️ Status do sistema (servidores, banco, etc)

2.  Gestão de Tenants
    2.1 Listar Todos os Tenants
    typescriptinterface TenantListItem {
    id: string;
    subdomain: string;
    companyName: string;
    companyTaxId: string;
    email: string;
    phone: string;
        plan: 'trial' | 'starter' | 'business' | 'enterprise';
        status: 'active' | 'trial' | 'suspended' | 'cancelled';

        activeModules: string[];
        monthlyCost: number;

        createdAt: Date;
        trialEndsAt: Date | null;
        nextBillingDate: Date | null;

        // Uso
        totalUsers: number;
        totalSales: number;
        lastActivityAt: Date | null;

        // Billing
        totalPaid: number;
        outstandingBalance: number;
    }
    Ações:

✅ Ver detalhes completos
✅ Editar informações
✅ Ativar/Suspender/Cancelar
✅ Estender trial
✅ Aplicar desconto/cupom
✅ Ativar/Desativar módulos
✅ Resetar senha de admin do tenant
✅ Login como tenant (impersonation)
✅ Ver logs de atividade
✅ Ver histórico de pagamentos
✅ Enviar notificação

Filtros:

Status (ativo, trial, suspenso)
Plano
Módulos ativos
Data de criação
Valor de MRR
Atividade (ativo, inativo há 30 dias)
País/Região

2.2 Criar Novo Tenant (Manual)
php// Admin cria tenant manualmente

Route::post('/admin/tenants', function (Request $request) {
$request->validate([
'subdomain' => 'required|unique:tenants',
'company_name' => 'required',
'company_tax_id' => 'required',
'email' => 'required|email',
'plan' => 'required',
'modules' => 'required|array',
'trial_days' => 'nullable|integer',
'discount_coupon' => 'nullable|exists:discount_coupons,code',
]);

    // 1. Criar tenant
    $tenant = Tenant::create([
        'subdomain' => $request->subdomain,
        'company_name' => $request->company_name,
        'company_tax_id' => $request->company_tax_id,
        'email' => $request->email,
        'plan' => $request->plan,
        'active_modules' => $request->modules,
        'status' => $request->trial_days > 0 ? 'trial' : 'active',
        'trial_ends_at' => now()->addDays($request->trial_days ?? 0),
    ]);

    // 2. Criar schema e migrations
    Artisan::call('tenants:migrate', ['--tenants' => $tenant->id]);

    // 3. Criar usuário admin do tenant
    $tenant->run(function () use ($request) {
        User::create([
            'name' => 'Admin',
            'email' => $request->email,
            'password' => Hash::make(Str::random(16)), // Temporária
            'role' => 'admin',
        ]);
    });

    // 4. Enviar email de boas-vindas
    Mail::to($request->email)->send(new TenantWelcome($tenant));

    // 5. Log
    AdminActivityLog::create([
        'admin_user_id' => auth('admin')->id(),
        'action' => 'tenant.created',
        'model_type' => Tenant::class,
        'model_id' => $tenant->id,
        'description' => "Tenant '{$tenant->subdomain}' criado manualmente",
    ]);

    return response()->json($tenant);

});

2.3 Ver Detalhes do Tenant
Abas:

Informações Gerais

Dados da empresa
Plano e módulos
Status
Editar informações

Usuários

Lista de usuários do tenant
Quantidade por role
Usuários ativos/inativos
Último acesso

Uso do Sistema

Gráficos de uso por módulo
Produtos cadastrados
Vendas realizadas
Faturas emitidas
Estoque valorizado
Storage usado (arquivos)

Faturamento

Histórico de pagamentos
Faturas pendentes
MRR atual
Lifetime value
Método de pagamento
Próxima cobrança

Atividade

Logs de acesso
Ações importantes
Timeline de eventos

Suporte

Tickets abertos
Histórico de tickets
Notas internas

2.4 Suspender/Reativar Tenant
php// Suspender (por falta de pagamento ou outro motivo)
Route::post('/admin/tenants/{tenant}/suspend', function (Tenant $tenant, Request $request) {
$request->validate([
'reason' => 'required|string',
'notify' => 'boolean',
]);

    $tenant->update([
        'status' => 'suspended',
        'suspended_at' => now(),
        'suspension_reason' => $request->reason,
    ]);

    // Bloquear acesso
    // Tenant não consegue mais fazer login

    if ($request->notify) {
        Mail::to($tenant->email)->send(new TenantSuspended($tenant, $request->reason));
    }

    AdminActivityLog::create([
        'admin_user_id' => auth('admin')->id(),
        'action' => 'tenant.suspended',
        'tenant_id' => $tenant->id,
        'description' => "Tenant suspenso. Motivo: {$request->reason}",
    ]);

    return response()->json(['message' => 'Tenant suspenso com sucesso']);

});

// Reativar
Route::post('/admin/tenants/{tenant}/reactivate', function (Tenant $tenant) {
$tenant->update([
'status' => 'active',
'suspended_at' => null,
'suspension_reason' => null,
]);

    Mail::to($tenant->email)->send(new TenantReactivated($tenant));

    AdminActivityLog::create([
        'admin_user_id' => auth('admin')->id(),
        'action' => 'tenant.reactivated',
        'tenant_id' => $tenant->id,
    ]);

    return response()->json(['message' => 'Tenant reativado com sucesso']);

});

2.5 Login como Tenant (Impersonation)
php// Admin faz login como tenant (para suporte)
Route::post('/admin/tenants/{tenant}/impersonate', function (Tenant $tenant) {
// Salva admin atual na sessão
session(['impersonating_from_admin' => auth('admin')->id()]);

    // Inicializa tenancy
    tenancy()->initialize($tenant);

    // Pega primeiro admin do tenant
    $tenantAdmin = $tenant->run(function () {
        return User::where('role', 'admin')->first();
    });

    // Faz login como esse usuário
    Auth::guard('web')->login($tenantAdmin);

    // Log
    AdminActivityLog::create([
        'admin_user_id' => auth('admin')->id(),
        'action' => 'tenant.impersonated',
        'tenant_id' => $tenant->id,
        'description' => "Admin fez login como tenant '{$tenant->subdomain}'",
    ]);

    // Redireciona para dashboard do tenant
    return redirect("https://{$tenant->subdomain}.kutenga.co.mz/dashboard");

});

// Voltar para Admin Master
Route::post('/leave-impersonation', function () {
$adminId = session('impersonating_from_admin');

    Auth::guard('web')->logout();
    session()->forget('impersonating_from_admin');

    // Faz login novamente como admin
    Auth::guard('admin')->loginUsingId($adminId);

    return redirect('https://admin.kutenga.co.mz/dashboard');

});

3. Gestão de Módulos
   3.1 Definições de Módulos
   php// Admin pode editar preços, features, etc

Route::get('/admin/modules', function () {
return ModuleDefinition::orderBy('sort_order')->get();
});

Route::put('/admin/modules/{module}', function (ModuleDefinition $module, Request $request) {
$request->validate([
'setup_fee' => 'required|numeric|min:0',
'monthly_fee' => 'required|numeric|min:0',
'features' => 'array',
'is_available' => 'boolean',
]);

    $module->update($request->all());

    AdminActivityLog::create([
        'admin_user_id' => auth('admin')->id(),
        'action' => 'module.updated',
        'model_id' => $module->id,
        'description' => "Módulo '{$module->name}' atualizado",
    ]);

    return response()->json($module);

});

3.2 Ativar/Desativar Módulo para Tenant
phpRoute::post('/admin/tenants/{tenant}/modules/{moduleCode}/activate', function (Tenant $tenant, string $moduleCode) {
    $tenant->activateModule($moduleCode, auth('admin')->user());

    AdminActivityLog::create([
        'admin_user_id' => auth('admin')->id(),
        'action' => 'module.activated_for_tenant',
        'tenant_id' => $tenant->id,
        'description' => "Módulo '{$moduleCode}' ativado para tenant '{$tenant->subdomain}'",
    ]);

    return response()->json(['message' => 'Módulo ativado']);

});

4. Faturamento e Pagamentos
   4.1 Cobranças Recorrentes Automáticas
   php// Job que roda diariamente
   // app/Console/Commands/ProcessRecurringBilling.php

class ProcessRecurringBilling extends Command
{
public function handle()
{
// Busca tenants com cobrança hoje
$tenants = Tenant::where('status', 'active')
->whereDate('next_billing_date', today())
->get();

        foreach ($tenants as $tenant) {
            try {
                // Calcula valor
                $amount = $tenant->monthly_cost;

                // Cria invoice
                $invoice = Invoice::create([
                    'tenant_id' => $tenant->id,
                    'amount' => $amount,
                    'due_date' => today()->addDays(7),
                    'status' => 'pending',
                    'description' => 'Mensalidade ' . now()->format('M/Y'),
                ]);

                // Tenta cobrar (integração com gateway)
                $payment = PaymentGateway::charge([
                    'tenant_id' => $tenant->id,
                    'amount' => $amount,
                    'description' => "KUTENGA ERP - {$tenant->subdomain}",
                ]);

                if ($payment->successful()) {
                    $invoice->update([
                        'status' => 'paid',
                        'paid_at' => now(),
                        'payment_method' => $payment->method,
                        'transaction_id' => $payment->id,
                    ]);

                    $tenant->update([
                        'next_billing_date' => today()->addMonth(),
                    ]);

                    Mail::to($tenant->email)->send(new PaymentSuccess($invoice));
                } else {
                    // Falha no pagamento
                    $invoice->update(['status' => 'failed']);

                    Mail::to($tenant->email)->send(new PaymentFailed($invoice));

                    // Notificar admins
                    AdminNotification::create([
                        'type' => 'payment_failed',
                        'title' => 'Pagamento Falhou',
                        'message' => "Tenant {$tenant->subdomain} - Pagamento de {$amount} USD falhou",
                        'level' => 'warning',
                        'data' => ['tenant_id' => $tenant->id, 'invoice_id' => $invoice->id],
                    ]);

                    // Após 3 tentativas falhadas → suspender
                    if ($tenant->failed_payments_count >= 3) {
                        $tenant->update(['status' => 'suspended']);
                        Mail::to($tenant->email)->send(new TenantSuspendedDueToPayment($tenant));
                    }
                }

            } catch (\Exception $e) {
                Log::error("Billing failed for tenant {$tenant->id}: " . $e->getMessage());
            }
        }
    }

}

4.2 Relatório Financeiro do Admin
php// Dashboard financeiro

Route::get('/admin/financial/dashboard', function () {
return [
// MRR (Monthly Recurring Revenue)
'mrr' => Tenant::where('status', 'active')->sum('monthly_cost'),

        // ARR (Annual Recurring Revenue)
        'arr' => Tenant::where('status', 'active')->sum('monthly_cost') * 12,

        // Crescimento
        'mrr_growth' => calculateMRRGrowth(),

        // Por plano
        'mrr_by_plan' => Tenant::where('status', 'active')
            ->groupBy('plan')
            ->selectRaw('plan, SUM(monthly_cost) as total')
            ->get(),

        // Por módulo
        'mrr_by_module' => calculateMRRByModule(),

        // Churn
        'churn_rate' => calculateChurnRate(),

        // Lifetime Value
        'average_ltv' => calculateAverageLTV(),

        // Inadimplência
        'overdue_invoices' => Invoice::where('status', 'pending')
            ->where('due_date', '<', today())
            ->count(),

        'overdue_amount' => Invoice::where('status', 'pending')
            ->where('due_date', '<', today())
            ->sum('amount'),
    ];

});

5.  Sistema de Suporte
    5.1 Dashboard de Tickets
    typescriptinterface SupportDashboard {
    openTickets: number;
    inProgressTickets: number;
    waitingCustomerTickets: number;
        averageResponseTime: number; // horas
        averageResolutionTime: number; // horas

        ticketsByCategory: Record<string, number>;
        ticketsByPriority: Record<string, number>;

        myTickets: Ticket[]; // Tickets atribuídos ao admin logado
        unassignedTickets: Ticket[];
    }

5.2 Tenant Abre Ticket
php// No app do tenant (não admin master)

Route::post('/support/tickets', function (Request $request) {
$request->validate([
'subject' => 'required',
'category' => 'required',
'priority' => 'required',
'description' => 'required',
'attachments' => 'nullable|array',
]);

    $ticket = SupportTicket::create([
        'ticket_number' => generateTicketNumber(), // TKT-2024-0001
        'tenant_id' => tenancy()->tenant->id,
        'user_id' => auth()->id(),
        'subject' => $request->subject,
        'category' => $request->category,
        'priority' => $request->priority,
        'description' => $request->description,
        'attachments' => $request->attachments,
        'status' => 'open',
    ]);

    // Notifica admins
    AdminNotification::create([
        'type' => 'new_ticket',
        'title' => 'Novo Ticket',
        'message' => "Ticket #{$ticket->ticket_number} aberto por {$ticket->tenant->company_name}",
        'level' => 'info',
        'action_url' => "/admin/tickets/{$ticket->id}",
    ]);

    // Email para tenant
    Mail::to(auth()->user()->email)->send(new TicketOpened($ticket));

    return response()->json($ticket);

});

5.3 Admin Responde Ticket
phpRoute::post('/admin/tickets/{ticket}/messages', function (SupportTicket $ticket, Request $request) {
$request->validate([
'message' => 'required',
'is_internal_note' => 'boolean',
]);

    $message = SupportTicketMessage::create([
        'ticket_id' => $ticket->id,
        'admin_user_id' => auth('admin')->id(),
        'message' => $request->message,
        'is_internal_note' => $request->is_internal_note ?? false,
    ]);

    // Atualiza status do ticket
    if (!$request->is_internal_note) {
        $ticket->update(['status' => 'waiting_customer']);

        // Notifica usuário do tenant
        Mail::to($ticket->user->email)->send(new TicketReplied($ticket, $message));
    }

    return response()->json($message);

});

6. Configurações do Sistema
   6.1 Configurações Globais
   php// Admin pode alterar configurações globais

$settings = [
// Geral
'system.name' => 'KUTENGA ERP',
'system.version' => '1.0.0',
'system.maintenance_mode' => false,

    // Tenants
    'tenants.default_trial_days' => 30,
    'tenants.max_users_per_tenant' => 50,
    'tenants.allow_self_registration' => true,

    // Billing
    'billing.currency' => 'USD',
    'billing.payment_grace_period_days' => 7,
    'billing.suspend_after_failed_payments' => 3,

    // Emails
    'mail.from_address' => 'noreply@kutenga.co.mz',
    'mail.from_name' => 'KUTENGA ERP',
    'mail.support_email' => 'support@kutenga.co.mz',

    // Storage
    'storage.max_upload_size_mb' => 10,
    'storage.allowed_file_types' => ['pdf', 'jpg', 'png', 'xlsx', 'docx'],

    // API
    'api.rate_limit_per_minute' => 60,

    // Segurança
    'security.force_2fa_for_admins' => true,
    'security.password_expiry_days' => 90,
    'security.max_login_attempts' => 5,

];

6.2 Janelas de Manutenção
php// Agendar manutenção

Route::post('/admin/maintenance', function (Request $request) {
$request->validate([
'title' => 'required',
'description' => 'required',
'starts_at' => 'required|date',
'ends_at' => 'required|date|after:starts_at',
'type' => 'required|in:full,partial',
'affected_modules' => 'required_if:type,partial|array',
'notify_tenants' => 'boolean',
]);

    $maintenance = MaintenanceWindow::create([
        'title' => $request->title,
        'description' => $request->description,
        'starts_at' => $request->starts_at,
        'ends_at' => $request->ends_at,
        'type' => $request->type,
        'affected_modules' => $request->affected_modules,
        'notify_tenants' => $request->notify_tenants ?? true,
        'created_by_admin_id' => auth('admin')->id(),
    ]);

    // Notifica todos os tenants
    if ($maintenance->notify_tenants) {
        $tenants = Tenant::where('status', 'active')->get();

        foreach ($tenants as $tenant) {
            Mail::to($tenant->email)->send(new MaintenanceScheduled($maintenance));
        }

        $maintenance->update(['notified_at' => now()]);
    }

    return response()->json($maintenance);

});

// Durante manutenção: bloquear acesso
Middleware::handle(function ($request, $next) {
$maintenance = MaintenanceWindow::where('starts_at', '<=', now())
->where('ends_at', '>=', now())
->where('type', 'full')
->first();

    if ($maintenance && !$request->is('admin/*')) {
        abort(503, 'Sistema em manutenção. Voltamos em breve!');
    }

    return $next($request);

});

7.  Relatórios e Analytics
    7.1 Métricas do Sistema
    phpRoute::get('/admin/analytics', function () {
    return [
    // Tenants
    'total_tenants' => Tenant::count(),
    'active_tenants' => Tenant::where('status', 'active')->count(),
    'trial_tenants' => Tenant::where('status', 'trial')->count(),
    'churned_tenants' => Tenant::where('status', 'cancelled')
    ->whereMonth('updated_at', now()->month)
    ->count(),
            // Crescimento
            'new_tenants_this_month' => Tenant::whereMonth('created_at', now()->month)->count(),
            'growth_rate' => calculateGrowthRate(),

            // Uso
            'total_users' => User::count(),
            'active_users_last_30_days' => User::where('last_login_at', '>=', now()->subDays(30))->count(),

            // Por módulo
            'module_adoption' => calculateModuleAdoption(),

            // Financeiro
            'mrr' => calculateMRR(),
            'arr' => calculateARR(),
            'churn_rate' => calculateChurnRate(),
            'ltv' => calculateLTV(),

            // Sistema
            'database_size_gb' => getDatabaseSize(),
            'total_sales' => Sale::count(),
            'total_invoices' => Invoice::count(),
            'total_products' => Item::count(),

            // Suporte
            'open_tickets' => SupportTicket::where('status', 'open')->count(),
            'average_response_time_hours' => calculateAverageResponseTime(),
        ];
    });

7.2 Relatório de Retenção
php// Cohort Analysis

Route::get('/admin/analytics/cohorts', function () {
$cohorts = [];

    // Agrupa tenants por mês de criação
    $startMonth = Carbon::parse('2024-01-01');
    $endMonth = now();

    while ($startMonth <= $endMonth) {
        $tenants = Tenant::whereYear('created_at', $startMonth->year)
            ->whereMonth('created_at', $startMonth->month)
            ->get();

        $cohort = [
            'month' => $startMonth->format('Y-m'),
            'initial_count' => $tenants->count(),
            'retention' => [],
        ];

        // Calcula retenção mês a mês
        for ($i = 0; $i <= 12; $i++) {
            $checkMonth = $startMonth->copy()->addMonths($i);
            $activeCount = $tenants->filter(function ($tenant) use ($checkMonth) {
                return $tenant->status === 'active' &&
                       $tenant->created_at <= $checkMonth;
            })->count();

            $cohort['retention'][$i] = [
                'month' => $i,
                'count' => $activeCount,
                'percentage' => $tenants->count() > 0
                    ? round(($activeCount / $tenants->count()) * 100, 2)
                    : 0,
            ];
        }

        $cohorts[] = $cohort;
        $startMonth->addMonth();
    }

    return $cohorts;

});

8.  Logs e Auditoria
    8.1 Visualizar Logs
    phpRoute::get('/admin/logs', function (Request $request) {
    $query = AdminActivityLog::with(['adminUser', 'tenant'])
    ->orderBy('created_at', 'desc');

        // Filtros
        if ($request->admin_user_id) {
            $query->where('admin_user_id', $request->admin_user_id);
        }

        if ($request->tenant_id) {
            $query->where('tenant_id', $request->tenant_id);
        }

        if ($request->action) {
            $query->where('action', 'like', "%{$request->action}%");
        }

        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        return $query->paginate(50);

    });

9.  Gerenciamento de Admins
    php// Criar novo admin

Route::post('/admin/admins', function (Request $request) {
$request->validate([
'name' => 'required',
'email' => 'required|email|unique:admin_users',
'password' => 'required|min:8',
'role' => 'required|in:super_admin,admin,support,billing',
'permissions' => 'array',
]);

    $admin = AdminUser::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $request->role,
        'permissions' => $request->permissions,
    ]);

    Mail::to($admin->email)->send(new AdminAccountCreated($admin));

    AdminActivityLog::create([
        'admin_user_id' => auth('admin')->id(),
        'action' => 'admin.created',
        'model_id' => $admin->id,
        'description' => "Novo admin criado: {$admin->email}",
    ]);

    return response()->json($admin);

});

```

---

## 🎨 Frontend do Admin Master

### **Estrutura de Páginas**
```

resources/js/AdminMaster/
├── Pages/
│ ├── Dashboard.tsx
│ ├── Tenants/
│ │ ├── Index.tsx
│ │ ├── Show.tsx
│ │ └── Create.tsx
│ ├── Modules/
│ │ └── Index.tsx
│ ├── Financial/
│ │ ├── Dashboard.tsx
│ │ └── Invoices.tsx
│ ├── Support/
│ │ ├── Tickets/Index.tsx
│ │ └── Tickets/Show.tsx
│ ├── Analytics/
│ │ ├── Overview.tsx
│ │ └── Cohorts.tsx
│ ├── Settings/
│ │ ├── General.tsx
│ │ └── Maintenance.tsx
│ ├── Admins/
│ │ └── Index.tsx
│ └── Logs/
│ └── Index.tsx
└── Components/
├── TenantCard.tsx
├── MetricCard.tsx
└── TicketCard.tsx

🔒 Segurança do Admin Master

1. Autenticação Forte
   php// 2FA obrigatório para admins

Middleware::handle(function ($request, $next) {
$admin = auth('admin')->user();

    if (!$admin->two_factor_confirmed_at) {
        return redirect()->route('admin.2fa.setup');
    }

    return $next($request);

}); 2. IP Whitelist (Opcional)
php// Só permite acesso de IPs específicos

$allowedIPs = ['203.0.113.1', '198.51.100.1'];

if (!in_array($request->ip(), $allowedIPs)) {
abort(403, 'Acesso negado.');
} 3. Rate Limiting
php// Limite de requisições

RateLimiter::for('admin', function (Request $request) {
    return Limit::perMinute(60)->by($request->user('admin')->id);
});

📊 Resumo de Permissões do Admin Master
PermissãoSuper AdminAdminSupportBillingVer tenants✅✅✅✅Criar tenants✅✅❌❌Suspender tenants✅✅❌✅Editar módulos✅✅❌❌Ver financeiro✅✅❌✅Processar pagamentos✅❌❌✅Responder tickets✅✅✅❌Ver logs✅✅✅✅Configurações sistema✅✅❌❌Gerenciar admins✅❌❌❌Impersonar tenant✅✅✅❌

Admin Master completo para gestão total da plataforma KUTENGA! 👑✨as duas coisas estarão no mesmo projecto ou em projecto separado?12:25🤔 Admin Master: Mesmo Projeto ou Separado?

🎯 Recomendação: MESMO PROJETO ✅
Por quê?
✅ Compartilha código (Models, Services, Events)
✅ Mesma base de dados
✅ Deploy único
✅ Manutenção mais simples
✅ Não duplica lógica
✅ Migrations unificadas
✅ Ambiente de desenvolvimento mais simples

🏗️ Arquitetura: Mesmo Projeto, Rotas Separadas
Estrutura do Projeto
kutenga-erp/
├── app/
│ ├── Models/ # Compartilhado
│ │ ├── Tenant.php
│ │ ├── Customer.php
│ │ ├── Sale.php
│ │ └── ...
│ │
│ ├── Http/
│ │ ├── Controllers/
│ │ │ ├── Admin/ # ← Admin Master Controllers
│ │ │ │ ├── DashboardController.php
│ │ │ │ ├── TenantController.php
│ │ │ │ ├── ModuleController.php
│ │ │ │ ├── SupportTicketController.php
│ │ │ │ └── AnalyticsController.php
│ │ │ │
│ │ │ └── Tenant/ # ← Tenant Controllers
│ │ │ ├── CustomerController.php
│ │ │ ├── SaleController.php
│ │ │ └── ...
│ │ │
│ │ └── Middleware/
│ │ ├── InitializeTenancyByDomain.php # Tenant
│ │ ├── EnsureIsAdmin.php # Admin Master
│ │ └── EnsureModuleIsActive.php # Tenant
│ │
│ ├── Services/ # Compartilhado
│ │ ├── TenantService.php
│ │ ├── BillingService.php
│ │ └── ...
│ │
│ └── Providers/
│ ├── AppServiceProvider.php
│ ├── RouteServiceProvider.php
│ └── AdminServiceProvider.php # Registra rotas admin
│
├── database/
│ └── migrations/
│ ├── 2024_01_01_create_tenants_table.php # Global
│ ├── 2024_01_02_create_admin_users_table.php # Admin Master
│ ├── 2024_01_03_create_customers_table.php # Tenant (em schema)
│ └── ...
│
├── resources/
│ └── js/
│ ├── AdminMaster/ # ← Frontend Admin Master
│ │ ├── Pages/
│ │ │ ├── Dashboard.tsx
│ │ │ ├── Tenants/
│ │ │ └── ...
│ │ └── Components/
│ │
│ └── Tenant/ # ← Frontend Tenant
│ ├── Pages/
│ │ ├── Dashboard.tsx
│ │ ├── Customers/
│ │ └── ...
│ └── Components/
│
├── routes/
│ ├── admin.php # ← Rotas Admin Master
│ ├── web.php # ← Rotas Tenant
│ └── api.php
│
├── config/
│ ├── tenancy.php
│ └── admin.php
│
└── vite.config.js

🔀 Separação por Domínio
Como Funciona?
ACESSO:
https://admin.kutenga.co.mz → Admin Master
https://empresa-abc.kutenga.co.mz → Tenant (Empresa ABC)
https://empresa-xyz.kutenga.co.mz → Tenant (Empresa XYZ)

LÓGICA:

1. Requisição chega
2. Middleware detecta subdomain
3. Se subdomain === 'admin' → Rotas Admin Master
4. Se subdomain !== 'admin' → Rotas Tenant (inicializa tenancy)

🛣️ Configuração de Rotas

1. RouteServiceProvider.php
   php// app/Providers/RouteServiceProvider.php
   namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
public function boot(): void
{
$this->routes(function () {
// ADMIN MASTER ROUTES
Route::middleware(['web', 'admin'])
->domain('admin.' . config('app.domain')) // admin.kutenga.co.mz
->group(base_path('routes/admin.php'));

            // TENANT ROUTES (wildcard subdomain)
            Route::middleware(['web', 'tenant'])
                ->domain('{tenant}.' . config('app.domain'))  // {tenant}.kutenga.co.mz
                ->group(base_path('routes/web.php'));

            // API ROUTES
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));
        });
    }

}

2. routes/admin.php (Admin Master)
   php<?php
   // routes/admin.php - ADMIN MASTER

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\ModuleController;
use App\Http\Controllers\Admin\SupportTicketController;
use App\Http\Controllers\Admin\AnalyticsController;

// Login Admin
Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
Route::post('/login', [AdminAuthController::class, 'login']);
Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

// Admin Master (autenticado)
Route::middleware(['auth:admin'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('admin.dashboard');

    // TENANTS
    Route::prefix('tenants')->name('admin.tenants.')->group(function () {
        Route::get('/', [TenantController::class, 'index'])->name('index');
        Route::get('/create', [TenantController::class, 'create'])->name('create');
        Route::post('/', [TenantController::class, 'store'])->name('store');
        Route::get('/{tenant}', [TenantController::class, 'show'])->name('show');
        Route::put('/{tenant}', [TenantController::class, 'update'])->name('update');
        Route::delete('/{tenant}', [TenantController::class, 'destroy'])->name('destroy');

        // Ações especiais
        Route::post('/{tenant}/suspend', [TenantController::class, 'suspend'])->name('suspend');
        Route::post('/{tenant}/reactivate', [TenantController::class, 'reactivate'])->name('reactivate');
        Route::post('/{tenant}/impersonate', [TenantController::class, 'impersonate'])->name('impersonate');

        // Módulos do tenant
        Route::post('/{tenant}/modules/{moduleCode}/activate', [TenantController::class, 'activateModule'])
            ->name('modules.activate');
        Route::post('/{tenant}/modules/{moduleCode}/deactivate', [TenantController::class, 'deactivateModule'])
            ->name('modules.deactivate');
    });

    // MÓDULOS (definições globais)
    Route::prefix('modules')->name('admin.modules.')->group(function () {
        Route::get('/', [ModuleController::class, 'index'])->name('index');
        Route::put('/{module}', [ModuleController::class, 'update'])->name('update');
    });

    // SUPORTE
    Route::prefix('support')->name('admin.support.')->group(function () {
        Route::get('/tickets', [SupportTicketController::class, 'index'])->name('tickets.index');
        Route::get('/tickets/{ticket}', [SupportTicketController::class, 'show'])->name('tickets.show');
        Route::post('/tickets/{ticket}/messages', [SupportTicketController::class, 'addMessage'])
            ->name('tickets.messages.store');
        Route::put('/tickets/{ticket}/assign', [SupportTicketController::class, 'assign'])
            ->name('tickets.assign');
        Route::put('/tickets/{ticket}/status', [SupportTicketController::class, 'updateStatus'])
            ->name('tickets.status');
    });

    // ANALYTICS
    Route::prefix('analytics')->name('admin.analytics.')->group(function () {
        Route::get('/overview', [AnalyticsController::class, 'overview'])->name('overview');
        Route::get('/cohorts', [AnalyticsController::class, 'cohorts'])->name('cohorts');
        Route::get('/financial', [AnalyticsController::class, 'financial'])->name('financial');
    });

    // LOGS
    Route::get('/logs', [AdminLogController::class, 'index'])->name('admin.logs.index');

    // CONFIGURAÇÕES
    Route::prefix('settings')->name('admin.settings.')->group(function () {
        Route::get('/', [AdminSettingsController::class, 'index'])->name('index');
        Route::put('/', [AdminSettingsController::class, 'update'])->name('update');
    });

    // ADMINS (gerenciamento de admins)
    Route::resource('admins', AdminUserController::class)->names('admin.admins');

});

3. routes/web.php (Tenant)
   php<?php
   // routes/web.php - TENANT

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Tenant\CustomerController;
use App\Http\Controllers\Tenant\SaleController;
use App\Http\Controllers\Tenant\InventoryController;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;

// Rotas públicas do tenant (login)
Route::get('/login', [TenantAuthController::class, 'showLogin'])->name('login');
Route::post('/login', [TenantAuthController::class, 'login']);

// Rotas autenticadas do tenant
Route::middleware([
'web',
InitializeTenancyByDomain::class,
'auth:sanctum',
])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // CUSTOMERS
    Route::middleware([EnsureModuleIsActive::class . ':customers'])
        ->prefix('customers')
        ->name('customers.')
        ->group(function () {
            Route::resource('customers', CustomerController::class);
        });

    // CATALOG
    Route::middleware([EnsureModuleIsActive::class . ':catalog'])
        ->prefix('catalog')
        ->name('catalog.')
        ->group(function () {
            Route::resource('items', ItemController::class);
            Route::resource('categories', CategoryController::class);
        });

    // INVENTORY
    Route::middleware([EnsureModuleIsActive::class . ':inventory'])
        ->prefix('inventory')
        ->name('inventory.')
        ->group(function () {
            Route::get('/dashboard', [InventoryController::class, 'dashboard'])->name('dashboard');
            Route::resource('warehouses', WarehouseController::class);
            Route::resource('movements', InventoryMovementController::class);
        });

    // SALES
    Route::middleware([EnsureModuleIsActive::class . ':sales'])
        ->prefix('sales')
        ->name('sales.')
        ->group(function () {
            Route::get('/pos', [SaleController::class, 'pos'])->name('pos');
            Route::resource('sales', SaleController::class);
        });

    // ... outros módulos

    // SUPPORT (tenant pode abrir tickets)
    Route::prefix('support')->name('support.')->group(function () {
        Route::get('/tickets', [TenantSupportController::class, 'index'])->name('tickets.index');
        Route::post('/tickets', [TenantSupportController::class, 'store'])->name('tickets.store');
        Route::get('/tickets/{ticket}', [TenantSupportController::class, 'show'])->name('tickets.show');
    });

    // BILLING (tenant vê seus pagamentos)
    Route::prefix('billing')->name('billing.')->group(function () {
        Route::get('/modules', [BillingController::class, 'modules'])->name('modules');
        Route::get('/invoices', [BillingController::class, 'invoices'])->name('invoices');
    });

});

🔐 Middlewares

1. Admin Middleware
   php// app/Http/Middleware/EnsureIsAdmin.php
   namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureIsAdmin
{
public function handle(Request $request, Closure $next)
    {
        // Verifica se está no subdomain admin
        if (!$request->getHost() === 'admin.' . config('app.domain')) {
abort(404);
}

        return $next($request);
    }

}
php// app/Http/Middleware/Authenticate.php (modificar)
namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
// Se for admin master
if ($request->getHost() === 'admin.' . config('app.domain')) {
return route('admin.login');
}

            // Se for tenant
            return route('login');
        }
    }

}

2. Registrar Middlewares
   php// app/Http/Kernel.php
   protected $middlewareAliases = [
   'auth' => \App\Http\Middleware\Authenticate::class,
   'admin' => \App\Http\Middleware\EnsureIsAdmin::class,
   'tenant' => \Stancl\Tenancy\Middleware\InitializeTenancyByDomain::class,
   // ...
   ];

🔑 Autenticação Separada
Guards Diferentes
php// config/auth.php
return [
'defaults' => [
'guard' => 'web', // Tenant
],

    'guards' => [
        // TENANT (usuários normais)
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        // ADMIN MASTER (super admins)
        'admin' => [
            'driver' => 'session',
            'provider' => 'admin_users',
        ],
    ],

    'providers' => [
        // Tenant users (em schema tenant)
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        // Admin users (em schema public)
        'admin_users' => [
            'driver' => 'eloquent',
            'model' => App\Models\AdminUser::class,
        ],
    ],

];

Models Separados
php// app/Models/User.php (TENANT)
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
// Autenticação para tenants
protected $guard = 'web';

    // Usa tabela em schema do tenant
    protected $connection = 'tenant';

}
php// app/Models/AdminUser.php (ADMIN MASTER)
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class AdminUser extends Authenticatable
{
// Autenticação para admin master
protected $guard = 'admin';

    // Usa tabela em schema public (global)
    protected $table = 'admin_users';

    protected $fillable = [
        'name', 'email', 'password', 'role', 'permissions',
    ];

    protected $hidden = [
        'password', 'remember_token', 'two_factor_secret',
    ];

    protected $casts = [
        'permissions' => 'array',
        'is_active' => 'boolean',
        'last_login_at' => 'datetime',
    ];

}

🎨 Frontend Separado
Vite Config
javascript// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [
laravel({
input: [
// ADMIN MASTER
'resources/js/AdminMaster/app.tsx',
'resources/css/admin.css',

                // TENANT
                'resources/js/Tenant/app.tsx',
                'resources/css/tenant.css',
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
            '@AdminMaster': '/resources/js/AdminMaster',
            '@Tenant': '/resources/js/Tenant',
        },
    },

});

Blade Templates Separados
blade{{-- resources/views/admin/app.blade.php --}}

<!DOCTYPE html>
<html lang="pt-MZ">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Master - KUTENGA ERP</title>
    
    @vite(['resources/js/AdminMaster/app.tsx', 'resources/css/admin.css'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
blade{{-- resources/views/tenant/app.blade.php --}}
<!DOCTYPE html>
<html lang="pt-MZ">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>KUTENGA ERP - {{ tenancy()->tenant?->company_name }}</title>
    
    @vite(['resources/js/Tenant/app.tsx', 'resources/css/tenant.css'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>

Inertia Middleware
php// app/Http/Middleware/HandleInertiaRequests.php
namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
public function share(Request $request): array
    {
        $shared = parent::share($request);

        // Se for Admin Master
        if ($request->getHost() === 'admin.' . config('app.domain')) {
            return array_merge($shared, [
                'auth' => [
                    'admin' => $request->user('admin'),
                ],
                'stats' => [
                    'totalTenants' => \App\Models\Tenant::count(),
                    'activeTenants' => \App\Models\Tenant::where('status', 'active')->count(),
                ],
            ]);
        }

        // Se for Tenant
        return array_merge($shared, [
            'auth' => [
                'user' => $request->user(),
            ],
            'tenant' => [
                'id' => tenancy()->tenant?->id,
                'name' => tenancy()->tenant?->company_name,
                'subdomain' => tenancy()->tenant?->subdomain,
                'activeModules' => tenancy()->tenant?->active_modules,
                'plan' => tenancy()->tenant?->plan,
            ],
        ]);
    }

}

```

---

## 🗄️ Database: Schemas
```

PostgreSQL Database: kutenga_erp

Schema: public (COMPARTILHADO)
├─ tenants # Lista de tenants
├─ admin_users # Admins do KUTENGA
├─ admin_activity_logs # Logs do admin master
├─ admin_notifications # Notificações para admins
├─ system_settings # Configurações globais
├─ module_definitions # Definições de módulos
├─ pricing_plans # Planos de preços
├─ discount_coupons # Cupons
├─ support_tickets # Tickets de suporte
├─ support_ticket_messages # Mensagens dos tickets
└─ maintenance_windows # Janelas de manutenção

Schema: tenant_empresa_abc (TENANT)
├─ users # Usuários do tenant
├─ customers
├─ items
├─ sales
└─ ... (todas as tabelas tenant)

Schema: tenant_empresa_xyz (TENANT)
└─ ... (mesmas tabelas)

✅ Vantagens de Estar no Mesmo Projeto

1. Compartilhamento de Código
   php// Admin Master e Tenant usam o MESMO model

// app/Models/Tenant.php (usado por ambos!)
class Tenant extends Model
{
public function activateModule(string $moduleCode) { ... }
public function suspendAccount() { ... }
}

// Admin Master usa:
$tenant = Tenant::find($id);
$tenant->activateModule('inventory');

// Tenant usa (internamente):
$tenant = tenancy()->tenant;
$hasInventory = $tenant->hasModule('inventory');

2. Eventos Compartilhados
   php// Events compartilhados

// Admin ativa módulo → dispara evento
event(new ModuleActivated($tenant, 'inventory'));

// Tenant escuta (mesmo projeto)
// Listeners podem estar em qualquer lugar

3. Jobs Compartilhados
   php// app/Jobs/ProcessRecurringBilling.php (usado pelo Admin Master)

class ProcessRecurringBilling implements ShouldQueue
{
public function handle()
{
// Acessa tenants
$tenants = Tenant::where('status', 'active')
->whereDate('next_billing_date', today())
->get();

        foreach ($tenants as $tenant) {
            // Processa billing
        }
    }

}

// Agendado no Kernel.php (um só!)
$schedule->job(new ProcessRecurringBilling)->daily();

4. Migrations Unificadas
   bash# Uma única migração cria tabelas para ambos

php artisan migrate

# Cria:

# - public.admin_users (Admin Master)

# - public.tenants (compartilhado)

# - tenant\_\*.customers (Tenant)

# - tenant\_\*.sales (Tenant)

5. Deploy Único
   bash# Deploy uma vez, atualiza tudo

git push origin main

# CI/CD:

composer install
npm run build
php artisan migrate
php artisan config:cache

# Admin Master E Tenants atualizados! ✅

```

---

## ❌ Quando Separar em Projetos Diferentes?

**Só considere separar se:**
```

❌ Admin Master tem equipe TOTALMENTE separada
❌ Admin Master usa stack diferente (ex: Vue vs React)
❌ Admin Master tem escala MUITO diferente
❌ Requisitos de segurança extremos (compliance)
❌ Admin Master será vendido separadamente

```

**Para KUTENGA: NÃO se aplica nenhum desses casos!**

---

## 🎯 Decisão Final para KUTENGA

### **✅ USE MESMO PROJETO!**
```

ESTRUTURA:

kutenga-erp/ (UM PROJETO)
├── routes/
│ ├── admin.php → Admin Master
│ └── web.php → Tenant
│
├── app/Http/Controllers/
│ ├── Admin/ → Admin Master
│ └── Tenant/ → Tenant
│
├── resources/js/
│ ├── AdminMaster/ → Frontend Admin Master
│ └── Tenant/ → Frontend Tenant
│
└── database/migrations/
├── admin*\*.php → Tabelas Admin Master (public)
└── tenant*\*.php → Tabelas Tenant (schemas)

ACESSO:

- https://admin.kutenga.co.mz → Admin Master
- https://{tenant}.kutenga.co.mz → Tenant

AUTENTICAÇÃO:

- Guard 'admin' → AdminUser (public.admin_users)
- Guard 'web' → User (tenant\_\*.users)

DEPLOY:

- Um deploy
- Uma codebase
- Migrations unificadas
- Jobs compartilhados

```

---

## 📋 Checklist de Implementação
```

✅ Configurar RouteServiceProvider (rotas por domínio)
✅ Criar routes/admin.php (Admin Master)
✅ Criar app/Http/Controllers/Admin/ (controllers admin)
✅ Criar app/Models/AdminUser.php
✅ Adicionar guard 'admin' no auth.php
✅ Criar resources/js/AdminMaster/ (frontend)
✅ Configurar vite.config.js (múltiplos entrypoints)
✅ Criar middlewares (EnsureIsAdmin)
✅ Migrations para tabelas admin (public schema)
✅ Seeders para admin inicial
✅ Testes para rotas admin

Um projeto, dois domínios, duas interfaces, uma codebase! Simples e eficiente! 🚀✨
