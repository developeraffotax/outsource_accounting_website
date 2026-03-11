import PaymentCencled from "@/components/payments/PaymentCencled";

export default async function PaymentCancelledPage({ searchParams }) {
  const { serviceName } = await searchParams;

  return <PaymentCencled serviceName={serviceName} />;
}
