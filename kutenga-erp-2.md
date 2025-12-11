🚀 KUTENGA ERP

Sistema de Gestão Empresarial Modular Multi-Tenant para Moçambique

📖 O Que É?
KUTENGA (do xiChangana: "comprar") é um ERP SaaS modular desenvolvido especificamente para PMEs moçambicanas. Oferece gestão completa de negócios com preço justo, conformidade fiscal automática e integração total entre módulos.

🎯 Problema que Resolve
Desafios das PMEs em Moçambique:

ERPs internacionais caros (50.000-200.000 MT/mês)
Controlo de estoque manual e ineficiente
Gestão financeira desorganizada (cadernos, Excel)
Conformidade fiscal complexa (numeração, IVA, AT)
Sistemas desconectados causando retrabalho
Controlo de activos inexistente (depreciação, manutenção)
Compras não planeadas (sem controlo de fornecedores)

Solução KUTENGA:

Preço acessível (800-2.000 USD/mês)
Estoque em tempo real com alertas automáticos
Gestão financeira profissional (DRE, Balanço, DFC)
Faturação fiscal automatizada (QR Code, Hash, ATCUD)
Sistema totalmente integrado (zero retrabalho)
Controlo de activos fixos (depreciação automática)
Gestão de compras (ordens, fornecedores, aprovações)
Relatórios gerenciais e fiscais (exportação AT)

📦 Módulos
MóduloFuncionalidadeSetup + MensalCustomersCRM completo (PF/PJ, limites, histórico)800 + 200 USDCatalogProdutos/Serviços, categorias, preços600 + 150 USDInventoryMulti-armazém, lotes, séries, alertas1.200 + 500 USDSalesPOS, cotações, múltiplos pagamentos1.000 + 400 USDInvoicingFaturas, recibos, notas de crédito1.500 + 350 USDFinancialContas a receber/pagar, fluxo de caixa1.300 + 450 USDAssetsActivos fixos, depreciação, manutenção1.000 + 300 USDPurchasingCompras, fornecedores, ordens, aprovações900 + 350 USDReportsRelatórios gerenciais, fiscais, BI800 + 250 USD
Pacotes:

Starter (5 módulos: Customers, Catalog, Sales, Invoicing, Reports): 1.200 USD/mês (35% desconto)
Business (8 módulos: todos exceto Assets): 2.000 USD/mês (30% desconto)
Enterprise (todos os 9 módulos): 2.500 USD/mês (25% desconto)

💻 Stack Tecnológico
Backend

PHP 8.3+ | Laravel 11 | PostgreSQL 16 | Redis 7 | Meilisearch

Frontend

React 18 | TypeScript 5 | Inertia.js | TailwindCSS 3 | Headless UI

Pacotes Principais
json{
"stancl/tenancy": "^3.8", // Multi-tenancy (schema separation)
"laravel/sanctum": "^4.0", // Autenticação
"spatie/laravel-permission": "^6.0", // RBAC
"laravel-auditing": "^13.0", // Auditoria
"laravel/scout + meilisearch": "", // Busca instantânea
"recharts": "^2.10", // Gráficos
"@tanstack/react-table": "^8.0", // Tabelas avançadas
"maatwebsite/excel": "^3.1", // Export Excel/CSV
"barryvdh/laravel-dompdf": "^3.0" // PDFs
}

```

---

## 🏗️ Arquitetura Multi-Tenancy

### **Decisão: Single Database com Schemas (PostgreSQL)**
```

PostgreSQL: kutenga_erp (UM database)
├─ Schema: public (dados globais: tenants, users)
├─ Schema: tenant_empresa_001 (80+ tabelas)
├─ Schema: tenant_empresa_002 (80+ tabelas)
└─ Schema: tenant_empresa_100 (80+ tabelas)

Identificação: Subdomínio (empresa-abc.kutenga.co.mz)
Isolamento: SET search_path TO tenant_empresa_abc

