// server/index.ts
import express3 from "express";

// server/routes.ts
import express from "express";

// server/pricing/awsPricing.ts
async function awsGetPricing(region) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  let awsRegion = "us-east-1";
  switch (region) {
    case "us-east":
      awsRegion = "us-east-1";
      break;
    case "us-west":
      awsRegion = "us-west-2";
      break;
    case "eu-west":
      awsRegion = "eu-west-1";
      break;
    case "ap-southeast":
      awsRegion = "ap-southeast-1";
      break;
  }
  const instances = [
    {
      id: 1,
      provider: "aws",
      region,
      instanceType: "t3.micro",
      vCpus: 2,
      memoryGb: 1,
      onDemandHourly: 0.0104,
      spotHourly: 31e-4,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 2,
      provider: "aws",
      region,
      instanceType: "t3.small",
      vCpus: 2,
      memoryGb: 2,
      onDemandHourly: 0.0208,
      spotHourly: 62e-4,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 3,
      provider: "aws",
      region,
      instanceType: "t3.medium",
      vCpus: 2,
      memoryGb: 4,
      onDemandHourly: 0.0416,
      spotHourly: 0.0125,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 4,
      provider: "aws",
      region,
      instanceType: "c5.large",
      vCpus: 2,
      memoryGb: 4,
      onDemandHourly: 0.085,
      spotHourly: 0.0255,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 5,
      provider: "aws",
      region,
      instanceType: "c5.xlarge",
      vCpus: 4,
      memoryGb: 8,
      onDemandHourly: 0.17,
      spotHourly: 0.051,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 6,
      provider: "aws",
      region,
      instanceType: "c5.2xlarge",
      vCpus: 8,
      memoryGb: 16,
      onDemandHourly: 0.34,
      spotHourly: 0.102,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 7,
      provider: "aws",
      region,
      instanceType: "c5.4xlarge",
      vCpus: 16,
      memoryGb: 32,
      onDemandHourly: 0.68,
      spotHourly: 0.204,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 8,
      provider: "aws",
      region,
      instanceType: "c5.9xlarge",
      vCpus: 36,
      memoryGb: 72,
      onDemandHourly: 1.53,
      spotHourly: 0.459,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 9,
      provider: "aws",
      region,
      instanceType: "c5.18xlarge",
      vCpus: 72,
      memoryGb: 144,
      onDemandHourly: 3.06,
      spotHourly: 0.918,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 10,
      provider: "aws",
      region,
      instanceType: "r5.large",
      vCpus: 2,
      memoryGb: 16,
      onDemandHourly: 0.126,
      spotHourly: 0.0378,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 11,
      provider: "aws",
      region,
      instanceType: "r5.xlarge",
      vCpus: 4,
      memoryGb: 32,
      onDemandHourly: 0.252,
      spotHourly: 0.0756,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 12,
      provider: "aws",
      region,
      instanceType: "r5.2xlarge",
      vCpus: 8,
      memoryGb: 64,
      onDemandHourly: 0.504,
      spotHourly: 0.1512,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 13,
      provider: "aws",
      region,
      instanceType: "r5.4xlarge",
      vCpus: 16,
      memoryGb: 128,
      onDemandHourly: 1.008,
      spotHourly: 0.3024,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 14,
      provider: "aws",
      region,
      instanceType: "r5.12xlarge",
      vCpus: 48,
      memoryGb: 384,
      onDemandHourly: 3.024,
      spotHourly: 0.9072,
      storageGbMonthly: 0.1,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    }
  ];
  return instances;
}

