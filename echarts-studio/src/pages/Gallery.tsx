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
  IconButton,
  Stack,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useChartStore } from '../store/chartStore';

export const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const { savedCharts, loadChart, deleteChart } = useChartStore();

  const handleEdit = (chartId: string) => {
    loadChart(chartId);
    navigate(`/editor/${chartId}`);
  };

  const handleDelete = (chartId: string) => {
    if (window.confirm('Are you sure you want to delete this chart?')) {
      deleteChart(chartId);
    }
  };

  const handleExport = (chart: any) => {
    const json = JSON.stringify(chart.config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chart.name}.json`;
    a.click();
  };

  if (savedCharts.length === 0) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          My Charts
        </Typography>
        <Alert severity="info">
          <Typography>
            You haven't saved any charts yet. Create your first chart in the editor!
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Charts
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Browse and manage your saved chart configurations
      </Typography>

      <Grid container spacing={3}>
        {savedCharts.map((chart) => (
          <Grid item xs={12} sm={6} md={4} key={chart.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  backgroundColor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  {chart.config.type.toUpperCase()} CHART
                </Typography>
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {chart.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {chart.config.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Series: {chart.config.series.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Updated: {new Date(chart.updatedAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Stack direction="row" spacing={1} sx={{ width: '100%', px: 1 }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(chart.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleExport(chart)}
                  >
                    Export
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(chart.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};