```

**Por que não MySQL?**
- MySQL não tem schemas nativos (só databases)
- Trocar database é pesado (10-20ms vs 1-2ms no PostgreSQL)
- Overhead 50-100x maior (5-10GB vs 100KB)
- Performance inferior em queries complexas

**Por que não Database-per-Tenant?**
- 10x mais caro (960 USD vs 96 USD/mês para 100 empresas)
- Migrations 5x mais lentas
- Backup 3x mais demorado
- Complexidade desnecessária

---

## 📋 Módulos Detalhados

### 1. **CUSTOMERS** (CRM)
Cadastro PF/PJ, múltiplos endereços/contatos, limite de crédito, histórico de interações, categorização, campos customizáveis (JSONB).

### 2. **CATALOG**
Produtos físicos e serviços, flag `controls_inventory`, categorias hierárquicas, múltiplas tabelas de preço, impostos configuráveis.

### 3. **INVENTORY**
Múltiplos armazéns, movimentações (entrada/saída/transferência), saldos em tempo real, lotes/séries, inventário físico, alertas, custos (FIFO/LIFO/Médio).

### 4. **SALES**
POS touch-friendly, cotações/orçamentos, produtos + serviços simultâneos, múltiplas formas de pagamento (cash, card, M-Pesa, E-Mola, crediário), pagamentos parciais, devoluções.

### 5. **INVOICING**
Faturas, Recibos, Notas de Crédito/Débito, Proforma, numeração sequencial automática, QR Code fiscal, Hash, ATCUD, geração de PDF, envio automático, relatórios fiscais.

### 6. **FINANCIAL**
Contas a Receber/Pagar, fluxo de caixa com projeções, múltiplas contas bancárias, conciliação, categorização, relatórios DRE/Balanço/DFC/Aging, gestão de cobrança, juros e multas.

### 7. **ASSETS** (Activos Fixos) 🆕
- **Cadastro de Activos:** Equipamentos, veículos, imóveis, mobiliário
- **Depreciação Automática:** Linear, saldos decrescentes, unidades produzidas
- **Manutenção:** Agendamento, histórico, custos, fornecedores
- **Localização:** Rastreamento por departamento/funcionário
- **Documentação:** Upload de NFs, manuais, garantias
- **Relatórios:** Valor contábil, depreciação acumulada, vida útil
- **Integração:** → Financial (lançamentos contábeis), → Purchasing (aquisições)

**Modelo de Dados:**
```

assets (id, code, name, asset_type, acquisition_date, acquisition_value,
depreciation_method, useful_life_years, residual_value,
current_book_value, accumulated_depreciation, status, location,
department_id, responsible_user_id, documents JSONB)

asset_depreciation (id, asset_id, period_date, depreciation_amount,
accumulated_depreciation, book_value)

asset_maintenance (id, asset_id, maintenance_type, scheduled_date,
completed_date, description, cost, supplier_id,
next_maintenance_date)

```

### 8. **PURCHASING** (Compras) 🆕
- **Gestão de Fornecedores:** Cadastro, avaliação, histórico
- **Requisições de Compra:** Solicitação por departamento, aprovações
- **Cotações de Fornecedores:** Comparação de preços, condições
- **Ordens de Compra:** Geração, envio automático, rastreamento
- **Recebimento:** Conferência de mercadorias, notas fiscais
- **Workflow de Aprovação:** Multi-nível (solicitante → gerente → diretor)
- **Integração:** → Inventory (entrada automática), → Financial (contas a pagar)

**Modelo de Dados:**
```

suppliers (id, code, name, tax_id, email, phone, payment_terms,
rating, status, contact_person, addresses JSONB)

purchase_requisitions (id, requisition_number, department_id,
requested_by_user_id, status, approval_flow JSONB,
items JSONB, notes)

purchase_orders (id, po_number, supplier_id, requisition_id,
order_date, expected_delivery_date, status,
items JSONB, terms, subtotal, tax, total,
approved_by_user_id, approved_at)

goods_receipts (id, po_id, receipt_date, received_by_user_id,
items_received JSONB, discrepancies JSONB,
invoice_number, status)

