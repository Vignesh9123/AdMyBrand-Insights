'use client';

import { useCallback, useEffect } from 'react';
import { RevenueChart } from '../charts/revenue-chart';
import {TrafficChart} from '@/components/charts/traffic-chart'
import { UsersChart } from '../charts/users-chart';
import { DataTable } from './data-table';
import { AdvancedFilters } from './advanced-filters';
import { DashboardSkeleton } from './loading-skeleton';
import { exportToPDF, exportToCSV } from '@/lib/export-utils';
import { ChartCard } from '../charts/chart-card';
import MetricGrid from '../grids/metric-grid';
import { useDashboardStore } from '@/lib/store';

export function DashboardOverview() {
  const isLoading = useDashboardStore((s) => s.isLoading);
  const getActiveFiltersCount = useDashboardStore((s) => s.getActiveFiltersCount);  

  
  const handleExportPDF = useCallback(() => {
    const filteredTableData = useDashboardStore.getState().filteredTableData;
    exportToPDF(filteredTableData,`admybrand-insights-report-${new Date().toLocaleDateString()}`);
  }, []);
  
  const handleExportCSV = useCallback(() => {
    const filteredTableData = useDashboardStore.getState().filteredTableData;
    exportToCSV(filteredTableData, 'admybrand-insights-data');
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }


  return (
    <div className="space-y-6">
     
      {/* Metrics Grid */}
      <MetricGrid />
    

      {/* Charts Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
          <ChartCard 
            title="Revenue Trend" 
            description="Monthly revenue performance over time"
            className="lg:col-span-2 animate-fade-in"
            >
            <RevenueChart />
          </ChartCard>
          
          <ChartCard 
            title="Traffic Sources" 
            description="Where your visitors are coming from"
            className="animate-fade-in"
            >
            <TrafficChart />
          </ChartCard>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1">
          <ChartCard 
            title="Monthly Active Users" 
            description="User growth and engagement metrics"
            className="animate-fade-in"
            >
            <UsersChart />
          </ChartCard>
        </div>
        {/* Advanced Filters */}
        <AdvancedFilters
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
      />


      {/* Data Table */}
      <DataTable />
    </div>
  );
}