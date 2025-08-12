import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Alert,
  Typography,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  Description as FileIcon,
} from '@mui/icons-material';
import { useChartStore } from '../../store/chartStore';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as echarts from 'echarts';

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export const ExportDialog: React.FC<ExportDialogProps> = ({ open, onClose }) => {
  const { currentChart } = useChartStore();
  const [tabValue, setTabValue] = useState(0);
  const [imageFormat, setImageFormat] = useState<'png' | 'svg'>('png');
  const [imageWidth, setImageWidth] = useState(1920);
  const [imageHeight, setImageHeight] = useState(1080);
  const [pixelRatio, setPixelRatio] = useState(2);
  const [fileName, setFileName] = useState('chart');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const exportAsImage = async () => {
    const chartContainer = document.querySelector('.echarts-for-react') as HTMLElement;
    if (!chartContainer) {
      alert('Chart not found');
      return;
    }

    if (imageFormat === 'png') {
      // Export as PNG using html2canvas
      try {
        const canvas = await html2canvas(chartContainer, {
          scale: pixelRatio,
          width: imageWidth,
          height: imageHeight,
          backgroundColor: currentChart?.backgroundColor || '#ffffff',
        });
        
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, `${fileName}.png`);
            onClose();
          }
        });
      } catch (error) {
        console.error('Error exporting PNG:', error);
        alert('Failed to export as PNG');
      }
    } else {
      // Export as SVG
      const chartInstance = echarts.getInstanceByDom(
        chartContainer.querySelector('div') as HTMLElement
      );
      if (chartInstance) {
        const svgString = chartInstance.renderToSVGString();
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        saveAs(blob, `${fileName}.svg`);
        onClose();
      }
    }
  };

  const exportAsJSON = () => {
    if (!currentChart) return;
    
    const json = JSON.stringify(currentChart, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, `${fileName}.json`);
    onClose();
  };

  const exportAsHTML = () => {
    if (!currentChart) return;

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentChart.title?.text || 'ECharts Chart'}</title>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        #chart {
            width: 100%;
            height: 600px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div id="chart"></div>
    <script>
        var chartDom = document.getElementById('chart');
        var myChart = echarts.init(chartDom);
        var option = ${JSON.stringify(currentChart, null, 2)};
        myChart.setOption(option);
        window.addEventListener('resize', function() {
            myChart.resize();
        });
    </script>
</body>
</html>`;

    const blob = new Blob([htmlTemplate], { type: 'text/html' });
    saveAs(blob, `${fileName}.html`);
    onClose();
  };

  const exportAsCode = (language: 'javascript' | 'python' | 'java') => {
    if (!currentChart) return;

    let code = '';
    
    if (language === 'javascript') {
      code = `// ECharts Configuration
const option = ${JSON.stringify(currentChart, null, 2)};

// Initialize chart
const chartDom = document.getElementById('chart');
const myChart = echarts.init(chartDom);
myChart.setOption(option);

// Make chart responsive
window.addEventListener('resize', function() {
    myChart.resize();
});`;
    } else if (language === 'python') {
      code = `# ECharts Configuration for pyecharts
from pyecharts import options as opts
from pyecharts.charts import Line, Bar, Pie, Scatter

# Chart configuration
option = ${JSON.stringify(currentChart, null, 2)}

