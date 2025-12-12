# 🔌 Sistema de Ativação/Desativação de Módulos

---

## 🎯 Conceito

Cada empresa (tenant) pode **contratar/descontratar módulos** dinamicamente. O sistema deve:

- ✅ Bloquear acesso a módulos não contratados
- ✅ Manter dados intactos (não deletar!)
- ✅ Permitir reativação sem perda de dados
- ✅ Cobrar proporcionalmente (pro-rata)

---

## 📊 Estrutura de Dados

### **1. Tabela Global: `tenants`**

```php
// Migration: public schema
Schema::create('tenants', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('subdomain')->unique();
    $table->string('company_name');
    $table->string('company_tax_id', 50);
    $table->string('email');
    $table->string('phone', 50)->nullable();

    // MÓDULOS ATIVOS (JSONB)
    $table->jsonb('active_modules')->default('[]');
    // Exemplo: ["customers", "catalog", "inventory", "sales", "invoicing"]

    // PLANO E ASSINATURA
    $table->string('plan', 50)->default('trial'); // trial, starter, business, enterprise
    $table->decimal('monthly_cost', 10, 2)->default(0);
    $table->timestamp('trial_ends_at')->nullable();
    $table->timestamp('next_billing_date')->nullable();

    // STATUS
    $table->enum('status', ['active', 'suspended', 'cancelled'])->default('active');

    $table->timestamps();
    $table->softDeletes();
});
```

### **2. Tabela Global: `module_subscriptions`**

```php
// Migration: public schema
// Histórico detalhado de ativações/desativações

Schema::create('module_subscriptions', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->uuid('tenant_id');
    $table->string('module_code', 50); // 'customers', 'catalog', etc

    // DATAS
    $table->timestamp('activated_at')->nullable();
    $table->timestamp('deactivated_at')->nullable();
    $table->date('billing_start_date')->nullable();

    // VALORES
    $table->decimal('setup_fee', 10, 2)->default(0);
    $table->decimal('monthly_fee', 10, 2);
    $table->decimal('prorata_amount', 10, 2)->nullable(); // Para ativação no meio do mês

    // STATUS
    $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');

    // METADATA
    $table->json('metadata')->nullable(); // Config específica do módulo
    $table->uuid('activated_by_user_id')->nullable(); // Quem ativou
    $table->uuid('deactivated_by_user_id')->nullable(); // Quem desativou
    $table->text('deactivation_reason')->nullable();

    $table->timestamps();

    $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');

    $table->index(['tenant_id', 'module_code', 'status']);
});
```

### **3. Tabela Global: `module_definitions`**

```php
// Migration: public schema
// Catálogo de módulos disponíveis

Schema::create('module_definitions', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('code', 50)->unique(); // 'customers', 'catalog', etc
    $table->string('name'); // 'Clientes', 'Catálogo'
    $table->text('description');
    $table->string('icon', 100); // 'fas fa-users'

    // PREÇOS
    $table->decimal('setup_fee', 10, 2);
    $table->decimal('monthly_fee', 10, 2);

    // DEPENDÊNCIAS
    $table->json('required_modules')->default('[]');
    // Ex: 'sales' requer ['catalog', 'customers']

    $table->json('optional_modules')->default('[]');
    // Ex: 'sales' funciona melhor com ['inventory', 'invoicing']

    // CONFIG
    $table->boolean('is_core')->default(false); // Não pode desativar
    $table->boolean('is_available')->default(true);
    $table->integer('sort_order')->default(0);

    // METADATA
    $table->json('features')->nullable(); // Lista de features do módulo
    $table->json('limits')->nullable(); // Limites (ex: max 1000 produtos)

    $table->timestamps();
});
```

---

## 🏗️ Backend Implementation

### **1. Model: Tenant**

