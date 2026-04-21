import PaymentConfirm from "@/components/payments/PaymentConfirm";

export default async function PaymentConfirmed({ searchParams }) {
  const { session_id: sessionId, receipt_token: receiptToken } = await searchParams;
  return <PaymentConfirm sessionId={sessionId} receiptToken={receiptToken} />;
}
