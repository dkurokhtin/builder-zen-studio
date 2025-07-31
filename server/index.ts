import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getUserInfo,
  getVpnConfig,
  getSubscriptionPlans,
  activateFreeTrial,
  extendSubscription,
  toggleAutoRenewal,
  refreshSubscriptionStatus,
  getServiceStats
} from "./routes/vpn";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // VPN API routes
  app.get("/api/vpn/user/:telegramId", getUserInfo);
  app.get("/api/vpn/config/:telegramId", getVpnConfig);
  app.get("/api/vpn/plans", getSubscriptionPlans);
  app.get("/api/vpn/stats", getServiceStats);
  app.post("/api/vpn/trial", activateFreeTrial);
  app.post("/api/vpn/extend", extendSubscription);
  app.post("/api/vpn/auto-renewal", toggleAutoRenewal);
  app.get("/api/vpn/refresh/:telegramId", refreshSubscriptionStatus);

  return app;
}
