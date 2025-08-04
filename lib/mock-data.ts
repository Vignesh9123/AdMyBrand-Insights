// Mock data for ADmyBRAND Insights Analytics Charts

  export interface ChartDataPoint {
    name: string;
    value: number;
    date?: string;
  }

  export interface RevenueChartDataPoint extends ChartDataPoint {
    previousYear: number;
  }

  
  
  // Revenue trend data (line chart)
  export const revenueData: RevenueChartDataPoint[] = [
    { name: 'Jan', value: 2400000, previousYear: 2000000 },
    { name: 'Feb', value: 2210000, previousYear: 2400000 },
    { name: 'Mar', value: 2290000, previousYear: 2210000 },
    { name: 'Apr', value: 2780000, previousYear: 2290000 },
    { name: 'May', value: 2890000, previousYear: 2780000 },
    { name: 'Jun', value: 2390000, previousYear: 2890000 },
    { name: 'Jul', value: 3490000, previousYear: 2390000 },
    { name: 'Aug', value: 1242000, previousYear: 3490000 },
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
  