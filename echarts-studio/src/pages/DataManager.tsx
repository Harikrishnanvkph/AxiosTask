import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Api as ApiIcon,
  TableChart as TableIcon,
  Code as JsonIcon,
} from '@mui/icons-material';

export const DataManager: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Data Manager
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your data sources and connections
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          Connect to various data sources including CSV files, JSON APIs, databases, and more.
          Data connections are stored locally in your browser.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <UploadIcon color="primary" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h6">File Upload</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upload CSV, JSON, or Excel files
                    </Typography>
                  </Box>
                </Box>
                <Button variant="contained" startIcon={<UploadIcon />}>
                  Upload File
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ApiIcon color="primary" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h6">API Connection</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Connect to REST APIs for live data
                    </Typography>
                  </Box>
                </Box>
                <Button variant="contained" startIcon={<ApiIcon />}>
                  Add API
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TableIcon color="primary" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h6">Database</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Connect to SQL databases
                    </Typography>
                  </Box>
                </Box>
                <Button variant="contained" startIcon={<TableIcon />} disabled>
                  Coming Soon
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <JsonIcon color="primary" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h6">Manual Entry</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enter data manually in the editor
                    </Typography>
                  </Box>
                </Box>
                <Button variant="contained" startIcon={<JsonIcon />}>
                  Open Editor
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Data Sources
        </Typography>
        <Alert severity="info">
          <Typography variant="body2">
            No data sources connected yet. Start by uploading a file or connecting to an API.
          </Typography>
        </Alert>
      </Paper>
    </Box>
  );
};