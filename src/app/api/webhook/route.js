import connectMongoDB from "@/lib/config/mongodb";
import Order from "@/lib/models/Order";
import {
  sendCustomerPaymentEmail,
  sendAdminPaymentEmail,
} from "@/lib/services/paymentEmail.services";
import { createStripeClient } from "@/lib/stripe/client";
import {
  EVENT_STATUS_MAP,
  verifyStripeWebhookEvent,
} from "@/lib/services/stripeWebhookRuntime.service";

const CHECKOUT_SESSION_EXPAND = [
  "line_items.data.price.product",
  "payment_intent.latest_charge",
];

const LIST_SESSION_EXPAND = [
  "data.line_items.data.price.product",
  "data.payment_intent.latest_charge",
];

const WEBHOOK_LOG_PREFIX = "[StripeWebhook]";

const logWebhook = (message, context = {}) => {
  if (Object.keys(context).length === 0) {
    console.log(`${WEBHOOK_LOG_PREFIX} ${message}`);
    return;
  }

  console.log(`${WEBHOOK_LOG_PREFIX} ${message}`, context);
};

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

const getLineItems = (session) => {
  if (!Array.isArray(session?.line_items?.data)) {
    return [];
  }

  return session.line_items.data;
};

const getLineItemName = (lineItem) => {
  const product = lineItem?.price?.product;

  if (
    isObject(product) &&
    typeof product.name === "string" &&
    product.name.trim()
  ) {
    return product.name.trim();
  }

  if (
    typeof lineItem?.description === "string" &&
    lineItem.description.trim()
  ) {
    return lineItem.description.trim();
  }

  return null;
};

const findFeeLineItem = (lineItems) => {
  return lineItems.find((lineItem) => {
    const name = getLineItemName(lineItem);
    return typeof name === "string" && name.toLowerCase().includes("fee");
  });
};

const findServiceLineItem = (lineItems) => {
  const feeLineItem = findFeeLineItem(lineItems);
  return (
    lineItems.find((lineItem) => lineItem !== feeLineItem) ||
    lineItems[0] ||
    null
  );
};

const resolveServiceName = (session) => {
  const metadataName = session?.metadata?.serviceName;

  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }

  const serviceLineItem = findServiceLineItem(getLineItems(session));
  return getLineItemName(serviceLineItem) || "Service";
};

const resolveServiceAndFeeAmounts = (session) => {
  const metadataServiceAmount = toNumberOrNull(
    session?.metadata?.serviceAmountPence,
  );
  const metadataFeeAmount = toNumberOrNull(
    session?.metadata?.processingFeePence,
  );

  if (metadataServiceAmount !== null && metadataFeeAmount !== null) {
    return {
      serviceAmountPence: metadataServiceAmount,
      processingFeePence: metadataFeeAmount,
    };
  }

  const lineItems = getLineItems(session);
  const feeLineItem = findFeeLineItem(lineItems);
  const serviceLineItem = findServiceLineItem(lineItems);

  const lineServiceAmount =
    typeof serviceLineItem?.amount_total === "number"
      ? serviceLineItem.amount_total
      : toNumberOrNull(serviceLineItem?.amount_subtotal);

  const lineFeeAmount =
    typeof feeLineItem?.amount_total === "number"
      ? feeLineItem.amount_total
      : toNumberOrNull(feeLineItem?.amount_subtotal);

  return {
    serviceAmountPence: metadataServiceAmount ?? lineServiceAmount,
    processingFeePence: metadataFeeAmount ?? lineFeeAmount,
  };
};

const resolveCustomerDetails = (session) => {
  const customerDetails = isObject(session?.customer_details)
    ? session.customer_details
    : null;

  return {
    customerEmail:
      customerDetails?.email ||
      (typeof session?.customer_email === "string"
        ? session.customer_email
        : null),
    customerName: customerDetails?.name || null,
    customerPhone: customerDetails?.phone || null,
    billingAddress: normalizeAddress(customerDetails?.address),
  };
};

