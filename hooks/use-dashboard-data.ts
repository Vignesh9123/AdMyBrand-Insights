import { useEffect } from 'react';
import { useDashboardStore } from '@/lib/store';

export const useDashboardData = () => {
  const {
    loadInitialData,
    updateDataRealTime,
  } = useDashboardStore();

  // Load initial data and set up real-time updates
  useEffect(() => {
    loadInitialData();

    // Real-time updates every 3 seconds
    const interval = setInterval(() => {
      updateDataRealTime();
    }, 3000);

    return () => clearInterval(interval);
  }, [loadInitialData, updateDataRealTime]);
}; 