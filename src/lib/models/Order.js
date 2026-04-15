import mongoose from "mongoose";

const billingAddressSchema = new mongoose.Schema(
  {
    line1: { type: String, default: null },
    line2: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    postal_code: { type: String, default: null },
    country: { type: String, default: null },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    stripeSessionId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
      default: null,
      trim: true,
    },
    stripePaymentIntentId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
      default: null,
      trim: true,
    },
    stripeCustomerId: {
      type: String,
      default: null,
      trim: true,
    },
    stripeEventIds: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      required: true,
      default: "pending",
      index: true,
    },
    amountTotal: {
      type: Number,
      default: null,
    },
    amountTotalPence: {
      type: Number,
      default: null,
    },
    currency: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
      index: true,
    },
    customerName: {
      type: String,
      default: null,
      trim: true,
    },
    customerPhone: {
      type: String,
      default: null,
      trim: true,
    },
    billingAddress: {
      type: billingAddressSchema,
      default: null,
    },
    serviceName: {
      type: String,
      default: null,
      trim: true,
    },
    serviceAmountPence: {
      type: Number,
      default: null,
    },
    serviceAmount: {
      type: Number,
      default: null,
    },
    processingFeePence: {
      type: Number,
      default: null,
    },
    processingFee: {
      type: Number,
      default: null,
    },
    feePercent: {
      type: Number,
      default: null,
    },
    feeFixedPence: {
      type: Number,
      default: null,
    },
    receiptUrl: {
      type: String,
      default: null,
    },
    stripePayload: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.index({ createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
