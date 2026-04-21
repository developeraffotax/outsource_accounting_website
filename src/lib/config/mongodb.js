import mongoose from "mongoose";
import dns from "node:dns";

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DNS_SERVERS = process.env.MONGO_DNS_SERVERS;

if (MONGO_DNS_SERVERS) {
  const dnsServers = MONGO_DNS_SERVERS.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (dnsServers.length > 0) {
    try {
      dns.setServers(dnsServers);
    } catch (error) {
      console.error("Invalid MONGO_DNS_SERVERS configuration:", error);
    }
  }
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  if (!MONGO_URI) {
    throw new Error("Missing MONGO_URI environment variable");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
  return cached.conn;
};

export default connectMongoDB;
