# 📅 CRONOGRAMA DE IMPLEMENTAÇÃO - KUTENGA ERP

---

## 🎯 Visão Geral

**Duração Total:** 40-44 semanas (~10-11 meses)  
**Equipe Recomendada:** 2-3 devs full-stack  
**Metodologia:** Agile/Scrum (sprints de 2 semanas)

---

## 📋 FASE 1: FUNDAÇÃO (12 semanas)

### **Semanas 1-2: Setup Inicial**

```
🔧 INFRAESTRUTURA
✅ Setup do projeto Laravel 11
✅ Configuração PostgreSQL + Redis
✅ Setup React 18 + Inertia.js + TypeScript
✅ Configuração TailwindCSS
✅ Setup Stancl/Tenancy (multi-tenancy)
✅ CI/CD básico (GitHub Actions)
✅ Configuração de ambientes (dev, staging)

📦 DELIVERABLES:
- Projeto rodando localmente
- Pipeline CI/CD funcionando
- Primeiro tenant criado e testado
```

---

### **Semanas 3-6: CATALOG (4 semanas) ⭐ PRIMEIRO MÓDULO**

#### **Semana 3: Backend Foundation**

```
✅ Migrations
   - items (products/services)
   - categories (hierárquicas)
   - brands
   - price_tables + price_table_items

✅ Models + Relationships
   - Item (Product, Service)
   - Category (parent/children)
   - Brand
   - PriceTable

✅ Seeders
   - Categorias básicas (10-15)
   - Produtos de exemplo (30-50)
   - Marcas básicas (5-10)

✅ Form Requests (validação)
```

#### **Semana 4: Controllers e API**

```
✅ Controllers
   - ItemController (CRUD completo)
   - CategoryController
   - BrandController
   - PriceTableController

✅ Routes (API + Web)
✅ Repository Pattern
✅ Services (ItemService)
✅ Tests unitários básicos (30+ tests)
```

#### **Semana 5: Frontend - Listagem**

```
✅ Pages
   - Catalog/Items/Index (listagem)
   - Catalog/Categories/Index
   - Catalog/Brands/Index

✅ Components
   - ItemsTable (com filtros)
   - SearchBar
   - Pagination
   - StatusBadge

✅ Features
   - Busca por nome/código
   - Filtros (categoria, tipo, status)
   - Ordenação
```

#### **Semana 6: Frontend - Forms**

```
✅ Pages
   - Catalog/Items/Create
   - Catalog/Items/Edit
   - Catalog/Items/Show

✅ Components
   - ItemForm (react-hook-form + zod)
   - ImageUpload (múltiplas imagens)
   - CategorySelect (hierárquico)
   - PriceInput

✅ Validação frontend completa
✅ Tests E2E básicos
```

**📦 DELIVERABLE Semana 6:** Módulo CATALOG 100% funcional

---

### **Semanas 7-9: CUSTOMERS (3 semanas)**

#### **Semana 7: Backend**

```
✅ Migrations
   - customers (PF/PJ)
   - customer_addresses
   - customer_contacts
   - customer_categories

✅ Models + Relationships
✅ Controllers (CustomerController)
✅ Validações (NUIT, email, telefone)
✅ Seeders (50 clientes exemplo)
```

#### **Semana 8: Frontend - Listagem**

```
✅ Pages
   - Customers/Index (listagem)
   - Customers/Show (perfil completo)

✅ Components
   - CustomersTable
   - CustomerCard
   - CreditLimitIndicator

✅ Features
   - Busca por nome/NUIT/email
   - Filtros (tipo, status, categoria)
   - Export para Excel/CSV
```

#### **Semana 9: Frontend - Forms**

```
✅ Pages
   - Customers/Create (multi-step form)
   - Customers/Edit

✅ Components
   - CustomerForm
   - AddressForm (múltiplos endereços)
   - ContactForm (múltiplos contatos)
   - DocumentUpload

✅ Validação NUIT (algoritmo AT)
✅ Histórico de interações
```

