"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PaymentConfirm = ({ sessionId }) => {
  const [receiptDetails, setreceiptDetails] = useState(null);
  const [error, setError] = useState(null);

  if (!sessionId) return <p>Session Id is missing</p>;

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch(
          `/api/checkoutSession?session_id=${encodeURIComponent(sessionId)}`,
        );

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            `Expected JSON response, received: ${text.slice(0, 120)}`,
          );
        }

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load checkout session");
        }
        setreceiptDetails(data);
      } catch (err) {
        setError(err.message);
      }
    }

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  if (error) return <p>Error: {error}</p>;

  if (!receiptDetails) return <p>Loading receiptDetails details...</p>;

  return (
    <div className="bg-gray-50 border border-gray-100 p-10 m-10 justify-self-center items-center rounded-2xl max-w-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Payment Confirmed
      </h2>

      <table className="w-full border-collapse">
        <tbody>
          {/* Email Row */}
          <tr className="border-b border-gray-400/30">
            <td className="py-4 font-semibold text-gray-700">Email</td>
            <td className="py-4 text-right text-gray-600">
              {receiptDetails.email || "N/A"}
            </td>
          </tr>

          {/* Status Row */}
          <tr className="border-b border-gray-400/30">
            <td className="py-4 font-semibold text-gray-700">Status</td>
            <td className="py-4 text-right">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {receiptDetails.payment_status}
              </span>
            </td>
          </tr>

          {/* Amount Row */}
          <tr className="border-b border-gray-400/30">
            <td className="py-4 font-semibold text-gray-700">Amount</td>
            <td className="py-4 text-right font-mono font-bold text-gray-800">
              {receiptDetails.amount_total / 100}{" "}
              {receiptDetails.currency?.toUpperCase()}
            </td>
          </tr>

          {/* Receipt Link Row */}
          {receiptDetails.receipt_url && (
            <tr>
              <td className="py-4 font-semibold text-gray-700">Receipt</td>
              <td className="py-4 text-right">
                <a
                  href={receiptDetails.receipt_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-800 hover:text-blue-500 underline transition-colors"
                >
                  View Receipt
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-(--color-buttonBlue) px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Redirect Home
      </Link>
    </div>
  );
};

export default PaymentConfirm;
