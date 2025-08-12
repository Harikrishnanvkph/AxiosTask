import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  ContentCopy as CopyIcon,
  ContentPaste as PasteIcon,
} from '@mui/icons-material';
import { useChartStore } from '../../store/chartStore';
import { useDropzone } from 'react-dropzone';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

export const DataEditor: React.FC = () => {
  const { currentChart, updateChartProperty } = useChartStore();
  const [tabValue, setTabValue] = useState(0);
  const [csvData, setCsvData] = useState('');
  const [jsonData, setJsonData] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDataChange = (seriesIndex: number, dataIndex: number, value: string) => {
    if (!currentChart) return;
    
    const newSeries = [...currentChart.series];
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      newSeries[seriesIndex].data[dataIndex] = 
        typeof newSeries[seriesIndex].data[dataIndex] === 'object'
          ? { ...newSeries[seriesIndex].data[dataIndex], value: numValue }
          : numValue;
      updateChartProperty('series', newSeries);
    }
  };

  const handleCategoryChange = (index: number, value: string) => {
    if (!currentChart?.xAxis) return;
    
    const newData = [...(currentChart.xAxis.data || [])];
    newData[index] = value;
    updateChartProperty('xAxis.data', newData);
  };

  const addDataPoint = (seriesIndex: number) => {
    if (!currentChart) return;
    
    const newSeries = [...currentChart.series];
    const lastValue = newSeries[seriesIndex].data[newSeries[seriesIndex].data.length - 1];
    const newValue = typeof lastValue === 'object' ? { ...lastValue } : lastValue;
    newSeries[seriesIndex].data.push(newValue);
    updateChartProperty('series', newSeries);

    // Add category if needed
    if (currentChart.xAxis?.data) {
      const newCategories = [...currentChart.xAxis.data];
      newCategories.push(`Category ${newCategories.length + 1}`);
      updateChartProperty('xAxis.data', newCategories);
    }
  };

  const removeDataPoint = (seriesIndex: number, dataIndex: number) => {
    if (!currentChart) return;
    
    const newSeries = [...currentChart.series];
    newSeries[seriesIndex].data.splice(dataIndex, 1);
    updateChartProperty('series', newSeries);
  };

  const addSeries = () => {
    if (!currentChart) return;
    
    const newSeries = [...currentChart.series];
    const newSeriesData = currentChart.series[0]?.data.map(() => 
      Math.floor(Math.random() * 100)
    ) || [];
    
    newSeries.push({
      name: `Series ${newSeries.length + 1}`,
      type: currentChart.type,
      data: newSeriesData,
    });
    
    updateChartProperty('series', newSeries);
  };

  const removeSeries = (index: number) => {
    if (!currentChart || currentChart.series.length <= 1) return;
    
    const newSeries = [...currentChart.series];
    newSeries.splice(index, 1);
    updateChartProperty('series', newSeries);
  };

  const handleCSVImport = () => {
    try {
      const lines = csvData.trim().split('\n');
      if (lines.length < 2) {
        alert('Invalid CSV format');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const categories: string[] = [];
      const seriesData: { [key: string]: number[] } = {};

      // Initialize series data
      headers.slice(1).forEach(header => {
        seriesData[header] = [];
      });

      // Parse data rows
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        categories.push(values[0]);
        
        for (let j = 1; j < values.length && j < headers.length; j++) {
          const num = parseFloat(values[j]);
          seriesData[headers[j]].push(isNaN(num) ? 0 : num);
        }
      }

      // Update chart
      const newSeries = Object.keys(seriesData).map(name => ({
        name,
        type: currentChart?.type || 'line',
        data: seriesData[name],
      }));

      updateChartProperty('xAxis.data', categories);
      updateChartProperty('series', newSeries);
      
      alert('CSV data imported successfully!');
      setCsvData('');
    } catch (error) {
      alert('Error importing CSV: ' + error);
    }
  };

  const handleJSONImport = () => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.categories && Array.isArray(data.categories)) {
        updateChartProperty('xAxis.data', data.categories);
      }
      
      if (data.series && Array.isArray(data.series)) {
        updateChartProperty('series', data.series);
      }
      
      alert('JSON data imported successfully!');
      setJsonData('');
    } catch (error) {
      alert('Error importing JSON: ' + error);
    }
  };

  const exportData = (format: 'csv' | 'json') => {
    if (!currentChart) return;

    if (format === 'csv') {
      const categories = currentChart.xAxis?.data || [];
      const headers = ['Category', ...currentChart.series.map(s => s.name)];
      const rows = categories.map((cat, i) => 
        [cat, ...currentChart.series.map(s => {
          const value = s.data[i];
          return typeof value === 'object' ? value.value : value;
        })]
      );
      
      const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chart-data.csv';
      a.click();
    } else {
      const data = {
        categories: currentChart.xAxis?.data || [],
        series: currentChart.series,
      };
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chart-data.json';
      a.click();
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (file.name.endsWith('.csv')) {
        setCsvData(content);
        setTabValue(1);
      } else if (file.name.endsWith('.json')) {
        setJsonData(content);
        setTabValue(2);
      }
    };
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
    },
  });

  if (!currentChart) {
    return <Typography>No chart data available</Typography>;
  }

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
        <Tab label="Manual" />
        <Tab label="Import CSV" />
        <Tab label="Import JSON" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Stack spacing={2}>
          {/* Categories */}
          {currentChart.xAxis?.data && (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Categories (X-Axis)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1}>
                  {currentChart.xAxis.data.map((cat, index) => (
                    <TextField
                      key={index}
                      size="small"
                      value={cat}
                      onChange={(e) => handleCategoryChange(index, e.target.value)}
                      fullWidth
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Series Data */}
          {currentChart.series.map((series, seriesIndex) => (
            <Accordion key={seriesIndex} defaultExpanded={seriesIndex === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Typography>{series.name}</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSeries(seriesIndex);
                    }}
                    disabled={currentChart.series.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {series.data.map((value, dataIndex) => (
                        <TableRow key={dataIndex}>
                          <TableCell>{dataIndex + 1}</TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              value={typeof value === 'object' ? value.value : value}
                              onChange={(e) =>
                                handleDataChange(seriesIndex, dataIndex, e.target.value)
                              }
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => removeDataPoint(seriesIndex, dataIndex)}
                              disabled={series.data.length <= 1}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => addDataPoint(seriesIndex)}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Add Data Point
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}

          <Button startIcon={<AddIcon />} onClick={addSeries} variant="contained">
            Add Series
          </Button>

          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<DownloadIcon />}
              onClick={() => exportData('csv')}
              variant="outlined"
              fullWidth
            >
              Export CSV
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              onClick={() => exportData('json')}
              variant="outlined"
              fullWidth
            >
              Export JSON
            </Button>
          </Stack>
        </Stack>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Stack spacing={2}>
          <Alert severity="info">
            CSV format: First row should be headers (Category, Series1, Series2, ...).
            Each subsequent row should contain the category name and values.
          </Alert>
          
          <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', p: 2, borderRadius: 1 }}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography align="center">Drop the CSV file here...</Typography>
            ) : (
              <Typography align="center">
                Drag & drop a CSV file here, or click to select
              </Typography>
            )}
          </Box>

          <TextField
            multiline
            rows={10}
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            placeholder="Or paste CSV data here..."
            fullWidth
          />
          
          <Button
            variant="contained"
            onClick={handleCSVImport}
            disabled={!csvData}
          >
            Import CSV Data
          </Button>
        </Stack>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Stack spacing={2}>
          <Alert severity="info">
            JSON format: {"{ categories: [...], series: [...] }"}
          </Alert>
          
          <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', p: 2, borderRadius: 1 }}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography align="center">Drop the JSON file here...</Typography>
            ) : (
              <Typography align="center">
                Drag & drop a JSON file here, or click to select
              </Typography>
            )}
          </Box>

          <TextField
            multiline
            rows={10}
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder="Or paste JSON data here..."
            fullWidth
          />
          
          <Button
            variant="contained"
            onClick={handleJSONImport}
            disabled={!jsonData}
          >
            Import JSON Data
          </Button>
        </Stack>
      </TabPanel>
    </Box>
  );
};