```php
// app/Models/Tenant.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    protected $casts = [
        'active_modules' => 'array',
        'trial_ends_at' => 'datetime',
        'next_billing_date' => 'datetime',
    ];

    // MÓDULOS ATIVOS
    public function hasModule(string $moduleCode): bool
    {
        return in_array($moduleCode, $this->active_modules ?? []);
    }

    public function activateModule(string $moduleCode, ?User $activatedBy = null): bool
    {
        // Verifica se já está ativo
        if ($this->hasModule($moduleCode)) {
            return false;
        }

        // Verifica dependências
        $module = ModuleDefinition::where('code', $moduleCode)->first();
        if (!$module) {
            throw new \Exception("Módulo '{$moduleCode}' não encontrado.");
        }

        foreach ($module->required_modules as $requiredModule) {
            if (!$this->hasModule($requiredModule)) {
                throw new \Exception("Módulo '{$requiredModule}' é obrigatório para ativar '{$moduleCode}'.");
            }
        }

        // Adiciona aos módulos ativos
        $activeModules = $this->active_modules ?? [];
        $activeModules[] = $moduleCode;
        $this->active_modules = array_unique($activeModules);

        // Calcula custo pro-rata
        $prorataAmount = $this->calculateProrata($module->monthly_fee);

        // Atualiza custo mensal
        $this->monthly_cost += $module->monthly_fee;
        $this->save();

        // Cria registro de subscription
        ModuleSubscription::create([
            'tenant_id' => $this->id,
            'module_code' => $moduleCode,
            'activated_at' => now(),
            'billing_start_date' => now(),
            'setup_fee' => $module->setup_fee,
            'monthly_fee' => $module->monthly_fee,
            'prorata_amount' => $prorataAmount,
            'status' => 'active',
            'activated_by_user_id' => $activatedBy?->id,
        ]);

        // Dispara evento
        event(new ModuleActivated($this, $moduleCode));

        return true;
    }

    public function deactivateModule(string $moduleCode, ?User $deactivatedBy = null, ?string $reason = null): bool
    {
        // Verifica se está ativo
        if (!$this->hasModule($moduleCode)) {
            return false;
        }

        // Verifica se outros módulos dependem deste
        $dependentModules = ModuleDefinition::whereJsonContains('required_modules', $moduleCode)->get();
        foreach ($dependentModules as $dependentModule) {
            if ($this->hasModule($dependentModule->code)) {
                throw new \Exception("Não é possível desativar '{$moduleCode}'. O módulo '{$dependentModule->name}' depende dele.");
            }
        }

        // Remove dos módulos ativos
        $activeModules = $this->active_modules ?? [];
        $activeModules = array_filter($activeModules, fn($m) => $m !== $moduleCode);
        $this->active_modules = array_values($activeModules);

        // Atualiza custo mensal
        $module = ModuleDefinition::where('code', $moduleCode)->first();
        $this->monthly_cost -= $module->monthly_fee;
        $this->save();

        // Atualiza subscription
        $subscription = ModuleSubscription::where('tenant_id', $this->id)
            ->where('module_code', $moduleCode)
            ->where('status', 'active')
            ->latest()
            ->first();

        if ($subscription) {
            $subscription->update([
                'deactivated_at' => now(),
                'status' => 'inactive',
                'deactivated_by_user_id' => $deactivatedBy?->id,
                'deactivation_reason' => $reason,
            ]);
        }

        // Dispara evento
        event(new ModuleDeactivated($this, $moduleCode));

        return true;
    }

    public function getAvailableModules(): array
    {
        return ModuleDefinition::where('is_available', true)
            ->whereNotIn('code', $this->active_modules ?? [])
            ->orderBy('sort_order')
            ->get()
            ->toArray();
    }

    public function getActiveModulesDetails(): array
    {
        return ModuleDefinition::whereIn('code', $this->active_modules ?? [])
            ->orderBy('sort_order')
            ->get()
            ->toArray();
    }

    private function calculateProrata(float $monthlyFee): float
    {
        // Calcula proporcional aos dias restantes do mês
        $today = now();
        $daysInMonth = $today->daysInMonth;
        $daysRemaining = $daysInMonth - $today->day + 1;

        return ($monthlyFee / $daysInMonth) * $daysRemaining;
    }

    // Relationships
    public function moduleSubscriptions()
    {
        return $this->hasMany(ModuleSubscription::class);
    }

    public function activeSubscriptions()
    {
        return $this->moduleSubscriptions()->where('status', 'active');
    }
}
```