// server/pricing/gcpPricing.ts
async function gcpGetPricing(region) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  let gcpRegion = "us-east1";
  switch (region) {
    case "us-east":
      gcpRegion = "us-east1";
      break;
    case "us-west":
      gcpRegion = "us-west1";
      break;
    case "eu-west":
      gcpRegion = "europe-west1";
      break;
    case "ap-southeast":
      gcpRegion = "asia-southeast1";
      break;
  }
  const instances = [
    {
      id: 101,
      provider: "gcp",
      region,
      instanceType: "e2-micro",
      vCpus: 2,
      memoryGb: 1,
      onDemandHourly: 76e-4,
      spotHourly: 23e-4,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 102,
      provider: "gcp",
      region,
      instanceType: "e2-small",
      vCpus: 2,
      memoryGb: 2,
      onDemandHourly: 0.0152,
      spotHourly: 46e-4,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 103,
      provider: "gcp",
      region,
      instanceType: "e2-medium",
      vCpus: 2,
      memoryGb: 4,
      onDemandHourly: 0.0304,
      spotHourly: 91e-4,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 104,
      provider: "gcp",
      region,
      instanceType: "n2-standard-2",
      vCpus: 2,
      memoryGb: 8,
      onDemandHourly: 0.0971,
      spotHourly: 0.0291,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 105,
      provider: "gcp",
      region,
      instanceType: "n2-standard-4",
      vCpus: 4,
      memoryGb: 16,
      onDemandHourly: 0.1942,
      spotHourly: 0.0583,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 106,
      provider: "gcp",
      region,
      instanceType: "n2-standard-8",
      vCpus: 8,
      memoryGb: 32,
      onDemandHourly: 0.3883,
      spotHourly: 0.1165,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 107,
      provider: "gcp",
      region,
      instanceType: "n2-standard-16",
      vCpus: 16,
      memoryGb: 64,
      onDemandHourly: 0.7766,
      spotHourly: 0.233,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 108,
      provider: "gcp",
      region,
      instanceType: "n2-standard-32",
      vCpus: 32,
      memoryGb: 128,
      onDemandHourly: 1.5533,
      spotHourly: 0.466,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 109,
      provider: "gcp",
      region,
      instanceType: "n2-standard-48",
      vCpus: 48,
      memoryGb: 192,
      onDemandHourly: 2.33,
      spotHourly: 0.699,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 110,
      provider: "gcp",
      region,
      instanceType: "n2-standard-64",
      vCpus: 64,
      memoryGb: 256,
      onDemandHourly: 3.1066,
      spotHourly: 0.932,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 111,
      provider: "gcp",
      region,
      instanceType: "n2-highmem-2",
      vCpus: 2,
      memoryGb: 16,
      onDemandHourly: 0.1311,
      spotHourly: 0.0393,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 112,
      provider: "gcp",
      region,
      instanceType: "n2-highmem-4",
      vCpus: 4,
      memoryGb: 32,
      onDemandHourly: 0.2622,
      spotHourly: 0.0787,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 113,
      provider: "gcp",
      region,
      instanceType: "n2-highmem-8",
      vCpus: 8,
      memoryGb: 64,
      onDemandHourly: 0.5244,
      spotHourly: 0.1573,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 114,
      provider: "gcp",
      region,
      instanceType: "n2-highmem-16",
      vCpus: 16,
      memoryGb: 128,
      onDemandHourly: 1.0488,
      spotHourly: 0.3146,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    }
  ];
  return instances;
}

