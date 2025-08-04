'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users, Target } from 'lucide-react';
import { MetricData } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';
import { cn } from '@/lib/utils';
import React from 'react';

interface MetricCardProps {
  metric: MetricData;
}

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp
};
const MemoizedHeader = React.memo(function MemoizedHeader({ title, IconComponent }: { title: string, IconComponent: any }) {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className='relative'>
        <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-75 group-hover:animate-ping" />
        </div>
      </CardHeader>
  )
})


export const MetricCard = React.memo(({ metric }: MetricCardProps)=> {
  const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;
  const isPositive = metric.changeType === 'increase';
  
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      default:
        return formatNumber(value);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <MemoizedHeader title={metric.title} IconComponent={IconComponent} />
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold group-hover:text-primary transition-colors">
              {formatValue(metric.value, metric.format)}
            </div>
            <div className="flex items-center space-x-1 mt-1">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs",
                  isPositive ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30" : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
                )}
              >
                {isPositive ? '+' : '-'}{Math.abs(metric.change)}% 
              </Badge>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                vs last month
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.metric.id === nextProps.metric.id &&
    prevProps.metric.value === nextProps.metric.value &&
    prevProps.metric.change === nextProps.metric.change
  );
})