### **2. Model: ModuleDefinition**

```php
// app/Models/ModuleDefinition.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModuleDefinition extends Model
{
    protected $fillable = [
        'code', 'name', 'description', 'icon',
        'setup_fee', 'monthly_fee',
        'required_modules', 'optional_modules',
        'is_core', 'is_available', 'sort_order',
        'features', 'limits'
    ];

    protected $casts = [
        'setup_fee' => 'decimal:2',
        'monthly_fee' => 'decimal:2',
        'required_modules' => 'array',
        'optional_modules' => 'array',
        'features' => 'array',
        'limits' => 'array',
        'is_core' => 'boolean',
        'is_available' => 'boolean',
    ];

    public function canBeActivated(Tenant $tenant): bool
    {
        // Verifica dependências
        foreach ($this->required_modules as $requiredModule) {
            if (!$tenant->hasModule($requiredModule)) {
                return false;
            }
        }

        return true;
    }

    public function getMissingDependencies(Tenant $tenant): array
    {
        $missing = [];
        foreach ($this->required_modules as $requiredModule) {
            if (!$tenant->hasModule($requiredModule)) {
                $missing[] = self::where('code', $requiredModule)->first()->name;
            }
        }
        return $missing;
    }
}
```

### **3. Middleware: EnsureModuleIsActive**

```php
// app/Http/Middleware/EnsureModuleIsActive.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureModuleIsActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $moduleCode
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $moduleCode)
    {
        $tenant = tenancy()->tenant;

        if (!$tenant) {
            abort(403, 'Tenant não encontrado.');
        }

        if (!$tenant->hasModule($moduleCode)) {
            // Se for request AJAX/API
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => "O módulo '{$moduleCode}' não está ativo para sua empresa.",
                    'module_code' => $moduleCode,
                    'upgrade_url' => route('billing.modules'),
                ], 403);
            }

            // Se for request web
            return redirect()
                ->route('billing.modules')
                ->with('error', "O módulo '{$moduleCode}' não está ativo. Por favor, contrate para ter acesso.");
        }

        return $next($request);
    }
}
```

### **4. Routes com Middleware**

```php
// routes/web.php

use App\Http\Middleware\EnsureModuleIsActive;

// CATALOG
Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    'auth:sanctum',
    EnsureModuleIsActive::class . ':catalog',
])->prefix('catalog')->name('catalog.')->group(function () {
    Route::resource('items', ItemController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('brands', BrandController::class);
});

// CUSTOMERS
Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    'auth:sanctum',
    EnsureModuleIsActive::class . ':customers',
])->prefix('customers')->name('customers.')->group(function () {
    Route::resource('customers', CustomerController::class);
    Route::get('{customer}/history', [CustomerController::class, 'history'])->name('history');
});

// INVENTORY
Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    'auth:sanctum',
    EnsureModuleIsActive::class . ':inventory',
])->prefix('inventory')->name('inventory.')->group(function () {
    Route::get('dashboard', [InventoryController::class, 'dashboard'])->name('dashboard');
    Route::resource('warehouses', WarehouseController::class);
    Route::resource('movements', InventoryMovementController::class);
});

// SALES
Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    'auth:sanctum',
    EnsureModuleIsActive::class . ':sales',
])->prefix('sales')->name('sales.')->group(function () {
    Route::get('pos', [SaleController::class, 'pos'])->name('pos');
    Route::resource('sales', SaleController::class);
});

// ... etc para todos os módulos
```

### **5. Controller: ModuleSubscriptionController**

