'use client';

import { NavbarDemo as Header } from '@/components/dashboard/header';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { useEffect } from 'react';
import { useDashboardStore } from '@/lib/store';


export default function Home() {
  const loadInitialData = useDashboardStore((s) => s.loadInitialData);
  const updateDataRealTime = useDashboardStore((s) => s.updateDataRealTime);
  const updateMetricsRealTime = useDashboardStore((s) => s.updateMetricsRealTime);

  useEffect(() => {
    // Load initial data
    loadInitialData();

    // Set up real-time updates every 3 seconds
    const interval = setInterval(() => {
      updateDataRealTime();
      updateMetricsRealTime();
    }, 3000);

    return () => clearInterval(interval);
  }, [loadInitialData, updateDataRealTime]);

  return (
    <div className="min-h-screen bg-background">
      <Header>
      <main className="container mx-auto px-4 py-6">
        <div className="mt-10 mb-6">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Dashboard Overview</h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-center">
            Monitor your marketing performance in real-time
          </p>
        </div>
        <DashboardOverview />
      </main>
      </Header>
    </div>
  );
}