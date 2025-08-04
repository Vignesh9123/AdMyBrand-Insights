'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Badge } from '@/components/ui/badge';
import { X, Filter, Download, FileText, Calendar, DollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useDashboardStore } from '@/lib/store';

interface AdvancedFiltersProps {
  onExportPDF: () => void;
  onExportCSV: () => void;
}

export function AdvancedFilters({ 
  onExportPDF, 
  onExportCSV, 
}: AdvancedFiltersProps) {
  const filters = useDashboardStore((s) => s.filters);
  const updateFilter = useDashboardStore((s) => s.updateFilter);
  const clearAllFilters = useDashboardStore((s) => s.clearAllFilters);  const [isOpen, setIsOpen] = useState(false);

  const activeFiltersCount = useDashboardStore((s) => s.getActiveFiltersCount());
  

  const updateDateRange = (key: 'from' | 'to', date: Date | undefined) => {
    updateFilter('dateRange', { ...filters.dateRange, [key]: date });
  };

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <CardTitle className="text-lg">Advanced Filters & Export</CardTitle>
                {hasActiveFilters && (
                  <>
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount} active
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearAllFilters();
                    }}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExportPDF();
                  }}
                  className="hidden sm:flex"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExportCSV();
                  }}
                  className="hidden sm:flex"
                >
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
              </div>
            </div>
            <CardDescription>
              Filter data by date range, status, revenue, and more. Export your reports.
            </CardDescription>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid gap-6">
              {/* Date Range */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <DatePicker
                    date={filters.dateRange.from}
                    onDateChange={(date) => updateDateRange('from', date)}
                    placeholder="From date"
                  />
                  <DatePicker
                    date={filters.dateRange.to}
                    onDateChange={(date) => updateDateRange('to', date)}
                    placeholder="To date"
                  />
                </div>
              </div>

              <Separator />

              {/* Campaign and Status */}
              <div className="grid gap-4 md:grid-cols-2">
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Revenue Range */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Revenue Range
                </Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="minRevenue" className="text-xs text-muted-foreground">Minimum</Label>
                    <Input
                      id="minRevenue"
                      type="number"
                      placeholder="0"
                      value={filters.minRevenue}
                      onChange={(e) => updateFilter('minRevenue', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="maxRevenue" className="text-xs text-muted-foreground">Maximum</Label>
                    <Input
                      id="maxRevenue"
                      type="number"
                      placeholder="100000"
                      value={filters.maxRevenue}
                      onChange={(e) => updateFilter('maxRevenue', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Cost Range */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Cost Range
                </Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="minCost" className="text-xs text-muted-foreground">Minimum</Label>
                    <Input
                      id="minCost"
                      type="number"
                      placeholder="0"
                      value={filters.minCost}
                      onChange={(e) => updateFilter('minCost', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="maxCost" className="text-xs text-muted-foreground">Maximum</Label>
                    <Input
                      id="maxCost"
                      type="number"
                      placeholder="50000"
                      value={filters.maxCost}
                      onChange={(e) => updateFilter('maxCost', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-muted-foreground"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={onExportPDF}
                    className="flex-1 sm:flex-none"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onExportCSV}
                    className="flex-1 sm:flex-none"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}