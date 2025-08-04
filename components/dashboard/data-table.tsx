'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ArrowUpDown, Search } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { useDashboardStore } from '@/lib/store';

interface DataTableProps {}

export function DataTable({}: DataTableProps) {
  const currentPage = useDashboardStore((s) => s.currentPage);
  const filters = useDashboardStore((s) => s.filters);
  const updateFilter = useDashboardStore((s) => s.updateFilter);
  const filteredTableData = useDashboardStore((s) => s.filteredTableData);
  const itemsPerPage = useDashboardStore((s) => s.itemsPerPage);
  const setSortField = useDashboardStore((s) => s.setSortField);
  const setCurrentPage = useDashboardStore((s) => s.setCurrentPage);
  const getTotalPages = useDashboardStore((s) => s.getTotalPages);
  const getPaginatedData = useDashboardStore((s) => s.getPaginatedData);

  const totalPages = getTotalPages();
  const paginatedData = getPaginatedData();
  const startIndex = (currentPage - 1) * itemsPerPage;

  const handleSort = (field: keyof any) => {
    setSortField(field as any);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Paused':
        return 'secondary';
      case 'Completed':
        return 'outline';
      default:
        return 'secondary';
    }
  };


  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>Campaign Performance</CardTitle>
              
            </div>
            <CardDescription>
              Detailed performance metrics for all campaigns
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
            <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger className="w-full sm:w-32">
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
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort('campaign')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Campaign</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
                  onClick={() => handleSort('impressions')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Impressions</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
                  onClick={() => handleSort('clicks')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Clicks</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
                  onClick={() => handleSort('ctr')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>CTR</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
                  onClick={() => handleSort('cost')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Cost</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
                  onClick={() => handleSort('revenue')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Revenue</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow 
                  key={row.id} 
                  className="hover:bg-muted/50 transition-all duration-300 ease-in-out"
                  style={{
                    animation: row.status === 'Active' ? 'fadeInOut 3s ease-in-out infinite' : 'none'
                  }}
                >
                  <TableCell className="font-medium">{row.campaign}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(row.status)}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatNumber(row.impressions)}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.clicks)}</TableCell>
                  <TableCell className="text-right">{row.ctr.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.cost)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(row.revenue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTableData.length)} of {filteredTableData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}