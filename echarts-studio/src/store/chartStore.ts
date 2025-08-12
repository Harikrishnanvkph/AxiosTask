import { create } from 'zustand';
import { ChartConfig, SavedChart, ChartType } from '../types/chart.types';

interface ChartStore {
  currentChart: ChartConfig | null;
  savedCharts: SavedChart[];
  isPreviewMode: boolean;
  selectedElement: string | null;
  undoStack: ChartConfig[];
  redoStack: ChartConfig[];
  
  // Actions
  setCurrentChart: (chart: ChartConfig) => void;
  updateChartProperty: (path: string, value: any) => void;
  saveChart: () => void;
  loadChart: (id: string) => void;
  deleteChart: (id: string) => void;
  exportChart: (format: string) => void;
  togglePreviewMode: () => void;
  selectElement: (element: string | null) => void;
  undo: () => void;
  redo: () => void;
  resetChart: () => void;
  changeChartType: (type: ChartType) => void;
}

const defaultChart: ChartConfig = {
  id: 'new-chart',
  name: 'Untitled Chart',
  type: 'line',
  title: {
    text: 'Chart Title',
    subtext: 'Chart Subtitle',
    left: 'center',
    top: 20,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  legend: {
    data: ['Series 1'],
    top: 50,
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Series 1',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130],
      smooth: true,
    },
  ],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
      dataZoom: {},
      restore: {},
    },
  },
};

export const useChartStore = create<ChartStore>((set, get) => ({
  currentChart: defaultChart,
  savedCharts: [],
  isPreviewMode: false,
  selectedElement: null,
  undoStack: [],
  redoStack: [],

  setCurrentChart: (chart) => {
    const { currentChart, undoStack } = get();
    if (currentChart) {
      set({ undoStack: [...undoStack, currentChart] });
    }
    set({ currentChart: chart, redoStack: [] });
  },

  updateChartProperty: (path, value) => {
    const { currentChart, undoStack } = get();
    if (!currentChart) return;

    const newChart = { ...currentChart };
    const keys = path.split('.');
    let current: any = newChart;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;

    set({
      currentChart: newChart,
      undoStack: [...undoStack, currentChart],
      redoStack: [],
    });
  },

  saveChart: () => {
    const { currentChart, savedCharts } = get();
    if (!currentChart) return;

    const savedChart: SavedChart = {
      ...currentChart,
      id: currentChart.id || Date.now().toString(),
      name: currentChart.name,
      config: currentChart,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const existingIndex = savedCharts.findIndex((c) => c.id === savedChart.id);
    if (existingIndex >= 0) {
      savedCharts[existingIndex] = savedChart;
    } else {
      savedCharts.push(savedChart);
    }

    set({ savedCharts: [...savedCharts] });
    localStorage.setItem('echarts-studio-charts', JSON.stringify(savedCharts));
  },

  loadChart: (id) => {
    const { savedCharts } = get();
    const chart = savedCharts.find((c) => c.id === id);
    if (chart) {
      set({ currentChart: chart.config });
    }
  },

  deleteChart: (id) => {
    const { savedCharts } = get();
    const filtered = savedCharts.filter((c) => c.id !== id);
    set({ savedCharts: filtered });
    localStorage.setItem('echarts-studio-charts', JSON.stringify(filtered));
  },

  exportChart: (format) => {
    // Export logic will be implemented in the export component
    console.log('Exporting chart as', format);
  },

  togglePreviewMode: () => {
    set((state) => ({ isPreviewMode: !state.isPreviewMode }));
  },

  selectElement: (element) => {
    set({ selectedElement: element });
  },

  undo: () => {
    const { currentChart, undoStack, redoStack } = get();
    if (undoStack.length === 0) return;

    const previousChart = undoStack[undoStack.length - 1];
    const newUndoStack = undoStack.slice(0, -1);

    if (currentChart) {
      set({
        currentChart: previousChart,
        undoStack: newUndoStack,
        redoStack: [...redoStack, currentChart],
      });
    }
  },

  redo: () => {
    const { currentChart, undoStack, redoStack } = get();
    if (redoStack.length === 0) return;

    const nextChart = redoStack[redoStack.length - 1];
    const newRedoStack = redoStack.slice(0, -1);

    if (currentChart) {
      set({
        currentChart: nextChart,
        undoStack: [...undoStack, currentChart],
        redoStack: newRedoStack,
      });
    }
  },

  resetChart: () => {
    set({
      currentChart: defaultChart,
      undoStack: [],
      redoStack: [],
      selectedElement: null,
    });
  },

  changeChartType: (type) => {
    const { currentChart, undoStack } = get();
    if (!currentChart) return;

    const newChart = {
      ...currentChart,
      type,
      series: currentChart.series.map((s) => ({ ...s, type })),
    };

    set({
      currentChart: newChart,
      undoStack: [...undoStack, currentChart],
      redoStack: [],
    });
  },
}));

// Load saved charts from localStorage on initialization
const savedChartsJson = localStorage.getItem('echarts-studio-charts');
if (savedChartsJson) {
  try {
    const savedCharts = JSON.parse(savedChartsJson);
    useChartStore.setState({ savedCharts });
  } catch (error) {
    console.error('Failed to load saved charts:', error);
  }
}