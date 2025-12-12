# 🏗️ Desenvolvimento Modular - Arquitetura em Profundidade

---

## 🎯 Conceito de Desenvolvimento Modular

### **O Que É?**

Cada módulo é **autocontido** e **independente**, com sua própria estrutura de:

- Models
- Migrations
- Controllers
- Services
- Events/Listeners
- Views/Pages
- Routes
- Tests

**Vantagens:**

- ✅ Desenvolvimento paralelo (equipes diferentes)
- ✅ Fácil manutenção (bug em um módulo não afeta outros)
- ✅ Deploy independente (atualizar só um módulo)
- ✅ Reuso (módulos podem ser usados em outros projetos)
- ✅ Testes isolados

---

## 📁 Estrutura de Diretórios Modular

### **Opção 1: Laravel Modules Package (Recomendado)**

```bash
composer require nwidart/laravel-modules
php artisan module:make Catalog
```

```
kutenga-erp/
├── app/
│   ├── Core/                    # Código compartilhado
│   │   ├── Models/
│   │   │   └── BaseModel.php
│   │   ├── Services/
│   │   │   └── BaseService.php
│   │   ├── Traits/
│   │   │   ├── HasUuid.php
│   │   │   └── BelongsToTenant.php
│   │   └── Contracts/
│   │       └── ModuleInterface.php
│   │
│   └── Providers/
│       ├── AppServiceProvider.php
│       └── EventServiceProvider.php
│
├── Modules/                     # MÓDULOS (cada um independente)
│   │
│   ├── Catalog/                 # 📚 MÓDULO CATALOG
│   │   ├── Config/
│   │   │   └── config.php
│   │   ├── Database/
│   │   │   ├── Migrations/
│   │   │   │   ├── 2024_01_01_create_items_table.php
│   │   │   │   ├── 2024_01_02_create_categories_table.php
│   │   │   │   └── 2024_01_03_create_brands_table.php
│   │   │   ├── Seeders/
│   │   │   │   ├── CategorySeeder.php
│   │   │   │   └── BrandSeeder.php
│   │   │   └── Factories/
│   │   │       └── ItemFactory.php
│   │   ├── Entities/            # Models
│   │   │   ├── Item.php
│   │   │   ├── Product.php
│   │   │   ├── Service.php
│   │   │   ├── Category.php
│   │   │   └── Brand.php
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── ItemController.php
│   │   │   │   ├── CategoryController.php
│   │   │   │   └── BrandController.php
│   │   │   ├── Requests/
│   │   │   │   ├── StoreItemRequest.php
│   │   │   │   └── UpdateItemRequest.php
│   │   │   └── Resources/
│   │   │       └── ItemResource.php
│   │   ├── Services/
│   │   │   ├── ItemService.php
│   │   │   └── CategoryService.php
│   │   ├── Repositories/
│   │   │   ├── Contracts/
│   │   │   │   └── ItemRepositoryInterface.php
│   │   │   └── Eloquent/
│   │   │       └── ItemRepository.php
│   │   ├── Events/
│   │   │   ├── ItemCreated.php
│   │   │   └── ItemDeleted.php
│   │   ├── Listeners/
│   │   │   └── UpdateRelatedData.php
│   │   ├── Providers/
│   │   │   ├── CatalogServiceProvider.php
│   │   │   └── RouteServiceProvider.php
│   │   ├── Routes/
│   │   │   ├── api.php
│   │   │   └── web.php
│   │   ├── Resources/           # Frontend (React)
│   │   │   ├── js/
│   │   │   │   ├── Pages/
│   │   │   │   │   ├── Items/
│   │   │   │   │   │   ├── Index.tsx
│   │   │   │   │   │   ├── Create.tsx
│   │   │   │   │   │   ├── Edit.tsx
│   │   │   │   │   │   └── Show.tsx
│   │   │   │   │   └── Categories/
│   │   │   │   │       └── Index.tsx
│   │   │   │   ├── Components/
│   │   │   │   │   ├── ItemForm.tsx
│   │   │   │   │   ├── ItemsTable.tsx
│   │   │   │   │   └── CategorySelect.tsx
│   │   │   │   └── Types/
│   │   │   │       └── index.ts
│   │   │   └── lang/
│   │   │       └── pt_MZ.json
│   │   ├── Tests/
│   │   │   ├── Unit/
│   │   │   │   ├── ItemTest.php
│   │   │   │   └── CategoryTest.php
│   │   │   └── Feature/
│   │   │       ├── ItemControllerTest.php
│   │   │       └── CategoryControllerTest.php
│   │   ├── composer.json        # Dependências específicas
│   │   ├── module.json          # Metadata do módulo
│   │   └── README.md
│   │
│   ├── Customers/               # 👥 MÓDULO CUSTOMERS
│   │   ├── Config/
│   │   ├── Database/
│   │   │   └── Migrations/
│   │   │       ├── 2024_01_04_create_customers_table.php
│   │   │       ├── 2024_01_05_create_customer_addresses_table.php
│   │   │       └── 2024_01_06_create_customer_contacts_table.php
│   │   ├── Entities/
│   │   │   ├── Customer.php
│   │   │   ├── CustomerAddress.php
│   │   │   └── CustomerContact.php
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── CustomerController.php
│   │   ├── Services/
│   │   │   └── CustomerService.php
│   │   ├── Events/
│   │   │   ├── CustomerCreated.php
│   │   │   └── CustomerBlocked.php
│   │   ├── Routes/
│   │   │   └── web.php
│   │   ├── Resources/
│   │   │   └── js/
│   │   │       └── Pages/
│   │   │           └── Customers/
│   │   ├── Tests/
│   │   ├── module.json
│   │   └── README.md
│   │
│   ├── Inventory/               # 📦 MÓDULO INVENTORY
│   │   ├── Config/
│   │   ├── Database/
│   │   │   └── Migrations/
│   │   │       ├── 2024_01_07_create_warehouses_table.php
│   │   │       ├── 2024_01_08_create_inventory_balances_table.php
│   │   │       ├── 2024_01_09_create_inventory_movements_table.php
│   │   │       ├── 2024_01_10_create_lots_table.php
│   │   │       └── 2024_01_11_create_serial_numbers_table.php
│   │   ├── Entities/
│   │   │   ├── Warehouse.php
│   │   │   ├── InventoryBalance.php
│   │   │   ├── InventoryMovement.php
│   │   │   ├── Lot.php
│   │   │   └── SerialNumber.php
│   │   ├── Services/
│   │   │   ├── InventoryService.php
│   │   │   └── MovementService.php
│   │   ├── Events/
│   │   │   ├── StockLevelLow.php
│   │   │   └── StockOut.php
│   │   ├── Listeners/
│   │   │   ├── UpdateInventoryOnSaleConfirmed.php
│   │   │   └── SendLowStockAlert.php
│   │   ├── Jobs/
│   │   │   └── CalculateInventoryValue.php
│   │   ├── Routes/
│   │   ├── Resources/
│   │   ├── Tests/
│   │   ├── module.json
│   │   └── README.md
│   │
│   ├── Sales/                   # 💰 MÓDULO SALES
│   │   ├── ...
│   │   └── module.json
│   │
│   ├── Invoicing/               # 📄 MÓDULO INVOICING
│   │   ├── ...
│   │   └── module.json
│   │
│   ├── Financial/               # 💵 MÓDULO FINANCIAL
│   │   ├── ...
│   │   └── module.json
│   │
│   ├── Assets/                  # 🏢 MÓDULO ASSETS
│   │   ├── ...
│   │   └── module.json
│   │
│   ├── Purchasing/              # 🛒 MÓDULO PURCHASING
│   │   ├── ...
│   │   └── module.json
│   │
│   └── Reports/                 # 📊 MÓDULO REPORTS
│       ├── ...
│       └── module.json
│
├── resources/
│   └── js/
│       ├── Components/          # Componentes compartilhados
│       │   ├── Layout/
│       │   │   ├── Sidebar.tsx
│       │   │   └── Header.tsx
│       │   ├── Common/
│       │   │   ├── Button.tsx
│       │   │   ├── Input.tsx
│       │   │   └── Table.tsx
│       │   └── Forms/
│       │       └── FormField.tsx
│       ├── Hooks/
│       │   ├── useAuth.ts
│       │   └── useTenant.ts
│       └── Types/
│           └── global.d.ts
│
├── config/
│   └── modules.php              # Configuração global de módulos
│
└── composer.json
```