**📦 DELIVERABLE Semana 9:** Módulo CUSTOMERS completo

---

### **Semanas 10-12: SALES Básico (3 semanas)**

#### **Semana 10: Backend**

```
✅ Migrations
   - sales
   - sale_items
   - payments

✅ Models + Relationships
✅ Controllers (SaleController)
✅ Events (SaleCreated, SaleConfirmed)
✅ Validações (estoque NÃO verificado ainda)
```

#### **Semana 11: POS Frontend - Part 1**

```
✅ Pages
   - Sales/POS (layout principal)

✅ Components
   - ProductSearch
   - ProductGrid
   - Cart (carrinho)
   - CustomerSelect

✅ Features
   - Adicionar produtos ao carrinho
   - Busca rápida (código/nome)
   - Scanner de código de barras (prep)
```

#### **Semana 12: POS Frontend - Part 2**

```
✅ Components
   - PaymentModal (múltiplas formas)
   - DiscountModal
   - QuotationSave

✅ Features
   - Finalizar venda (cash, card, mpesa, emola)
   - Pagamentos parciais
   - Salvar cotação
   - Imprimir recibo (básico)

✅ Keyboard shortcuts (F2, F3, F9, ESC)
```

**📦 DELIVERABLE Semana 12:** POS funcional (SEM controlo de estoque ainda)

---

## 📦 FASE 2: CONTROLO & COMPLIANCE (16 semanas)

### **Semanas 13-17: INVENTORY (5 semanas) ⭐ COMPLEXO**

#### **Semana 13: Backend - Core**

```
✅ Migrations
   - warehouses (armazéns)
   - inventory_balances (saldos)
   - inventory_movements (movimentações)
   - lots (lotes)
   - serial_numbers (séries)

✅ Models + Relationships
✅ InventoryService (lógica complexa)
```

#### **Semana 14: Backend - Movements**

```
✅ Controllers
   - WarehouseController
   - InventoryMovementController
   - InventoryBalanceController

✅ Movement Types
   - IN (entrada)
   - OUT (saída)
   - TRANSFER (transferência)
   - ADJUSTMENT (ajuste)

✅ Events
   - StockLevelLow
   - StockLevelCritical
   - StockOut
```

#### **Semana 15: Backend - Integration**

```
✅ Listeners
   - UpdateInventoryOnSaleConfirmed
   - UpdateInventoryOnPurchaseReceived
   - SendLowStockAlert

✅ Jobs
   - CalculateInventoryValue
   - ProcessPhysicalInventory

✅ Tests (50+ tests)
```

#### **Semana 16: Frontend - Dashboard**

```
✅ Pages
   - Inventory/Dashboard (KPIs)
   - Inventory/Balances/Index
   - Inventory/Warehouses/Index

✅ Components
   - InventoryChart
   - LowStockAlerts
   - WarehouseCard

✅ Features
   - Saldos por produto/armazém
   - Alertas em tempo real
   - Valor total do estoque
```

#### **Semana 17: Frontend - Movements**

```
✅ Pages
   - Inventory/Movements/Index
   - Inventory/Movements/Create
   - Inventory/PhysicalInventory

✅ Components
   - MovementForm
   - LotSerialInput
   - PhysicalInventoryForm

✅ Features
   - Registrar entrada/saída
   - Transferência entre armazéns
   - Inventário físico
   - Relatório de movimentações
```

**📦 DELIVERABLE Semana 17:** INVENTORY completo + Integrado com SALES

---

### **Semanas 18-21: INVOICING (4 semanas)**

#### **Semana 18: Backend - Core**

```
✅ Migrations
   - invoices
   - document_series (FT, FR, NC, ND)
   - tax_configurations

✅ Models
✅ InvoicingService
   - Numeração sequencial
   - Cálculo de IVA
   - Geração de Hash
   - Geração de ATCUD
```