// server/pricing/azurePricing.ts
async function azureGetPricing(region) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  let azureRegion = "eastus";
  switch (region) {
    case "us-east":
      azureRegion = "eastus";
      break;
    case "us-west":
      azureRegion = "westus";
      break;
    case "eu-west":
      azureRegion = "westeurope";
      break;
    case "ap-southeast":
      azureRegion = "southeastasia";
      break;
  }
  const instances = [
    {
      id: 201,
      provider: "azure",
      region,
      instanceType: "B2s",
      vCpus: 2,
      memoryGb: 4,
      onDemandHourly: 0.0416,
      spotHourly: 0.0125,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 202,
      provider: "azure",
      region,
      instanceType: "B2ms",
      vCpus: 2,
      memoryGb: 8,
      onDemandHourly: 0.0832,
      spotHourly: 0.025,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 203,
      provider: "azure",
      region,
      instanceType: "B4ms",
      vCpus: 4,
      memoryGb: 16,
      onDemandHourly: 0.166,
      spotHourly: 0.05,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 204,
      provider: "azure",
      region,
      instanceType: "B8ms",
      vCpus: 8,
      memoryGb: 32,
      onDemandHourly: 0.333,
      spotHourly: 0.1,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 205,
      provider: "azure",
      region,
      instanceType: "D2s v3",
      vCpus: 2,
      memoryGb: 8,
      onDemandHourly: 0.096,
      spotHourly: 0.029,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 206,
      provider: "azure",
      region,
      instanceType: "D4s v3",
      vCpus: 4,
      memoryGb: 16,
      onDemandHourly: 0.192,
      spotHourly: 0.058,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 207,
      provider: "azure",
      region,
      instanceType: "D8s v3",
      vCpus: 8,
      memoryGb: 32,
      onDemandHourly: 0.384,
      spotHourly: 0.115,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 208,
      provider: "azure",
      region,
      instanceType: "D16s v3",
      vCpus: 16,
      memoryGb: 64,
      onDemandHourly: 0.768,
      spotHourly: 0.23,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 209,
      provider: "azure",
      region,
      instanceType: "D32s v3",
      vCpus: 32,
      memoryGb: 128,
      onDemandHourly: 1.536,
      spotHourly: 0.461,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 210,
      provider: "azure",
      region,
      instanceType: "E2s v3",
      vCpus: 2,
      memoryGb: 16,
      onDemandHourly: 0.126,
      spotHourly: 0.038,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 211,
      provider: "azure",
      region,
      instanceType: "E4s v3",
      vCpus: 4,
      memoryGb: 32,
      onDemandHourly: 0.252,
      spotHourly: 0.076,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 212,
      provider: "azure",
      region,
      instanceType: "E8s v3",
      vCpus: 8,
      memoryGb: 64,
      onDemandHourly: 0.504,
      spotHourly: 0.151,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 213,
      provider: "azure",
      region,
      instanceType: "E16s v3",
      vCpus: 16,
      memoryGb: 128,
      onDemandHourly: 1.008,
      spotHourly: 0.302,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 214,
      provider: "azure",
      region,
      instanceType: "E32s v3",
      vCpus: 32,
      memoryGb: 256,
      onDemandHourly: 2.016,
      spotHourly: 0.605,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    }
  ];
  return instances;
}

// server/pricing/hpcPricing.ts
async function hpcGetPricing(provider, region) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  if (provider === "scinet") {
    const instances = [
      {
        id: 301,
        provider: "scinet",
        region,
        instanceType: "SCINet Basic",
        vCpus: 2,
        memoryGb: 8,
        onDemandHourly: 0.12,
        spotHourly: null,
        // No spot/preemptible equivalent
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0,
        // Often included in allocation
        lastUpdated: timestamp
      },
      {
        id: 302,
        provider: "scinet",
        region,
        instanceType: "SCINet Standard",
        vCpus: 4,
        memoryGb: 16,
        onDemandHourly: 0.24,
        spotHourly: null,
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0,
        lastUpdated: timestamp
      },
      {
        id: 303,
        provider: "scinet",
        region,
        instanceType: "SCINet Advanced",
        vCpus: 8,
        memoryGb: 32,
        onDemandHourly: 0.48,
        spotHourly: null,
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0,
        lastUpdated: timestamp
      },
      {
        id: 304,
        provider: "scinet",
        region,
        instanceType: "SCINet High Performance",
        vCpus: 16,
        memoryGb: 64,
        onDemandHourly: 0.96,
        spotHourly: null,
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0,
        lastUpdated: timestamp
      },
      {
        id: 305,
        provider: "scinet",
        region,
        instanceType: "SCINet Enterprise",
        vCpus: 32,
        memoryGb: 128,
        onDemandHourly: 1.92,
        spotHourly: null,
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0,
        lastUpdated: timestamp
      },
      {
        id: 306,
        provider: "scinet",
        region,
        instanceType: "SCINet Maximum",
        vCpus: 64,
        memoryGb: 256,
        onDemandHourly: 3.84,
        spotHourly: null,
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0,
        lastUpdated: timestamp
      }
    ];
    return instances;
  }
  if (provider === "cyverse") {
    const instances = [
      {
        id: 401,
        provider: "cyverse",
        region,
        instanceType: "Cyverse Basic",
        vCpus: 2,
        memoryGb: 8,
        onDemandHourly: 0.1,
        spotHourly: 0.08,
        // Discounted but still available
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      },
      {
        id: 402,
        provider: "cyverse",
        region,
        instanceType: "Cyverse Standard",
        vCpus: 4,
        memoryGb: 16,
        onDemandHourly: 0.2,
        spotHourly: 0.16,
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      },
      {
        id: 403,
        provider: "cyverse",
        region,
        instanceType: "Cyverse Advanced",
        vCpus: 8,
        memoryGb: 32,
        onDemandHourly: 0.4,
        spotHourly: 0.32,
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      },
      {
        id: 404,
        provider: "cyverse",
        region,
        instanceType: "Cyverse High Performance",
        vCpus: 16,
        memoryGb: 64,
        onDemandHourly: 0.8,
        spotHourly: 0.64,
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      },
      {
        id: 405,
        provider: "cyverse",
        region,
        instanceType: "Cyverse Enterprise",
        vCpus: 32,
        memoryGb: 128,
        onDemandHourly: 1.6,
        spotHourly: 1.28,
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      },
      {
        id: 406,
        provider: "cyverse",
        region,
        instanceType: "Cyverse Maximum",
        vCpus: 64,
        memoryGb: 256,
        onDemandHourly: 3.2,
        spotHourly: 2.56,
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      }
    ];
    return instances;
  }
  return [];
}