---

## 📄 Arquivo de Configuração do Módulo

### **Modules/Catalog/module.json**

```json
{
    "name": "Catalog",
    "alias": "catalog",
    "description": "Product and service catalog management",
    "keywords": ["catalog", "products", "services", "inventory"],
    "version": "1.0.0",
    "active": true,
    "order": 1,
    "providers": [
        "Modules\\Catalog\\Providers\\CatalogServiceProvider",
        "Modules\\Catalog\\Providers\\RouteServiceProvider"
    ],
    "aliases": {},
    "files": [],
    "requires": [],
    "dependencies": {
        "modules": [],
        "packages": []
    },
    "config": {
        "max_images_per_item": 10,
        "default_vat_rate": 16,
        "enable_barcode_scanner": true,
        "enable_multi_currency": false
    },
    "permissions": [
        "catalog.items.view",
        "catalog.items.create",
        "catalog.items.edit",
        "catalog.items.delete",
        "catalog.categories.manage",
        "catalog.brands.manage"
    ]
}
```

---

## 🔧 Service Provider do Módulo

### **Modules/Catalog/Providers/CatalogServiceProvider.php**

```php
<?php

namespace Modules\Catalog\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Factory;
use Modules\Catalog\Events\ItemCreated;
use Modules\Catalog\Listeners\SyncWithInventory;

class CatalogServiceProvider extends ServiceProvider
{
    /**
     * @var string $moduleName
     */
    protected $moduleName = 'Catalog';

    /**
     * @var string $moduleNameLower
     */
    protected $moduleNameLower = 'catalog';

    /**
     * Boot the application events.
     */
    public function boot(): void
    {
        $this->registerTranslations();
        $this->registerConfig();
        $this->registerViews();
        $this->loadMigrationsFrom(module_path($this->moduleName, 'Database/Migrations'));
        $this->registerEvents();
    }

    /**
     * Register the service provider.
     */
    public function register(): void
    {
        $this->app->register(RouteServiceProvider::class);

        // Registrar repositórios
        $this->app->bind(
            \Modules\Catalog\Repositories\Contracts\ItemRepositoryInterface::class,
            \Modules\Catalog\Repositories\Eloquent\ItemRepository::class
        );
    }

    /**
     * Register config.
     */
    protected function registerConfig(): void
    {
        $this->publishes([
            module_path($this->moduleName, 'Config/config.php') => config_path($this->moduleNameLower . '.php'),
        ], 'config');

        $this->mergeConfigFrom(
            module_path($this->moduleName, 'Config/config.php'),
            $this->moduleNameLower
        );
    }

    /**
     * Register views.
     */
    public function registerViews(): void
    {
        $viewPath = resource_path('views/modules/' . $this->moduleNameLower);

        $sourcePath = module_path($this->moduleName, 'Resources/views');

        $this->publishes([
            $sourcePath => $viewPath
        ], ['views', $this->moduleNameLower . '-module-views']);

        $this->loadViewsFrom(array_merge($this->getPublishableViewPaths(), [$sourcePath]), $this->moduleNameLower);
    }

    /**
     * Register translations.
     */
    public function registerTranslations(): void
    {
        $langPath = resource_path('lang/modules/' . $this->moduleNameLower);

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, $this->moduleNameLower);
        } else {
            $this->loadTranslationsFrom(module_path($this->moduleName, 'Resources/lang'), $this->moduleNameLower);
        }
    }

    /**
     * Register events and listeners.
     */
    protected function registerEvents(): void
    {
        // Eventos internos do módulo
        \Event::listen(ItemCreated::class, SyncWithInventory::class);

        // Escuta eventos de outros módulos (se necessário)
        // \Event::listen(SaleConfirmed::class, UpdateItemSalesCount::class);
    }

    /**
     * Get the services provided by the provider.
     */
    public function provides(): array
    {
        return [];
    }

    private function getPublishableViewPaths(): array
    {
        $paths = [];
        foreach (\Config::get('view.paths') as $path) {
            if (is_dir($path . '/modules/' . $this->moduleNameLower)) {
                $paths[] = $path . '/modules/' . $this->moduleNameLower;
            }
        }
        return $paths;
    }
}
```