```php
// app/Http/Controllers/ModuleSubscriptionController.php
namespace App\Http\Controllers;

use App\Models\ModuleDefinition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleSubscriptionController extends Controller
{
    public function index()
    {
        $tenant = tenancy()->tenant;

        return Inertia::render('Billing/Modules/Index', [
            'activeModules' => $tenant->getActiveModulesDetails(),
            'availableModules' => $tenant->getAvailableModules(),
            'monthlyCost' => $tenant->monthly_cost,
            'subscriptions' => $tenant->activeSubscriptions()
                ->with('module')
                ->get(),
        ]);
    }

    public function activate(Request $request, string $moduleCode)
    {
        $request->validate([
            'accept_terms' => 'required|accepted',
        ]);

        $tenant = tenancy()->tenant;
        $module = ModuleDefinition::where('code', $moduleCode)->firstOrFail();

        try {
            // Verifica dependências
            if (!$module->canBeActivated($tenant)) {
                $missing = $module->getMissingDependencies($tenant);
                return back()->with('error',
                    "Para ativar '{$module->name}', você precisa primeiro ativar: " .
                    implode(', ', $missing)
                );
            }

            // Ativa módulo
            $tenant->activateModule($moduleCode, auth()->user());

            // Gera fatura (setup fee + pro-rata)
            $subscription = $tenant->moduleSubscriptions()
                ->where('module_code', $moduleCode)
                ->latest()
                ->first();

            $totalDue = $subscription->setup_fee + $subscription->prorata_amount;

            return redirect()
                ->route('billing.payment', ['amount' => $totalDue])
                ->with('success', "Módulo '{$module->name}' ativado com sucesso! Total a pagar: {$totalDue} USD");

        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function deactivate(Request $request, string $moduleCode)
    {
        $request->validate([
            'reason' => 'nullable|string|max:500',
            'confirm' => 'required|accepted',
        ]);

        $tenant = tenancy()->tenant;
        $module = ModuleDefinition::where('code', $moduleCode)->firstOrFail();

        try {
            $tenant->deactivateModule(
                $moduleCode,
                auth()->user(),
                $request->input('reason')
            );

            return redirect()
                ->route('billing.modules')
                ->with('success', "Módulo '{$module->name}' desativado. Seus dados foram preservados e você pode reativar a qualquer momento.");

        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
```

---

## 🎨 Frontend Implementation

### **1. Página: Billing/Modules/Index.tsx**

```typescript
// resources/js/Pages/Billing/Modules/Index.tsx
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Module {
    id: string;
    code: string;
    name: string;
    description: string;
    icon: string;
    setup_fee: number;
    monthly_fee: number;
    required_modules: string[];
    features: string[];
}

interface Props {
    activeModules: Module[];
    availableModules: Module[];
    monthlyCost: number;
}

export default function Index({ activeModules, availableModules, monthlyCost }: Props) {
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);

    const handleActivate = (moduleCode: string) => {
        if (confirm('Deseja ativar este módulo?')) {
            router.post(route('billing.modules.activate', moduleCode), {
                accept_terms: true,
            });
        }
    };

    const handleDeactivate = (moduleCode: string) => {
        const reason = prompt('Por que deseja desativar este módulo?');
        if (reason !== null) {
            router.delete(route('billing.modules.deactivate', moduleCode), {
                data: { reason, confirm: true },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Gestão de Módulos</h2>}
        >
            <Head title="Módulos" />

            <div className="py-6">
                {/* Custo Mensal */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-600 font-medium">Custo Mensal Atual</p>
                            <p className="text-3xl font-bold text-blue-900 mt-1">
                                {monthlyCost.toFixed(2)} USD
                            </p>
                        </div>
                        <i className="fas fa-dollar-sign text-5xl text-blue-300"></i>
                    </div>
                </div>

                {/* Módulos Ativos */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Módulos Ativos ({activeModules.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeModules.map((module) => (
                            <div key={module.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <i className={`${module.icon} text-2xl text-green-600 mr-3`}></i>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{module.name}</h4>
                                            <span className="text-xs text-green-600 font-medium">ATIVO</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4">{module.description}</p>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-semibold text-gray-900">
                                        {module.monthly_fee} USD/mês
                                    </span>
                                    <button
                                        onClick={() => handleDeactivate(module.code)}
                                        className="text-red-600 hover:text-red-700 text-xs"
                                    >
                                        Desativar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Módulos Disponíveis */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Módulos Disponíveis ({availableModules.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {availableModules.map((module) => (
                            <div key={module.id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <i className={`${module.icon} text-2xl text-gray-400 mr-3`}></i>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{module.name}</h4>
                                            <span className="text-xs text-gray-500">DISPONÍVEL</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4">{module.description}</p>

                                {/* Features */}
                                {module.features && module.features.length > 0 && (
                                    <ul className="text-xs text-gray-600 mb-4 space-y-1">
                                        {module.features.slice(0, 3).map((feature, i) => (
                                            <li key={i} className="flex items-center">
                                                <i className="fas fa-check text-green-500 mr-2"></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Preços */}
                                <div className="border-t border-gray-200 pt-4 mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Setup:</span>
                                        <span className="font-semibold">{module.setup_fee} USD</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Mensal:</span>
                                        <span className="font-semibold text-blue-600">
                                            {module.monthly_fee} USD
                                        </span>
                                    </div>
                                </div>

                                {/* Dependências */}
                                {module.required_modules.length > 0 && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-4">
                                        <p className="text-xs text-yellow-800">
                                            <i className="fas fa-info-circle mr-1"></i>
                                            Requer: {module.required_modules.join(', ')}
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={() => handleActivate(module.code)}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    <i className="fas fa-plus mr-2"></i>
                                    Ativar Módulo
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

### **2. Componente: ModuleLockedState**

```typescript
// resources/js/Components/ModuleLockedState.tsx
import { Link } from '@inertiajs/react';

