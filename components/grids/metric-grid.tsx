import React, { useEffect } from 'react'
import { MetricCard } from '../dashboard/metric-card'
import { useDashboardStore } from '@/lib/store';

function MetricGrid() {
    const metrics = useDashboardStore((state) => state.metrics);
    const loadInitialData = useDashboardStore((state) => state.loadInitialData);
    const updateMetricsRealTime = useDashboardStore((state) => state.updateMetricsRealTime);

    useEffect(() => {
        // Initial data load
        loadInitialData();

        // Real-time updates every 3 seconds
        const interval = setInterval(() => {
          updateMetricsRealTime();
        }, 3000);

        return () => clearInterval(interval);
      }, [loadInitialData, updateMetricsRealTime]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {metrics.map((metric) => (
      <MetricCard key={metric.id} metric={metric} />
    ))}
  </div>
  )
}

export default MetricGrid
