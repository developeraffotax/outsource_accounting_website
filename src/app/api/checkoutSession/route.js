import Stripe from "stripe";
import connectMongoDB from "@/lib/config/mongodb";
import Order from "@/lib/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const isObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const toNumberOrNull = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const convertMinorToMajorAmount = (value) => {
  const amountInMinorUnit = toNumberOrNull(value);

  if (amountInMinorUnit === null) {
    return null;
  }

  return Number((amountInMinorUnit / 100).toFixed(2));
};

const normalizeAddress = (address) => {
  if (!isObject(address)) {
    return null;
  }

  return {
    line1: address.line1 || null,
    line2: address.line2 || null,
    city: address.city || null,
    state: address.state || null,
    postal_code: address.postal_code || null,
    country: address.country || null,
  };
};

const getPaymentIntentId = (paymentIntent) => {
  if (!paymentIntent) {
    return null;
  }

  if (typeof paymentIntent === "string") {
    return paymentIntent;
  }

  if (isObject(paymentIntent) && typeof paymentIntent.id === "string") {
    return paymentIntent.id;
  }

  return null;
};

const getReceiptUrl = (paymentIntent) => {
  if (!isObject(paymentIntent)) {
    return null;
  }

  const latestCharge = paymentIntent.latest_charge;

  if (!isObject(latestCharge)) {
    return null;
  }

  return latestCharge.receipt_url || null;
};

const resolveOrderStatus = (session) => {
  if (session?.payment_status === "paid") {
    return "completed";
  }

  if (session?.status === "expired") {
    return "cancelled";
  }

  return "pending";
};

const buildOrderUpdateFromSession = (session) => {
  const customerDetails = isObject(session?.customer_details)
    ? session.customer_details
    : null;

  const stripeCustomerId =
    typeof session?.customer === "string"
      ? session.customer
      : isObject(session?.customer)
        ? session.customer.id || null
        : null;

  const serviceAmountPence = toNumberOrNull(session?.metadata?.serviceAmountPence);
  const processingFeePence = toNumberOrNull(
    session?.metadata?.processingFeePence,
  );

  return {
    stripeSessionId: session.id,
    stripePaymentIntentId: getPaymentIntentId(session.payment_intent),
    stripeCustomerId,
    status: resolveOrderStatus(session),
    amountTotal: convertMinorToMajorAmount(session.amount_total),
    amountTotalPence:
      typeof session.amount_total === "number" ? session.amount_total : null,
    currency: typeof session.currency === "string" ? session.currency : null,
    customerEmail:
      customerDetails?.email ||
      (typeof session?.customer_email === "string" ? session.customer_email : null),
    customerName: customerDetails?.name || null,
    customerPhone: customerDetails?.phone || null,
    billingAddress: normalizeAddress(customerDetails?.address),
    serviceName:
      typeof session?.metadata?.serviceName === "string" &&
      session.metadata.serviceName.trim()
        ? session.metadata.serviceName.trim()
        : null,
    serviceAmountPence,
    serviceAmount: convertMinorToMajorAmount(serviceAmountPence),
    processingFeePence,
    processingFee: convertMinorToMajorAmount(processingFeePence),
    feePercent: toNumberOrNull(session?.metadata?.feePercent),
    feeFixedPence: toNumberOrNull(session?.metadata?.feeFixedPence),
    receiptUrl: getReceiptUrl(session.payment_intent),
    stripePayload: {
      source: "checkoutSession.api",
      sessionId: session.id,
      paymentStatus: session.payment_status,
      fetchedAt: new Date().toISOString(),
    },
  };
};

const persistPaidSessionOrder = async (session) => {
  if (!session?.id || session?.payment_status !== "paid") {
    return;
  }

  const paymentIntentId = getPaymentIntentId(session.payment_intent);
  const lookupFilter = paymentIntentId
    ? {
        $or: [
          { stripeSessionId: session.id },
          { stripePaymentIntentId: paymentIntentId },
        ],
      }
    : { stripeSessionId: session.id };

  const existingOrder = await Order.findOne(lookupFilter).select("_id").lean();

  const updateFilter = existingOrder
    ? { _id: existingOrder._id }
    : { stripeSessionId: session.id };

  await Order.updateOne(
    updateFilter,
    {
      $set: buildOrderUpdateFromSession(session),
      $setOnInsert: { stripeEventIds: [] },
    },
    { upsert: true },
  );
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    // Validate session_id
    if (!sessionId) {
      return Response.json(
        { error: "session_id is required" },
        { status: 400 },
      );
    }

    let session;

    try {
      session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent.latest_charge", "line_items.data.price.product"],
      });
    } catch (err) {
      // Unknown session
      if (err.code === "resource_missing") {
        return Response.json({ error: "Session not found" }, { status: 404 });
      }

      throw err;
    }

    await connectMongoDB();
    await persistPaidSessionOrder(session);

    const paymentIntent = session.payment_intent;
    const latestCharge = paymentIntent?.latest_charge;

    return Response.json({
      sessionId: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      email: session.customer_details?.email || null,
      receipt_url: latestCharge?.receipt_url || null,
    });
  } catch (error) {
    console.error("Stripe session fetch error:", error);

    return Response.json(
      { error: "Failed to retrieve checkout session" },
      { status: 500 },
    );
  }
}