---

## 🔗 Comunicação Entre Módulos

### **Princípio: Event-Driven Architecture**

Módulos **NÃO** chamam métodos diretos de outros módulos.  
Comunicação via **Events** e **Listeners**.

### **Exemplo: Sales → Inventory**

#### **1. Sales Module dispara evento**

```php
// Modules/Sales/Entities/Sale.php
namespace Modules\Sales\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Sales\Events\SaleConfirmed;

class Sale extends Model
{
    public function confirm(): void
    {
        $this->status = 'confirmed';
        $this->confirmed_at = now();
        $this->save();

        // Dispara evento (não chama Inventory diretamente!)
        event(new SaleConfirmed($this));
    }
}
```

#### **2. Sales Module define evento**

```php
// Modules/Sales/Events/SaleConfirmed.php
namespace Modules\Sales\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Modules\Sales\Entities\Sale;

class SaleConfirmed
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Sale $sale
    ) {}
}
```

#### **3. Inventory Module escuta evento**

```php
// Modules/Inventory/Listeners/UpdateInventoryOnSaleConfirmed.php
namespace Modules\Inventory\Listeners;

use Modules\Sales\Events\SaleConfirmed;
use Modules\Inventory\Services\InventoryService;

class UpdateInventoryOnSaleConfirmed
{
    public function __construct(
        private InventoryService $inventoryService
    ) {}

    public function handle(SaleConfirmed $event): void
    {
        // Verifica se módulo Inventory está ativo
        if (!tenancy()->tenant->hasModule('inventory')) {
            return;
        }

        $sale = $event->sale;

        foreach ($sale->items as $item) {
            // Só processa se produto controla estoque
            if ($item->product && $item->product->controls_inventory) {
                $this->inventoryService->recordMovement([
                    'type' => 'OUT',
                    'reason' => 'sale',
                    'product_id' => $item->product_id,
                    'warehouse_id' => $sale->warehouse_id,
                    'quantity' => $item->quantity,
                    'reference_type' => 'sale',
                    'reference_id' => $sale->id,
                    'lot_id' => $item->lot_id,
                    'serial_number' => $item->serial_number,
                ]);
            }
        }
    }
}
```