#### **Semana 19: Backend - PDF & QR Code**

```
✅ PDF Generation (DomPDF)
   - Template de fatura
   - Template de recibo
   - Template de nota de crédito

✅ QR Code fiscal
✅ Hash validation (AT)
✅ ATCUD generation

✅ Controllers
   - InvoiceController
   - DocumentSeriesController
```

#### **Semana 20: Frontend - Listagem**

```
✅ Pages
   - Invoicing/Invoices/Index
   - Invoicing/Series/Index

✅ Components
   - InvoiceTable
   - InvoiceStatusBadge
   - FiscalInfo (QR Code, Hash, ATCUD)

✅ Features
   - Listar faturas/recibos/notas
   - Filtros (cliente, período, status)
   - Download PDF
   - Enviar por email
```

#### **Semana 21: Frontend - Forms & Reports**

```
✅ Pages
   - Invoicing/Invoices/Create
   - Invoicing/Invoices/Show

✅ Components
   - InvoiceForm
   - InvoicePreview (PDF preview)

✅ Features
   - Criar fatura manual
   - Nota de crédito/débito
   - Relatório de vendas (SAF-T MZ)
   - Livro de vendas
   - Exportação para AT
```

**📦 DELIVERABLE Semana 21:** INVOICING completo + Conformidade fiscal AT

---

### **Semanas 22-25: FINANCIAL - Parte 1 (4 semanas)**

#### **Semana 22: Backend - Contas a Receber**

```
✅ Migrations
   - accounts_receivable
   - bank_accounts
   - cash_flow_entries

✅ Models + Relationships
✅ FinancialService
✅ Listeners
   - CreateReceivableOnSaleConfirmed
```

#### **Semana 23: Backend - Cobrança**

```
✅ Controllers
   - AccountReceivableController
   - BankAccountController

✅ Jobs
   - SendPaymentReminder (email/SMS)
   - CalculateLateFees
   - GenerateAgingReport

✅ Events
   - PaymentReceived
   - InvoiceOverdue
```

#### **Semana 24: Frontend - Contas a Receber**

```
✅ Pages
   - Financial/Receivables/Index
   - Financial/Receivables/Show

✅ Components
   - ReceivablesTable
   - PaymentModal
   - AgingChart

✅ Features
   - Listar contas a receber
   - Registrar pagamento
   - Aging report (30/60/90 dias)
   - Enviar cobrança
```

#### **Semana 25: Frontend - Dashboard Financeiro**

```
✅ Pages
   - Financial/Dashboard

✅ Components
   - CashFlowChart (projeção)
   - ReceivablesOverview
   - BankAccountCard

✅ Features
   - Projeção de caixa (30/60/90 dias)
   - Contas vencidas
   - Inadimplência
```

**📦 DELIVERABLE Semana 25:** FINANCIAL (Contas a Receber) completo

---

### **Semanas 26-28: PURCHASING - Parte 1 (3 semanas)**

#### **Semana 26: Backend - Core**

```
✅ Migrations
   - suppliers
   - purchase_requisitions
   - purchase_orders
   - goods_receipts

✅ Models + Relationships
✅ PurchasingService
```

#### **Semana 27: Backend - Workflow**

```
✅ Controllers
   - SupplierController
   - PurchaseOrderController
   - GoodsReceiptController

✅ Approval Workflow
   - Multi-level approval
   - Email notifications

✅ Events
   - PurchaseOrderApproved
   - GoodsReceived

✅ Listeners
   - UpdateInventoryOnGoodsReceived
   - CreatePayableOnGoodsReceived
```

#### **Semana 28: Frontend - Compras**

```
✅ Pages
   - Purchasing/Suppliers/Index
   - Purchasing/PurchaseOrders/Index
   - Purchasing/PurchaseOrders/Create

✅ Components
   - SupplierCard
   - PurchaseOrderForm
   - ApprovalFlow

✅ Features
   - Cadastro de fornecedores
   - Criar ordem de compra
   - Aprovar/rejeitar
   - Registrar recebimento
```

