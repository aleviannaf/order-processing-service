# 📦 Projeto: Order Processing Service

## 🎯 Objetivo do Projeto
Construir uma API backend production-ready para processamento de pedidos e pagamentos, com foco em:

- Arquitetura limpa e modular (NestJS)
- Regras de negócio explícitas (domínio claro)
- Idempotência e consistência
- Integração real com Stripe (Checkout Session + Webhooks)
- Evolução para processamento assíncrono (Retry + DLQ)
- Código legível, testável e sustentável

Este projeto é um portfólio técnico backend,
estruturado com práticas profissionais.

---

## 🧠 Conceitos-chave usados no projeto
- Bounded Context (módulo orders)
- Separação de camadas (HTTP → Application → Infra)
- Infra não contém regra de negócio
- Banco evolui via migrations
- Falhas são esperadas e tratadas
- Pagamento é assíncrono (event-driven via webhook)
- Idempotência para suportar retries com segurança

---

## 🧱 Stack Definida
- Node.js + TypeScript
- NestJS
- PostgreSQL
- TypeORM (migrations)
- Docker + Docker Compose
- Stripe (Test Mode)
- Jest

---

## 🧩 Escopo Funcional (Backlog do Produto)

### Epic A — Pedidos
- Criar pedido com itens e valor total
- Consultar pedido por ID
- Listar pedidos com paginação e filtro por status
- Máquina de estados do pedido:
  CREATED → PAID → PROCESSING → COMPLETED | FAILED
- Transições inválidas devem gerar erro de domínio

---

### Epic B — Pagamento (Stripe)
- Criar Checkout Session para pedido
- Garantir idempotência na criação do checkout
- Receber webhooks do Stripe
- Verificar assinatura do webhook (Stripe-Signature)
- Confirmar pagamento somente via webhook
- Garantir idempotência de eventos (event.id)

---

### Epic C — Confiabilidade (Evolução)
- Processamento assíncrono pós-pagamento
- Retry com backoff
- Dead Letter Queue (DLQ)

---

### Epic D — Qualidade e DX
- Swagger / OpenAPI
- Logs estruturados
- Tratamento global de erros
- Testes unitários e de integração
- README com decisões arquiteturais

---

## 🔐 Escopo de Segurança

### Fora do escopo inicial
- Autenticação JWT
- Autorização por usuário/role

Motivo:
O foco do projeto é domínio, consistência, pagamentos e arquitetura.
Autenticação adiciona complexidade que não é essencial nesta fase.

### Dentro do escopo
- Webhooks protegidos por assinatura criptográfica (Stripe)
- Preparação para adicionar API Key (admin) como evolução
- JWT/RBAC pode ser adicionado futuramente sem refatoração pesada

---

## 🏃‍♂️ Planejamento por Sprints

### Sprint 0 — Fundação (Infra + Base)
- Repo criado + GitFlow simples (main + develop)
- NestJS bootstrap no develop
- Docker Compose (Postgres)
- TypeORM configurado
- Migrations habilitadas
- OrdersModule + OrderEntity + migration inicial

Status: Concluída

---

### Sprint 1 — Domínio de Pedido
Objetivo: regras de negócio claras e testáveis + endpoints básicos de pedidos

Entregas:
- Máquina de estados do pedido (domínio)
- CreateOrderService
- GetOrderService
- ListOrdersService
- Controllers HTTP para Orders
- Testes unitários de domínio (e integração básica se fizer sentido)

Status: Em andamento

---

### Sprint 2 — Stripe Checkout Session
- Integração Stripe (Test Mode)
- Provider Stripe isolado (infra)
- Endpoint POST /orders/:id/checkout
- Idempotência de request
- Persistência do checkoutSessionId

---

### Sprint 3 — Webhooks Stripe
- Endpoint POST /webhooks/stripe
- Verificação de assinatura
- Processar checkout.session.completed
- Atualizar status para PAID
- Tabela processed_events (idempotência)
- Teste de webhook duplicado

---

### Sprint 4 — Observabilidade + Hardening
- Tratamento global de erros
- Logs estruturados
- Swagger completo
- README final com trade-offs

---

### Sprint 5 — Retry + DLQ (Evolução)
- Fila (BullMQ ou SQS)
- Worker de processamento
- Retry com backoff
- Dead Letter Queue
- Endpoint/admin para reprocessar

---

## ✅ O que já foi feito (marcos)
- Sprint 0 concluída (infra, banco, migrations, módulo orders, entity inicial)
- Sprint 1.1 (Passo 1) concluído:
  - criado o núcleo do domínio para transições de status:
    - OrderStatus
    - allowedTransitions
    - canTransition(from,to)

---

## 📌 API Contract (Sprint 1)
Esta seção define o contrato HTTP que vamos implementar na Sprint 1 (sem Stripe ainda).

### 1) Criar pedido
POST /orders

Request:
{
  "items": [
    { "sku": "SKU-123", "name": "Produto A", "quantity": 2, "unitPriceCents": 1990 }
  ]
}

Regras:
- quantity > 0
- unitPriceCents > 0
- items.length >= 1
- totalCents é calculado no backend: soma(quantity * unitPriceCents)

Response 201:
{
  "id": "uuid",
  "status": "CREATED",
  "items": [
    { "sku": "SKU-123", "name": "Produto A", "quantity": 2, "unitPriceCents": 1990 }
  ],
  "totalCents": 3980,
  "createdAt": "ISO_DATE",
  "updatedAt": "ISO_DATE"
}

Erros:
- 400 VALIDATION_ERROR

---

### 2) Buscar pedido por id
GET /orders/:id

Response 200:
(mesmo shape do create)

Erros:
- 404 ORDER_NOT_FOUND

---

### 3) Listar pedidos
GET /orders?status=CREATED&page=1&limit=20

Response 200:
{
  "data": [
    { "id": "uuid", "status": "CREATED", "totalCents": 3980, "createdAt": "ISO_DATE", "updatedAt": "ISO_DATE" }
  ],
  "page": 1,
  "limit": 20,
  "total": 42
}

Erros:
- 400 VALIDATION_ERROR

---

## 📌 Padrão de erro (contrato)
Resposta de erro padronizada:

{
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "Invalid request",
  "details": []
}

---

## 📌 Status Atual
- Sprint atual: Sprint 1
- Última tarefa concluída: Sprint 1.1 (Passo 1) — máquina de estados do pedido (OrderStatus + canTransition)
- Próxima tarefa: Sprint 1.2 — criar DTOs e Controllers para implementar o contrato HTTP (Create/Get/List)

---

## 🔁 Como retomar este projeto
Copie este documento e diga:
"Estamos trabalhando neste projeto. O status atual é Sprint X. Quero continuar a partir de Y."

Este arquivo é a fonte de verdade do projeto.