interface Props {
    moduleName: string;
    moduleIcon: string;
    setupFee: number;
    monthlyFee: number;
}

export default function ModuleLockedState({ moduleName, moduleIcon, setupFee, monthlyFee }: Props) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-md">
                <div className="bg-gray-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
                    <i className={`${moduleIcon} text-4xl text-gray-400`}></i>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Módulo {moduleName} Não Ativo
                </h3>

                <p className="text-gray-600 mb-6">
                    Este módulo não está ativo para sua empresa.
                    Ative agora para ter acesso a todas as funcionalidades.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Taxa de Setup:</span>
                        <span className="font-semibold">{setupFee} USD</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Mensalidade:</span>
                        <span className="font-semibold text-blue-600">{monthlyFee} USD/mês</span>
                    </div>
                </div>

                <Link
                    href={route('billing.modules')}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <i className="fas fa-unlock mr-2"></i>
                    Ativar Módulo
                </Link>
            </div>
        </div>
    );
}
```

---

## 🔔 Events & Listeners

### **1. Events**

```php
// app/Events/ModuleActivated.php
namespace App\Events;

use App\Models\Tenant;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ModuleActivated
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Tenant $tenant,
        public string $moduleCode,
    ) {}
}

// app/Events/ModuleDeactivated.php
namespace App\Events;

use App\Models\Tenant;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ModuleDeactivated
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Tenant $tenant,
        public string $moduleCode,
    ) {}
}
```

### **2. Listeners**

```php
// app/Listeners/SendModuleActivationNotification.php
namespace App\Listeners;

use App\Events\ModuleActivated;
use App\Notifications\ModuleActivatedNotification;

class SendModuleActivationNotification
{
    public function handle(ModuleActivated $event): void
    {
        // Notifica admin da empresa
        $adminUsers = $event->tenant->users()
            ->where('role', 'admin')
            ->get();

        foreach ($adminUsers as $user) {
            $user->notify(new ModuleActivatedNotification($event->moduleCode));
        }

        // Log
        \Log::info("Module {$event->moduleCode} activated for tenant {$event->tenant->id}");
    }
}

// app/Listeners/RunModuleSetup.php
namespace App\Listeners;

use App\Events\ModuleActivated;

