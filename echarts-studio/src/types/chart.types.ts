export type ChartType = 
  | 'line'
  | 'bar'
  | 'pie'
  | 'scatter'
  | 'radar'
  | 'heatmap'
  | 'treemap'
  | 'sunburst'
  | 'funnel'
  | 'gauge'
  | 'candlestick'
  | 'boxplot'
  | 'sankey'
  | 'graph'
  | 'parallel';

export interface ChartData {
  name: string;
  value: number | number[];
  [key: string]: any;
}

export interface ChartSeries {
  name: string;
  type: string;
  data: ChartData[];
  [key: string]: any;
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  title: {
    text: string;
    subtext?: string;
    left?: string | number;
    top?: string | number;
    textStyle?: any;
    subtextStyle?: any;
  };
  tooltip?: any;
  legend?: any;
  xAxis?: any;
  yAxis?: any;
  series: ChartSeries[];
  color?: string[];
  backgroundColor?: string;
  grid?: any;
  toolbox?: any;
  dataZoom?: any[];
  visualMap?: any;
  [key: string]: any;
}

export interface SavedChart {
  id: string;
  name: string;
  config: ChartConfig;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
}

export interface DataSource {
  type: 'manual' | 'csv' | 'json' | 'api';
  data?: any;
  url?: string;
  headers?: Record<string, string>;
}

export interface ExportOptions {
  format: 'png' | 'svg' | 'json' | 'html';
  width?: number;
  height?: number;
  pixelRatio?: number;
}

export interface Theme {
  name: string;
  config: any;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  config: ChartConfig;
  category: string;
}