# Note: This is a JSON configuration. 
# You'll need to adapt it to pyecharts API
# Example for a line chart:
# chart = Line()
# chart.add_xaxis(option['xAxis']['data'])
# for series in option['series']:
#     chart.add_yaxis(series['name'], series['data'])
# chart.set_global_opts(
#     title_opts=opts.TitleOpts(title=option['title']['text'])
# )
# chart.render('chart.html')`;
    } else if (language === 'java') {
      code = `// ECharts Configuration for Java
import com.github.abel533.echarts.Option;
import com.github.abel533.echarts.axis.CategoryAxis;
import com.github.abel533.echarts.axis.ValueAxis;
import com.github.abel533.echarts.series.Line;

// Chart configuration JSON
String optionJson = ${JSON.stringify(JSON.stringify(currentChart))};

// Note: You'll need to parse this JSON and create the chart
// Example:
// Option option = new Option();
// option.title().text("${currentChart.title?.text || 'Chart Title'}");
// option.xAxis(new CategoryAxis().data(...));
// option.yAxis(new ValueAxis());
// option.series(new Line().name("Series").data(...));`;
    }

    const blob = new Blob([code], { type: 'text/plain' });
    saveAs(blob, `${fileName}.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'java'}`);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Export Chart</DialogTitle>
      <DialogContent>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<ImageIcon />} label="Image" />
          <Tab icon={<FileIcon />} label="Data" />
          <Tab icon={<CodeIcon />} label="Code" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Stack spacing={3}>
            <TextField
              label="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              fullWidth
            />
            
            <FormControl fullWidth>
              <InputLabel>Format</InputLabel>
              <Select
                value={imageFormat}
                label="Format"
                onChange={(e) => setImageFormat(e.target.value as 'png' | 'svg')}
              >
                <MenuItem value="png">PNG</MenuItem>
                <MenuItem value="svg">SVG</MenuItem>
              </Select>
            </FormControl>

            {imageFormat === 'png' && (
              <>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Width (px)"
                    type="number"
                    value={imageWidth}
                    onChange={(e) => setImageWidth(parseInt(e.target.value))}
                    fullWidth
                  />
                  <TextField
                    label="Height (px)"
                    type="number"
                    value={imageHeight}
                    onChange={(e) => setImageHeight(parseInt(e.target.value))}
                    fullWidth
                  />
                </Stack>
                
                <FormControl fullWidth>
                  <InputLabel>Pixel Ratio</InputLabel>
                  <Select
                    value={pixelRatio}
                    label="Pixel Ratio"
                    onChange={(e) => setPixelRatio(e.target.value as number)}
                  >
                    <MenuItem value={1}>1x (Standard)</MenuItem>
                    <MenuItem value={2}>2x (Retina)</MenuItem>
                    <MenuItem value={3}>3x (High DPI)</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}

            <Alert severity="info">
              <Typography variant="body2">
                {imageFormat === 'png' 
                  ? 'PNG format is best for presentations and documents.'
                  : 'SVG format is best for scalable graphics and web use.'}
              </Typography>
            </Alert>
          </Stack>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Stack spacing={3}>
            <TextField
              label="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              fullWidth
            />
            
            <Stack spacing={2}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={exportAsJSON}
                fullWidth
              >
                Export as JSON
              </Button>
              
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={exportAsHTML}
                fullWidth
              >
                Export as HTML
              </Button>
            </Stack>

            <Alert severity="info">
              <Typography variant="body2">
                JSON format contains the complete chart configuration.
                HTML format creates a standalone web page with the chart.
              </Typography>
            </Alert>
          </Stack>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Stack spacing={3}>
            <TextField
              label="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              fullWidth
            />
            
            <Stack spacing={2}>
              <Button
                variant="contained"
                startIcon={<CodeIcon />}
                onClick={() => exportAsCode('javascript')}
                fullWidth
              >
                Export as JavaScript
              </Button>
              
              <Button
                variant="contained"
                startIcon={<CodeIcon />}
                onClick={() => exportAsCode('python')}
                fullWidth
              >
                Export as Python
              </Button>
              
              <Button
                variant="contained"
                startIcon={<CodeIcon />}
                onClick={() => exportAsCode('java')}
                fullWidth
              >
                Export as Java
              </Button>
            </Stack>

            <Alert severity="info">
              <Typography variant="body2">
                Export the chart configuration as code for different programming languages.
              </Typography>
            </Alert>
          </Stack>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {tabValue === 0 && (
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={exportAsImage}>
            Export Image
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};