import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FormatColorFill as ColorIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';
import { ChromePicker, ColorResult } from 'react-color';
import { useChartStore } from '../../store/chartStore';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Box>
      <Typography variant="body2" gutterBottom>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: value || '#ffffff',
            border: '1px solid #ccc',
            borderRadius: 1,
            cursor: 'pointer',
          }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <TextField
          size="small"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          fullWidth
        />
      </Box>
      {showPicker && (
        <Box sx={{ position: 'absolute', zIndex: 2, mt: 1 }}>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            onClick={() => setShowPicker(false)}
          />
          <ChromePicker
            color={value || '#ffffff'}
            onChange={(color: ColorResult) => onChange(color.hex)}
          />
        </Box>
      )}
    </Box>
  );
};

export const StyleEditor: React.FC = () => {
  const { currentChart, updateChartProperty } = useChartStore();

  if (!currentChart) {
    return <Typography>No chart available</Typography>;
  }

  const themes = [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Dark' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'westeros', label: 'Westeros' },
    { value: 'essos', label: 'Essos' },
    { value: 'wonderland', label: 'Wonderland' },
    { value: 'walden', label: 'Walden' },
    { value: 'chalk', label: 'Chalk' },
    { value: 'infographic', label: 'Infographic' },
    { value: 'macarons', label: 'Macarons' },
    { value: 'roma', label: 'Roma' },
    { value: 'shine', label: 'Shine' },
    { value: 'purple-passion', label: 'Purple Passion' },
  ];

  const defaultColors = [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ];

  return (
    <Stack spacing={2}>
      {/* Title Styling */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Title & Subtitle</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <TextField
              label="Title Text"
              size="small"
              value={currentChart.title?.text || ''}
              onChange={(e) => updateChartProperty('title.text', e.target.value)}
              fullWidth
            />
            <TextField
              label="Subtitle Text"
              size="small"
              value={currentChart.title?.subtext || ''}
              onChange={(e) => updateChartProperty('title.subtext', e.target.value)}
              fullWidth
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Title Position</InputLabel>
              <Select
                value={currentChart.title?.left || 'center'}
                label="Title Position"
                onChange={(e) => updateChartProperty('title.left', e.target.value)}
              >
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="center">Center</MenuItem>
                <MenuItem value="right">Right</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Title Font Size"
              type="number"
              size="small"
              value={currentChart.title?.textStyle?.fontSize || 18}
              onChange={(e) =>
                updateChartProperty('title.textStyle.fontSize', parseInt(e.target.value))
              }
              fullWidth
            />
            <ColorPicker
              label="Title Color"
              value={currentChart.title?.textStyle?.color || '#333'}
              onChange={(color) => updateChartProperty('title.textStyle.color', color)}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Colors */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Color Palette</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Typography variant="body2">Chart Colors</Typography>
            {(currentChart.color || defaultColors).map((color, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 60 }}>
                  Color {index + 1}
                </Typography>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: color,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                  }}
                />
                <TextField
                  size="small"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...(currentChart.color || defaultColors)];
                    newColors[index] = e.target.value;
                    updateChartProperty('color', newColors);
                  }}
                  fullWidth
                />
              </Box>
            ))}
            <Button
              startIcon={<PaletteIcon />}
              onClick={() => {
                const newColors = [...(currentChart.color || defaultColors), '#000000'];
                updateChartProperty('color', newColors);
              }}
            >
              Add Color
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Background */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Background</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <ColorPicker
              label="Background Color"
              value={currentChart.backgroundColor || '#ffffff'}
              onChange={(color) => updateChartProperty('backgroundColor', color)}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={currentChart.backgroundColor === 'transparent'}
                  onChange={(e) =>
                    updateChartProperty(
                      'backgroundColor',
                      e.target.checked ? 'transparent' : '#ffffff'
                    )
                  }
                />
              }
              label="Transparent Background"
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Grid */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Grid & Layout</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Typography variant="body2">Grid Padding</Typography>
            <TextField
              label="Left"
              size="small"
              value={currentChart.grid?.left || '10%'}
              onChange={(e) => updateChartProperty('grid.left', e.target.value)}
              fullWidth
            />
            <TextField
              label="Right"
              size="small"
              value={currentChart.grid?.right || '10%'}
              onChange={(e) => updateChartProperty('grid.right', e.target.value)}
              fullWidth
            />
            <TextField
              label="Top"
              size="small"
              value={currentChart.grid?.top || '60'}
              onChange={(e) => updateChartProperty('grid.top', e.target.value)}
              fullWidth
            />
            <TextField
              label="Bottom"
              size="small"
              value={currentChart.grid?.bottom || '60'}
              onChange={(e) => updateChartProperty('grid.bottom', e.target.value)}
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch
                  checked={currentChart.grid?.containLabel !== false}
                  onChange={(e) =>
                    updateChartProperty('grid.containLabel', e.target.checked)
                  }
                />
              }
              label="Contain Labels"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={currentChart.grid?.show === true}
                  onChange={(e) => updateChartProperty('grid.show', e.target.checked)}
                />
              }
              label="Show Grid"
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Legend */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Legend</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={currentChart.legend?.show !== false}
                  onChange={(e) => updateChartProperty('legend.show', e.target.checked)}
                />
              }
              label="Show Legend"
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Legend Type</InputLabel>
              <Select
                value={currentChart.legend?.type || 'plain'}
                label="Legend Type"
                onChange={(e) => updateChartProperty('legend.type', e.target.value)}
              >
                <MenuItem value="plain">Plain</MenuItem>
                <MenuItem value="scroll">Scroll</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Legend Position</InputLabel>
              <Select
                value={currentChart.legend?.orient || 'horizontal'}
                label="Legend Position"
                onChange={(e) => updateChartProperty('legend.orient', e.target.value)}
              >
                <MenuItem value="horizontal">Horizontal</MenuItem>
                <MenuItem value="vertical">Vertical</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Legend Align</InputLabel>
              <Select
                value={currentChart.legend?.left || 'center'}
                label="Legend Align"
                onChange={(e) => updateChartProperty('legend.left', e.target.value)}
              >
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="center">Center</MenuItem>
                <MenuItem value="right">Right</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Legend Top Position"
              size="small"
              value={currentChart.legend?.top || 'auto'}
              onChange={(e) => updateChartProperty('legend.top', e.target.value)}
              fullWidth
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Tooltip */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Tooltip</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={currentChart.tooltip?.show !== false}
                  onChange={(e) => updateChartProperty('tooltip.show', e.target.checked)}
                />
              }
              label="Show Tooltip"
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Trigger Type</InputLabel>
              <Select
                value={currentChart.tooltip?.trigger || 'item'}
                label="Trigger Type"
                onChange={(e) => updateChartProperty('tooltip.trigger', e.target.value)}
              >
                <MenuItem value="item">Item</MenuItem>
                <MenuItem value="axis">Axis</MenuItem>
                <MenuItem value="none">None</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Axis Pointer Type</InputLabel>
              <Select
                value={currentChart.tooltip?.axisPointer?.type || 'line'}
                label="Axis Pointer Type"
                onChange={(e) =>
                  updateChartProperty('tooltip.axisPointer.type', e.target.value)
                }
              >
                <MenuItem value="line">Line</MenuItem>
                <MenuItem value="shadow">Shadow</MenuItem>
                <MenuItem value="cross">Cross</MenuItem>
                <MenuItem value="none">None</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Animation */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Animation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={currentChart.animation !== false}
                  onChange={(e) => updateChartProperty('animation', e.target.checked)}
                />
              }
              label="Enable Animation"
            />
            <Typography variant="body2">Animation Duration (ms)</Typography>
            <Slider
              value={currentChart.animationDuration || 1000}
              onChange={(e, value) =>
                updateChartProperty('animationDuration', value as number)
              }
              min={0}
              max={5000}
              step={100}
              valueLabelDisplay="auto"
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Animation Easing</InputLabel>
              <Select
                value={currentChart.animationEasing || 'cubicOut'}
                label="Animation Easing"
                onChange={(e) => updateChartProperty('animationEasing', e.target.value)}
              >
                <MenuItem value="linear">Linear</MenuItem>
                <MenuItem value="cubicIn">Cubic In</MenuItem>
                <MenuItem value="cubicOut">Cubic Out</MenuItem>
                <MenuItem value="cubicInOut">Cubic In Out</MenuItem>
                <MenuItem value="elasticIn">Elastic In</MenuItem>
                <MenuItem value="elasticOut">Elastic Out</MenuItem>
                <MenuItem value="elasticInOut">Elastic In Out</MenuItem>
                <MenuItem value="backIn">Back In</MenuItem>
                <MenuItem value="backOut">Back Out</MenuItem>
                <MenuItem value="backInOut">Back In Out</MenuItem>
                <MenuItem value="bounceIn">Bounce In</MenuItem>
                <MenuItem value="bounceOut">Bounce Out</MenuItem>
                <MenuItem value="bounceInOut">Bounce In Out</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Series Styling */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Series Styling</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            {currentChart.series.map((series, index) => (
              <Box key={index}>
                <Typography variant="subtitle2" gutterBottom>
                  {series.name}
                </Typography>
                <Stack spacing={1}>
                  {['line', 'area'].includes(currentChart.type) && (
                    <>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={series.smooth === true}
                            onChange={(e) => {
                              const newSeries = [...currentChart.series];
                              newSeries[index].smooth = e.target.checked;
                              updateChartProperty('series', newSeries);
                            }}
                          />
                        }
                        label="Smooth Line"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={series.showSymbol !== false}
                            onChange={(e) => {
                              const newSeries = [...currentChart.series];
                              newSeries[index].showSymbol = e.target.checked;
                              updateChartProperty('series', newSeries);
                            }}
                          />
                        }
                        label="Show Symbols"
                      />
                      <TextField
                        label="Line Width"
                        type="number"
                        size="small"
                        value={series.lineStyle?.width || 2}
                        onChange={(e) => {
                          const newSeries = [...currentChart.series];
                          if (!newSeries[index].lineStyle) {
                            newSeries[index].lineStyle = {};
                          }
                          newSeries[index].lineStyle.width = parseInt(e.target.value);
                          updateChartProperty('series', newSeries);
                        }}
                        fullWidth
                      />
                    </>
                  )}
                  {currentChart.type === 'bar' && (
                    <>
                      <TextField
                        label="Bar Width (%)"
                        size="small"
                        value={series.barWidth || '60%'}
                        onChange={(e) => {
                          const newSeries = [...currentChart.series];
                          newSeries[index].barWidth = e.target.value;
                          updateChartProperty('series', newSeries);
                        }}
                        fullWidth
                      />
                      <TextField
                        label="Bar Gap (%)"
                        size="small"
                        value={series.barGap || '30%'}
                        onChange={(e) => {
                          const newSeries = [...currentChart.series];
                          newSeries[index].barGap = e.target.value;
                          updateChartProperty('series', newSeries);
                        }}
                        fullWidth
                      />
                    </>
                  )}
                </Stack>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};