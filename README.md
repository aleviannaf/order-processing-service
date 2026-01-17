# order-processing-service

Backend service em NestJS para processamento de pedidos e pagamentos, com integração via Stripe Checkout Session, webhooks seguros e idempotência.

## Status / Roadmap
Acompanhe backlog e sprints em: `docs/PROJECT_CONTROL.md`

## Stack
- Node.js + TypeScript + NestJS
- PostgreSQL + TypeORM (migrations)
- Docker Compose (ambiente local)

## Como rodar (dev)
1. Suba o Postgres:
```bash
docker compose up -d
```
2. Configure env:
```bash
cp .env.example .env
```
3.Rode migrations:
```bash
npm run migration:run
```
4.Rode a API:
```bash
npm run start:dev
```