const buildOrderUpdateFromSession = ({ session, event, status }) => {
  const { customerEmail, customerName, customerPhone, billingAddress } =
    resolveCustomerDetails(session);

  const { serviceAmountPence, processingFeePence } =
    resolveServiceAndFeeAmounts(session);

  const stripeCustomerId =
    typeof session?.customer === "string"
      ? session.customer
      : isObject(session?.customer)
        ? session.customer.id || null
        : null;

  return {
    stripeSessionId: session.id,
    stripePaymentIntentId: getPaymentIntentId(session.payment_intent),
    stripeCustomerId,
    status,
    amountTotal: convertMinorToMajorAmount(session.amount_total),
    amountTotalPence:
      typeof session.amount_total === "number" ? session.amount_total : null,
    currency: typeof session.currency === "string" ? session.currency : null,
    customerEmail,
    customerName,
    customerPhone,
    billingAddress,
    serviceName: resolveServiceName(session),
    serviceAmountPence,
    serviceAmount: convertMinorToMajorAmount(serviceAmountPence),
    processingFeePence,
    processingFee: convertMinorToMajorAmount(processingFeePence),
    feePercent: toNumberOrNull(session?.metadata?.feePercent),
    feeFixedPence: toNumberOrNull(session?.metadata?.feeFixedPence),
    receiptUrl: getReceiptUrl(session.payment_intent),
    stripePayload: event,
  };
};

const buildOrderUpdateFromPaymentIntent = ({
  paymentIntent,
  event,
  status,
}) => {
  const stripeCustomerId =
    typeof paymentIntent?.customer === "string"
      ? paymentIntent.customer
      : isObject(paymentIntent?.customer)
        ? paymentIntent.customer.id || null
        : null;

  return {
    stripePaymentIntentId: paymentIntent.id,
    stripeCustomerId,
    status,
    amountTotal: convertMinorToMajorAmount(paymentIntent.amount),
    amountTotalPence:
      typeof paymentIntent.amount === "number" ? paymentIntent.amount : null,
    currency:
      typeof paymentIntent.currency === "string"
        ? paymentIntent.currency
        : null,
    customerEmail:
      typeof paymentIntent.receipt_email === "string"
        ? paymentIntent.receipt_email
        : null,
    customerName: null,
    customerPhone: null,
    billingAddress: null,
    serviceName: null,
    serviceAmountPence: null,
    serviceAmount: null,
    processingFeePence: null,
    processingFee: null,
    feePercent: null,
    feeFixedPence: null,
    receiptUrl: getReceiptUrl(paymentIntent),
    stripePayload: event,
  };
};

const isDuplicateEvent = (existingOrder, eventId) => {
  return (
    Array.isArray(existingOrder?.stripeEventIds) &&
    existingOrder.stripeEventIds.includes(eventId)
  );
};

const upsertOrderBySession = async ({ session, event, status }) => {
  const paymentIntentId = getPaymentIntentId(session.payment_intent);

  const lookupFilter = paymentIntentId
    ? {
        $or: [
          { stripeSessionId: session.id },
          { stripePaymentIntentId: paymentIntentId },
        ],
      }
    : { stripeSessionId: session.id };

  const existingOrder = await Order.findOne(lookupFilter)
    .select("_id status stripeEventIds")
    .lean();

  if (isDuplicateEvent(existingOrder, event.id)) {
    logWebhook("Duplicate checkout event ignored", {
      eventId: event.id,
      eventType: event.type,
      sessionId: session.id,
      status,
    });

    return {
      isDuplicate: true,
      wasCompleted: existingOrder.status === "completed",
    };
  }

  const update = buildOrderUpdateFromSession({ session, event, status });

  const updateFilter = existingOrder
    ? { _id: existingOrder._id, stripeEventIds: { $ne: event.id } }
    : { stripeSessionId: session.id, stripeEventIds: { $ne: event.id } };

  try {
    const writeResult = await Order.updateOne(
      updateFilter,
      {
        $set: update,
        $addToSet: { stripeEventIds: event.id },
      },
      { upsert: true },
    );

    logWebhook("Checkout order persisted", {
      eventId: event.id,
      eventType: event.type,
      sessionId: session.id,
      status,
      matchedCount: writeResult.matchedCount,
      modifiedCount: writeResult.modifiedCount,
      upsertedCount: writeResult.upsertedCount,
    });
  } catch (error) {
    if (error?.code === 11000) {
      logWebhook("Duplicate key conflict treated as duplicate checkout event", {
        eventId: event.id,
        eventType: event.type,
        sessionId: session.id,
        status,
      });

      return {
        isDuplicate: true,
        wasCompleted: existingOrder?.status === "completed",
      };
    }

    throw error;
  }

  return {
    isDuplicate: false,
    wasCompleted: existingOrder?.status === "completed",
  };
};