#### **4. Inventory Module registra listener**

```php
// Modules/Inventory/Providers/InventoryServiceProvider.php
protected function registerEvents(): void
{
    // Escuta evento de outro módulo
    \Event::listen(
        \Modules\Sales\Events\SaleConfirmed::class,
        \Modules\Inventory\Listeners\UpdateInventoryOnSaleConfirmed::class
    );
}
```

---

## 🎨 Frontend Modular

### **Compartilhamento de Componentes**

#### **1. Componentes Globais (Compartilhados)**

```typescript
// resources/js/Components/Common/Button.tsx
export default function Button({
    children,
    variant = 'primary',
    onClick,
}: Props) {
    // Usado por TODOS os módulos
}
```

#### **2. Componentes do Módulo (Específicos)**

```typescript
// Modules/Catalog/Resources/js/Components/ItemForm.tsx
export default function ItemForm({ item, onSubmit }: Props) {
    // Usado APENAS pelo módulo Catalog
}
```

#### **3. Importação entre Módulos**

```typescript
// Modules/Sales/Resources/js/Pages/POS/Index.tsx
import { useState } from 'react';
import Button from '@/Components/Common/Button'; // Global
import CustomerSelect from '@Modules/Customers/Components/CustomerSelect'; // Outro módulo

export default function POSIndex() {
    return (
        <div>
            <CustomerSelect onSelect={handleCustomerSelect} />
            <Button onClick={handleFinalizeSale}>Finalizar</Button>
        </div>
    );
}
```

#### **4. Configuração Vite para Módulos**

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.tsx',
                'Modules/Catalog/Resources/js/app.tsx',
                'Modules/Customers/Resources/js/app.tsx',
                'Modules/Inventory/Resources/js/app.tsx',
                'Modules/Sales/Resources/js/app.tsx',
                // ... outros módulos
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            '@Modules': path.resolve(__dirname, './Modules'),
        },
    },
});
```

---

## 🧪 Testes Modulares

### **1. Testes do Módulo Catalog**

```php
// Modules/Catalog/Tests/Feature/ItemControllerTest.php
namespace Modules\Catalog\Tests\Feature;

