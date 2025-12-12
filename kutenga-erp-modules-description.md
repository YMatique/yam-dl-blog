# 📚 KUTENGA ERP - Funcionalidades dos Módulos

> Documentação completa das funcionalidades de cada módulo do sistema

---

## 📦 Índice de Módulos

1. [Customers (CRM)](#1-customers-crm)
2. [Catalog](#2-catalog)
3. [Inventory](#3-inventory)
4. [Sales](#4-sales)
5. [Invoicing](#5-invoicing)
6. [Financial](#6-financial)
7. [Assets](#7-assets)
8. [Purchasing](#8-purchasing)
9. [Reports](#9-reports)

---

## 1. 👥 CUSTOMERS (CRM)

### **Descrição**

Gestão completa de relacionamento com clientes (B2C e B2B), incluindo leads, prospects e clientes ativos.

### **Funcionalidades Principais**

#### **1.1 Cadastro de Clientes**

- ✅ Pessoas Físicas (PF) e Pessoas Jurídicas (PJ)
- ✅ Validação automática de NUIT (algoritmo AT Moçambique)
- ✅ Múltiplos endereços (residencial, comercial, entrega, cobrança)
- ✅ Múltiplos contatos (telefone, email, WhatsApp)
- ✅ Documentos anexos (BI, NUIT, contratos)
- ✅ Foto/avatar do cliente
- ✅ Campos customizáveis (JSONB)

#### **1.2 Categorização**

- ✅ Categorias personalizáveis (VIP, Atacado, Varejo, Governo)
- ✅ Tags para segmentação
- ✅ Classificação por potencial de compra
- ✅ Score de cliente (baseado em histórico)

#### **1.3 Limite de Crédito**

- ✅ Definir limite de crédito por cliente
- ✅ Controlo automático (bloqueia venda se exceder)
- ✅ Saldo devedor em tempo real
- ✅ Histórico de alterações de limite
- ✅ Aprovação multi-nível para aumentos

#### **1.4 Histórico e Análise**

- ✅ Histórico completo de compras
- ✅ Ticket médio
- ✅ Frequência de compra
- ✅ Produtos mais comprados
- ✅ Inadimplência (dias em atraso)
- ✅ Valor total comprado (lifetime value)
- ✅ Última compra (recência)

#### **1.5 Comunicação**

- ✅ Registro de interações (ligações, emails, visitas)
- ✅ Lembretes e follow-ups
- ✅ Envio de email marketing
- ✅ SMS de cobrança (integração)
- ✅ WhatsApp Business (integração)

#### **1.6 Gestão de Status**

- ✅ Status: Ativo, Inativo, Bloqueado, Prospect
- ✅ Bloqueio automático por inadimplência
- ✅ Desbloqueio após regularização
- ✅ Motivo de bloqueio registrado

#### **1.7 Exportação e Importação**

- ✅ Import de clientes via Excel/CSV
- ✅ Export para Excel/CSV/PDF
- ✅ Validação de dados no import
- ✅ Template de importação disponível

### **Integrações**

- → **Sales:** Validação de limite de crédito antes de venda
- → **Financial:** Sincronização de saldo devedor
- → **Invoicing:** Dados do cliente nas faturas
- → **Reports:** Relatórios de clientes

### **Permissões**

- `customers.view` - Visualizar clientes
- `customers.create` - Criar clientes
- `customers.edit` - Editar clientes
- `customers.delete` - Deletar clientes
- `customers.manage_credit_limit` - Gerenciar limite de crédito
- `customers.block_unblock` - Bloquear/desbloquear

---

## 2. 📚 CATALOG

### **Descrição**

Catálogo completo de produtos e serviços com gestão de preços, categorias e informações técnicas.

### **Funcionalidades Principais**

#### **2.1 Produtos e Serviços**

- ✅ Cadastro de produtos físicos
- ✅ Cadastro de serviços
- ✅ Código único (geração automática ou manual)
- ✅ Código de barras (EAN-13, EAN-8, CODE-39)
- ✅ SKU customizável
- ✅ Nome e descrição detalhada
- ✅ Flag `controls_inventory` (crítico!)

#### **2.2 Categorias Hierárquicas**

- ✅ Categorias e subcategorias ilimitadas
- ✅ Árvore de categorias navegável
- ✅ Migração entre categorias
- ✅ Categorias com imagens
- ✅ SEO-friendly (slug)

#### **2.3 Marcas**

- ✅ Cadastro de marcas/fabricantes
- ✅ Logo da marca
- ✅ Informações de contato do fornecedor

#### **2.4 Gestão de Preços**

- ✅ Preço de custo
- ✅ Preço de venda (varejo)
- ✅ Múltiplas tabelas de preço:
    - Varejo
    - Atacado
    - VIP
    - Promoção
    - Customizadas
- ✅ Margem de lucro calculada automaticamente
- ✅ Preço mínimo de venda (proteção)
- ✅ Histórico de alterações de preço

#### **2.5 Impostos**

- ✅ Configuração de IVA por produto
- ✅ Isenção de IVA (produtos isentos)
- ✅ Taxa customizável (16%, 5%, 0%)
- ✅ Retenção na fonte (IR)

#### **2.6 Estoque (Parâmetros)**

- ✅ Nível mínimo de estoque
- ✅ Nível máximo de estoque
- ✅ Ponto de reposição
- ✅ Quantidade de segurança
- ✅ Lead time de compra

#### **2.7 Informações Técnicas**

- ✅ Especificações técnicas (JSONB)
- ✅ Dimensões (altura, largura, profundidade)
- ✅ Peso
- ✅ Unidade de medida (un, kg, m, l, caixa, etc)
- ✅ Embalagem (unitário, caixa, pallet)

#### **2.8 Imagens e Mídia**

- ✅ Upload múltiplo de imagens (até 10)
- ✅ Imagem principal destacada
- ✅ Galeria de imagens
- ✅ Vídeos (URL YouTube/Vimeo)
- ✅ Manuais em PDF
- ✅ Fichas técnicas

#### **2.9 Variações de Produto**

- ✅ Produtos com variações (tamanho, cor)
- ✅ SKU por variação
- ✅ Preço por variação
- ✅ Estoque por variação
- ✅ Imagem por variação

#### **2.10 Kits e Combos**

- ✅ Criar kits de produtos
- ✅ Preço do kit vs soma dos itens
- ✅ Dar baixa automática nos componentes
- ✅ Estoque do kit baseado nos componentes

#### **2.11 Status e Visibilidade**

- ✅ Status: Ativo, Inativo, Descontinuado
- ✅ Visibilidade no POS
- ✅ Visibilidade online (se tiver e-commerce)
- ✅ Produtos em promoção

#### **2.12 Busca e Filtros**

- ✅ Busca por código, nome, código de barras
- ✅ Filtros avançados (categoria, marca, preço, status)
- ✅ Ordenação (nome, preço, mais vendidos)
- ✅ Busca com typo tolerance (Meilisearch)

#### **2.13 Importação e Exportação**

- ✅ Import via Excel/CSV
- ✅ Export para Excel/CSV/PDF
- ✅ Template de importação
- ✅ Importação de imagens em lote

### **Integrações**

- → **Inventory:** Sincroniza produtos com `controls_inventory=true`
- → **Sales:** Catálogo disponível no POS
- → **Purchasing:** Lista de produtos para compra
- → **Invoicing:** Informações fiscais do produto

### **Permissões**

- `catalog.items.view`
- `catalog.items.create`
- `catalog.items.edit`
- `catalog.items.delete`
- `catalog.categories.manage`
- `catalog.brands.manage`
- `catalog.prices.manage`

---

## 3. 📦 INVENTORY

### **Descrição**

Controlo completo de estoque multi-armazém com rastreamento por lote e série, alertas automáticos e gestão de custos.

### **Funcionalidades Principais**

#### **3.1 Múltiplos Armazéns**

- ✅ Cadastro ilimitado de armazéns
- ✅ Armazém principal e secundários
- ✅ Endereço e responsável por armazém
- ✅ Status (ativo, inativo, em manutenção)
- ✅ Capacidade máxima (m³, pallets)

#### **3.2 Saldos em Tempo Real**

- ✅ Quantidade disponível (livre para venda)
- ✅ Quantidade reservada (pedidos pendentes)
- ✅ Quantidade em trânsito (transferências)
- ✅ Quantidade bloqueada (problemas de qualidade)
- ✅ Saldo por produto por armazém
- ✅ Atualização instantânea

#### **3.3 Movimentações de Estoque**

- ✅ **Entrada:**
    - Compra de fornecedor
    - Devolução de cliente
    - Transferência recebida
    - Ajuste positivo
    - Produção (se fabricar)
- ✅ **Saída:**
    - Venda confirmada
    - Devolução para fornecedor
    - Transferência enviada
    - Ajuste negativo
    - Perda/quebra
    - Amostra grátis
    - Uso interno
- ✅ **Transferência:**
    - Entre armazéns
    - Status: Pendente, Em trânsito, Recebida
    - Rastreamento de transporte

#### **3.4 Rastreamento por Lote**

- ✅ Cadastro de lotes
- ✅ Número do lote
- ✅ Data de fabricação
- ✅ Data de validade
- ✅ Fornecedor do lote
- ✅ Quantidade por lote
- ✅ Controlo de validade (alertas automáticos)
- ✅ FEFO (First Expire, First Out)
- ✅ Bloqueio de lote vencido

#### **3.5 Rastreamento por Série**

- ✅ Número de série único
- ✅ Rastreamento individual (1 produto = 1 série)
- ✅ Histórico completo do item serializado
- ✅ Garantia por número de série
- ✅ Controlo de devoluções
- ✅ Ideal para eletrônicos, veículos

#### **3.6 Inventário Físico**

- ✅ Criar contagem física
- ✅ Atribuir produtos para contar
- ✅ App mobile para contagem (futuro)
- ✅ Comparar físico vs sistema
- ✅ Divergências destacadas
- ✅ Ajuste automático ou manual
- ✅ Motivo de ajuste obrigatório
- ✅ Histórico de inventários

#### **3.7 Alertas Inteligentes**

- ✅ **Estoque Baixo:**
    - Abaixo do mínimo
    - Notificação automática
    - Sugestão de reposição
- ✅ **Estoque Crítico:**
    - Ruptura iminente
    - Alerta urgente
    - Bloqueio de vendas (opcional)
- ✅ **Estoque Excedente:**
    - Acima do máximo
    - Capital parado
    - Sugestão de promoção
- ✅ **Validade Próxima:**
    - Produtos vencendo em 30/60/90 dias
    - Sugestão de desconto
    - Alerta de bloqueio

#### **3.8 Custos de Estoque**

- ✅ **Métodos de Custeio:**
    - FIFO (First In, First Out)
    - LIFO (Last In, First Out)
    - Custo Médio Ponderado
    - Custo Específico (por lote/série)
- ✅ Custo unitário atualizado automaticamente
- ✅ Valor total do estoque
- ✅ Valor por armazém
- ✅ Valor por categoria
- ✅ Histórico de custos

#### **3.9 Relatórios de Estoque**

- ✅ Posição de estoque (snapshot atual)
- ✅ Movimentação por período
- ✅ Giro de estoque (turnover)
- ✅ Produtos parados (sem movimento)
- ✅ Curva ABC
- ✅ Validade de lotes
- ✅ Histórico de ajustes
- ✅ Valor do estoque

#### **3.10 Reservas de Estoque**

- ✅ Reservar produtos para cotações
- ✅ Reservar para pedidos em aberto
- ✅ Expiração automática de reserva
- ✅ Liberar reserva manualmente

### **Modo Standalone**

- ✅ API pública para consulta de saldo
- ✅ Webhook para alertas
- ✅ Integração com e-commerce externo
- ✅ Sincronização bidirecional

### **Integrações**

- ← **Catalog:** Sincroniza produtos com `controls_inventory=true`
- ← **Sales:** Event `SaleConfirmed` → dar baixa automática
- ← **Purchasing:** Event `GoodsReceived` → entrada automática
- → **Financial:** Valor do estoque no balanço

### **Permissões**

- `inventory.view`
- `inventory.movements.create`
- `inventory.movements.view`
- `inventory.adjustments.create`
- `inventory.transfers.create`
- `inventory.physical_inventory.manage`
- `inventory.lots.manage`
- `inventory.warehouses.manage`

---

## 4. 💰 SALES

### **Descrição**

Ponto de Venda (POS) completo, gestão de cotações, orçamentos e controlo de vendas com múltiplas formas de pagamento.

### **Funcionalidades Principais**

#### **4.1 Ponto de Venda (POS)**

- ✅ Interface touch-friendly (tablet/desktop)
- ✅ Busca rápida de produtos:
    - Por código
    - Por nome
    - Por código de barras (scanner)
    - Busca inteligente (typo tolerance)
- ✅ **Carrinho de Compras:**
    - Adicionar/remover produtos
    - Alterar quantidade
    - Aplicar desconto (item ou total)
    - Ver subtotal em tempo real
    - Ver impostos (IVA)
    - Ver total
- ✅ **Validações Automáticas:**
    - Estoque disponível (se `controls_inventory`)
    - Limite de crédito do cliente
    - Preço mínimo de venda
    - Permissão de desconto

#### **4.2 Tipos de Venda**

- ✅ Venda Direta (à vista)
- ✅ Venda a Prazo (crediário)
- ✅ Orçamento (não confirma estoque)
- ✅ Cotação (validade definida)
- ✅ Pré-venda (pedido futuro)

#### **4.3 Clientes**

- ✅ Venda para cliente cadastrado
- ✅ Venda para consumidor final
- ✅ Cadastro rápido de cliente no POS
- ✅ Busca de cliente (nome, NUIT, telefone)
- ✅ Histórico de compras do cliente
- ✅ Validação de limite de crédito

#### **4.4 Produtos e Serviços**

- ✅ Vender produtos físicos
- ✅ Vender serviços
- ✅ Misturar produtos e serviços na mesma venda
- ✅ Produtos com lote/série (seleção obrigatória)
- ✅ Kits e combos
- ✅ Agendamento de serviços (data futura)

#### **4.5 Múltiplas Formas de Pagamento**

- ✅ **Dinheiro:**
    - Calcular troco
    - Múltiplas moedas (USD, ZAR, EUR)
- ✅ **Cartão:**
    - Débito
    - Crédito
    - Parcelamento (1-12x)
    - Referência da transação
- ✅ **M-Pesa:**
    - Integração API M-Pesa
    - Confirmação automática
    - Referência da transação
- ✅ **E-Mola:**
    - Integração API E-Mola
    - Confirmação automática
- ✅ **Crediário:**
    - Parcelas personalizadas
    - Datas de vencimento
    - Juros configurável
    - Entrada opcional
- ✅ **Cheque:**
    - Número do cheque
    - Banco emissor
    - Data de compensação
- ✅ **Transferência Bancária:**
    - Referência
    - Banco destino
- ✅ **Pagamento Misto:**
    - Combinar formas (ex: 50% dinheiro + 50% cartão)
    - Múltiplas parcelas
    - Controlo de saldo restante

#### **4.6 Descontos e Promoções**

- ✅ Desconto percentual
- ✅ Desconto fixo (valor)
- ✅ Desconto por item
- ✅ Desconto no total da venda
- ✅ Desconto por quantidade (atacado)
- ✅ Cupons de desconto
- ✅ Motivo de desconto obrigatório
- ✅ Limite de desconto por usuário
- ✅ Aprovação de desconto (supervisor)

#### **4.7 Devoluções e Trocas**

- ✅ Devolução total
- ✅ Devolução parcial (itens específicos)
- ✅ Troca de produtos
- ✅ Motivo obrigatório
- ✅ Reembolso (dinheiro, crédito loja)
- ✅ Devolução com entrada de estoque
- ✅ Nota de crédito automática

#### **4.8 Controlo de Caixa**

- ✅ **Abertura de Caixa:**
    - Fundo de troco inicial
    - Horário de abertura
    - Usuário responsável
- ✅ **Movimentações:**
    - Vendas
    - Sangrias (retiradas)
    - Reforços (entradas)
    - Motivo obrigatório
- ✅ **Fechamento de Caixa:**
    - Contagem física por forma de pagamento
    - Comparar físico vs sistema
    - Divergências (sobra/falta)
    - Relatório de fechamento
    - Envio para tesouraria

#### **4.9 Cotações e Orçamentos**

- ✅ Criar cotação sem confirmar venda
- ✅ Validade da cotação (dias)
- ✅ Converter cotação em venda
- ✅ Enviar cotação por email/WhatsApp
- ✅ Imprimir cotação (PDF)
- ✅ Status: Pendente, Aprovada, Expirada, Perdida

#### **4.10 Comissões**

- ✅ Comissão por vendedor
- ✅ Percentual ou valor fixo
- ✅ Comissão por produto/categoria
- ✅ Metas de vendas
- ✅ Relatório de comissões

#### **4.11 Impressão e Envio**

- ✅ Imprimir recibo (térmica ou A4)
- ✅ Enviar recibo por email
- ✅ Enviar recibo por WhatsApp
- ✅ Segunda via de recibo
- ✅ Configuração de impressora padrão

#### **4.12 Atalhos de Teclado (Produtividade)**

- ✅ `F2` - Buscar cliente
- ✅ `F3` - Aplicar desconto
- ✅ `F4` - Remover item
- ✅ `F9` - Finalizar venda
- ✅ `ESC` - Cancelar venda
- ✅ `Enter` - Buscar produto
- ✅ `+` / `-` - Ajustar quantidade

### **Integrações**

- → **Catalog:** Busca produtos e preços
- → **Customers:** Valida limite de crédito
- → **Inventory:** Dar baixa automática (Event `SaleConfirmed`)
- → **Invoicing:** Gerar documento fiscal
- → **Financial:** Criar contas a receber (se a prazo)

### **Permissões**

- `sales.pos.access`
- `sales.view`
- `sales.create`
- `sales.edit`
- `sales.cancel`
- `sales.apply_discount`
- `sales.approve_discount`
- `sales.returns.manage`
- `sales.cash_register.open`
- `sales.cash_register.close`

---

## 5. 📄 INVOICING

### **Descrição**

Emissão de documentos fiscais conforme legislação moçambicana (AT) com numeração sequencial, QR Code, Hash e ATCUD.

### **Funcionalidades Principais**

#### **5.1 Tipos de Documentos**

- ✅ **Fatura (FT):**
    - Documento fiscal de venda
    - Obrigatória para vendas > 1.000 MT
    - Numeração sequencial por série
- ✅ **Fatura-Recibo (FR):**
    - Fatura + Recibo (venda à vista)
    - Mais comum no varejo
- ✅ **Recibo (RE):**
    - Comprovante de pagamento
    - Vinculado a uma fatura
- ✅ **Nota de Crédito (NC):**
    - Anulação/devolução parcial ou total
    - Vinculada à fatura original
- ✅ **Nota de Débito (ND):**
    - Cobrança adicional
    - Correção de valor
- ✅ **Fatura Proforma:**
    - Orçamento formal
    - Sem valor fiscal
    - Pode converter em fatura

#### **5.2 Numeração Sequencial**

- ✅ Séries customizáveis:
    - FT-2024/0001
    - FR-2024/0001
    - NC-2024/0001
- ✅ Numeração automática
- ✅ Sem gaps (números seguidos)
- ✅ Controlo de duplicação
- ✅ Reset anual (opcional)
- ✅ Múltiplas séries por tipo

#### **5.3 Conformidade Fiscal (AT Moçambique)**

- ✅ **QR Code Fiscal:**
    - Gerado conforme especificação AT
    - Contém: NUIT, número documento, data, valor, hash
    - Validável no site da AT
- ✅ **Hash (Assinatura Digital):**
    - Encadeamento de documentos
    - Algoritmo SHA-256
    - Impede adulteração
    - Hash do documento anterior
- ✅ **ATCUD (Código Único de Documento):**
    - Gerado conforme AT
    - Validação de autenticidade
    - Obrigatório desde 2023

#### **5.4 Dados Fiscais Completos**

- ✅ Emitente (empresa):
    - NUIT
    - Nome comercial
    - Endereço completo
    - Telefone, email
- ✅ Cliente:
    - NUIT (obrigatório se PJ)
    - Nome completo
    - Endereço
- ✅ Itens:
    - Descrição
    - Quantidade
    - Preço unitário
    - Taxa IVA
    - Valor IVA
    - Total
- ✅ Totais:
    - Base tributável
    - IVA (16%, 5%, isento)
    - Retenções (se aplicável)
    - Total a pagar

#### **5.5 Geração de PDF**

- ✅ Template profissional
- ✅ Logo da empresa
- ✅ QR Code visível
- ✅ Informações legais completas
- ✅ Assinatura digital visual
- ✅ Observações customizáveis
- ✅ Termos e condições
- ✅ Métodos de pagamento aceitos

#### **5.6 Envio Automático**

- ✅ Enviar por email automaticamente
- ✅ Enviar por WhatsApp
- ✅ SMS com link para download
- ✅ Template de email customizável
- ✅ Anexar PDF
- ✅ Confirmação de leitura

#### **5.7 Controlo de Status**

- ✅ Status:
    - Rascunho
    - Emitida
    - Enviada
    - Paga
    - Vencida
    - Cancelada (com NC)
- ✅ Workflow de aprovação (opcional)
- ✅ Histórico de alterações
- ✅ Auditoria completa

#### **5.8 Anulação e Correção**

- ✅ **Anulação:**
    - Motivo obrigatório
    - Gera Nota de Crédito automaticamente
    - Mantém numeração sequencial
    - Não pode deletar (apenas anular)
- ✅ **Correção:**
    - Nota de Débito/Crédito
    - Ajuste de valores
    - Vinculação ao documento original

#### **5.9 Relatórios Fiscais**

- ✅ **Livro de Vendas:**
    - Todos os documentos emitidos
    - Agrupado por tipo
    - Base tributável e IVA
    - Export para AT
- ✅ **Mapa de IVA:**
    - Resumo de IVA cobrado
    - Por taxa (16%, 5%, isento)
    - Por período
- ✅ **SAF-T MZ (XML):**
    - Formato oficial AT
    - Exportação para auditoria
    - Validação conforme XSD
- ✅ **Relatório de Anulações:**
    - Documentos cancelados
    - Motivos
    - Notas de crédito

#### **5.10 Reimpressão e Histórico**

- ✅ Reimprimir qualquer documento
- ✅ Segunda via marcada
- ✅ Histórico de impressões
- ✅ Histórico de envios
- ✅ Logs de acesso ao documento

#### **5.11 Validações**

- ✅ NUIT válido (algoritmo)
- ✅ Numeração sequencial sem gaps
- ✅ Valores não negativos
- ✅ IVA calculado corretamente
- ✅ Hash válido
- ✅ QR Code válido

### **Integrações**

- ← **Sales:** Event `SaleConfirmed` → gerar fatura automaticamente
- → **Financial:** Criar conta a receber vinculada
- → **Reports:** Relatórios fiscais

### **Permissões**

- `invoicing.view`
- `invoicing.create`
- `invoicing.edit` (apenas rascunhos)
- `invoicing.cancel`
- `invoicing.approve`
- `invoicing.send`
- `invoicing.reports.export`

---

## 6. 💵 FINANCIAL

### **Descrição**

Gestão financeira completa incluindo contas a receber, contas a pagar, fluxo de caixa, relatórios contábeis e análise financeira.

### **Funcionalidades Principais**

#### **6.1 Contas a Receber**

- ✅ **Cadastro:**
    - Criação automática (venda a prazo)
    - Criação manual (outros recebíveis)
    - Cliente
    - Valor original
    - Data de vencimento
    - Parcelas (se parcelado)
    - Juros e multa configuráveis
- ✅ **Recebimentos:**
    - Registrar pagamento
    - Pagamento parcial
    - Pagamento total
    - Pagamento antecipado (desconto)
    - Múltiplas formas de pagamento
    - Baixa automática da fatura
- ✅ **Cobrança:**
    - Envio automático de lembretes:
        - 3 dias antes do vencimento
        - No dia do vencimento
        - 1, 3, 7, 15 dias após vencimento
    - Email e SMS
    - Template customizável
    - Histórico de cobranças
    - Boleto (se integrado)
- ✅ **Inadimplência:**
    - Identificação automática
    - Cálculo de juros e multa
    - Bloqueio automático do cliente
    - Relatório de aging (30/60/90 dias)
    - Negociação de dívida
    - Acordo de parcelamento

#### **6.2 Contas a Pagar**

- ✅ **Cadastro:**
    - Criação manual
    - Criação automática (compra)
    - Fornecedor
    - Categoria de despesa
    - Centro de custo
    - Valor
    - Data de vencimento
    - Documento anexo (NF, fatura)
- ✅ **Pagamentos:**
    - Agendar pagamento
    - Registrar pagamento
    - Pagamento em lote
    - Aprovação multi-nível
    - Controlo de alçadas
- ✅ **Categorização:**
    - Categorias personalizáveis:
        - Fornecedores
        - Salários
        - Impostos
        - Aluguel
        - Utilities (água, luz, internet)
        - Marketing
        - Manutenção
        - Outras
    - Centros de custo

#### **6.3 Fluxo de Caixa**

- ✅ **Lançamentos:**
    - Entradas (vendas, recebimentos)
    - Saídas (compras, despesas)
    - Status: Projetado, Confirmado
    - Recorrentes (automático)
- ✅ **Projeção:**
    - 30/60/90 dias
    - Baseado em recebíveis e pagáveis
    - Tendências históricas
    - Cenários (otimista, realista, pessimista)
- ✅ **Dashboard:**
    - Saldo atual
    - Entradas previstas
    - Saídas previstas
    - Saldo projetado
    - Gráficos de tendência
    - Alertas de deficit

#### **6.4 Múltiplas Contas Bancárias**

- ✅ Cadastro de contas:
    - Bancos moçambicanos (BCI, Millennium, Standard Bank)
    - Número da conta
    - Tipo (corrente, poupança)
    - Moeda (MZN, USD, ZAR, EUR)
    - Saldo inicial
- ✅ Movimentações:
    - Depósitos
    - Retiradas
    - Transferências entre contas
    - Pagamentos
    - Recebimentos
- ✅ Conciliação bancária:
    - Import de extrato (OFX, CSV)
    - Match automático com lançamentos
    - Identificar divergências
    - Ajustes (taxas bancárias, etc)

#### **6.5 Relatórios Contábeis**

- ✅ **DRE (Demonstração do Resultado do Exercício):**
    - Receitas
    - (-) Custos
    - (=) Lucro Bruto
    - (-) Despesas Operacionais
    - (=) EBITDA
    - (-) Depreciação/Amortização
    - (=) EBIT
    - (-) Despesas Financeiras
    - (-) Impostos
    - (=) Lucro Líquido
    - Comparativo com períodos anteriores
- ✅ **Balanço Patrimonial:**
    - **Ativo:**
        - Circulante (caixa, contas a receber, estoque)
        - Não Circulante (imobilizado, investimentos)
    - **Passivo:**
        - Circulante (contas a pagar, salários)
        - Não Circulante (empréstimos LP)
    - **Patrimônio Líquido:**
        - Capital social
        - Lucros acumulados
        - Reservas
- ✅ **DFC (Demonstração do Fluxo de Caixa):**
    - Atividades Operacionais
    - Atividades de Investimento
    - Atividades de Financiamento
    - Saldo Inicial
    - Saldo Final
    - Método direto ou indireto
- ✅ **Aging Report:**
    - Contas a receber por idade
    - 0-30 dias
    - 31-60 dias
    - 61-90 dias
    - 90+ dias
    - Por cliente
    - Gráfico visual

#### **6.6 Análise Financeira**

- ✅ **Indicadores:**
    - Liquidez corrente
    - Liquidez seca
    - Margem bruta
    - Margem líquida
    - ROI (Return on Investment)
    - ROE (Return on Equity)
    - Ciclo financeiro
    - Prazo médio de recebimento
    - Prazo médio de pagamento
- ✅ **Comparativos:**
    - Mês vs mês
    - Ano vs ano
    - Orçado vs realizado
    - Benchmark do setor (se disponível)

#### **6.7 Recorrências**

- ✅ Receitas recorrentes (assinaturas)
- ✅ Despesas recorrentes (aluguel, salários)
- ✅ Geração automática de lançamentos
- ✅ Calendário de recorrências
- ✅ Editar/pausar/cancelar recorrência

### **Integrações**

- ← **Sales:** Venda a prazo → criar conta a receber
- ← **Invoicing:** Fatura vinculada ao recebível
- ← **Purchasing:** Compra → criar conta a pagar
- → **Customers:** Atualizar saldo devedor
- → **Assets:** Depreciação no resultado

### **Permissões**

- `financial.view`
- `financial.receivables.view`
- `financial.receivables.create`
- `financial.receivables.receive_payment`
- `financial.payables.view`
- `financial.payables.create`
- `financial.payables.pay`
- `financial.payables.approve`
- `financial.cash_flow.view`
- `financial.bank_accounts.manage`
- `financial.reports.view`

---

## 7. 🏢 ASSETS

### **Descrição**

Gestão de activos fixos (imobilizado) com controlo de depreciação, manutenção programada e rastreamento de localização.

### **Funcionalidades Principais**

#### **7.1 Cadastro de Activos**

- ✅ **Tipos de Activos:**
    - Equipamentos
    - Veículos
    - Imóveis
    - Mobiliário
    - Computadores e TI
    - Maquinário
    - Outros
- ✅ **Informações Básicas:**
    - Código único
    - Nome/descrição
    - Tipo
    - Categoria
    - Marca/modelo
    - Número de série
    - Placa (veículos)
- ✅ **Informações Financeiras:**
    - Data de aquisição
    - Valor de aquisição
    - Fornecedor
    - Nota fiscal
    - Valor residual (salvage value)
    - Vida útil estimada (anos)
- ✅ **Localização:**
    - Departamento
    - Responsável
    - Local físico
    - Histórico de movimentações

#### **7.2 Depreciação Automática**

- ✅ **Métodos de Depreciação:**
    - **Linear (Straight-Line):**
        - Mais comum
        - Depreciação constante por período
        - Fórmula: (Custo - Valor Residual) / Vida Útil
    - **Saldos Decrescentes (Declining Balance):**
        - Depreciação maior no início
        - % sobre valor contábil
        - Fórmula: Valor Contábil × Taxa
    - **Unidades Produzidas:**
        - Baseado no uso
        - Para máquinas/veículos
        - Fórmula: (Custo - Residual) / Total Unidades × Unidades Período
    - **Soma dos Dígitos:**
        - Depreciação acelerada
        - Menos comum

- ✅ **Cálculo Automático:**
    - Job mensal (cron)
    - Lançamento contábil automático
    - Atualização do valor contábil
    - Histórico de depreciação
- ✅ **Relatórios:**
    - Depreciação acumulada
    - Valor contábil atual
    - Depreciação do período
    - Previsão de depreciação futura

#### **7.3 Manutenção Programada**

- ✅ **Tipos de Manutenção:**
    - Preventiva (agendada)
    - Corretiva (quebra)
    - Preditiva (baseada em uso)
    - Inspeção
- ✅ **Agendamento:**
    - Periodicidade (dias, km, horas uso)
    - Data da última manutenção
    - Data da próxima manutenção
    - Alerta automático (email/SMS)
    - Checklist de atividades
- ✅ **Registro:**
    - Data realizada
    - Tipo de manutenção
    - Descrição dos serviços
    - Peças trocadas
    - Fornecedor/oficina
    - Custo
    - Próxima manutenção (automático)
- ✅ **Histórico:**
    - Todas as manutenções realizadas
    - Custos totais
    - Frequência de quebras
    - Análise de confiabilidade

#### **7.4 Rastreamento e Controlo**

- ✅ **Localização:**
    - Departamento atual
    - Responsável atual
    - Local físico (prédio, sala)
    - QR Code para identificação
- ✅ **Movimentações:**
    - Transferência entre departamentos
    - Transferência entre responsáveis
    - Histórico completo
    - Motivo da movimentação
    - Aprovação (se necessário)
- ✅ **Status:**
    - Em uso
    - Em manutenção
    - Inativo
    - Aguardando descarte
    - Vendido
    - Perdido/roubado

#### **7.5 Documentação**

- ✅ Upload de documentos:
    - Nota fiscal de aquisição
    - Certificado de garantia
    - Manual do usuário
    - Apólice de seguro
    - Contratos de manutenção
    - Fotos do activo
- ✅ Versionamento de documentos
- ✅ Alertas de vencimento (garantia, seguro)

#### **7.6 Garantia e Seguro**

- ✅ Controlo de garantia:
    - Data de início
    - Data de término
    - Fornecedor
    - Cobertura
    - Alerta de expiração
- ✅ Controlo de seguro:
    - Seguradora
    - Apólice
    - Valor segurado
    - Prêmio (valor pago)
    - Vencimento
    - Renovação automática

#### **7.7 Baixa de Activos**

- ✅ **Motivos:**
    - Venda
    - Doação
    - Descarte
    - Perda
    - Roubo
- ✅ **Processo:**
    - Data da baixa
    - Motivo detalhado
    - Valor de venda (se aplicável)
    - Ganho/perda na venda
    - Lançamento contábil automático
    - Documentação anexada
- ✅ **Histórico:**
    - Activos baixados
    - Não aparecem mais no inventário ativo
    - Mas mantém histórico completo

#### **7.8 Relatórios**

- ✅ Inventário de activos (snapshot atual)
- ✅ Valor contábil total
- ✅ Depreciação acumulada
- ✅ Activos por departamento
- ✅ Activos por tipo/categoria
- ✅ Manutenções realizadas (custo)
- ✅ Manutenções agendadas
- ✅ Activos com garantia próxima ao vencimento
- ✅ Activos totalmente depreciados
- ✅ Histórico de baixas

### **Integrações**

- ← **Purchasing:** Compra de activo → cadastro automático
- → **Financial:**
    - Depreciação mensal no DRE
    - Valor do imobilizado no Balanço
    - Ganho/perda na venda
- → **Reports:** Relatórios de activos

### **Permissões**

- `assets.view`
- `assets.create`
- `assets.edit`
- `assets.delete`
- `assets.depreciation.view`
- `assets.maintenance.schedule`
- `assets.maintenance.register`
- `assets.transfer`
- `assets.dispose`

---

## 8. 🛒 PURCHASING

### **Descrição**

Gestão completa de compras com controlo de fornecedores, requisições, ordens de compra, workflow de aprovação e recebimento de mercadorias.

### **Funcionalidades Principais**

#### **8.1 Gestão de Fornecedores**

- ✅ **Cadastro Completo:**
    - Nome/razão social
    - NUIT
    - Tipo (pessoa física, jurídica)
    - Categorias (materiais, serviços, equipamentos)
    - Múltiplos endereços
    - Múltiplos contatos
    - Conta bancária (para pagamentos)
- ✅ **Informações Comerciais:**
    - Condições de pagamento padrão
    - Prazo de entrega médio
    - Valor mínimo de pedido
    - Desconto padrão
    - Frete
    - Produtos/serviços fornecidos
- ✅ **Avaliação de Fornecedores:**
    - Rating (1-5 estrelas)
    - Critérios:
        - Qualidade dos produtos
        - Pontualidade de entrega
        - Atendimento
        - Preço
    - Histórico de avaliações
    - Comentários
    - Bloqueio/desbloqueio
- ✅ **Controlo de Status:**
    - Ativo
    - Inativo
    - Bloqueado
    - Em análise
    - Preferencial

#### **8.2 Requisições de Compra**

- ✅ **Criação:**
    - Departamento solicitante
    - Usuário solicitante
    - Data da necessidade
    - Prioridade (baixa, média, alta, urgente)
    - Justificativa
    - Centro de custo
- ✅ **Itens:**
    - Produto/serviço solicitado
    - Quantidade
    - Especificações técnicas
    - Uso/finalidade
    - Anexos (datasheet, imagens)
- ✅ **Workflow de Aprovação:**
    - Multi-nível (configurável):
        1. Gerente do departamento
        2. Diretor financeiro (se > valor X)
        3. CEO (se > valor Y)
    - Aprovar/rejeitar com comentários
    - Histórico de aprovações
    - Notificações automáticas
    - Alçadas por valor
- ✅ **Status:**
    - Rascunho
    - Aguardando aprovação
    - Aprovada
    - Rejeitada
    - Convertida em OC
    - Cancelada

#### **8.3 Cotação de Fornecedores**

- ✅ **Solicitação de Cotação:**
    - Selecionar fornecedores (3-5)
    - Envio automático (email)
    - Prazo para resposta
    - Especificações técnicas
    - Condições comerciais desejadas
- ✅ **Registro de Cotações:**
    - Preço por item
    - Prazo de entrega
    - Condições de pagamento
    - Frete
    - Garantia
    - Validade da proposta
    - Anexos (proposta PDF)
- ✅ **Comparação:**
    - Tabela comparativa automática
    - Destaque melhor preço
    - Destaque melhor prazo
    - Score total (preço + prazo + rating fornecedor)
    - Recomendação automática
- ✅ **Decisão:**
    - Aprovar cotação
    - Converter em Ordem de Compra
    - Justificar se não escolher a mais barata

#### **8.4 Ordens de Compra (Purchase Orders)**

- ✅ **Criação:**
    - Automática (de requisição aprovada)
    - Manual
    - Número único (PO-2024-0001)
    - Fornecedor
    - Data de emissão
    - Data de entrega esperada
- ✅ **Itens:**
    - Produto/serviço
    - Quantidade
    - Preço unitário
    - Desconto
    - Subtotal
    - Impostos
    - Total
- ✅ **Termos e Condições:**
    - Condições de pagamento
    - Local de entrega
    - Frete (CIF, FOB)
    - Garantia
    - Multas por atraso
    - Cláusulas especiais
- ✅ **Aprovação:**
    - Workflow de aprovação (se necessário)
    - Assinatura digital
- ✅ **Envio:**
    - Email automático para fornecedor
    - PDF profissional
    - QR Code para rastreamento
    - Portal do fornecedor (futuro)
- ✅ **Rastreamento:**
    - Status: Pendente, Confirmada, Em produção, Despachada, Recebida
    - Atualização pelo fornecedor (API/portal)
    - Alertas de atraso
    - Histórico de atualizações

#### **8.5 Recebimento de Mercadorias**

- ✅ **Registro de Recebimento:**
    - Vincular à Ordem de Compra
    - Data de recebimento
    - Recebido por (usuário)
    - Conferência:
        - Quantidade recebida vs pedida
        - Itens conferidos vs pedidos
        - Estado dos produtos (OK, danificado)
- ✅ **Discrepâncias:**
    - Falta de itens
    - Itens errados
    - Quantidade divergente
    - Produtos danificados
    - Motivo/observações
    - Fotos
    - Notificação ao fornecedor
    - Abertura de chamado
- ✅ **Documentos:**
    - Upload de Nota Fiscal
    - Upload de Guia de Remessa
    - Outros documentos
- ✅ **Processamento:**
    - Recebimento parcial (permite)
    - Recebimento total
    - Atualização da OC (status)
    - Entrada automática no estoque (Event)
    - Criação de conta a pagar (Event)

#### **8.6 Devolução para Fornecedor**

- ✅ Produtos com defeito
- ✅ Produtos errados
- ✅ Solicitar troca ou reembolso
- ✅ Nota de devolução
- ✅ Rastreamento da devolução
- ✅ Crédito do fornecedor

#### **8.7 Análise de Compras**

- ✅ **Relatórios:**
    - Compras por fornecedor
    - Compras por categoria
    - Compras por período
    - Compras por departamento
    - Ticket médio
    - Lead time médio
- ✅ **Indicadores:**
    - Economia obtida (cotações)
    - Percentual de entregas no prazo
    - Taxa de devolução
    - Fornecedores mais utilizados
    - Produtos mais comprados
- ✅ **Curva ABC:**
    - Fornecedores por volume de compra
    - Produtos por volume de compra

#### **8.8 Contratos com Fornecedores**

- ✅ Cadastro de contratos
- ✅ Vigência (início e fim)
- ✅ Valor total do contrato
- ✅ Condições especiais
- ✅ Alertas de renovação
- ✅ Anexos (contrato assinado)

#### **8.9 Aprovação por Alçada**

- ✅ Configuração de alçadas:
    - Até 10.000 MT: Gerente
    - 10.001-50.000 MT: Diretor
    - Acima de 50.000 MT: CEO
- ✅ Aprovação em paralelo ou sequencial
- ✅ Delegação de aprovação
- ✅ Notificações por email/SMS

### **Integrações**

- → **Catalog:** Lista de produtos para compra
- → **Inventory:** Event `GoodsReceived` → entrada automática no estoque
- → **Financial:** Event `GoodsReceived` → criar conta a pagar
- → **Assets:** Compra de activo fixo → cadastro automático

### **Permissões**

- `purchasing.suppliers.view`
- `purchasing.suppliers.create`
- `purchasing.suppliers.edit`
- `purchasing.suppliers.rate`
- `purchasing.requisitions.view`
- `purchasing.requisitions.create`
- `purchasing.requisitions.approve`
- `purchasing.quotations.request`
- `purchasing.quotations.compare`
- `purchasing.purchase_orders.view`
- `purchasing.purchase_orders.create`
- `purchasing.purchase_orders.approve`
- `purchasing.purchase_orders.send`
- `purchasing.goods_receipt.register`
- `purchasing.returns.create`

---

## 9. 📊 REPORTS

### **Descrição**

Business Intelligence e relatórios gerenciais, operacionais e fiscais com dashboards interativos, exportação e agendamento automático.

### **Funcionalidades Principais**

#### **9.1 Dashboard Executivo**

- ✅ **KPIs Principais:**
    - Vendas do mês (valor e variação)
    - Lucro líquido
    - Margem de lucro (%)
    - Ticket médio
    - Clientes ativos
    - Inadimplência (%)
    - Valor do estoque
    - Contas a receber
    - Contas a pagar
    - Fluxo de caixa projetado
- ✅ **Gráficos:**
    - Vendas últimos 12 meses (linha)
    - Vendas por categoria (pizza)
    - Top 10 produtos (barras)
    - Top 10 clientes (barras)
    - Evolução do lucro (linha)
    - Giro de estoque (gauge)
- ✅ **Comparativos:**
    - Período atual vs anterior
    - Orçado vs realizado
    - Metas vs alcançado

#### **9.2 Relatórios de Vendas**

- ✅ **Análise de Vendas:**
    - Por período (dia, semana, mês, ano)
    - Por vendedor
    - Por cliente
    - Por produto/categoria
    - Por forma de pagamento
    - Por armazém/loja
    - Por região
- ✅ **Análise de Desempenho:**
    - Vendedor do mês
    - Produto mais vendido
    - Cliente top
    - Horários de pico
    - Dias da semana com mais vendas
- ✅ **Análise de Margens:**
    - Margem bruta por produto
    - Margem líquida por venda
    - Produtos mais lucrativos
    - Produtos menos lucrativos
- ✅ **Devoluções:**
    - Taxa de devolução
    - Motivos de devolução
    - Produtos mais devolvidos

#### **9.3 Relatórios de Compras**

- ✅ **Análise de Compras:**
    - Por período
    - Por fornecedor
    - Por categoria
    - Por departamento
    - Ticket médio
- ✅ **Performance de Fornecedores:**
    - Entregas no prazo (%)
    - Qualidade (rating médio)
    - Tempo médio de entrega
    - Taxa de devolução
- ✅ **Economia:**
    - Economia em cotações
    - Descontos obtidos
    - Comparativo de preços

#### **9.4 Relatórios de Estoque**

- ✅ **Posição de Estoque:**
    - Snapshot atual
    - Por armazém
    - Por categoria
    - Valor total
- ✅ **Movimentação:**
    - Entradas do período
    - Saídas do período
    - Saldo final
- ✅ **Análise de Giro:**
    - Giro de estoque (turnover)
    - Produtos de alto giro
    - Produtos de baixo giro
    - Produtos parados (sem movimento)
- ✅ **Curva ABC:**
    - Classe A (80% do valor)
    - Classe B (15% do valor)
    - Classe C (5% do valor)
- ✅ **Valorização:**
    - Valor total do estoque
    - Por método (FIFO, LIFO, Médio)
    - Evolução mensal
- ✅ **Obsolescência:**
    - Produtos com validade próxima
    - Produtos parados > 90 dias
    - Produtos com giro < 1

#### **9.5 Relatórios Financeiros**

- ✅ **DRE (Demonstração do Resultado):**
    - Mensal, trimestral, anual
    - Comparativo com período anterior
    - Análise vertical (%)
    - Análise horizontal (variação)
- ✅ **Balanço Patrimonial:**
    - Por período
    - Análise de liquidez
    - Análise de endividamento
- ✅ **DFC (Demonstração do Fluxo de Caixa):**
    - Operacional
    - Investimento
    - Financiamento
- ✅ **Aging Report:**
    - Contas a receber por idade
    - Visualização gráfica
    - Por cliente
- ✅ **Inadimplência:**
    - Taxa de inadimplência
    - Valor total inadimplente
    - Clientes inadimplentes
    - Evolução mensal

#### **9.6 Relatórios Fiscais (AT Moçambique)**

- ✅ **Livro de Vendas:**
    - Todos os documentos emitidos
    - Agrupado por tipo
    - Base tributável
    - IVA cobrado
    - Total
    - Exportação para AT
- ✅ **Livro de Compras:**
    - Notas fiscais de entrada
    - IVA a recuperar
- ✅ **Mapa de IVA:**
    - IVA cobrado (saídas)
    - IVA a recuperar (entradas)
    - IVA a pagar
    - Por taxa (16%, 5%, isento)
- ✅ **SAF-T MZ (XML):**
    - Formato oficial AT
    - Validação conforme XSD
    - Geração automática
    - Assinatura digital
- ✅ **Relatório de Anulações:**
    - Documentos cancelados
    - Motivos
    - Notas de crédito emitidas
- ✅ **Retenções:**
    - IR retido na fonte
    - Por fornecedor
    - Declaração mensal

#### **9.7 Relatórios de Activos**

- ✅ Inventário de activos
- ✅ Valor contábil total
- ✅ Depreciação acumulada
- ✅ Depreciação do período
- ✅ Manutenções realizadas
- ✅ Custo de manutenção

#### **9.8 Relatórios Customizados**

- ✅ **Query Builder:**
    - Interface visual
    - Selecionar tabelas
    - Selecionar campos
    - Aplicar filtros
    - Agrupar por
    - Ordenar
- ✅ **SQL Direto:**
    - Para usuários avançados
    - Validação de segurança
    - Limite de rows
- ✅ **Salvar Relatório:**
    - Nome e descrição
    - Parâmetros
    - Compartilhar com usuários

#### **9.9 Filtros Avançados**

- ✅ Por data/período
- ✅ Por cliente/fornecedor
- ✅ Por produto/categoria
- ✅ Por vendedor/comprador
- ✅ Por status
- ✅ Por forma de pagamento
- ✅ Por armazém/loja
- ✅ Valores (range)
- ✅ Combinação de filtros

#### **9.10 Visualizações**

- ✅ **Tabelas:**
    - Ordenação
    - Filtros
    - Export (Excel, CSV, PDF)
    - Pagination
    - Totalizadores
- ✅ **Gráficos (Recharts):**
    - Linha
    - Barras (vertical, horizontal)
    - Pizza/Donut
    - Área
    - Combinados
    - Gauge/velocímetro
    - Mapas (se geografia)
- ✅ **Drill-Down:**
    - Click no gráfico → detalhes
    - Navegação hierárquica
    - Breadcrumbs

#### **9.11 Exportação**

- ✅ **Formatos:**
    - Excel (XLSX)
    - CSV
    - PDF (formatado)
    - JSON (API)
- ✅ **Templates:**
    - Personalizáveis
    - Logo da empresa
    - Cabeçalho/rodapé
    - Assinatura

#### **9.12 Agendamento**

- ✅ **Frequência:**
    - Diária
    - Semanal
    - Mensal
    - Trimestral
    - Anual
    - Customizada (cron)
- ✅ **Entrega:**
    - Email (múltiplos destinatários)
    - WhatsApp (link)
    - FTP/SFTP
    - Google Drive
    - Dropbox
- ✅ **Parâmetros:**
    - Período automático (mês anterior)
    - Filtros pré-definidos

#### **9.13 Dashboards Personalizados**

- ✅ Criar dashboards customizados
- ✅ Adicionar widgets (KPIs, gráficos, tabelas)
- ✅ Layout drag-and-drop
- ✅ Filtros globais
- ✅ Refresh automático
- ✅ Compartilhar com equipe
- ✅ Dashboard público (para clientes/parceiros)

### **Integrações**

- ← **Sales:** Dados de vendas
- ← **Financial:** Dados financeiros
- ← **Inventory:** Dados de estoque
- ← **Purchasing:** Dados de compras
- ← **Assets:** Dados de activos
- ← **Invoicing:** Dados fiscais

### **Permissões**

- `reports.view`
- `reports.create_custom`
- `reports.export`
- `reports.schedule`
- `reports.fiscal.view` (específico para relatórios fiscais)
- `reports.financial.view` (específico para relatórios financeiros sensíveis)

---

## 🎯 Resumo Comparativo

| Módulo         | Complexidade | Tempo Desenv. | Prioridade | Depende de         |
| -------------- | ------------ | ------------- | ---------- | ------------------ |
| **Customers**  | Baixa        | 3 semanas     | 🔴 Alta    | -                  |
| **Catalog**    | Baixa        | 4 semanas     | 🔴 Alta    | -                  |
| **Inventory**  | Alta         | 5 semanas     | 🟠 Média   | Catalog            |
| **Sales**      | Média        | 3 semanas     | 🔴 Alta    | Catalog, Customers |
| **Invoicing**  | Alta         | 4 semanas     | 🟠 Média   | Sales              |
| **Financial**  | Alta         | 7 semanas     | 🟠 Média   | Sales, Invoicing   |
| **Assets**     | Média        | 4 semanas     | 🟢 Baixa   | Financial          |
| **Purchasing** | Média        | 6 semanas     | 🟡 Média   | Catalog, Inventory |
| **Reports**    | Alta         | 5 semanas     | 🟡 Média   | Todos              |

---

**Sistema ERP completo e integrado para gestão total do seu negócio! 🚀**
