# 📦 Projeto: Sistema de Pedidos com Stripe (Backend Portfolio)

## 🎯 Objetivo do Projeto

Construir uma API backend **production-ready** para gestão de pedidos e pagamentos usando **Stripe Checkout Session**, com foco em:

* Arquitetura limpa e modular
* Regras de negócio explícitas
* Idempotência e consistência
* Webhooks seguros
* Evolução para Retry + DLQ

Este projeto serve como **portfólio técnico** , respondendo antecipadamente dúvidas comuns de entrevistas técnicas.

---

## 🧱 Stack Definida

* Node.js + TypeScript
* Framework HTTP: (a definir / NestJS ou Express)
* ORM: TypeORM
* Banco: PostgreSQL
* Pagamentos: Stripe (Test Mode)
* Testes: Jest
* Infra local: Docker + Docker Compose

---

## 🧩 Escopo Funcional (Backlog do Produto)

### Epic A — Pedidos

* Criar pedido com itens e valor total
* Consultar pedido por ID
* Listar pedidos com paginação e filtro por status
* Máquina de estados:

  * CREATED → PAID → PROCESSING → COMPLETED | FAILED
  * Transições inválidas devem gerar erro de domínio

### Epic B — Pagamento (Stripe)

* Criar Checkout Session para pedido
* Garantir idempotência na criação do checkout
* Receber webhook do Stripe com verificação de assinatura
* Confirmar pagamento apenas via webhook
* Garantir idempotência de eventos (`event.id`)

### Epic C — Confiabilidade (Evolução)

* Processamento assíncrono pós-pagamento
* Retry com backoff
* Dead Letter Queue (DLQ)

### Epic D — Qualidade

* Swagger / OpenAPI
* Logs estruturados
* Tratamento global de erros
* Testes unitários e de integração
* README com decisões arquiteturais

---

## 🏃‍♂️ Planejamento por Sprints

### Sprint 0 — Fundação (DX + Infra)

**Objetivo:** Base sólida para desenvolvimento

* [ ] Docker Compose (app + postgres)
* [ ] Configuração do ORM + migrations
* [ ] Estrutura de pastas modular
* [ ] Testes rodando
* [ ] README: como rodar o projeto

**Sprint concluída quando:**

> `docker compose up` sobe tudo e `npm test` funciona

---

### Sprint 1 — Domínio de Pedido

**Objetivo:** Regras de negócio claras e testadas

* [ ] Entidade Order
* [ ] Enum de status
* [ ] Máquina de estados
* [ ] CreateOrderService
* [ ] GetOrderService
* [ ] ListOrdersService
* [ ] Testes unitários das regras

---

### Sprint 2 — Stripe Checkout Session

**Objetivo:** Iniciar pagamento de forma segura

* [ ] Integração com Stripe (Test Mode)
* [ ] Provider Stripe isolado (infra)
* [ ] Endpoint POST /orders/:id/checkout
* [ ] Idempotência de request
* [ ] Persistência de checkoutSessionId

---

### Sprint 3 — Webhook Stripe

**Objetivo:** Confirmar pagamento corretamente

* [ ] Endpoint POST /webhooks/stripe
* [ ] Verificação de assinatura (Stripe-Signature)
* [ ] Processar checkout.session.completed
* [ ] Marcar pedido como PAID
* [ ] Tabela processed_events
* [ ] Teste de webhook duplicado

---

### Sprint 4 — Observabilidade + Hardening

**Objetivo:** Maturidade de produção

* [ ] Logs estruturados (requestId, orderId, eventId)
* [ ] Handler global de erros
* [ ] Swagger completo
* [ ] README com decisões e trade-offs

---

### Sprint 5 — Retry + DLQ (Evolução)

**Objetivo:** Robustez contra falhas

* [ ] Fila (a definir: Redis/BullMQ ou SQS)
* [ ] Worker de processamento
* [ ] Retry com backoff
* [ ] DLQ
* [ ] Endpoint/admin para reprocessar

---

## 🧠 Como Retomar Este Projeto em Outra Conversa

Copie este documento inteiro e diga:

> "Estamos trabalhando neste projeto. O que já foi feito é X. Quero continuar da Sprint Y."

Este arquivo é a **fonte de verdade** do projeto.

---

## 📌 Status Atual

* Sprint atual: Sprint 0
* Última tarefa concluída: Docker Compose (Postgres) + TypeORM config + migrations scripts
* Próxima tarefa: Estrutura de módulos + OrderEntity + primeira migration (Init)
