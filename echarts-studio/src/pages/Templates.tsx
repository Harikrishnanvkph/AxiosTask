import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { ContentCopy as CopyIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useChartStore } from '../store/chartStore';
import { ChartConfig, Template } from '../types/chart.types';

const templates: Template[] = [
  {
    id: 'sales-dashboard',
    name: 'Sales Dashboard',
    description: 'Monthly sales performance with trend analysis',
    category: 'Business',
    thumbnail: '',
    config: {
      id: 'template-sales',
      name: 'Sales Dashboard',
      type: 'line',
      title: {
        text: 'Monthly Sales Performance',
        subtext: 'Revenue Trend Analysis',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
      },
      legend: {
        data: ['Revenue', 'Profit', 'Expenses'],
        top: 50,
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        type: 'value',
        name: 'Amount ($)',
      },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          data: [12000, 19000, 30000, 29000, 35000, 42000, 38000, 45000, 48000, 52000, 56000, 62000],
          smooth: true,
        },
        {
          name: 'Profit',
          type: 'line',
          data: [3000, 5000, 8000, 7500, 9000, 11000, 9500, 12000, 13000, 14500, 16000, 18000],
          smooth: true,
        },
        {
          name: 'Expenses',
          type: 'line',
          data: [9000, 14000, 22000, 21500, 26000, 31000, 28500, 33000, 35000, 37500, 40000, 44000],
          smooth: true,
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
    },
  },
  {
    id: 'market-share',
    name: 'Market Share',
    description: 'Product market share distribution',
    category: 'Business',
    thumbnail: '',
    config: {
      id: 'template-market',
      name: 'Market Share',
      type: 'pie',
      title: {
        text: 'Market Share Distribution',
        subtext: 'Q4 2024',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Market Share',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Product A' },
            { value: 735, name: 'Product B' },
            { value: 580, name: 'Product C' },
            { value: 484, name: 'Product D' },
            { value: 300, name: 'Product E' },
          ],
        },
      ],
    },
  },
  {
    id: 'performance-metrics',
    name: 'Performance Metrics',
    description: 'KPI comparison across departments',
    category: 'Analytics',
    thumbnail: '',
    config: {
      id: 'template-performance',
      name: 'Performance Metrics',
      type: 'bar',
      title: {
        text: 'Department Performance Metrics',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: ['Q1', 'Q2', 'Q3', 'Q4'],
        top: 30,
      },
      xAxis: {
        type: 'category',
        data: ['Sales', 'Marketing', 'Development', 'Support', 'HR'],
      },
      yAxis: {
        type: 'value',
        name: 'Score',
      },
      series: [
        {
          name: 'Q1',
          type: 'bar',
          data: [85, 72, 90, 78, 82],
        },
        {
          name: 'Q2',
          type: 'bar',
          data: [88, 75, 92, 80, 85],
        },
        {
          name: 'Q3',
          type: 'bar',
          data: [90, 78, 94, 82, 87],
        },
        {
          name: 'Q4',
          type: 'bar',
          data: [92, 80, 95, 85, 90],
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
    },
  },
  {
    id: 'scatter-correlation',
    name: 'Correlation Analysis',
    description: 'Scatter plot showing data correlation',
    category: 'Statistics',
    thumbnail: '',
    config: {
      id: 'template-scatter',
      name: 'Correlation Analysis',
      type: 'scatter',
      title: {
        text: 'Height vs Weight Correlation',
        left: 'center',
      },
      xAxis: {
        name: 'Height (cm)',
        type: 'value',
      },
      yAxis: {
        name: 'Weight (kg)',
        type: 'value',
      },
      series: [
        {
          name: 'Male',
          type: 'scatter',
          data: [
            [161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
            [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
            [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
          ],
        },
        {
          name: 'Female',
          type: 'scatter',
          data: [
            [174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
            [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
            [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
          ],
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
    },
  },
  {
    id: 'radar-skills',
    name: 'Skills Assessment',
    description: 'Multi-dimensional skills radar chart',
    category: 'HR',
    thumbnail: '',
    config: {
      id: 'template-radar',
      name: 'Skills Assessment',
      type: 'radar',
      title: {
        text: 'Employee Skills Assessment',
        left: 'center',
      },
      legend: {
        data: ['Employee A', 'Employee B'],
        top: 50,
      },
      radar: {
        indicator: [
          { name: 'Technical', max: 100 },
          { name: 'Communication', max: 100 },
          { name: 'Teamwork', max: 100 },
          { name: 'Leadership', max: 100 },
          { name: 'Innovation', max: 100 },
          { name: 'Problem Solving', max: 100 },
        ],
      },
      series: [
        {
          name: 'Skills',
          type: 'radar',
          data: [
            {
              value: [85, 70, 90, 65, 80, 88],
              name: 'Employee A',
            },
            {
              value: [75, 85, 80, 90, 70, 82],
              name: 'Employee B',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'heatmap-activity',
    name: 'Activity Heatmap',
    description: 'Daily activity intensity visualization',
    category: 'Analytics',
    thumbnail: '',
    config: {
      id: 'template-heatmap',
      name: 'Activity Heatmap',
      type: 'heatmap',
      title: {
        text: 'Weekly Activity Heatmap',
        left: 'center',
      },
      tooltip: {
        position: 'top',
      },
      xAxis: {
        type: 'category',
        data: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: 'category',
        data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
      },
      series: [
        {
          name: 'Activity',
          type: 'heatmap',
          data: [
            [0, 0, 10], [0, 1, 20], [0, 2, 30], [0, 3, 40], [0, 4, 50], [0, 5, 40], [0, 6, 30],
            [1, 0, 15], [1, 1, 25], [1, 2, 35], [1, 3, 45], [1, 4, 55], [1, 5, 45], [1, 6, 35],
            [2, 0, 20], [2, 1, 30], [2, 2, 40], [2, 3, 50], [2, 4, 60], [2, 5, 50], [2, 6, 40],
            [3, 0, 25], [3, 1, 35], [3, 2, 45], [3, 3, 55], [3, 4, 65], [3, 5, 55], [3, 6, 45],
            [4, 0, 30], [4, 1, 40], [4, 2, 50], [4, 3, 60], [4, 4, 70], [4, 5, 60], [4, 6, 50],
            [5, 0, 35], [5, 1, 45], [5, 2, 55], [5, 3, 65], [5, 4, 75], [5, 5, 65], [5, 6, 55],
            [6, 0, 40], [6, 1, 50], [6, 2, 60], [6, 3, 70], [6, 4, 80], [6, 5, 70], [6, 6, 60],
            [7, 0, 45], [7, 1, 55], [7, 2, 65], [7, 3, 75], [7, 4, 85], [7, 5, 75], [7, 6, 65],
          ],
          label: {
            show: true,
          },
        },
      ],
      grid: {
        height: '50%',
        top: '10%',
      },
    },
  },
];

export const Templates: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentChart } = useChartStore();

  const handleUseTemplate = (template: Template) => {
    setCurrentChart(template.config);
    navigate('/editor');
  };

  const categories = Array.from(new Set(templates.map((t) => t.category)));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Chart Templates
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Start with a pre-built template and customize it to your needs
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Chip label="All" color="primary" />
        {categories.map((cat) => (
          <Chip key={cat} label={cat} variant="outlined" />
        ))}
      </Stack>

      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  backgroundColor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <Typography variant="h5">
                  {template.config.type.toUpperCase()}
                </Typography>
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {template.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {template.description}
                </Typography>
                <Chip label={template.category} size="small" color="primary" variant="outlined" />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<CopyIcon />}
                  onClick={() => handleUseTemplate(template)}
                >
                  Use Template
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};