class RunModuleSetup
{
    public function handle(ModuleActivated $event): void
    {
        // Executa setup específico do módulo (se necessário)

        switch ($event->moduleCode) {
            case 'inventory':
                // Criar armazém padrão
                $event->tenant->run(function ($tenant) {
                    \App\Models\Warehouse::create([
                        'code' => 'ARM-01',
                        'name' => 'Armazém Principal',
                        'is_default' => true,
                    ]);
                });
                break;

            case 'financial':
                // Criar conta bancária padrão
                $event->tenant->run(function ($tenant) {
                    \App\Models\BankAccount::create([
                        'name' => 'Conta Principal',
                        'account_number' => 'PENDING',
                        'is_default' => true,
                    ]);
                });
                break;
        }
    }
}
```

---

## 📊 Seeder: ModuleDefinitions

```php
// database/seeders/ModuleDefinitionSeeder.php
namespace Database\Seeders;

use App\Models\ModuleDefinition;
use Illuminate\Database\Seeder;

class ModuleDefinitionSeeder extends Seeder
{
    public function run(): void
    {
        $modules = [
            [
                'code' => 'customers',
                'name' => 'Clientes (CRM)',
                'description' => 'Gestão completa de clientes, leads e histórico de interações.',
                'icon' => 'fas fa-users',
                'setup_fee' => 800,
                'monthly_fee' => 200,
                'required_modules' => [],
                'is_core' => true, // Não pode desativar
                'sort_order' => 1,
                'features' => [
                    'Cadastro PF/PJ',
                    'Múltiplos endereços e contatos',
                    'Limite de crédito',
                    'Histórico de compras',
                    'Categorização',
                ],
            ],
            [
                'code' => 'catalog',
                'name' => 'Catálogo',
                'description' => 'Gestão de produtos, serviços, categorias e tabelas de preço.',
                'icon' => 'fas fa-book',
                'setup_fee' => 600,
                'monthly_fee' => 150,
                'required_modules' => [],
                'is_core' => true,
                'sort_order' => 2,
                'features' => [
                    'Produtos e serviços',
                    'Categorias hierárquicas',
                    'Múltiplas tabelas de preço',
                    'Código de barras',
                    'Upload de imagens',
                ],
            ],
            [
                'code' => 'inventory',
                'name' => 'Estoque',
                'description' => 'Controlo de estoque multi-armazém com rastreamento por lote e série.',
                'icon' => 'fas fa-boxes',
                'setup_fee' => 1200,
                'monthly_fee' => 500,
                'required_modules' => ['catalog'],
                'optional_modules' => ['purchasing'],
                'sort_order' => 3,
                'features' => [
                    'Múltiplos armazéns',
                    'Rastreamento por lote/série',
                    'Alertas de estoque baixo',
                    'Inventário físico',
                    'Controlo de custos (FIFO/LIFO/Médio)',
                ],
            ],
            [
                'code' => 'sales',
                'name' => 'Vendas (POS)',
                'description' => 'Ponto de venda, cotações e gestão completa de vendas.',
                'icon' => 'fas fa-shopping-cart',
                'setup_fee' => 1000,
                'monthly_fee' => 400,
                'required_modules' => ['catalog', 'customers'],
                'optional_modules' => ['inventory', 'invoicing'],
                'sort_order' => 4,
                'features' => [
                    'POS touch-friendly',
                    'Múltiplas formas de pagamento',
                    'M-Pesa e E-Mola',
                    'Cotações e orçamentos',
                    'Devoluções',
                ],
            ],
            [
                'code' => 'invoicing',
                'name' => 'Faturação',
                'description' => 'Emissão de documentos fiscais conformes com AT.',
                'icon' => 'fas fa-file-invoice',
                'setup_fee' => 1500,
                'monthly_fee' => 350,
                'required_modules' => ['sales'],
                'sort_order' => 5,
                'features' => [
                    'Faturas, recibos, notas de crédito',
                    'Numeração sequencial automática',
                    'QR Code fiscal, Hash, ATCUD',
                    'Geração de PDF',
                    'Relatórios para AT',
                ],
            ],
            [
                'code' => 'financial',
                'name' => 'Financeiro',
                'description' => 'Gestão financeira completa com DRE, Balanço e DFC.',
                'icon' => 'fas fa-money-bill-wave',
                'setup_fee' => 1300,
                'monthly_fee' => 450,
                'required_modules' => ['customers'],
                'optional_modules' => ['sales', 'purchasing'],
                'sort_order' => 6,
                'features' => [
                    'Contas a receber/pagar',
                    'Fluxo de caixa projetado',
                    'Múltiplas contas bancárias',
                    'DRE, Balanço, DFC',
                    'Gestão de cobrança',
                ],
            ],
            [
                'code' => 'assets',
                'name' => 'Activos Fixos',
                'description' => 'Gestão de activos fixos com depreciação automática.',
                'icon' => 'fas fa-building',
                'setup_fee' => 1000,
                'monthly_fee' => 300,
                'required_modules' => ['financial'],
                'optional_modules' => ['purchasing'],
                'sort_order' => 7,
                'features' => [
                    'Cadastro de activos',
                    'Depreciação automática',
                    'Manutenção programada',
                    'Rastreamento de localização',
                    'Upload de documentos',
                ],
            ],
            [
                'code' => 'purchasing',
                'name' => 'Compras',
                'description' => 'Gestão de compras com workflow de aprovação.',
                'icon' => 'fas fa-shopping-bag',
                'setup_fee' => 900,
                'monthly_fee' => 350,
                'required_modules' => ['catalog'],
                'optional_modules' => ['inventory', 'financial'],
                'sort_order' => 8,
                'features' => [
                    'Gestão de fornecedores',
                    'Requisições de compra',
                    'Ordens de compra',
                    'Workflow de aprovação',
                    'Recebimento de mercadorias',
                ],
            ],
            [
                'code' => 'reports',
                'name' => 'Relatórios',
                'description' => 'Relatórios gerenciais, operacionais e fiscais.',
                'icon' => 'fas fa-chart-bar',
                'setup_fee' => 800,
                'monthly_fee' => 250,
                'required_modules' => [],
                'sort_order' => 9,
                'features' => [
                    'Dashboard executivo',
                    'Análise de vendas/compras',
                    'Relatórios fiscais (SAF-T MZ)',
                    'Export Excel/PDF',
                    'Agendamento automático',
                ],
            ],
        ];

        foreach ($modules as $module) {
            ModuleDefinition::updateOrCreate(
                ['code' => $module['code']],
                $module
            );
        }
    }
}
```

---

## ✅ Resumo do Fluxo

### **Ativação de Módulo:**

```
1. User acessa /billing/modules
2. User clica em "Ativar Módulo X"
3. Sistema verifica dependências
4. Sistema calcula pro-rata
5. Sistema atualiza tenant.active_modules
6. Sistema cria ModuleSubscription
7. Sistema dispara evento ModuleActivated
8. Listeners executam (notificação, setup)
9. Sistema gera fatura (setup + pro-rata)
10. User é redirecionado para pagamento
11. ✅ Módulo ATIVO!
```

### **Desativação de Módulo:**

```
1. User acessa /billing/modules
2. User clica em "Desativar Módulo X"
3. User confirma e informa motivo
4. Sistema verifica dependências (outros módulos)
5. Sistema atualiza tenant.active_modules
6. Sistema atualiza ModuleSubscription (status=inactive)
7. Sistema dispara evento ModuleDeactivated
8. ⚠️ Dados NÃO são deletados!
9. ✅ Módulo DESATIVADO (pode reativar depois)
```

### **Bloqueio de Acesso:**

```
1. User tenta acessar /inventory/dashboard
2. Middleware EnsureModuleIsActive verifica
3. Tenant não tem 'inventory' em active_modules
4. ❌ Acesso negado!
5. User é redirecionado para /billing/modules
6. Mensagem: "Ative o módulo Estoque para ter acesso"
```

---

**Sistema completo de ativação/desativação modular! 🔌✨**
