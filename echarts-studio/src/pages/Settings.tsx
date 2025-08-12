import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Palette as ThemeIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
  Keyboard as KeyboardIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

export const Settings: React.FC = () => {
  const [settings, setSettings] = React.useState({
    darkMode: false,
    autoSave: true,
    animations: true,
    tooltips: true,
    language: 'en',
    exportQuality: 'high',
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearStorage = () => {
    if (window.confirm('This will clear all saved charts and settings. Are you sure?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Customize your ECharts Studio experience
      </Typography>

      <Stack spacing={3}>
        {/* Appearance */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <ThemeIcon color="primary" />
            <Typography variant="h6">Appearance</Typography>
          </Box>
          <List>
            <ListItem>
              <ListItemText
                primary="Dark Mode"
                secondary="Use dark theme for the application"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={settings.darkMode}
                  onChange={() => handleToggle('darkMode')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Enable Animations"
                secondary="Show animations in charts and UI"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={settings.animations}
                  onChange={() => handleToggle('animations')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Show Tooltips"
                secondary="Display helpful tooltips throughout the app"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={settings.tooltips}
                  onChange={() => handleToggle('tooltips')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>

        {/* Editor */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <StorageIcon color="primary" />
            <Typography variant="h6">Editor</Typography>
          </Box>
          <List>
            <ListItem>
              <ListItemText
                primary="Auto Save"
                secondary="Automatically save changes to local storage"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={settings.autoSave}
                  onChange={() => handleToggle('autoSave')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Export Quality</InputLabel>
                <Select
                  value={settings.exportQuality}
                  label="Export Quality"
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, exportQuality: e.target.value }))
                  }
                >
                  <MenuItem value="low">Low (1x)</MenuItem>
                  <MenuItem value="medium">Medium (2x)</MenuItem>
                  <MenuItem value="high">High (3x)</MenuItem>
                  <MenuItem value="ultra">Ultra (4x)</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Paper>

        {/* Localization */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <LanguageIcon color="primary" />
            <Typography variant="h6">Localization</Typography>
          </Box>
          <List>
            <ListItem>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.language}
                  label="Language"
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, language: e.target.value }))
                  }
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                  <MenuItem value="zh">中文</MenuItem>
                  <MenuItem value="ja">日本語</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Paper>

        {/* Keyboard Shortcuts */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <KeyboardIcon color="primary" />
            <Typography variant="h6">Keyboard Shortcuts</Typography>
          </Box>
          <List dense>
            <ListItem>
              <ListItemText primary="Save Chart" secondary="Ctrl/Cmd + S" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Undo" secondary="Ctrl/Cmd + Z" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Redo" secondary="Ctrl/Cmd + Shift + Z" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Export" secondary="Ctrl/Cmd + E" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Import" secondary="Ctrl/Cmd + I" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Preview Mode" secondary="Ctrl/Cmd + P" />
            </ListItem>
          </List>
        </Paper>

        {/* Storage */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <StorageIcon color="primary" />
            <Typography variant="h6">Storage</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            All data is stored locally in your browser. No data is sent to external servers.
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={clearStorage}
            >
              Clear All Data
            </Button>
            <Button variant="outlined">
              Export All Charts
            </Button>
            <Button variant="outlined">
              Import Charts
            </Button>
          </Stack>
        </Paper>

        {/* About */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            About ECharts Studio
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Version 1.0.0
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            ECharts Studio is a comprehensive web application for creating and customizing
            ECharts visualizations. Built with React, TypeScript, and Material-UI.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            © 2024 ECharts Studio. All rights reserved.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};