use Tests\TestCase;
use Modules\Catalog\Entities\Item;
use Modules\Catalog\Entities\Category;

class ItemControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_items(): void
    {
        // Arrange
        $items = Item::factory()->count(5)->create();

        // Act
        $response = $this->actingAs($this->user)
            ->get(route('catalog.items.index'));

        // Assert
        $response->assertOk();
        $response->assertInertia(fn ($page) =>
            $page->component('Catalog/Items/Index')
                ->has('items.data', 5)
        );
    }

    public function test_can_create_item(): void
    {
        // Arrange
        $category = Category::factory()->create();
        $data = [
            'type' => 'product',
            'code' => 'P-001',
            'name' => 'Mouse Logitech',
            'category_id' => $category->id,
            'sale_price' => 45.00,
            'controls_inventory' => true,
        ];

        // Act
        $response = $this->actingAs($this->user)
            ->post(route('catalog.items.store'), $data);

        // Assert
        $response->assertRedirect();
        $this->assertDatabaseHas('items', [
            'code' => 'P-001',
            'name' => 'Mouse Logitech',
        ]);
    }

    public function test_cannot_create_item_with_duplicate_code(): void
    {
        // Arrange
        Item::factory()->create(['code' => 'P-001']);

        $data = [
            'type' => 'product',
            'code' => 'P-001', // Duplicado
            'name' => 'Outro Produto',
            'sale_price' => 50.00,
        ];

        // Act
        $response = $this->actingAs($this->user)
            ->post(route('catalog.items.store'), $data);

        // Assert
        $response->assertSessionHasErrors(['code']);
    }
}
```

### **2. Rodar Testes por Módulo**

```bash
# Testar apenas o módulo Catalog
php artisan test Modules/Catalog/Tests