```

### 9. **REPORTS** (Relatórios) 🆕
- **Gerenciais:**
  - Dashboard executivo (KPIs, tendências)
  - Análise de vendas (produtos, clientes, períodos, vendedores)
  - Análise de compras (fornecedores, categorias, períodos)
  - Análise de estoque (giro, valorização, obsolescência)
  - Análise financeira (DRE, Balanço, DFC, índices)

- **Operacionais:**
  - Vendas por período/produto/cliente/vendedor
  - Compras por período/fornecedor/categoria
  - Movimentação de estoque
  - Contas a receber/pagar (aging, inadimplência)
  - Manutenção de activos

- **Fiscais:**
  - Livro de vendas (SAFT-MZ)
  - Livro de compras
  - Mapa de IVA
  - Exportação para AT (XML)
  - Relatório de retenções

- **Features:**
  - Export: PDF, Excel, CSV
  - Agendamento automático (diário, semanal, mensal)
  - Envio por email
  - Filtros avançados
  - Gráficos interativos (Recharts)
  - Drill-down (click → detalhes)

**Modelo de Dados:**
```

saved_reports (id, name, report_type, filters JSONB,
schedule_frequency, recipients JSONB,
last_generated_at, created_by_user_id)

report_templates (id, name, category, config JSONB,
sql_query, parameters JSONB)

scheduled_reports (id, saved_report_id, next_run_at,
status, generated_file_path)

```

---

## 🔗 Integração Event-Driven
```

Fluxo Completo: Compra → Recebimento → Estoque → Venda → Fatura → Financeiro

COMPRA:

1. PurchaseOrderApproved (Event)
   ↓
2. NotifySupplier → Email automático com PO
   UpdateBudget → Atualizar orçamento do departamento

RECEBIMENTO: 3. GoodsReceived (Event)
↓ 4. UpdateInventory → Entrada no estoque
CreatePayable → Gerar conta a pagar
UpdateAssets → Se activo fixo, criar registro

VENDA: 5. SaleConfirmed (Event)
↓ 6. UpdateInventory → Dar baixa no estoque
GenerateInvoice → Gerar documento fiscal
CreateReceivable → Criar conta a receber

MANUTENÇÃO: 7. MaintenanceCompleted (Event)
↓ 8. UpdateAsset → Atualizar histórico
CreatePayable → Se custo externo
ScheduleNext → Agendar próxima manutenção

Sistema integrado: zero retrabalho, 2 segundos

```

---

## 💰 Custo de Infraestrutura

**100 Empresas (DigitalOcean):**
```

- PostgreSQL 16GB RAM: 192 USD/mês
- Redis 4GB: 48 USD/mês
- Application (2x 8GB): 192 USD/mês
- Meilisearch 4GB: 48 USD/mês
- Backups + CDN + Monitoring: 100 USD/mês

TOTAL: ~580 USD/mês
POR EMPRESA: 5,80 USD/mês

Receita (Business): 100 × 100 USD = 10.000 USD/mês
Lucro: 9.420 USD/mês (margem 94%)

🚀 Setup Rápido
bash# Clone e instale
git clone https://github.com/seu-usuario/kutenga-erp.git
cd kutenga-erp
composer install && npm install

# Configure

cp .env.example .env
php artisan key:generate

# Database (PostgreSQL)

createdb kutenga_erp
php artisan migrate

# Build e serve

npm run build
php artisan serve

📊 Requisitos

PHP 8.3+ | PostgreSQL 16+ | Redis 7+ | Node.js 20+
Dev: 4GB RAM mínimo
Produção (100 empresas): 16GB RAM recomendado

✨ Diferenciais
✅ 100% Moçambicano - Feito para o mercado local
✅ Preço Justo - 10x mais barato que concorrentes
✅ Modular - Pague apenas o que usar
✅ Conformidade Fiscal - AT automatizada
✅ Multi-Tenancy - Escalável até 500+ empresas
✅ Open Source Stack - Zero custos de licença
✅ Gestão Completa - De compras a relatórios fiscais
✅ Activos Fixos - Depreciação automática
✅ BI Integrado - Relatórios gerenciais e operacionais

🎯 Roadmap

Fase 1 (Concluída): Arquitetura, Customers, Catalog, Inventory, Sales básico
Fase 2 (Q1 2025): Invoicing, Financial, Assets, Purchasing, Reports básicos
Fase 3 (Q2 2025): Integração M-Pesa/E-Mola, Mobile app, Reports avançados
Fase 4 (Q3 2025): BI & Analytics avançado, Multi-moeda, API pública

📄 Licença
MIT License - Use livremente!

KUTENGA - Investindo no crescimento do seu negócio através de tecnologia 🇲🇿🚀
