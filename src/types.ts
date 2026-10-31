export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  intent: string;
  matchScore: number;
  preferredType: string;
  status: 'Hot' | 'Warm' | 'Nurturing' | 'Under Offer';
  lastActivity: string;
  aiInsight: string;
  source: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  address: string;
  city: string;
  price: string;
  numericPrice: number;
  specs: {
    beds: number;
    baths: number;
    sqft: number;
  };
  type: string;
  status: 'Active' | 'Pending Tour' | 'Under Offer' | 'Exclusive';
  matchedBuyersCount: number;
  architecturalStyle: string;
  gradientBg: string;
  daysOnMarket: number;
}

export interface PropertyMatch {
  id: string;
  propertyTitle: string;
  buyerName: string;
  matchPercentage: number;
  matchCriteria: string[];
  suggestedAction: string;
  status: 'Ready to Pitch' | 'Proposed' | 'Tour Requested';
}

export interface VisitItem {
  id: string;
  time: string;
  date: string;
  propertyTitle: string;
  clientName: string;
  agentName: string;
  status: 'Confirmed' | 'Pending Client' | 'Completed';
  accessNotes: string;
  type: 'In-Person VIP Tour' | 'Broker Preview' | 'Virtual 3D Walkthrough';
}

export interface PipelineStage {
  id: string;
  name: string;
  count: number;
  totalValue: string;
  numericValue: number;
  color: string;
}

export interface RevenueMetric {
  month: string;
  closedVolume: number;
  projectedVolume: number;
  commissionGross: string;
}

export interface AiAgent {
  id: string;
  name: string;
  shortRole: string;
  description: string;
  iconName: string;
  keyWorkflows: string[];
  safetyCheck: string;
  sampleAction: {
    trigger: string;
    actionResult: string;
    humanApprovalNeeded: boolean;
  };
}

export interface UserSolution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyBenefits: string[];
  recommendedWorkflows: string[];
  badge: string;
  bestFor: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tierBadge: string;
  headline: string;
  illustrativeMonthlyPrice: string;
  illustrativeAnnualPrice: string;
  billingNote: string;
  targetAudience: string;
  features: string[];
  highlighted: boolean;
}

export interface EarlyAccessFormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  role: string;
  country: string;
  phone?: string;
  teamSize?: string;
}
