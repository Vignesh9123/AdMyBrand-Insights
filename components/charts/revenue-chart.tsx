import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { revenueData } from '@/lib/mock-data';

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(262 80% 60%)",
  },
};

export function RevenueChart() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer>
        <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="hsl(var(--chart-1))" stopOpacity={1}/>
              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
          <XAxis 
            dataKey="name" 
            className="text-xs text-muted-foreground"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${currentMonth.includes(value) ? `${value}*` : value}`}
          />
          <YAxis 
            className="text-xs text-muted-foreground"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <ChartTooltip 
            content={
              <ChartTooltipContent 
                formatter={(value) => [`$${value.toLocaleString()} `, 'Revenue']}
                labelFormatter={(label) => `Month: ${currentMonth.includes(label) ? `${label}*` : label}`}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#revenueGradient)"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: "hsl(var(--chart-1))", strokeWidth: 3, stroke: "hsl(var(--chart-1))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}