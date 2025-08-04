import React, { useEffect, useState } from 'react'
import { MetricCard } from '../dashboard/metric-card'
import { MetricData } from '@/lib/types';
import { generateMetrics } from '@/lib/data';

function MetricGrid() {
    const [metrics, setMetrics] = useState<MetricData[]>([]);

    useEffect(() => {
        // Initial data load
        setMetrics(generateMetrics());

    
        // Real-time updates every 3 seconds
        const interval = setInterval(() => {
          setMetrics(generateMetrics());
        }, 3000);
    
        return () => clearInterval(interval);
      }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {metrics.map((metric) => (
      <MetricCard key={metric.id} metric={metric} />
    ))}
  </div>
  )
}

export default MetricGrid
