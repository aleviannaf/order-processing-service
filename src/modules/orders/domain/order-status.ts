export enum OrderStatus {
  CREATED = 'CREATED',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.CREATED]: [OrderStatus.PAID, OrderStatus.FAILED],
  [OrderStatus.PAID]: [OrderStatus.PROCESSING],
  [OrderStatus.PROCESSING]: [OrderStatus.COMPLETED, OrderStatus.FAILED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.FAILED]: [],
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return allowedTransitions[from].includes(to);
}
