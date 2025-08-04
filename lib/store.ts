import { create } from 'zustand';
import { TableData, MetricData } from './types';
import { generateTableData, generateRealTimeTableData, generateMetrics } from './data';

export interface FilterState {
  dateRange: {
    from?: Date;
    to?: Date;
  };
  searchTerm: string;
  status: string;
  minRevenue: string;
  maxRevenue: string;
  minCost: string;
  maxCost: string;
}

interface DashboardState {
  // Table data
  tableData: TableData[];
  filteredTableData: TableData[];
  
  // Metrics data
  metrics: MetricData[];
  
  // Filters
  filters: FilterState;
  
  // Table controls
  sortField: keyof TableData;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
  
  // Loading state
  isLoading: boolean;
  
  // Actions
  setTableData: (data: TableData[]) => void;
  setFilteredTableData: (data: TableData[]) => void;
  setMetrics: (metrics: MetricData[]) => void;
  setFilters: (filters: FilterState) => void;
  updateFilter: (key: keyof FilterState, value: any) => void;
  clearAllFilters: () => void;
  setSortField: (field: keyof TableData) => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
  setLoading: (loading: boolean) => void;
  
  // Computed values
  getActiveFiltersCount: () => number;
  getTotalPages: () => number;
  getPaginatedData: () => TableData[];
  
  // Data operations
  loadInitialData: () => void;
  updateDataRealTime: () => void;
  updateMetricsRealTime: () => void;
  applyFiltersAndSort: () => void;
}

const initialFilters: FilterState = {
  dateRange: {},
  status: 'all',
  minRevenue: '',
  maxRevenue: '',
  minCost: '',
  maxCost: '',
  searchTerm: '',
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  tableData: [],
  filteredTableData: [],
  metrics: [],
  filters: initialFilters,
  searchTerm: '',
  sortField: 'revenue',
  sortDirection: 'desc',
  currentPage: 1,
  itemsPerPage: 10,
  isLoading: true,

  // Actions
  setTableData: (data) => set({ tableData: data }),
  setFilteredTableData: (data) => set({ filteredTableData: data }),
  setMetrics: (metrics) => set({ metrics }),
  
  setFilters: (filters) => {
    set({ filters, currentPage: 1 }); // Reset to first page when filters change
    get().applyFiltersAndSort();
  },
  
  updateFilter: (key, value) => {
    const { filters } = get();
    const newFilters = { ...filters, [key]: value };
    set({ filters: newFilters, currentPage: 1 });
    get().applyFiltersAndSort();
  },
  
  clearAllFilters: () => {
    set({ filters: initialFilters, currentPage: 1 });
    get().applyFiltersAndSort();
  },
  

  
  setSortField: (field) => {
    const { sortField, sortDirection } = get();
    if (field === sortField) {
      set({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' });
    } else {
      set({ sortField: field, sortDirection: 'desc' });
    }
    get().applyFiltersAndSort();
  },
  
  setSortDirection: (direction) => set({ sortDirection: direction }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setLoading: (loading) => set({ isLoading: loading }),

  // Computed values
  getActiveFiltersCount: () => {
    const { filters } = get();
    let count = 0;
    if (filters.status !== 'all') count++;
    if (filters.minRevenue !== '') count++;
    if (filters.maxRevenue !== '') count++;
    if (filters.minCost !== '') count++;
    if (filters.maxCost !== '') count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    return count;
  },

  getTotalPages: () => {
    const { filteredTableData, itemsPerPage } = get();
    return Math.ceil(filteredTableData.length / itemsPerPage);
  },

  getPaginatedData: () => {
    const { filteredTableData, currentPage, itemsPerPage } = get();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTableData.slice(startIndex, startIndex + itemsPerPage);
  },

  // Data operations
  loadInitialData: async() => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate data loading
    const data = generateTableData();
    const metrics = generateMetrics();
    set({ tableData: data, metrics, isLoading: false });
    get().applyFiltersAndSort();
  },

  updateDataRealTime: () => {
    const { tableData, filters, filteredTableData } = get();
    
    // Skip real-time updates if filtering by 'Completed' or 'Paused' status
    if (filters.status === 'Completed' || filters.status === 'Paused') {
      return;
    }
    
    // Also skip if no active campaigns in the data
    if (!filteredTableData.some(item => item.status === 'Active')) {
      return;
    }
    const updatedData = generateRealTimeTableData(tableData);
    set({ tableData: updatedData });
    get().applyFiltersAndSort();
  },

  updateMetricsRealTime: () => {
    const metrics = generateMetrics();
    set({ metrics });
  },

  applyFiltersAndSort: () => {
    const { tableData, filters, sortField, sortDirection } = get();
    const searchTerm = filters.searchTerm;
    let filtered = tableData.filter(item => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        item.campaign.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = filters.status === 'all' || item.status === filters.status;
      
      // Revenue range filter
      const matchesMinRevenue = filters.minRevenue === '' || 
        item.revenue >= parseFloat(filters.minRevenue);
      const matchesMaxRevenue = filters.maxRevenue === '' || 
        item.revenue <= parseFloat(filters.maxRevenue);
      
      // Cost range filter
      const matchesMinCost = filters.minCost === '' || 
        item.cost >= parseFloat(filters.minCost);
      const matchesMaxCost = filters.maxCost === '' || 
        item.cost <= parseFloat(filters.maxCost);
      
      return matchesSearch && matchesStatus && 
             matchesMinRevenue && matchesMaxRevenue && 
             matchesMinCost && matchesMaxCost;
    });

    // Sort data
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      if (sortDirection === 'asc') {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      } else {
        return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
      }
    });

    set({ filteredTableData: filtered });
  },
})); 