import express, { type Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { CloudProvider, CostEstimateRequest, SavedConfiguration } from "@shared/types";
import { insertCostEstimateSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api
  const apiRouter = express.Router();
  
  // Get pricing data for a specific provider and region
  apiRouter.get('/pricing/:provider/:region', async (req, res) => {
    try {
      const { provider, region } = req.params;
      
      // Validate provider
      if (!['aws', 'gcp', 'azure', 'scinet', 'cyverse'].includes(provider)) {
        return res.status(400).json({ error: 'Invalid provider' });
      }
      
      // Validate region
      if (!['us-east', 'us-west', 'eu-west', 'ap-southeast'].includes(region)) {
        return res.status(400).json({ error: 'Invalid region' });
      }
      
      const pricing = await storage.getPricing(provider as CloudProvider, region);
      return res.json(pricing);
    } catch (error) {
      console.error('Error fetching pricing data:', error);
      return res.status(500).json({ error: 'Failed to fetch pricing data' });
    }
  });
  
  // Calculate cost estimates
  apiRouter.post('/calculate', async (req, res) => {
    try {
      // Validate request body
      const requestSchema = z.object({
        cpuCount: z.number().int().min(1).max(64),
        memorySize: z.number().int().min(1).max(256),
        storageSize: z.number().int().min(10).max(1000),
        hoursPerDay: z.number().int().min(1).max(24),
        daysPerMonth: z.number().int().min(1).max(31),
        isInterruptible: z.boolean(),
        selectedPlatforms: z.array(z.enum(['aws', 'gcp', 'azure', 'scinet', 'cyverse'])),
        region: z.enum(['us-east', 'us-west', 'eu-west', 'ap-southeast'])
      });
      
      const validatedData = requestSchema.parse(req.body);
      
      // Calculate costs
      const costEstimates = await storage.calculateCosts(validatedData as CostEstimateRequest);
      
      // Save the cost estimate
      if (costEstimates.estimates.length > 0) {
        const estimateToSave = {
          timestamp: costEstimates.timestamp,
          cpuCount: validatedData.cpuCount,
          memorySize: validatedData.memorySize,
          storageSize: validatedData.storageSize,
          hoursPerDay: validatedData.hoursPerDay,
          daysPerMonth: validatedData.daysPerMonth,
          isInterruptible: validatedData.isInterruptible,
          region: validatedData.region,
          selectedPlatforms: validatedData.selectedPlatforms,
          estimatedCosts: costEstimates.estimates
        };
        
        await storage.saveCostEstimate(estimateToSave);
      }
      
      return res.json(costEstimates);
    } catch (error) {
      console.error('Error calculating costs:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.errors });
      }
      
      return res.status(500).json({ error: 'Failed to calculate costs' });
    }
  });
  
  // Configuration management routes
  
  // Get all configurations
  apiRouter.get('/configurations', async (req, res) => {
    try {
      const configurations = await storage.getConfigurations();
      return res.json(configurations);
    } catch (error) {
      console.error('Error fetching configurations:', error);
      return res.status(500).json({ error: 'Failed to fetch configurations' });
    }
  });
  
  // Get a specific configuration
  apiRouter.get('/configurations/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const configuration = await storage.getConfiguration(id);
      
      if (!configuration) {
        return res.status(404).json({ error: 'Configuration not found' });
      }
      
      return res.json(configuration);
    } catch (error) {
      console.error('Error fetching configuration:', error);
      return res.status(500).json({ error: 'Failed to fetch configuration' });
    }
  });
  
  // Save a new configuration
  apiRouter.post('/configurations', async (req, res) => {
    try {
      // Validate request body
      const configSchema = z.object({
        name: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
        computeRequirements: z.object({
          cpuCount: z.number().int().min(1).max(64),
          memorySize: z.number().int().min(1).max(256),
          storageSize: z.number().int().min(10).max(1000)
        }),
        usagePattern: z.object({
          hoursPerDay: z.number().int().min(1).max(24),
          daysPerMonth: z.number().int().min(1).max(31),
          isInterruptible: z.boolean()
        }),
        platformSelections: z.object({
          selectedPlatforms: z.array(z.enum(['aws', 'gcp', 'azure', 'scinet', 'cyverse'])),
          region: z.enum(['us-east', 'us-west', 'eu-west', 'ap-southeast'])
        })
      });
      
      const validatedData = configSchema.parse(req.body);
      const savedConfig = await storage.saveConfiguration(validatedData);
      
      return res.status(201).json(savedConfig);
    } catch (error) {
      console.error('Error saving configuration:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.errors });
      }
      
      return res.status(500).json({ error: 'Failed to save configuration' });
    }
  });
  
  // Update an existing configuration
  apiRouter.patch('/configurations/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate request body
      const updateConfigSchema = z.object({
        name: z.string().min(1).max(100).optional(),
        description: z.string().max(500).optional(),
        computeRequirements: z.object({
          cpuCount: z.number().int().min(1).max(64),
          memorySize: z.number().int().min(1).max(256),
          storageSize: z.number().int().min(10).max(1000)
        }).optional(),
        usagePattern: z.object({
          hoursPerDay: z.number().int().min(1).max(24),
          daysPerMonth: z.number().int().min(1).max(31),
          isInterruptible: z.boolean()
        }).optional(),
        platformSelections: z.object({
          selectedPlatforms: z.array(z.enum(['aws', 'gcp', 'azure', 'scinet', 'cyverse'])),
          region: z.enum(['us-east', 'us-west', 'eu-west', 'ap-southeast'])
        }).optional()
      });
      
      const validatedData = updateConfigSchema.parse(req.body);
      const updatedConfig = await storage.updateConfiguration(id, validatedData);
      
      if (!updatedConfig) {
        return res.status(404).json({ error: 'Configuration not found' });
      }
      
      return res.json(updatedConfig);
    } catch (error) {
      console.error('Error updating configuration:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.errors });
      }
      
      return res.status(500).json({ error: 'Failed to update configuration' });
    }
  });
  
  // Update an existing configuration (PUT endpoint for complete replacement)
  apiRouter.put('/configurations/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate request body
      const configSchema = z.object({
        name: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
        computeRequirements: z.object({
          cpuCount: z.number().int().min(1).max(64),
          memorySize: z.number().int().min(1).max(256),
          storageSize: z.number().int().min(10).max(1000)
        }),
        usagePattern: z.object({
          hoursPerDay: z.number().int().min(1).max(24),
          daysPerMonth: z.number().int().min(1).max(31),
          isInterruptible: z.boolean()
        }),
        platformSelections: z.object({
          selectedPlatforms: z.array(z.enum(['aws', 'gcp', 'azure', 'scinet', 'cyverse'])),
          region: z.enum(['us-east', 'us-west', 'eu-west', 'ap-southeast'])
        })
      });
      
      const validatedData = configSchema.parse(req.body);
      const updatedConfig = await storage.updateConfiguration(id, validatedData);
      
      if (!updatedConfig) {
        return res.status(404).json({ error: 'Configuration not found' });
      }
      
      return res.json(updatedConfig);
    } catch (error) {
      console.error('Error updating configuration:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.errors });
      }
      
      return res.status(500).json({ error: 'Failed to update configuration' });
    }
  });
  
  // Delete a configuration
  apiRouter.delete('/configurations/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteConfiguration(id);
      
      if (!success) {
        return res.status(404).json({ error: 'Configuration not found' });
      }
      
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting configuration:', error);
      return res.status(500).json({ error: 'Failed to delete configuration' });
    }
  });
  
  // Add the API router
  app.use('/api', apiRouter);
  
  const httpServer = await import("http").then(({ createServer }) => createServer(app));
  
  return httpServer;
}
