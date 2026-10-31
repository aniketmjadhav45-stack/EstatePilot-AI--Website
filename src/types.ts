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
}

export interface PipelineStage {
  id: string;
  name: string;
  count: number;
  totalValue: string;
  color: string;
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
}

export interface EarlyAccessFormData {
  fullName: string;
  workEmail: string;
  phone: string;
  brokerageName: string;
  role: string;
  teamSize: string;
  primaryGoal: string;
}
