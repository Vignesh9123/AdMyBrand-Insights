'use client';

import { useCallback } from 'react';
import { DataTable } from './data-table';
import { AdvancedFilters } from './advanced-filters';
import { DashboardSkeleton } from './loading-skeleton';
import { exportToPDF, exportToCSV } from '@/lib/export-utils';
import MetricGrid from '../grids/metric-grid';
import { useDashboardStore } from '@/lib/store';
import ChartGrid from '../grids/chart-grid';

export function DashboardOverview() {
  const isLoading = useDashboardStore((s) => s.isLoading);

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
      <ChartGrid />

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