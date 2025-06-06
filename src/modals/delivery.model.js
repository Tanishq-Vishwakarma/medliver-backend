const { string } = require("joi");
const mongoose = require("mongoose");

const deliveryPartnerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: null
  },
  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  role: {
    type: String,
    enum: ['delivery_partner'],
    default: 'delivery_partner',
    required: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  profilePhoto: {
    type: String,
  },
  documents: {
    aadharUrls: {
      front: { type: String, default: null },
      back: { type: String, default: null },
    },
    licenseUrl: { type: String, default: null },
    rcCardUrl: { type: String, default: null },
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  availabilityStatus: {
    type: String,
    enum: ["available", "on-delivery", "offline"],
    default: "offline",
  },
  location: {
    lat: { type: Number },
    long: { type: Number },
  },
  pharmacy: {
    lat: { type: Number },
    long: { type: Number },
  },
  assignedOrders: [
    {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      status: String,
    },
  ],
  earnings: {
    totalEarnings: { type: Number, default: 0 },
    monthly: [
      {
        month: String,
        amount: Number,
      },
    ],
  },
  rating: {
    type: Number,
    default: 0,
  },
  emergencyContacts: [
    {
      name: String,
      phone: String,
    },
  ],
  sosTriggered: {
    type: Boolean,
    default: false,
  },
  deviceToken: {
    type: String,
    default: null
  },
  lastHeartbeat:{
    type:Date,
    default:Date.now()
  }
}, { timestamps: true });

deliveryPartnerSchema.pre('save', function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

module.exports = mongoose.model("DeliveryPartner", deliveryPartnerSchema);