**📦 DELIVERABLE Semana 28:** PURCHASING básico funcional

---

## 📊 FASE 3: GESTÃO AVANÇADA (12 semanas)

### **Semanas 29-31: FINANCIAL - Parte 2 (3 semanas)**

#### **Semana 29: Backend - Contas a Pagar**

```
✅ Migrations
   - accounts_payable
   - expense_categories
   - cost_centers

✅ Controllers
   - AccountPayableController
   - ExpenseCategoryController

✅ Jobs
   - ProcessScheduledPayments
   - GenerateDRE
   - GenerateBalanceSheet
```

#### **Semana 30: Frontend - Contas a Pagar**

```
✅ Pages
   - Financial/Payables/Index
   - Financial/Payables/Create

✅ Components
   - PayablesTable
   - PaymentSchedule
   - ExpenseCategoryChart

✅ Features
   - Listar contas a pagar
   - Agendar pagamentos
   - Categorização de despesas
   - Centro de custos
```

#### **Semana 31: Frontend - Relatórios Financeiros**

```
✅ Pages
   - Financial/Reports/DRE
   - Financial/Reports/BalanceSheet
   - Financial/Reports/CashFlow

✅ Components
   - DRETable
   - BalanceSheetTable
   - CashFlowChart

✅ Features
   - DRE (mensal, trimestral, anual)
   - Balanço patrimonial
   - DFC (direto e indireto)
   - Export para Excel/PDF
```

**📦 DELIVERABLE Semana 31:** FINANCIAL completo (100%)

---

### **Semanas 32-35: ASSETS (4 semanas)**

#### **Semana 32: Backend - Core**

```
✅ Migrations
   - assets
   - asset_depreciation
   - asset_maintenance
   - asset_locations

✅ Models + Relationships
✅ AssetService
   - Cálculo de depreciação (Linear, Saldos Decr.)
```

#### **Semana 33: Backend - Depreciação**

```
✅ Controllers
   - AssetController
   - AssetDepreciationController
   - AssetMaintenanceController

✅ Jobs
   - CalculateMonthlyDepreciation (cron mensal)
   - SendMaintenanceReminder

✅ Events
   - AssetAcquired
   - MaintenanceDue
```

#### **Semana 34: Frontend - Gestão de Activos**

```
✅ Pages
   - Assets/Index
   - Assets/Create
   - Assets/Show (histórico completo)

✅ Components
   - AssetCard
   - DepreciationChart
   - MaintenanceTimeline

✅ Features
   - Cadastro de activos
   - Rastreamento de localização
   - Upload de documentos (NF, manuais)
```

#### **Semana 35: Frontend - Depreciação & Manutenção**

```
✅ Pages
   - Assets/Depreciation/Report
   - Assets/Maintenance/Index

✅ Components
   - DepreciationTable
   - MaintenanceScheduler

✅ Features
   - Relatório de depreciação
   - Valor contábil atual
   - Agendar manutenção
   - Histórico de manutenções
```

**📦 DELIVERABLE Semana 35:** ASSETS completo

---

### **Semanas 36-40: REPORTS (5 semanas) ⭐ COMPLEXO**

#### **Semana 36: Backend - Infrastructure**

```
✅ Migrations
   - saved_reports
   - report_templates
   - scheduled_reports

✅ ReportService
✅ ReportGenerator (base class)
✅ Queue jobs para relatórios pesados
```

#### **Semana 37: Backend - Relatórios Gerenciais**

```
✅ Report Classes
   - SalesAnalysisReport
   - PurchaseAnalysisReport
   - InventoryAnalysisReport
   - FinancialAnalysisReport

✅ Export Formats
   - PDF (DomPDF)
   - Excel (Maatwebsite)
   - CSV

✅ Scheduling (Laravel Scheduler)
```

