import mongoose from "mongoose";
import dns from "node:dns";

let isConnecting = false;
let listenersAttached = false;

const attemptConnection = async (uri) => {
  return await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
};

const attachListenersOnce = () => {
  if (listenersAttached) return;
  listenersAttached = true;

  mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected. Retrying in 10 seconds...");
    setTimeout(connectDB, 10000);
  });
};

const connectDB = async () => {
  if (mongoose.connection.readyState === 1 || isConnecting) {
    return;
  }

  attachListenersOnce();
  isConnecting = true;

  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing in backend/.env");
    isConnecting = false;
    return;
  }

  try {
    // Attempt 1: Standard system DNS resolution
    await attemptConnection(process.env.MONGODB_URI);
    isConnecting = false;
  } catch (firstErr) {
    console.warn("⚠️ Initial MongoDB connection attempt failed:", firstErr.message);

    // If it's a DNS SRV resolution error on Windows, try public DNS fallback
    if (firstErr.message.includes("querySrv") || firstErr.message.includes("ENOTFOUND")) {
      try {
        console.log("🔄 Retrying with public DNS fallback (8.8.8.8, 1.1.1.1)...");
        dns.setDefaultResultOrder("ipv4first");
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
        await attemptConnection(process.env.MONGODB_URI);
        isConnecting = false;
        return;
      } catch (dnsErr) {
        console.error("❌ Public DNS retry also failed:", dnsErr.message);
      }
    }

    console.error("\n========================================================");
    console.error("❌ MongoDB Connection Failed!");
    console.error("👉 Likely Cause: MongoDB Atlas IP Access List (Whitelist)");
    console.error("👉 Solution: In MongoDB Atlas (cloud.mongodb.com):");
    console.error("   1. Go to Security -> Network Access");
    console.error("   2. Add IP Address -> Select 'Allow Access from Anywhere' (0.0.0.0/0)");
    console.error("   3. Confirm and verify your cluster is active (not paused)");
    console.error("========================================================\n");

    isConnecting = false;
    // Schedule retry in 10 seconds
    setTimeout(connectDB, 10000);
  }
};

export default connectDB;
