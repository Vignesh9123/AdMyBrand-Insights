# AdMyBrand - Marketing Analytics Dashboard

A modern, real-time marketing analytics dashboard built with Next.js, TypeScript, and Tailwind CSS. Monitor your marketing performance with interactive charts, data tables, and export capabilities.

![AdMyBrand Dashboard](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

### 📊 **Real-time Analytics Dashboard**
- **Live Data Updates**: Automatic data refresh every 3 seconds
- **Interactive Charts**: Revenue trends, traffic sources, and user growth
- **Metric Cards**: Key performance indicators with change indicators
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### 📈 **Advanced Data Visualization**
- **Revenue Chart**: Monthly revenue performance
- **Traffic Sources**: Pie chart showing visitor acquisition channels
- **User Growth**: Line chart tracking monthly active users and sessions

### 🔍 **Data Management & Filtering**
- **Advanced Filters**: Multi-criteria data filtering
- **Data Table**: Sortable and searchable campaign data
- **Real-time Filtering**: Instant results as you apply filters
- **Export Capabilities**: PDF and CSV export functionality

### 🎨 **Modern UI/UX**
- **Dark/Light Theme**: Toggle between themes
- **Loading States**: Skeleton loading for better UX
- **Smooth Animations**: Framer Motion powered transitions

### 📱 **Technical Features**
- **TypeScript**: Full type safety
- **Zustand State Management**: Lightweight and efficient
- **Shadcn UI Components**: Accessible and customizable
- **Tailwind CSS**: Utility-first styling

## 🛠️ Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 
- **State Management**: Zustand 
- **Charts**: Recharts 
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Export**: jsPDF + jsPDF-AutoTable
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Vignesh9123/AdMyBrand-Insights.git
cd AdMyBrand-Insights
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

### 4. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
AdMyBrand/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── charts/           # Chart components
│   ├── dashboard/        # Dashboard-specific components
│   ├── grids/            # Grid layouts
│   ├── providers/        # Context providers
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
│   ├── data.ts          # Data utilities
│   ├── export-utils.ts  # Export functionality
│   ├── mock-data.ts     # Sample data
│   ├── store.ts         # Zustand store
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Helper functions
├── package.json
├── tailwind.config.ts   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎯 Key Components

### Dashboard Overview (`components/dashboard/dashboard-overview.tsx`)
Main dashboard component that orchestrates all dashboard elements including charts, metrics, filters, and data table.

### Metrics
- **Revenue Metric**: Displays total revenue with change indicator vs previous month
- **Active Users Metric**: Shows current active users with percentage change
- **Conversion Rate Metric**: Displays conversion rate with change indicator vs previous month
- **Growth Rate Metric**: Shows user growth rate with change indicator vs previous month

### Charts
- **Revenue Chart**: Line chart showing revenue trends
- **Traffic Chart**: Pie chart for traffic sources
- **Users Chart**: Line chart for user growth metrics

### Data Management
- **Advanced Filters**: Multi-criteria filtering system
- **Data Table**: Sortable table with campaign data
- **Export Utils**: PDF and CSV export functionality

### State Management (`lib/store.ts`)
Zustand store managing:
- Dashboard data and loading states
- Filter configurations
- Real-time data updates


## 📊 Data Structure

The dashboard mainly uses the following data types:

```typescript
interface MetricData {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  format: 'currency' | 'number' | 'percentage';
}

interface TableData {
  id: string;
  campaign: string;
  status: 'Active' | 'Paused' | 'Completed';
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  conversions: number;
  revenue: number;
}
```

## 🎨 Customization

### Themes
The application supports dark and light themes. Theme configuration is handled in `components/providers/theme-provider.tsx`.

### Styling
- **Tailwind CSS**: All styling is done with Tailwind utilities
- **Custom Components**: UI components are built with Radix UI primitives
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Adding New Charts
1. Create a new chart component in `components/charts/`
2. Use Recharts library for visualization
3. Add to the dashboard overview component
4. Update types in `lib/types.ts` if needed

