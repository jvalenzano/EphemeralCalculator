import { 
  users, type User, type InsertUser,
  cloudPricing, type CloudPricing, type InsertCloudPricing,
  costEstimates, type CostEstimate, type InsertCostEstimate
} from "@shared/schema";
import { 
  CloudProvider, 
  CostEstimateRequest, 
  CostEstimateResponse, 
  ProviderCostEstimate,
  SavedConfiguration
} from "@shared/types";
import { awsGetPricing } from "./pricing/awsPricing";
import { gcpGetPricing } from "./pricing/gcpPricing";
import { azureGetPricing } from "./pricing/azurePricing";
import { hpcGetPricing } from "./pricing/hpcPricing";
import crypto from "crypto";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods from original template
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cloud pricing methods
  getPricing(provider: CloudProvider, region: string): Promise<CloudPricing[]>;
  updatePricing(pricing: InsertCloudPricing): Promise<CloudPricing>;
  
  // Cost estimation methods
  calculateCosts(request: CostEstimateRequest): Promise<CostEstimateResponse>;
  saveCostEstimate(estimate: InsertCostEstimate): Promise<CostEstimate>;
  
  // Configuration management methods
  getConfigurations(): Promise<SavedConfiguration[]>;
  getConfiguration(id: string): Promise<SavedConfiguration | undefined>;
  saveConfiguration(configuration: Omit<SavedConfiguration, 'id' | 'createdAt'>): Promise<SavedConfiguration>;
  updateConfiguration(id: string, configuration: Partial<Omit<SavedConfiguration, 'id' | 'createdAt'>>): Promise<SavedConfiguration | undefined>;
  deleteConfiguration(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cloudPricing: Map<string, CloudPricing>; // key = provider:region:instanceType
  private costEstimates: Map<number, CostEstimate>;
  private savedConfigurations: Map<string, SavedConfiguration>; // key = id
  currentUserId: number;
  currentPricingId: number;
  currentEstimateId: number;

  constructor() {
    this.users = new Map();
    this.cloudPricing = new Map();
    this.costEstimates = new Map();
    this.savedConfigurations = new Map();
    this.currentUserId = 1;
    this.currentPricingId = 1;
    this.currentEstimateId = 1;
    
    // Initialize with some pricing data
    this.initializePricingData();
  }

  // Initialize in-memory pricing data for demo purposes
  private async initializePricingData() {
    // We'll populate with mock data that mirrors real-world pricing
    // In a production environment, this would be fetched from the actual provider APIs
    const providers: CloudProvider[] = ['aws', 'gcp', 'azure', 'scinet', 'cyverse'];
    const regions = ['us-east', 'us-west', 'eu-west', 'ap-southeast'];
    
    for (const provider of providers) {
      for (const region of regions) {
        let pricingData: CloudPricing[] = [];
        
        switch (provider) {
          case 'aws':
            pricingData = await awsGetPricing(region);
            break;
          case 'gcp':
            pricingData = await gcpGetPricing(region);
            break;
          case 'azure':
            pricingData = await azureGetPricing(region);
            break;
          case 'scinet':
          case 'cyverse':
            pricingData = await hpcGetPricing(provider, region);
            break;
        }
        
        for (const pricing of pricingData) {
          const key = `${pricing.provider}:${pricing.region}:${pricing.instanceType}`;
          this.cloudPricing.set(key, pricing);
        }
      }
    }
  }

  // User methods from original template
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Cloud pricing methods
  async getPricing(provider: CloudProvider, region: string): Promise<CloudPricing[]> {
    return Array.from(this.cloudPricing.values()).filter(
      pricing => pricing.provider === provider && pricing.region === region
    );
  }
  
  async updatePricing(insertPricing: InsertCloudPricing): Promise<CloudPricing> {
    const id = this.currentPricingId++;
    const pricing: CloudPricing = { 
      ...insertPricing, 
      id,
      spotHourly: insertPricing.spotHourly ?? null,
      storageGbMonthly: insertPricing.storageGbMonthly ?? null,
      networkEgressGbCost: insertPricing.networkEgressGbCost ?? null
    };
    const key = `${pricing.provider}:${pricing.region}:${pricing.instanceType}`;
    this.cloudPricing.set(key, pricing);
    return pricing;
  }
  
  // Cost estimation methods
  async calculateCosts(request: CostEstimateRequest): Promise<CostEstimateResponse> {
    const { 
      cpuCount, 
      memorySize, 
      storageSize,
      hoursPerDay,
      daysPerMonth,
      isInterruptible,
      selectedPlatforms,
      region
    } = request;
    
    const hoursPerMonth = hoursPerDay * daysPerMonth;
    const estimates: ProviderCostEstimate[] = [];
    
    // Find relevant instance types and calculate costs for each selected platform
    for (const provider of selectedPlatforms) {
      const pricingData = await this.getPricing(provider, region);
      if (pricingData.length === 0) continue;
      
      // Find the best instance type that meets the requirements
      const matchingInstances = pricingData.filter(
        pricing => pricing.vCpus >= cpuCount && pricing.memoryGb >= memorySize
      );
      
      if (matchingInstances.length === 0) continue;
      
      // Sort by price (cheapest first)
      matchingInstances.sort((a, b) => {
        const aPrice = isInterruptible && a.spotHourly ? a.spotHourly : a.onDemandHourly;
        const bPrice = isInterruptible && b.spotHourly ? b.spotHourly : b.onDemandHourly;
        return aPrice - bPrice;
      });
      
      const bestMatch = matchingInstances[0];
      const hourlyPrice = isInterruptible && bestMatch.spotHourly 
        ? bestMatch.spotHourly 
        : bestMatch.onDemandHourly;
      
      const computeCost = hourlyPrice * hoursPerMonth;
      const storageCost = (bestMatch.storageGbMonthly || 0.1) * storageSize;
      const networkEgressCost = (bestMatch.networkEgressGbCost || 0.15) * 100; // Estimated 100GB egress
      
      // Management overhead varies by provider
      let managementCost = 0;
      switch (provider) {
        case 'aws':
          managementCost = computeCost * 0.15;
          break;
        case 'gcp':
          managementCost = computeCost * 0.12;
          break;
        case 'azure':
          managementCost = computeCost * 0.18;
          break;
        case 'scinet':
          managementCost = computeCost * 0.25;
          break;
        case 'cyverse':
          managementCost = computeCost * 0.20;
          break;
      }
      
      const totalMonthlyCost = computeCost + storageCost + networkEgressCost + managementCost;
      
      // Determine interruption risk based on provider and type
      let interruptionRisk: 'None' | 'Low' | 'Medium' | 'High' = 'None';
      if (isInterruptible) {
        switch (provider) {
          case 'aws':
            interruptionRisk = 'Medium';
            break;
          case 'gcp':
            interruptionRisk = 'High';
            break;
          case 'azure':
            interruptionRisk = 'Medium';
            break;
          case 'scinet':
            interruptionRisk = 'None';
            break;
          case 'cyverse':
            interruptionRisk = 'Low';
            break;
        }
      }
      
      estimates.push({
        provider,
        instanceType: bestMatch.instanceType,
        monthlyCost: Math.round(totalMonthlyCost * 100) / 100,
        isInterruptible: isInterruptible && !!bestMatch.spotHourly,
        interruptionRisk,
        breakdown: {
          compute: Math.round(computeCost * 100) / 100,
          storage: Math.round(storageCost * 100) / 100,
          networkEgress: Math.round(networkEgressCost * 100) / 100,
          management: Math.round(managementCost * 100) / 100,
          total: Math.round(totalMonthlyCost * 100) / 100
        }
      });
    }
    
    // Sort estimates by cost (lowest first)
    estimates.sort((a, b) => a.monthlyCost - b.monthlyCost);
    
    return {
      estimates,
      timestamp: new Date().toISOString()
    };
  }
  
  async saveCostEstimate(insertEstimate: InsertCostEstimate): Promise<CostEstimate> {
    const id = this.currentEstimateId++;
    const estimate: CostEstimate = { ...insertEstimate, id };
    this.costEstimates.set(id, estimate);
    return estimate;
  }
  
  // Configuration management methods
  async getConfigurations(): Promise<SavedConfiguration[]> {
    return Array.from(this.savedConfigurations.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async getConfiguration(id: string): Promise<SavedConfiguration | undefined> {
    return this.savedConfigurations.get(id);
  }
  
  async saveConfiguration(config: Omit<SavedConfiguration, 'id' | 'createdAt'>): Promise<SavedConfiguration> {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const savedConfig: SavedConfiguration = { ...config, id, createdAt };
    this.savedConfigurations.set(id, savedConfig);
    return savedConfig;
  }
  
  async updateConfiguration(
    id: string, 
    config: Partial<Omit<SavedConfiguration, 'id' | 'createdAt'>>
  ): Promise<SavedConfiguration | undefined> {
    const existingConfig = this.savedConfigurations.get(id);
    if (!existingConfig) return undefined;
    
    const updatedConfig: SavedConfiguration = { 
      ...existingConfig,
      ...config
    };
    
    this.savedConfigurations.set(id, updatedConfig);
    return updatedConfig;
  }
  
  async deleteConfiguration(id: string): Promise<boolean> {
    return this.savedConfigurations.delete(id);
  }
}

export const storage = new MemStorage();
