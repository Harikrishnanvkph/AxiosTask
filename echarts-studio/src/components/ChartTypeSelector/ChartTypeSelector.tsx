import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Chip,
} from '@mui/material';
import {
  ShowChart as LineIcon,
  BarChart as BarIcon,
  PieChart as PieIcon,
  ScatterPlot as ScatterIcon,
  BubbleChart as BubbleIcon,
  Donut as DonutIcon,
  Timeline as TimelineIcon,
  AccountTree as TreeIcon,
} from '@mui/icons-material';
import { useChartStore } from '../../store/chartStore';
import { ChartType } from '../../types/chart.types';

const chartTypes: { value: ChartType; label: string; icon: React.ReactNode }[] = [
  { value: 'line', label: 'Line Chart', icon: <LineIcon /> },
  { value: 'bar', label: 'Bar Chart', icon: <BarIcon /> },
  { value: 'pie', label: 'Pie Chart', icon: <PieIcon /> },
  { value: 'scatter', label: 'Scatter Plot', icon: <ScatterIcon /> },
  { value: 'radar', label: 'Radar Chart', icon: <BubbleIcon /> },
  { value: 'heatmap', label: 'Heatmap', icon: <BubbleIcon /> },
  { value: 'treemap', label: 'Treemap', icon: <TreeIcon /> },
  { value: 'sunburst', label: 'Sunburst', icon: <DonutIcon /> },
  { value: 'funnel', label: 'Funnel', icon: <TimelineIcon /> },
  { value: 'gauge', label: 'Gauge', icon: <BubbleIcon /> },
  { value: 'candlestick', label: 'Candlestick', icon: <TimelineIcon /> },
  { value: 'boxplot', label: 'Box Plot', icon: <BarIcon /> },
  { value: 'sankey', label: 'Sankey', icon: <TimelineIcon /> },
  { value: 'graph', label: 'Graph', icon: <BubbleIcon /> },
  { value: 'parallel', label: 'Parallel', icon: <TimelineIcon /> },
];

export const ChartTypeSelector: React.FC = () => {
  const { currentChart, changeChartType } = useChartStore();

  const handleChange = (event: SelectChangeEvent<ChartType>) => {
    changeChartType(event.target.value as ChartType);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="chart-type-label">Chart Type</InputLabel>
      <Select
        labelId="chart-type-label"
        id="chart-type-select"
        value={currentChart?.type || 'line'}
        label="Chart Type"
        onChange={handleChange}
        renderValue={(value) => {
          const chart = chartTypes.find((c) => c.value === value);
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {chart?.icon}
              {chart?.label}
            </Box>
          );
        }}
      >
        {chartTypes.map((chart) => (
          <MenuItem key={chart.value} value={chart.value}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {chart.icon}
              {chart.label}
              {['candlestick', 'boxplot', 'sankey', 'graph', 'parallel'].includes(
                chart.value
              ) && (
                <Chip label="Advanced" size="small" color="primary" sx={{ ml: 'auto' }} />
              )}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};