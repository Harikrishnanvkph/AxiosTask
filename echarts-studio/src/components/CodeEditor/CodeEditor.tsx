import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, ContentCopy as CopyIcon } from '@mui/icons-material';
import Editor from '@monaco-editor/react';
import { useChartStore } from '../../store/chartStore';

interface CodeEditorProps {
  open: boolean;
  onClose: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ open, onClose }) => {
  const { currentChart } = useChartStore();

  const getCode = () => {
    if (!currentChart) return '';

    return `// ECharts Configuration
const option = ${JSON.stringify(currentChart, null, 2)};

// Initialize chart
const chartDom = document.getElementById('chart');
const myChart = echarts.init(chartDom);
myChart.setOption(option);

// Make chart responsive
window.addEventListener('resize', function() {
    myChart.resize();
});`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Chart Code
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ height: '60vh' }}>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={getCode()}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<CopyIcon />} onClick={handleCopy}>
          Copy Code
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};