// server/storage.ts
import crypto from "crypto";
var MemStorage = class {
  users;
  cloudPricing;
  // key = provider:region:instanceType
  costEstimates;
  savedConfigurations;
  // key = id
  currentUserId;
  currentPricingId;
  currentEstimateId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.cloudPricing = /* @__PURE__ */ new Map();
    this.costEstimates = /* @__PURE__ */ new Map();
    this.savedConfigurations = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentPricingId = 1;
    this.currentEstimateId = 1;
    this.initializePricingData();
  }
  // Initialize in-memory pricing data for demo purposes
  async initializePricingData() {
    const providers = ["aws", "gcp", "azure", "scinet", "cyverse"];
    const regions = ["us-east", "us-west", "eu-west", "ap-southeast"];
    for (const provider of providers) {
      for (const region of regions) {
        let pricingData = [];
        switch (provider) {
          case "aws":
            pricingData = await awsGetPricing(region);
            break;
          case "gcp":
            pricingData = await gcpGetPricing(region);
            break;
          case "azure":
            pricingData = await azureGetPricing(region);
            break;
          case "scinet":
          case "cyverse":
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
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Cloud pricing methods
  async getPricing(provider, region) {
    return Array.from(this.cloudPricing.values()).filter(
      (pricing) => pricing.provider === provider && pricing.region === region
    );
  }
  async updatePricing(insertPricing) {
    const id = this.currentPricingId++;
    const pricing = {
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
  async calculateCosts(request) {
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
    const estimates = [];
    for (const provider of selectedPlatforms) {
      const pricingData = await this.getPricing(provider, region);
      if (pricingData.length === 0) continue;
      const matchingInstances = pricingData.filter(
        (pricing) => pricing.vCpus >= cpuCount && pricing.memoryGb >= memorySize
      );
      if (matchingInstances.length === 0) continue;
      matchingInstances.sort((a, b) => {
        const aPrice = isInterruptible && a.spotHourly ? a.spotHourly : a.onDemandHourly;
        const bPrice = isInterruptible && b.spotHourly ? b.spotHourly : b.onDemandHourly;
        return aPrice - bPrice;
      });
      const bestMatch = matchingInstances[0];
      const hourlyPrice = isInterruptible && bestMatch.spotHourly ? bestMatch.spotHourly : bestMatch.onDemandHourly;
      const computeCost = hourlyPrice * hoursPerMonth;
      const storageCost = (bestMatch.storageGbMonthly || 0.1) * storageSize;
      const networkEgressCost = (bestMatch.networkEgressGbCost || 0.15) * 100;
      let managementCost = 0;
      switch (provider) {
        case "aws":
          managementCost = computeCost * 0.15;
          break;
        case "gcp":
          managementCost = computeCost * 0.12;
          break;
        case "azure":
          managementCost = computeCost * 0.18;
          break;
        case "scinet":
          managementCost = computeCost * 0.25;
          break;
        case "cyverse":
          managementCost = computeCost * 0.2;
          break;
      }
      const totalMonthlyCost = computeCost + storageCost + networkEgressCost + managementCost;
      let interruptionRisk = "None";
      if (isInterruptible) {
        switch (provider) {
          case "aws":
            interruptionRisk = "Medium";
            break;
          case "gcp":
            interruptionRisk = "High";
            break;
          case "azure":
            interruptionRisk = "Medium";
            break;
          case "scinet":
            interruptionRisk = "None";
            break;
          case "cyverse":
            interruptionRisk = "Low";
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
    estimates.sort((a, b) => a.monthlyCost - b.monthlyCost);
    return {
      estimates,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async saveCostEstimate(insertEstimate) {
    const id = this.currentEstimateId++;
    const estimate = { ...insertEstimate, id };
    this.costEstimates.set(id, estimate);
    return estimate;
  }
  // Configuration management methods
  async getConfigurations() {
    return Array.from(this.savedConfigurations.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getConfiguration(id) {
    return this.savedConfigurations.get(id);
  }
  async saveConfiguration(config) {
    const id = crypto.randomUUID();
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const savedConfig = { ...config, id, createdAt };
    this.savedConfigurations.set(id, savedConfig);
    return savedConfig;
  }
  async updateConfiguration(id, config) {
    const existingConfig = this.savedConfigurations.get(id);
    if (!existingConfig) return void 0;
    const updatedConfig = {
      ...existingConfig,
      ...config
    };
    this.savedConfigurations.set(id, updatedConfig);
    return updatedConfig;
  }
  async deleteConfiguration(id) {
    return this.savedConfigurations.delete(id);
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  const apiRouter = express.Router();
  apiRouter.get("/pricing/:provider/:region", async (req, res) => {
    try {
      const { provider, region } = req.params;
      if (!["aws", "gcp", "azure", "scinet", "cyverse"].includes(provider)) {
        return res.status(400).json({ error: "Invalid provider" });
      }
      if (!["us-east", "us-west", "eu-west", "ap-southeast"].includes(region)) {
        return res.status(400).json({ error: "Invalid region" });
      }
      const pricing = await storage.getPricing(provider, region);
      return res.json(pricing);
    } catch (error) {
      console.error("Error fetching pricing data:", error);
      return res.status(500).json({ error: "Failed to fetch pricing data" });
    }
  });
  apiRouter.post("/calculate", async (req, res) => {
    try {
      const requestSchema = z.object({
        cpuCount: z.number().int().min(1).max(64),
        memorySize: z.number().int().min(1).max(256),
        storageSize: z.number().int().min(10).max(1e3),
        hoursPerDay: z.number().int().min(1).max(24),
        daysPerMonth: z.number().int().min(1).max(31),
        isInterruptible: z.boolean(),
        selectedPlatforms: z.array(z.enum(["aws", "gcp", "azure", "scinet", "cyverse"])),
        region: z.enum(["us-east", "us-west", "eu-west", "ap-southeast"])
      });
      const validatedData = requestSchema.parse(req.body);
      const costEstimates = await storage.calculateCosts(validatedData);
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
      console.error("Error calculating costs:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      return res.status(500).json({ error: "Failed to calculate costs" });
    }
  });
  apiRouter.get("/configurations", async (req, res) => {
    try {
      const configurations = await storage.getConfigurations();
      return res.json(configurations);
    } catch (error) {
      console.error("Error fetching configurations:", error);
      return res.status(500).json({ error: "Failed to fetch configurations" });
    }
  });
  apiRouter.get("/configurations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const configuration = await storage.getConfiguration(id);
      if (!configuration) {
        return res.status(404).json({ error: "Configuration not found" });
      }
      return res.json(configuration);
    } catch (error) {
      console.error("Error fetching configuration:", error);
      return res.status(500).json({ error: "Failed to fetch configuration" });
    }
  });
  apiRouter.post("/configurations", async (req, res) => {
    try {
      const configSchema = z.object({
        name: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
        computeRequirements: z.object({
          cpuCount: z.number().int().min(1).max(64),
          memorySize: z.number().int().min(1).max(256),
          storageSize: z.number().int().min(10).max(1e3)
        }),
        usagePattern: z.object({
          hoursPerDay: z.number().int().min(1).max(24),
          daysPerMonth: z.number().int().min(1).max(31),
          isInterruptible: z.boolean()
        }),
        platformSelections: z.object({
          selectedPlatforms: z.array(z.enum(["aws", "gcp", "azure", "scinet", "cyverse"])),
          region: z.enum(["us-east", "us-west", "eu-west", "ap-southeast"])
        })
      });
      const validatedData = configSchema.parse(req.body);
      const savedConfig = await storage.saveConfiguration(validatedData);
      return res.status(201).json(savedConfig);
    } catch (error) {
      console.error("Error saving configuration:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      return res.status(500).json({ error: "Failed to save configuration" });
    }
  });
  apiRouter.patch("/configurations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateConfigSchema = z.object({
        name: z.string().min(1).max(100).optional(),
        description: z.string().max(500).optional(),
        computeRequirements: z.object({
          cpuCount: z.number().int().min(1).max(64),
          memorySize: z.number().int().min(1).max(256),
          storageSize: z.number().int().min(10).max(1e3)
        }).optional(),
        usagePattern: z.object({
          hoursPerDay: z.number().int().min(1).max(24),
          daysPerMonth: z.number().int().min(1).max(31),
          isInterruptible: z.boolean()
        }).optional(),
        platformSelections: z.object({
          selectedPlatforms: z.array(z.enum(["aws", "gcp", "azure", "scinet", "cyverse"])),
          region: z.enum(["us-east", "us-west", "eu-west", "ap-southeast"])
        }).optional()
      });
      const validatedData = updateConfigSchema.parse(req.body);
      const updatedConfig = await storage.updateConfiguration(id, validatedData);
      if (!updatedConfig) {
        return res.status(404).json({ error: "Configuration not found" });
      }
      return res.json(updatedConfig);
    } catch (error) {
      console.error("Error updating configuration:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      return res.status(500).json({ error: "Failed to update configuration" });
    }
  });
  apiRouter.put("/configurations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const configSchema = z.object({
        name: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
        computeRequirements: z.object({
          cpuCount: z.number().int().min(1).max(64),
          memorySize: z.number().int().min(1).max(256),
          storageSize: z.number().int().min(10).max(1e3)
        }),
        usagePattern: z.object({
          hoursPerDay: z.number().int().min(1).max(24),
          daysPerMonth: z.number().int().min(1).max(31),
          isInterruptible: z.boolean()
        }),
        platformSelections: z.object({
          selectedPlatforms: z.array(z.enum(["aws", "gcp", "azure", "scinet", "cyverse"])),
          region: z.enum(["us-east", "us-west", "eu-west", "ap-southeast"])
        })
      });
      const validatedData = configSchema.parse(req.body);
      const updatedConfig = await storage.updateConfiguration(id, validatedData);
      if (!updatedConfig) {
        return res.status(404).json({ error: "Configuration not found" });
      }
      return res.json(updatedConfig);
    } catch (error) {
      console.error("Error updating configuration:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      return res.status(500).json({ error: "Failed to update configuration" });
    }
  });
  apiRouter.delete("/configurations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteConfiguration(id);
      if (!success) {
        return res.status(404).json({ error: "Configuration not found" });
      }
      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting configuration:", error);
      return res.status(500).json({ error: "Failed to delete configuration" });
    }
  });
  app2.use("/api", apiRouter);
  const httpServer = await import("http").then(({ createServer }) => createServer(app2));
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  base: "/EphemeralCalculator/",
  // Added for GitHub Pages deployment
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      // When running inside client folder
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
