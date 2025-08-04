import React from 'react'
import { MetricCard } from '../dashboard/metric-card'
import { useDashboardStore } from '@/lib/store';

function MetricGrid() {
    const metrics = useDashboardStore((state) => state.metrics);
   


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {metrics.map((metric) => (
      <MetricCard key={metric.id} metric={metric} />
    ))}
  </div>
  )
}

export default MetricGrid
