# ECharts Studio

A comprehensive web application for creating, customizing, and editing ECharts visualizations with an intuitive interface and powerful features.

![ECharts Studio](https://img.shields.io/badge/ECharts-Studio-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6)
![Material-UI](https://img.shields.io/badge/MUI-6.3-007FFF)

## 🚀 Features

### Chart Creation & Editing
- **15+ Chart Types**: Line, Bar, Pie, Scatter, Radar, Heatmap, Treemap, Sunburst, Funnel, Gauge, Candlestick, Boxplot, Sankey, Graph, and Parallel charts
- **Real-time Preview**: See changes instantly as you edit
- **Visual Editor**: User-friendly interface for customizing every aspect of your charts
- **Code Editor**: Advanced users can directly edit the ECharts configuration JSON

### Data Management
- **Multiple Input Methods**: 
  - Manual data entry with table interface
  - CSV file import with drag-and-drop
  - JSON data import
  - API integration support
- **Data Export**: Export your data as CSV or JSON
- **Dynamic Data**: Add, edit, and remove data points and series on the fly

### Customization Options
- **Styling**: 
  - Complete control over colors, fonts, and sizes
  - Pre-defined color palettes
  - Background customization
  - Animation settings
- **Layout**: 
  - Grid configuration
  - Legend positioning
  - Title and subtitle styling
  - Tooltip customization
- **Series-specific Options**: 
  - Line smoothing and symbols
  - Bar width and gap
  - Pie chart radius and labels

### Export & Import
- **Export Formats**:
  - PNG images (with customizable resolution)
  - SVG vector graphics
  - HTML standalone pages
  - JSON configuration
  - JavaScript, Python, and Java code generation
- **Import Options**:
  - Load previously saved configurations
  - Import from JSON files
  - Use pre-built templates

### Templates & Gallery
- **Pre-built Templates**: Start quickly with professional chart templates for various use cases
- **Personal Gallery**: Save and manage your chart configurations
- **Categories**: Business, Analytics, Statistics, HR templates

### Accessibility & UX
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + S`: Save chart
  - `Ctrl/Cmd + Z`: Undo
  - `Ctrl/Cmd + Shift + Z`: Redo
  - `Ctrl/Cmd + E`: Export
  - `Ctrl/Cmd + I`: Import
- **Responsive Design**: Works on desktop and tablet devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Tooltips**: Helpful hints throughout the interface
- **Undo/Redo**: Full history support for all changes

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **UI Components**: Material-UI (MUI) v6
- **Charts**: Apache ECharts 5.5
- **State Management**: Zustand
- **Code Editor**: Monaco Editor
- **Routing**: React Router v6
- **Build Tool**: Create React App
- **Styling**: Emotion CSS-in-JS

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/echarts-studio.git
cd echarts-studio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
echarts-studio/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ChartPreview/    # Chart rendering component
│   │   ├── DataEditor/      # Data input and editing
│   │   ├── StyleEditor/     # Visual styling controls
│   │   ├── ConfigEditor/    # JSON configuration editor
│   │   ├── ExportDialog/    # Export functionality
│   │   └── ...
│   ├── pages/               # Main application pages
│   │   ├── ChartEditor.tsx  # Main editor page
│   │   ├── Gallery.tsx      # Saved charts gallery
│   │   ├── Templates.tsx    # Template library
│   │   └── ...
│   ├── store/               # State management
│   │   └── chartStore.ts    # Zustand store
│   ├── types/               # TypeScript definitions
│   └── App.tsx              # Main application component
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## 🎯 Usage Guide

### Creating a New Chart

1. **Select Chart Type**: Choose from 15+ chart types using the dropdown selector
2. **Input Data**: 
   - Use the Data tab to manually enter values
   - Import CSV or JSON files
   - Connect to an API endpoint
3. **Customize Appearance**: 
   - Switch to the Style tab for visual customization
   - Adjust colors, fonts, animations, and layout
4. **Preview**: View your chart in real-time as you make changes
5. **Save**: Click the save button or press `Ctrl/Cmd + S`

### Using Templates

1. Navigate to the Templates page from the sidebar
2. Browse available templates by category
3. Click "Use Template" to start with a pre-configured chart
4. Customize the template to match your needs

### Exporting Charts

1. Click the Export button or use the Speed Dial menu
2. Choose your export format:
   - **Image**: PNG or SVG with customizable dimensions
   - **Data**: JSON configuration or HTML standalone page
   - **Code**: JavaScript, Python, or Java implementation
3. Configure export settings (resolution, file name, etc.)
4. Click Export to download

### Managing Saved Charts

1. Visit the Gallery page to see all saved charts
2. Edit, export, or delete charts from the gallery
3. Charts are automatically saved to browser local storage

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_VERSION=1.0.0
```

### Build Configuration

For production build:

```bash
npm run build
```

The build folder will contain optimized static files ready for deployment.

## 🧪 Testing

Run the test suite:

```bash
npm test
```

For coverage report:

```bash
npm test -- --coverage
```

## 🚢 Deployment

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

### Deploy to Vercel

```bash
vercel
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify

## 📝 API Reference

### Chart Store Methods

```typescript
// Get current chart configuration
const { currentChart } = useChartStore();

// Update chart property
updateChartProperty('title.text', 'New Title');

// Save chart
saveChart();

// Load chart by ID
loadChart(chartId);

// Change chart type
changeChartType('bar');

// Undo/Redo
undo();
redo();
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Apache ECharts](https://echarts.apache.org/) for the powerful charting library
- [Material-UI](https://mui.com/) for the beautiful React components
- [Create React App](https://create-react-app.dev/) for the project setup
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editing capabilities

## 📧 Contact

For questions, suggestions, or support, please open an issue on GitHub.

---

Built with ❤️ using React and ECharts
