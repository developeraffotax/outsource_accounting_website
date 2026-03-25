import topBarQuery from "@/lib/data/topBarQuery";
import Container from "@/components/wraper/Container";
import RetryPaymentButton from "@/components/shared/buttons/RetryPaymentButton";
import Link from "next/link";

const PaymentCancelled = async ({ serviceName }) => {
  const res = await topBarQuery();
  const content = res?.data?.topBar;

  if (!content) return null;

  return (
    <Container className="flex flex-col items-center gap-6 p-20 text-center">
      {/* Headline */}
      <h1 className="text-4xl font-bold text-red-700">Payment Cancelled</h1>

      {/* Explanation */}
      <p className="max-w-md text-gray-600 text-lg">
        Your payment was cancelled or could not be completed. Don’t worry — you
        can try again or contact support if needed.
      </p>

      {!serviceName && (
        <p className="text-sm text-amber-700">
          We could not detect which service you selected. Please choose again.
        </p>
      )}

      {/* Retry / Back Button */}
      <div className="flex gap-4 mt-4">
        <RetryPaymentButton serviceName={serviceName} />

        <Link
          href="/"
          className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          Go Home
        </Link>
      </div>

      {/* Contact Info */}
      <div className="mt-8 border-t pt-4 space-y-1 text-gray-700">
        <p>
          <strong>Email:</strong> {content.email}
        </p>
        <p>
          <strong>Phone:</strong> {content.number}
        </p>
      </div>
    </Container>
  );
};

export default PaymentCancelled;
