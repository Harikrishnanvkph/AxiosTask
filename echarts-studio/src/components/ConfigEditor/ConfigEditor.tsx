import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Alert, Typography } from '@mui/material';
import { Save as SaveIcon, Restore as RestoreIcon } from '@mui/icons-material';
import Editor from '@monaco-editor/react';
import { useChartStore } from '../../store/chartStore';

export const ConfigEditor: React.FC = () => {
  const { currentChart, setCurrentChart } = useChartStore();
  const [configJson, setConfigJson] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentChart) {
      setConfigJson(JSON.stringify(currentChart, null, 2));
      setError(null);
    }
  }, [currentChart]);

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(configJson);
      setCurrentChart(parsedConfig);
      setError(null);
    } catch (err) {
      setError(`Invalid JSON: ${err}`);
    }
  };

  const handleReset = () => {
    if (currentChart) {
      setConfigJson(JSON.stringify(currentChart, null, 2));
      setError(null);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setConfigJson(value);
      // Validate JSON in real-time
      try {
        JSON.parse(value);
        setError(null);
      } catch (err) {
        setError(`Invalid JSON: ${err}`);
      }
    }
  };

  return (
    <Stack spacing={2} sx={{ height: '100%' }}>
      <Alert severity="info">
        <Typography variant="body2">
          Advanced configuration editor. Edit the raw ECharts configuration JSON directly.
          Be careful with your changes as invalid configurations may break the chart.
        </Typography>
      </Alert>

      {error && (
        <Alert severity="error">
          <Typography variant="body2">{error}</Typography>
        </Alert>
      )}

      <Box sx={{ flexGrow: 1, minHeight: 0, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <Editor
          height="100%"
          defaultLanguage="json"
          value={configJson}
          onChange={handleEditorChange}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </Box>

      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={!!error}
          fullWidth
        >
          Apply Changes
        </Button>
        <Button
          variant="outlined"
          startIcon={<RestoreIcon />}
          onClick={handleReset}
          fullWidth
        >
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};