================================================================================
ARQUIVO: docs/PROJECT_CONTROL.md
================================================================================

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
- Docker Compose (Postgres)
- Configuração do TypeORM
- Migrations habilitadas
- Estrutura modular inicial
- Repo organizado com GitFlow simples

Status: Concluída

---

### Sprint 1 — Domínio de Pedido
- Máquina de estados do pedido
- CreateOrderService
- GetOrderService
- ListOrdersService
- Testes unitários de domínio

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

## 📌 Status Atual
- Sprint atual: Sprint 1
- Última tarefa concluída: Sprint 0.3 — OrdersModule + OrderEntity + migration inicial
- Próxima tarefa: Sprint 1.1 — Máquina de estados do pedido

---
