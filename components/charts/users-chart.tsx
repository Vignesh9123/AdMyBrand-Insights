import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { usersData } from '@/lib/mock-data';

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(252 70% 50%)",
  },
};

export function UsersChart() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer>
        <BarChart data={usersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {/* <defs>
            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(252 70% 50%)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(252 70% 50%)" stopOpacity={0.2}/>
            </linearGradient>
          </defs> */}

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
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <ChartTooltip 
            content={
              <ChartTooltipContent 
                formatter={(value) => [value.toLocaleString(), ' Active Users']}
                labelFormatter={(label) => `Month: ${currentMonth.includes(label) ? `${label}*` : label}`}
              />
            }
          />
          <Bar
            dataKey="value"
            fill='hsl(var(--chart-1))'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}