import PaymentConfirm from "@/components/payments/PaymentConfirm";

export default async function PaymentConfirmed({ searchParams }) {
  const { session_id: sessionId } = await searchParams;
  return <PaymentConfirm sessionId={sessionId} />;
}
