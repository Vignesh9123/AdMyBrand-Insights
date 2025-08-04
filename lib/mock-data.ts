// Mock data for ADmyBRAND Insights Analytics Dashboard

export interface MetricData {
    id: string;
    label: string;
    value: string;
    change: number;
    trend: 'up' | 'down' | 'neutral';
    icon: 'revenue' | 'users' | 'conversions' | 'growth';
  }
  
  export interface ChartDataPoint {
    name: string;
    value: number;
    date?: string;
  }
  
  export interface TableRow {
    id: string;
    campaign: string;
    status: 'active' | 'paused' | 'completed';
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cost: number;
    revenue: number;
    roas: number;
  }
  
  // Key metrics data
  export const metricsData: MetricData[] = [
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: '$2,847,329',
      change: 12.5,
      trend: 'up',
      icon: 'revenue'
    },
    {
      id: 'users',
      label: 'Active Users',
      value: '847,293',
      change: 8.2,
      trend: 'up',
      icon: 'users'
    },
    {
      id: 'conversions',
      label: 'Conversions',
      value: '23,847',
      change: -2.4,
      trend: 'down',
      icon: 'conversions'
    },
    {
      id: 'growth',
      label: 'Growth Rate',
      value: '24.7%',
      change: 5.1,
      trend: 'up',
      icon: 'growth'
    }
  ];
  
  // Revenue trend data (line chart)
  export const revenueData: ChartDataPoint[] = [
    { name: 'Jan', value: 2400000 },
    { name: 'Feb', value: 2210000 },
    { name: 'Mar', value: 2290000 },
    { name: 'Apr', value: 2780000 },
    { name: 'May', value: 2890000 },
    { name: 'Jun', value: 2390000 },
    { name: 'Jul', value: 3490000 },
    { name: 'Aug', value: 1242000 },
  ];
  
  // Monthly users data (bar chart)
  export const usersData: ChartDataPoint[] = [
    { name: 'Jan', value: 720000 },
    { name: 'Feb', value: 680000 },
    { name: 'Mar', value: 750000 },
    { name: 'Apr', value: 820000 },
    { name: 'May', value: 790000 },
    { name: 'Jun', value: 830000 },
    { name: 'Jul', value: 900000 },
    { name: 'Aug', value: 130000 },
  ];
  
  // Traffic sources data (donut chart)
  export const trafficSourcesData: ChartDataPoint[] = [
    { name: 'Organic Search', value: 42 },
    { name: 'Paid Ads', value: 28 },
    { name: 'Social Media', value: 18 },
    { name: 'Direct', value: 8 },
    { name: 'Referrals', value: 4 },
  ];
  
  // Campaigns table data
  export const campaignsData: TableRow[] = [
    {
      id: '1',
      campaign: 'Summer Sale 2024',
      status: 'active',
      impressions: 2847293,
      clicks: 142847,
      conversions: 8429,
      ctr: 5.02,
      cost: 34729,
      revenue: 184720,
      roas: 5.32
    },
    {
      id: '2',
      campaign: 'Black Friday Prep',
      status: 'active',
      impressions: 1929384,
      clicks: 98472,
      conversions: 5847,
      ctr: 5.11,
      cost: 29384,
      revenue: 147293,
      roas: 5.01
    },
    {
      id: '3',
      campaign: 'Brand Awareness Q3',
      status: 'paused',
      impressions: 3847291,
      clicks: 192847,
      conversions: 7429,
      ctr: 5.01,
      cost: 48472,
      revenue: 174829,
      roas: 3.61
    },
    {
      id: '4',
      campaign: 'Product Launch - Sneakers',
      status: 'active',
      impressions: 1475829,
      clicks: 73847,
      conversions: 4729,
      ctr: 5.00,
      cost: 24729,
      revenue: 129847,
      roas: 5.25
    },
    {
      id: '5',
      campaign: 'Holiday Collection',
      status: 'completed',
      impressions: 2947382,
      clicks: 147293,
      conversions: 9847,
      ctr: 5.00,
      cost: 42847,
      revenue: 198472,
      roas: 4.63
    },
    {
      id: '6',
      campaign: 'Spring Fashion Week',
      status: 'active',
      impressions: 1847293,
      clicks: 92847,
      conversions: 5293,
      ctr: 5.03,
      cost: 28472,
      revenue: 142847,
      roas: 5.02
    },
  ];
  
  export const chartColors = {
    primary: 'hsl(262 80% 60%)',
    secondary: 'hsl(252 70% 50%)',
    accent: 'hsl(242 60% 40%)',
    success: 'hsl(142 71% 45%)',
    warning: 'hsl(38 92% 50%)',
    danger: 'hsl(0 85% 60%)',
    muted: 'hsl(240 4% 46%)',
  };