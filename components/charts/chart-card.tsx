import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  description?: string;
}

export function ChartCard({ title, children, className, description }: ChartCardProps) {
  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-card-hover border-0 bg-gradient-secondary",
      className
    )}>
      <CardHeader className="pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 md:p-6 pt-0">
        {children}
      </CardContent>
    </Card>
  );
}