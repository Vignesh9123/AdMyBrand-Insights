import React from 'react'
import { ChartCard } from '../charts/chart-card'
import { RevenueChart } from '../charts/revenue-chart'
import { TrafficChart } from '../charts/traffic-chart'
import { UsersChart } from '../charts/users-chart'

function ChartGrid() {
    return (
        <>
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
        </>
    )
}

export default ChartGrid
