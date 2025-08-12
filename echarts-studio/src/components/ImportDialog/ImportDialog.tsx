import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
  Typography,
  Box,
} from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useChartStore } from '../../store/chartStore';
import { ChartConfig } from '../../types/chart.types';

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ImportDialog: React.FC<ImportDialogProps> = ({ open, onClose }) => {
  const { setCurrentChart } = useChartStore();
  const [jsonContent, setJsonContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleImport = () => {
    try {
      const config: ChartConfig = JSON.parse(jsonContent);
      
      // Validate basic structure
      if (!config.type || !config.series) {
        throw new Error('Invalid chart configuration: missing required fields');
      }
      
      setCurrentChart(config);
      onClose();
      setJsonContent('');
      setError(null);
    } catch (err) {
      setError(`Import failed: ${err}`);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setJsonContent(content);
      setError(null);
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    multiple: false,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Import Chart Configuration</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Alert severity="info">
            <Typography variant="body2">
              Import a previously exported chart configuration in JSON format.
              The file should contain a valid ECharts configuration object.
            </Typography>
          </Alert>

          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.400',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
              transition: 'all 0.3s',
            }}
          >
            <input {...getInputProps()} />
            <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            {isDragActive ? (
              <Typography>Drop the JSON file here...</Typography>
            ) : (
              <Stack spacing={1}>
                <Typography>Drag & drop a JSON file here</Typography>
                <Typography variant="body2" color="text.secondary">
                  or click to select a file
                </Typography>
              </Stack>
            )}
          </Box>

          <TextField
            multiline
            rows={10}
            value={jsonContent}
            onChange={(e) => {
              setJsonContent(e.target.value);
              setError(null);
            }}
            placeholder="Or paste your JSON configuration here..."
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiInputBase-root': {
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              },
            }}
          />

          {error && (
            <Alert severity="error">
              <Typography variant="body2">{error}</Typography>
            </Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={handleImport}
          disabled={!jsonContent || !!error}
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};