const upsertOrderByPaymentIntent = async ({ paymentIntent, event, status }) => {
  const existingOrder = await Order.findOne({
    stripePaymentIntentId: paymentIntent.id,
  })
    .select("stripeEventIds")
    .lean();

  if (isDuplicateEvent(existingOrder, event.id)) {
    logWebhook("Duplicate payment_intent event ignored", {
      eventId: event.id,
      eventType: event.type,
      paymentIntentId: paymentIntent.id,
      status,
    });

    return { isDuplicate: true };
  }

  const update = buildOrderUpdateFromPaymentIntent({
    paymentIntent,
    event,
    status,
  });

  try {
    const writeResult = await Order.updateOne(
      {
        stripePaymentIntentId: paymentIntent.id,
        stripeEventIds: { $ne: event.id },
      },
      {
        $set: update,
        $addToSet: { stripeEventIds: event.id },
      },
      { upsert: true },
    );

    logWebhook("Payment-intent order persisted", {
      eventId: event.id,
      eventType: event.type,
      paymentIntentId: paymentIntent.id,
      status,
      matchedCount: writeResult.matchedCount,
      modifiedCount: writeResult.modifiedCount,
      upsertedCount: writeResult.upsertedCount,
    });
  } catch (error) {
    if (error?.code === 11000) {
      logWebhook(
        "Duplicate key conflict treated as duplicate payment_intent event",
        {
          eventId: event.id,
          eventType: event.type,
          paymentIntentId: paymentIntent.id,
          status,
        },
      );

      return { isDuplicate: true };
    }

    throw error;
  }

  return { isDuplicate: false };
};

const retrieveCheckoutSession = async ({ stripe, sessionId }) => {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: CHECKOUT_SESSION_EXPAND,
  });
};

const findCheckoutSessionByPaymentIntent = async ({ stripe, paymentIntentId }) => {
  const sessions = await stripe.checkout.sessions.list({
    payment_intent: paymentIntentId,
    limit: 1,
    expand: LIST_SESSION_EXPAND,
  });

  return sessions.data?.[0] || null;
};

const sendCompletedPaymentEmails = async (session) => {
  const { customerEmail } = resolveCustomerDetails(session);
  const amountTotal = session.amount_total;
  const currency = session.currency;
  const serviceName = resolveServiceName(session);
  const receiptUrl = getReceiptUrl(session.payment_intent);

  if (customerEmail) {
    await sendCustomerPaymentEmail({
      customerEmail,
      amountTotal,
      currency,
      serviceName,
      receiptUrl,
    });
  }

  await sendAdminPaymentEmail({
    customerEmail: customerEmail || "Unknown",
    amountTotal,
    currency,
    serviceName,
  });
};

const handleCheckoutSessionEvent = async ({ stripe, event, status }) => {
  const sessionId = event?.data?.object?.id;

  if (!sessionId) {
    throw new Error("Missing checkout session id in webhook event");
  }

  logWebhook("Handling checkout session event", {
    eventId: event.id,
    eventType: event.type,
    sessionId,
    status,
  });

  const session = await retrieveCheckoutSession({ stripe, sessionId });
  const upsertResult = await upsertOrderBySession({ session, event, status });

  const shouldSendCompletedEmails =
    status === "completed" &&
    !upsertResult.isDuplicate &&
    !upsertResult.wasCompleted;

  if (shouldSendCompletedEmails) {
    logWebhook("Sending completion emails", {
      eventId: event.id,
      eventType: event.type,
      sessionId,
    });

    try {
      await sendCompletedPaymentEmails(session);

      logWebhook("Completion emails sent", {
        eventId: event.id,
        eventType: event.type,
        sessionId,
      });
    } catch (error) {
      // Email delivery is non-critical for webhook success. Persisted order state
      // should not be retried indefinitely due to downstream mail issues.
      logWebhook("Completion email delivery failed", {
        eventId: event.id,
        eventType: event.type,
        sessionId,
        message: error?.message,
        code: error?.code,
      });
    }

    return;
  }

  logWebhook("Completion emails skipped", {
    eventId: event.id,
    eventType: event.type,
    sessionId,
    reason: upsertResult.isDuplicate
      ? "duplicate-event"
      : upsertResult.wasCompleted
        ? "already-completed"
        : "not-completed-status",
  });
};