#### **Semana 38: Backend - Relatórios Fiscais**

```
✅ Report Classes
   - SAFTMZReport (exportação AT)
   - VATReport (mapa de IVA)
   - SalesBookReport
   - PurchaseBookReport

✅ XML Generation (SAF-T MZ format)
✅ Validação conforme AT
```

#### **Semana 39: Frontend - Dashboard de Relatórios**

```
✅ Pages
   - Reports/Dashboard
   - Reports/Templates/Index
   - Reports/Scheduled/Index

✅ Components
   - ReportCard
   - ReportFilters (avançados)
   - ReportPreview

✅ Features
   - Listar relatórios disponíveis
   - Filtros dinâmicos
   - Preview antes de gerar
   - Salvar configurações
```

#### **Semana 40: Frontend - Relatórios Interativos**

```
✅ Pages
   - Reports/Sales/Analysis
   - Reports/Financial/Analysis
   - Reports/Inventory/Analysis

✅ Components (Recharts)
   - InteractiveChart (drill-down)
   - DataTable (sortable, filterable)
   - ExportButtons

✅ Features
   - Gráficos interativos
   - Drill-down (click → detalhes)
   - Comparação de períodos
   - Agendamento de envio (email)
```

**📦 DELIVERABLE Semana 40:** REPORTS completo

---

## 🚀 FASE 4: POLIMENTO & LANÇAMENTO (4 semanas)

### **Semanas 41-42: Testes & Otimização (2 semanas)**

```
✅ Testes E2E completos (Playwright/Cypress)
✅ Load testing (100 usuários simultâneos)
✅ Performance optimization
   - Query optimization (Telescope)
   - N+1 query elimination
   - Eager loading
   - Cache estratégico (Redis)
   - Database indexing

✅ Security audit
   - SQL injection
   - XSS
   - CSRF
   - Rate limiting
   - Permission checks

✅ Code review completo
✅ Refactoring
```

---

### **Semanas 43-44: Documentação & Deploy (2 semanas)**

#### **Semana 43: Documentação**

```
✅ README.md completo
✅ API documentation (Postman/Swagger)
✅ User manual (português)
✅ Developer guide
✅ Deployment guide
✅ Video tutorials (básicos)
```

#### **Semana 44: Deploy & Training**

```
✅ Setup produção (DigitalOcean)
   - PostgreSQL managed database
   - Redis
   - Application servers (2x)
   - Load balancer
   - SSL certificates
   - Backups automáticos

✅ Monitoring
   - Sentry (error tracking)
   - Uptime Robot
   - Laravel Horizon
   - Database monitoring

✅ Beta testing
   - 5-10 empresas piloto
   - Coleta de feedback
   - Correções rápidas

✅ Training
   - Treinamento de equipe interna
   - Documentação de processos
```

**📦 DELIVERABLE Semana 44:** 🎉 KUTENGA ERP EM PRODUÇÃO!

---

## 📊 Resumo por Módulo

| Módulo                  | Semanas        | Complexidade | Prioridade |
| ----------------------- | -------------- | ------------ | ---------- |
| **Setup**               | 2              | Média        | 🔴 Crítica |
| **CATALOG**             | 4              | Baixa        | 🔴 Crítica |
| **CUSTOMERS**           | 3              | Baixa        | 🔴 Crítica |
| **SALES**               | 3              | Média        | 🔴 Crítica |
| **INVENTORY**           | 5              | Alta         | 🟠 Alta    |
| **INVOICING**           | 4              | Alta         | 🟠 Alta    |
| **FINANCIAL (Part 1)**  | 4              | Média        | 🟠 Alta    |
| **PURCHASING (Part 1)** | 3              | Média        | 🟡 Média   |
| **FINANCIAL (Part 2)**  | 3              | Alta         | 🟡 Média   |
| **ASSETS**              | 4              | Média        | 🟢 Baixa   |
| **REPORTS**             | 5              | Alta         | 🟡 Média   |
| **Testes & Deploy**     | 4              | Média        | 🔴 Crítica |
| **TOTAL**               | **44 semanas** |              |            |

