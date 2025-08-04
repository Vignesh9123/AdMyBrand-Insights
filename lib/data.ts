import { MetricData, TableData } from './types';

export const generateMetrics = (): MetricData[] => [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: Math.floor(Math.random() * 50000) + 450000,
    change: Math.floor(Math.random() * 20) + 5,
    changeType: 'increase',
    icon: 'DollarSign',
    format: 'currency'
  },
  {
    id: 'users',
    title: 'Active Users',
    value: Math.floor(Math.random() * 5000) + 25000,
    change: Math.floor(Math.random() * 15) + 3,
    changeType: 'increase',
    icon: 'Users',
    format: 'number'
  },
  {
    id: 'conversions',
    title: 'Conversions',
    value: Math.floor(Math.random() * 500) + 2300,
    change: Math.floor(Math.random() * 10) + 2,
    changeType: 'increase',
    icon: 'Target',
    format: 'number'
  },
  {
    id: 'growth',
    title: 'Growth Rate',
    value: Math.floor(Math.random() * 20) + 15,
    change: Math.floor(Math.random() * 5) + 1,
    changeType: Math.random() > 0.3 ? 'increase' : 'decrease',
    icon: 'TrendingUp',
    format: 'percentage'
  }
];



export const generateTableData = (): TableData[] => [
  {
    id: '1',
    campaign: 'Summer Sale 2024',
    status: 'Active',
    impressions: 145230,
    clicks: 8950,
    ctr: 6.17,
    cost: 12450.00,
    conversions: 285,
    revenue: 45600.00
  },
  {
    id: '2',
    campaign: 'Brand Awareness Q4',
    status: 'Active',
    impressions: 98750,
    clicks: 5420,
    ctr: 5.49,
    cost: 8900.00,
    conversions: 156,
    revenue: 28900.00
  },
  {
    id: '3',
    campaign: 'Holiday Promotion',
    status: 'Paused',
    impressions: 67890,
    clicks: 3210,
    ctr: 4.73,
    cost: 5600.00,
    conversions: 98,
    revenue: 18750.00
  },
  {
    id: '4',
    campaign: 'Product Launch',
    status: 'Completed',
    impressions: 203450,
    clicks: 12850,
    ctr: 6.31,
    cost: 18900.00,
    conversions: 425,
    revenue: 68200.00
  },
  {
    id: '5',
    campaign: 'Retargeting Campaign',
    status: 'Active',
    impressions: 56780,
    clicks: 4850,
    ctr: 8.54,
    cost: 6700.00,
    conversions: 210,
    revenue: 32400.00
  },
  {
    id: '6',
    campaign: 'Black Friday Special',
    status: 'Active',
    impressions: 234560,
    clicks: 15680,
    ctr: 6.68,
    cost: 21500.00,
    conversions: 520,
    revenue: 83200.00
  },
  {
    id: '7',
    campaign: 'Email Newsletter',
    status: 'Active',
    impressions: 45670,
    clicks: 8900,
    ctr: 19.48,
    cost: 3200.00,
    conversions: 445,
    revenue: 71200.00
  },
  {
    id: '8',
    campaign: 'Social Media Boost',
    status: 'Paused',
    impressions: 78920,
    clicks: 4320,
    ctr: 5.47,
    cost: 5400.00,
    conversions: 134,
    revenue: 21440.00
  },
  {
    id: '9',
    campaign: 'Mobile App Promotion',
    status: 'Active',
    impressions: 123450,
    clicks: 9870,
    ctr: 7.99,
    cost: 14800.00,
    conversions: 320,
    revenue: 51200.00
  },
  {
    id: '10',
    campaign: 'Influencer Partnership',
    status: 'Active',
    impressions: 34560,
    clicks: 2890,
    ctr: 8.36,
    cost: 4200.00,
    conversions: 156,
    revenue: 24960.00
  },
  {
    id: '11',
    campaign: 'Search Engine Optimization',
    status: 'Completed',
    impressions: 567890,
    clicks: 23450,
    ctr: 4.13,
    cost: 18700.00,
    conversions: 678,
    revenue: 108480.00
  },
  {
    id: '12',
    campaign: 'Video Content Marketing',
    status: 'Active',
    impressions: 89012,
    clicks: 5670,
    ctr: 6.37,
    cost: 7800.00,
    conversions: 189,
    revenue: 30240.00
  },
  {
    id: '13',
    campaign: 'Customer Loyalty Program',
    status: 'Active',
    impressions: 23450,
    clicks: 3450,
    ctr: 14.71,
    cost: 2100.00,
    conversions: 234,
    revenue: 37440.00
  },
  {
    id: '14',
    campaign: 'Trade Show Promotion',
    status: 'Paused',
    impressions: 12340,
    clicks: 890,
    ctr: 7.21,
    cost: 1200.00,
    conversions: 45,
    revenue: 7200.00
  },
  {
    id: '15',
    campaign: 'Referral Program',
    status: 'Active',
    impressions: 67890,
    clicks: 12340,
    ctr: 18.18,
    cost: 8900.00,
    conversions: 567,
    revenue: 90720.00
  }
];

export const generateRealTimeTableData = (currentData: TableData[]): TableData[] => {
  return currentData.map(item => {
    // Only update active campaigns
    if (item.status !== 'Active') {
      return item;
    }

    // Generate realistic incremental changes
    const impressionChange = Math.floor(Math.random() * 500) + 100;
    const clickChange = Math.floor(Math.random() * 50) + 10;
    const conversionChange = Math.floor(Math.random() * 8) + 1;
    
    // Calculate new values
    const newImpressions = item.impressions + impressionChange;
    const newClicks = item.clicks + clickChange;
    const newConversions = item.conversions + conversionChange;
    
    // Recalculate CTR
    const newCtr = (newClicks / newImpressions) * 100;
    
    // Estimate cost increase based on impressions (assuming $0.10 per impression)
    const costIncrease = impressionChange * 0.1;
    const newCost = item.cost + costIncrease;
    
    // Estimate revenue increase based on conversions (assuming $160 per conversion)
    const revenueIncrease = conversionChange * 160;
    const newRevenue = item.revenue + revenueIncrease;

    return {
      ...item,
      impressions: newImpressions,
      clicks: newClicks,
      ctr: Math.round(newCtr * 100) / 100, // Round to 2 decimal places
      cost: Math.round(newCost * 100) / 100,
      conversions: newConversions,
      revenue: Math.round(newRevenue * 100) / 100
    };
  });
};



