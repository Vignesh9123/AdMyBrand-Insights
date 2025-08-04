export interface MetricData {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  format: 'currency' | 'number' | 'percentage';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  previousYear: number;
}

export interface UserData {
  date: string;
  users: number;
  sessions: number;
}

export interface ConversionData {
  channel: string;
  conversions: number;
  color: string;
}

export interface TableData {
  id: string;
  campaign: string;
  status: 'Active' | 'Paused' | 'Completed';
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  conversions: number;
  revenue: number;
}