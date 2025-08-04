import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TableData, MetricData } from './types';
import { formatCurrency, formatNumber } from './utils';
import { generateMetrics } from './data';
export function exportToPDF(data: TableData[],filename: string = 'dashboard-report') {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('ADmyBRAND Insights Report', 20, 20);
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  
  // Add metrics summary
  doc.setFontSize(16);
  doc.text('Key Metrics', 20, 45);
  
  let yPosition = 55;
  generateMetrics().forEach((metric) => {
    doc.setFontSize(12);
    let value = '';
    switch (metric.format) {
      case 'currency':
        value = formatCurrency(metric.value);
        break;
      case 'percentage':
        value = `${metric.value}%`;
        break;
      default:
        value = formatNumber(metric.value);
    }
    doc.text(`${metric.title}: ${value} (${metric.changeType === 'increase' ? '+' : '-'}${metric.change}%)`, 20, yPosition);
    yPosition += 10;
  });
  
  // Add campaign data table
  yPosition += 10;
  doc.setFontSize(16);
  doc.text('Campaign Performance', 20, yPosition);
  
  const tableData = data.map(row => [
    row.campaign,
    row.status,
    formatNumber(row.impressions),
    formatNumber(row.clicks),
    `${row.ctr.toFixed(2)}%`,
    formatCurrency(row.cost),
    formatCurrency(row.revenue)
  ]);
  
  autoTable(doc, {
    head: [['Campaign', 'Status', 'Impressions', 'Clicks', 'CTR', 'Cost', 'Revenue']],
    body: tableData,
    startY: yPosition + 10,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [59, 130, 246] },
  });
  
  doc.save(`${filename}.pdf`);
}

export function exportToCSV(data: TableData[], filename: string = 'dashboard-data') {
  // Generate metrics data
  const metrics = generateMetrics();
  
  // Create metrics section
  const metricsHeaders = ['Metric', 'Value', 'Change (%)', 'Change Type'];
  const metricsData = metrics.map(metric => {
    let value = '';
    switch (metric.id) {
      case 'revenue':
      case 'users':
      case 'conversions':
        value = String(metric.value);
        break;
      case 'percentage':
        value = `${metric.value}%`;
        break;
      default:
        value = formatNumber(metric.value);
    }
    return [
      `"${metric.title}"`,
      value,
      `${metric.changeType === 'increase' ? '+' : '-'}${metric.change}`,
      metric.changeType
    ].join(',');
  });
  
  // Create campaign data section
  const campaignHeaders = [
    'Campaign',
    'Status',
    'Impressions',
    'Clicks',
    'CTR (%)',
    'Cost ($)',
    'Conversions',
    'Revenue ($)'
  ];
  
  const campaignData = data.map(row => [
    `"${row.campaign}"`,
    row.status,
    row.impressions,
    row.clicks,
    row.ctr.toFixed(2),
    row.cost.toFixed(2),
    row.conversions,
    row.revenue.toFixed(2)
  ].join(','));
  
  // Combine all sections with proper spacing
  const csvContent = [
    'ADmyBRAND Insights Report',
    `Generated on: ${new Date().toLocaleDateString()}`,
    '',
    'Key Metrics',
    metricsHeaders.join(','),
    ...metricsData,
    '',
    'Campaign Performance',
    campaignHeaders.join(','),
    ...campaignData
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}