const handlePaymentIntentCanceled = async ({ stripe, event, status }) => {
  const paymentIntent = event?.data?.object;
  const paymentIntentId = paymentIntent?.id;

  if (!paymentIntentId) {
    throw new Error("Missing payment intent id in webhook event");
  }

  logWebhook("Handling payment_intent canceled event", {
    eventId: event.id,
    eventType: event.type,
    paymentIntentId,
    status,
  });

  const relatedSession = await findCheckoutSessionByPaymentIntent({
    stripe,
    paymentIntentId,
  });

  if (relatedSession) {
    logWebhook("Found related checkout session for canceled payment_intent", {
      eventId: event.id,
      eventType: event.type,
      paymentIntentId,
      sessionId: relatedSession.id,
    });

    await upsertOrderBySession({
      session: relatedSession,
      event,
      status,
    });
    return;
  }

  logWebhook(
    "No related checkout session found, persisting by payment_intent",
    {
      eventId: event.id,
      eventType: event.type,
      paymentIntentId,
    },
  );

  await upsertOrderByPaymentIntent({ paymentIntent, event, status });
};

export async function POST(req) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return new Response(
      JSON.stringify({ error: "Server is missing STRIPE_SECRET_KEY" }),
      { status: 500 },
    );
  }

  const stripe = createStripeClient(stripeSecretKey);

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  logWebhook("Webhook request received", {
    hasSignature: Boolean(signature),
    bodyLength: body.length,
  });

  let event;
  try {
    event = verifyStripeWebhookEvent({
      stripe,
      body,
      signature,
      secret: process.env.STRIPE_WEBHOOK_SECRET,
    });
  } catch (err) {
    console.error(`${WEBHOOK_LOG_PREFIX} Signature verification failed:`, {
      message: err.message,
      hasSignature: Boolean(signature),
    });
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  logWebhook("Webhook signature verified", {
    eventId: event.id,
    eventType: event.type,
  });

  const status = EVENT_STATUS_MAP[event.type];

  if (!status) {
    logWebhook("Ignoring unsupported event", {
      eventId: event.id,
      eventType: event.type,
    });

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }

  try {
    await connectMongoDB();
    logWebhook("MongoDB connection ready", {
      eventId: event.id,
      eventType: event.type,
    });

    if (event.type.startsWith("checkout.session.")) {
      await handleCheckoutSessionEvent({ stripe, event, status });
    } else if (event.type === "payment_intent.canceled") {
      await handlePaymentIntentCanceled({ stripe, event, status });
    }

    logWebhook("Webhook event processed successfully", {
      eventId: event.id,
      eventType: event.type,
      status,
    });
  } catch (error) {
    console.error(`${WEBHOOK_LOG_PREFIX} Processing failed:`, {
      eventId: event?.id,
      eventType: event?.type,
      message: error?.message,
      code: error?.code,
      statusCode: error?.statusCode,
      causeMessage: error?.cause?.message,
    });
    console.error(error);

    const status = error?.statusCode || 500;
    const message =
      status >= 400 && status < 500
        ? error?.message || "Webhook request failed"
        : error?.code === "MAIL_DELIVERY_FAILED"
          ? "Webhook email delivery failed"
          : "Webhook processing failed";

    return new Response(
      JSON.stringify({
        error: message,
        code: error?.code || "INTERNAL_ERROR",
      }),
      {
        status,
      },
    );
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
