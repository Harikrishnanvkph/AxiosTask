import React, { useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, IconButton, Tooltip, Stack } from '@mui/material';
import {
  Fullscreen as FullscreenIcon,
  Refresh as RefreshIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from '@mui/icons-material';
import { useChartStore } from '../../store/chartStore';
import * as echarts from 'echarts';

export const ChartPreview: React.FC = () => {
  const chartRef = useRef<any>(null);
  const { currentChart, isPreviewMode } = useChartStore();
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  useEffect(() => {
    // Register theme if needed
    echarts.registerTheme('custom', {
      color: [
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
      ],
    });
  }, []);

  const getOption = () => {
    if (!currentChart) return {};

    // Build the complete ECharts option from our chart config
    const option: any = {
      title: currentChart.title,
      tooltip: currentChart.tooltip || {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: currentChart.legend || {
        data: currentChart.series.map((s) => s.name),
      },
      toolbox: isPreviewMode ? {} : (currentChart.toolbox || {
        feature: {
          saveAsImage: {},
          dataZoom: {},
          restore: {},
          dataView: {},
        },
      }),
      grid: currentChart.grid || {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: currentChart.xAxis,
      yAxis: currentChart.yAxis,
      series: currentChart.series,
      backgroundColor: currentChart.backgroundColor,
      color: currentChart.color,
      dataZoom: currentChart.dataZoom,
      visualMap: currentChart.visualMap,
    };

    // Remove undefined properties
    Object.keys(option).forEach((key) => {
      if (option[key] === undefined) {
        delete option[key];
      }
    });

    return option;
  };

  const handleRefresh = () => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.clear();
      instance.setOption(getOption());
    }
  };

  const handleZoomIn = () => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'dataZoom',
        start: 20,
        end: 80,
      });
    }
  };

  const handleZoomOut = () => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'dataZoom',
        start: 0,
        end: 100,
      });
    }
  };

  const handleFullscreen = () => {
    const element = document.getElementById('chart-container');
    if (!isFullscreen && element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const onChartClick = (params: any) => {
    if (!isPreviewMode) {
      console.log('Chart clicked:', params);
      // Could be used for element selection in edit mode
    }
  };

  const onEvents = {
    click: onChartClick,
  };

  return (
    <Box
      id="chart-container"
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!isPreviewMode && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
            p: 0.5,
          }}
        >
          <Tooltip title="Refresh">
            <IconButton size="small" onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom In">
            <IconButton size="small" onClick={handleZoomIn}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out">
            <IconButton size="small" onClick={handleZoomOut}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Fullscreen">
            <IconButton size="small" onClick={handleFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
      
      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        {currentChart ? (
          <ReactECharts
            ref={chartRef}
            option={getOption()}
            theme="custom"
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
            onEvents={onEvents}
            notMerge={true}
            lazyUpdate={true}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
            }}
          >
            No chart to display
          </Box>
        )}
      </Box>
    </Box>
  );
};