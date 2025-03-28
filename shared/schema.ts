import { pgTable, text, serial, integer, boolean, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Cloud pricing data cached from providers
export const cloudPricing = pgTable("cloud_pricing", {
  id: serial("id").primaryKey(),
  provider: text("provider").notNull(), // aws, gcp, azure, scinet, cyverse
  region: text("region").notNull(),
  instanceType: text("instance_type").notNull(),
  vCpus: integer("vcpus").notNull(),
  memoryGb: real("memory_gb").notNull(),
  onDemandHourly: real("on_demand_hourly").notNull(),
  spotHourly: real("spot_hourly"),
  storageGbMonthly: real("storage_gb_monthly"),
  networkEgressGbCost: real("network_egress_gb_cost"),
  lastUpdated: text("last_updated").notNull(),
});

export const insertCloudPricingSchema = createInsertSchema(cloudPricing).omit({
  id: true,
});

export type InsertCloudPricing = z.infer<typeof insertCloudPricingSchema>;
export type CloudPricing = typeof cloudPricing.$inferSelect;

// Cost estimates from user inputs
export const costEstimates = pgTable("cost_estimates", {
  id: serial("id").primaryKey(),
  timestamp: text("timestamp").notNull(),
  cpuCount: integer("cpu_count").notNull(),
  memorySize: integer("memory_size").notNull(),
  storageSize: integer("storage_size").notNull(),
  hoursPerDay: integer("hours_per_day").notNull(),
  daysPerMonth: integer("days_per_month").notNull(),
  isInterruptible: boolean("is_interruptible").notNull(),
  region: text("region").notNull(),
  selectedPlatforms: text("selected_platforms").array().notNull(),
  estimatedCosts: jsonb("estimated_costs").notNull(),
});

export const insertCostEstimateSchema = createInsertSchema(costEstimates).omit({
  id: true,
});

export type InsertCostEstimate = z.infer<typeof insertCostEstimateSchema>;
export type CostEstimate = typeof costEstimates.$inferSelect;