# Testar todos os módulos
php artisan test Modules/*/Tests

# Testar módulo específico com coverage
php artisan test Modules/Catalog/Tests --coverage
```

---

## 🚀 Deploy Modular

### **Estratégia: Deploy por Módulo**

```bash
# Deploy apenas módulo atualizado

# 1. Atualizar código do módulo
git pull origin main

# 2. Rodar migrations do módulo
php artisan module:migrate Catalog

# 3. Rebuild assets do módulo (se necessário)
npm run build -- Modules/Catalog/Resources/js/app.tsx

# 4. Clear cache
php artisan cache:clear
php artisan config:clear

# 5. Restart queue workers (se houver listeners)
php artisan queue:restart
```

---

## 🔌 Ativação/Desativação em Tempo de Execução

### **Dynamic Module Loading**

```php
// app/Http/Kernel.php
protected $middlewareGroups = [
    'web' => [
        // ...
        \App\Http\Middleware\LoadActiveModules::class,
    ],
];
```

```php
// app/Http/Middleware/LoadActiveModules.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LoadActiveModules
{
    public function handle(Request $request, Closure $next)
    {
        $tenant = tenancy()->tenant;

        if (!$tenant) {
            return $next($request);
        }

        // Carregar apenas módulos ativos
        foreach ($tenant->active_modules as $moduleCode) {
            $moduleClass = "Modules\\" . ucfirst($moduleCode) . "\\Providers\\" . ucfirst($moduleCode) . "ServiceProvider";

            if (class_exists($moduleClass)) {
                // Registrar provider do módulo dinamicamente
                app()->register($moduleClass);
            }
        }

        return $next($request);
    }
}
```

---

## 📊 Dependências Entre Módulos

### **Exemplo: Sales depende de Catalog e Customers**

```json
// Modules/Sales/module.json
{
    "name": "Sales",
    "alias": "sales",
    "version": "1.0.0",
    "dependencies": {
        "modules": [
            "catalog", // Obrigatório
            "customers" // Obrigatório
        ],
        "optional_modules": [
            "inventory", // Opcional (funciona melhor com)
            "invoicing" // Opcional
        ]
    }
}
```

### **Verificação de Dependências**

```php
// app/Services/ModuleManager.php
namespace App\Services;

class ModuleManager
{
    public function canActivateModule(string $moduleCode, Tenant $tenant): array
    {
        $module = \Module::find($moduleCode);
        $missing = [];

        if (!$module) {
            return [
                'can_activate' => false,
                'reason' => 'Módulo não encontrado',
            ];
        }

        // Verifica dependências obrigatórias
        $dependencies = $module->get('dependencies.modules', []);

        foreach ($dependencies as $requiredModule) {
            if (!$tenant->hasModule($requiredModule)) {
                $missing[] = ucfirst($requiredModule);
            }
        }

        if (!empty($missing)) {
            return [
                'can_activate' => false,
                'reason' => 'Dependências faltando: ' . implode(', ', $missing),
                'missing_modules' => $missing,
            ];
        }

        return [
            'can_activate' => true,
        ];
    }
}
```

---

## 🎯 Commands para Gestão de Módulos

### **1. Criar Novo Módulo**

```bash
php artisan module:make Reports

# Cria estrutura completa:
# - Migrations
# - Models
# - Controllers
# - Service Provider
# - Routes
# - Tests
```

### **2. Listar Módulos**

```bash
php artisan module:list

# Output:
# +-------------+---------+---------+
# | Name        | Status  | Order   |
# +-------------+---------+---------+
# | Catalog     | Enabled | 1       |
# | Customers   | Enabled | 2       |
# | Inventory   | Enabled | 3       |
# | Sales       | Enabled | 4       |
# +-------------+---------+---------+
```

### **3. Ativar/Desativar Módulo (Desenvolvimento)**

```bash
# Desativar módulo temporariamente (dev)
php artisan module:disable Reports

# Ativar novamente
php artisan module:enable Reports
```

### **4. Migrar Módulo Específico**

```bash
php artisan module:migrate Catalog
php artisan module:migrate-refresh Catalog
php artisan module:migrate-rollback Catalog
```

### **5. Seed Módulo Específico**

```bash
php artisan module:seed Catalog
```

---

## 🧩 Exemplo Completo: Criar Módulo Reports

### **Passo 1: Criar Estrutura**

```bash
php artisan module:make Reports
```

### **Passo 2: Definir module.json**

```json
{
    "name": "Reports",
    "alias": "reports",
    "description": "Business Intelligence and Reporting",
    "version": "1.0.0",
    "active": true,
    "order": 9,
    "dependencies": {
        "modules": [],
        "optional_modules": ["sales", "financial", "inventory"]
    },
    "permissions": ["reports.view", "reports.export", "reports.schedule"]
}
```

### **Passo 3: Criar Migration**

```php
// Modules/Reports/Database/Migrations/2024_01_20_create_saved_reports_table.php
Schema::create('saved_reports', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('name');
    $table->string('report_type');
    $table->json('filters');
    $table->string('schedule_frequency')->nullable();
    $table->json('recipients')->nullable();
    $table->timestamp('last_generated_at')->nullable();
    $table->uuid('created_by_user_id');
    $table->timestamps();
});
```

### **Passo 4: Criar Model**

```php
// Modules/Reports/Entities/SavedReport.php
namespace Modules\Reports\Entities;

use Illuminate\Database\Eloquent\Model;

class SavedReport extends Model
{
    protected $fillable = [
        'name', 'report_type', 'filters',
        'schedule_frequency', 'recipients',
        'last_generated_at', 'created_by_user_id'
    ];

    protected $casts = [
        'filters' => 'array',
        'recipients' => 'array',
        'last_generated_at' => 'datetime',
    ];
}
```

### **Passo 5: Criar Controller**

```php
// Modules/Reports/Http/Controllers/ReportController.php
namespace Modules\Reports\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Reports\Services\ReportService;

class ReportController extends Controller
{
    public function __construct(
        private ReportService $reportService
    ) {}

    public function index()
    {
        return Inertia::render('Reports/Index', [
            'reports' => $this->reportService->getAvailableReports(),
        ]);
    }

    public function generate(Request $request, string $reportType)
    {
        $data = $this->reportService->generate($reportType, $request->all());

        return response()->json($data);
    }
}
```

### **Passo 6: Criar Service**

```php
// Modules/Reports/Services/ReportService.php
namespace Modules\Reports\Services;

class ReportService
{
    public function getAvailableReports(): array
    {
        $tenant = tenancy()->tenant;
        $reports = [];

        // Relatórios dependem de módulos ativos
        if ($tenant->hasModule('sales')) {
            $reports[] = [
                'type' => 'sales_analysis',
                'name' => 'Análise de Vendas',
                'icon' => 'fas fa-chart-line',
            ];
        }

        if ($tenant->hasModule('inventory')) {
            $reports[] = [
                'type' => 'inventory_valuation',
                'name' => 'Valorização de Estoque',
                'icon' => 'fas fa-boxes',
            ];
        }

        if ($tenant->hasModule('financial')) {
            $reports[] = [
                'type' => 'dre',
                'name' => 'DRE',
                'icon' => 'fas fa-file-invoice-dollar',
            ];
        }

        return $reports;
    }

    public function generate(string $reportType, array $filters): array
    {
        // Lógica de geração conforme tipo
        return match($reportType) {
            'sales_analysis' => $this->generateSalesAnalysis($filters),
            'inventory_valuation' => $this->generateInventoryValuation($filters),
            'dre' => $this->generateDRE($filters),
            default => throw new \Exception("Tipo de relatório inválido"),
        };
    }
}
```

### **Passo 7: Criar Routes**

```php
// Modules/Reports/Routes/web.php
use Modules\Reports\Http\Controllers\ReportController;

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    'auth:sanctum',
    EnsureModuleIsActive::class . ':reports',
])->prefix('reports')->name('reports.')->group(function () {
    Route::get('/', [ReportController::class, 'index'])->name('index');
    Route::post('/generate/{reportType}', [ReportController::class, 'generate'])->name('generate');
});
```

### **Passo 8: Criar Frontend**

```typescript
// Modules/Reports/Resources/js/Pages/Index.tsx
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ reports }) {
    return (
        <AuthenticatedLayout>
            <Head title="Relatórios" />

            <div className="py-6">
                <h2 className="text-2xl font-bold mb-6">Relatórios Disponíveis</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <div key={report.type} className="bg-white rounded-lg shadow p-6">
                            <i className={`${report.icon} text-3xl text-blue-600 mb-4`}></i>
                            <h3 className="font-semibold text-lg">{report.name}</h3>
                            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
                                Gerar Relatório
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

### **Passo 9: Registrar Service Provider**

```php
// Modules/Reports/Providers/ReportsServiceProvider.php
namespace Modules\Reports\Providers;

use Illuminate\Support\ServiceProvider;

class ReportsServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');
    }

    public function register(): void
    {
        $this->app->register(RouteServiceProvider::class);
    }
}
```

---

## ✅ Checklist para Novo Módulo

```
✅ Criar estrutura (php artisan module:make)
✅ Definir module.json (nome, dependências, permissões)
✅ Criar migrations
✅ Criar models
✅ Criar service (lógica de negócio)
✅ Criar controllers
✅ Criar form requests (validação)
✅ Definir routes
✅ Criar events (se necessário)
✅ Criar listeners (se necessário)
✅ Criar frontend (páginas, componentes)
✅ Criar testes (unit + feature)
✅ Atualizar seeders
✅ Documentar README.md do módulo
✅ Testar independentemente
✅ Testar integração com outros módulos
```

---

## 💡 Boas Práticas

### **1. Baixo Acoplamento**

- Módulos NÃO chamam métodos diretos de outros módulos
- Use Events para comunicação

### **2. Alta Coesão**

- Toda lógica relacionada fica dentro do módulo
- Não espalhe código do módulo fora dele

### **3. Interfaces Claras**

- Events são a interface pública do módulo
- Documente eventos que outros podem escutar

### **4. Testes Isolados**

- Cada módulo tem seus próprios testes
- Mock eventos de outros módulos

### **5. Versionamento**

- Mantenha `version` no module.json
- Documente breaking changes

---

**Arquitetura modular completa! Cada módulo é independente mas integrado! 🏗️✨**
