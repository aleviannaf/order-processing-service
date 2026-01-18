export interface CreateCheckoutSessionInput {
  orderId: string;
  amountCents: number;
  currency: string;
}

export interface CreateCheckoutSessionOutput {
  checkoutUrl: string;
  sessionId: string;
}

export interface PaymentGateway {
  createCheckoutSession(
    input: CreateCheckoutSessionInput,
  ): Promise<CreateCheckoutSessionOutput>;
}
