import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
  Button,
  Stack,
  Divider,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  Add as AddIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Code as CodeIcon,
  Palette as PaletteIcon,
  DataObject as DataIcon,
  Preview as PreviewIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useChartStore } from '../store/chartStore';
import { ChartPreview } from '../components/ChartPreview/ChartPreview';
import { ChartTypeSelector } from '../components/ChartTypeSelector/ChartTypeSelector';
import { DataEditor } from '../components/DataEditor/DataEditor';
import { StyleEditor } from '../components/StyleEditor/StyleEditor';
import { ConfigEditor } from '../components/ConfigEditor/ConfigEditor';
import { ExportDialog } from '../components/ExportDialog/ExportDialog';
import { ImportDialog } from '../components/ImportDialog/ImportDialog';
import { CodeEditor } from '../components/CodeEditor/CodeEditor';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && <Box sx={{ height: '100%', p: 2 }}>{children}</Box>}
    </div>
  );
}

export const ChartEditor: React.FC = () => {
  const { chartId } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [codeViewOpen, setCodeViewOpen] = useState(false);
  
  const { currentChart, loadChart, isPreviewMode, togglePreviewMode } = useChartStore();

  useEffect(() => {
    if (chartId) {
      loadChart(chartId);
    }
  }, [chartId, loadChart]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const speedDialActions = [
    { icon: <DownloadIcon />, name: 'Export', action: () => setExportOpen(true) },
    { icon: <UploadIcon />, name: 'Import', action: () => setImportOpen(true) },
    { icon: <CodeIcon />, name: 'View Code', action: () => setCodeViewOpen(true) },
    { icon: <PreviewIcon />, name: 'Preview Mode', action: togglePreviewMode },
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 112px)', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ mb: 2, p: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5">
            {currentChart?.name || 'New Chart'}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <ChartTypeSelector />
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant={isPreviewMode ? 'contained' : 'outlined'}
            startIcon={<PreviewIcon />}
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? 'Exit Preview' : 'Preview'}
          </Button>
        </Stack>
      </Paper>

      <Grid container spacing={2} sx={{ flexGrow: 1, height: 'calc(100% - 100px)' }}>
        {/* Left Panel - Configuration */}
        <Grid item xs={12} md={4} sx={{ height: '100%' }}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab icon={<DataIcon />} label="Data" />
              <Tab icon={<PaletteIcon />} label="Style" />
              <Tab icon={<CodeIcon />} label="Config" />
            </Tabs>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <TabPanel value={tabValue} index={0}>
                <DataEditor />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <StyleEditor />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <ConfigEditor />
              </TabPanel>
            </Box>
          </Paper>
        </Grid>

        {/* Right Panel - Preview */}
        <Grid item xs={12} md={8} sx={{ height: '100%' }}>
          <Paper sx={{ height: '100%', p: 2, position: 'relative' }}>
            <ChartPreview />
          </Paper>
        </Grid>
      </Grid>

      {/* Speed Dial for quick actions */}
      <SpeedDial
        ariaLabel="Chart actions"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>

      {/* Dialogs */}
      <ExportDialog open={exportOpen} onClose={() => setExportOpen(false)} />
      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} />
      {codeViewOpen && (
        <CodeEditor open={codeViewOpen} onClose={() => setCodeViewOpen(false)} />
      )}
    </Box>
  );
};