---

## 🎯 Milestones Principais

```
✅ Semana 6:  MVP Catalog (primeiro módulo funcional)
✅ Semana 12: MVP Vendas (pode começar a vender!)
✅ Semana 17: Controlo de Estoque (sistema integrado)
✅ Semana 21: Conformidade Fiscal (faturas válidas AT)
✅ Semana 28: Ciclo Completo (compra → venda)
✅ Semana 35: Gestão de Activos
✅ Semana 40: BI & Relatórios
✅ Semana 44: 🚀 LANÇAMENTO!
```

---

## 👥 Alocação de Equipe (Sugestão)

### **Equipe Mínima (2 devs):**

```
Dev 1 (Full-stack, foco Backend):
- Setup infraestrutura
- Backend de todos os módulos
- Integrações e eventos
- Testes unitários

Dev 2 (Full-stack, foco Frontend):
- Frontend de todos os módulos
- Componentes reutilizáveis
- UI/UX
- Testes E2E
```

### **Equipe Ideal (3 devs):**

```
Dev 1 (Backend):
- Setup, Catalog, Inventory, Purchasing, Assets
- Integrações complexas

Dev 2 (Backend):
- Customers, Sales, Invoicing, Financial, Reports
- Conformidade fiscal

Dev 3 (Frontend):
- Todos os módulos frontend
- Design system
- Testes E2E
```

---

## 💰 Estimativa de Custo (Mão de Obra)

```
EQUIPE: 2 devs full-stack
SALÁRIO MÉDIO: 2.000 USD/dev/mês
DURAÇÃO: 11 meses

CUSTO TOTAL: 2 × 2.000 × 11 = 44.000 USD

+ Infraestrutura (dev): ~200 USD/mês × 11 = 2.200 USD
+ Serviços (Sentry, etc): ~100 USD/mês × 11 = 1.100 USD
+ Contingência (20%): 9.460 USD

TOTAL: ~57.000 USD

ROI:
- 100 empresas × 100 USD/mês = 10.000 USD/mês
- Payback: 6 meses
- Lucro ano 1: 63.000 USD (após recuperar investimento)
```

---

## ⚡ Fast-Track (Se Precisar Acelerar)

### **Versão Rápida (7 meses = 28 semanas):**

```
FOCO: MVP de cada módulo (80/20)

Semanas 1-2:   Setup
Semanas 3-5:   CATALOG (MVP) - 3 semanas
Semanas 6-8:   CUSTOMERS (MVP) - 3 semanas
Semanas 9-11:  SALES (MVP) - 3 semanas
Semanas 12-15: INVENTORY (MVP) - 4 semanas
Semanas 16-18: INVOICING (MVP) - 3 semanas
Semanas 19-21: FINANCIAL (MVP) - 3 semanas
Semanas 22-24: PURCHASING (MVP) - 3 semanas
Semanas 25-26: REPORTS (básico) - 2 semanas
Semanas 27-28: Testes & Deploy - 2 semanas

TOTAL: 28 semanas (7 meses)

Trade-off: Features avançadas ficam para versão 2.0
```

---

## 📝 Notas Finais

1. **Cronograma é estimativa:** Pode variar ±20% dependendo da equipe
2. **Priorize MVP:** Entregue valor rápido, itere depois
3. **Testes contínuos:** Não deixe para o final!
4. **Code review:** Faça sempre, previne bugs caros
5. **Documentação incremental:** Documente enquanto desenvolve
6. **Deploy cedo:** Staging environment desde semana 12
7. **Beta testing:** Envolva usuários reais cedo (semana 25+)

---

**CRONOGRAMA COMPLETO! Comece pelo CATALOG na semana 3! 🚀**
