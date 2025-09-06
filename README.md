# AnalyFlow - Advanced Analytics Dashboard

A modern, responsive analytics dashboard built with React, Vite, and Tailwind CSS. Features real-time data visualization, interactive charts, and a comprehensive activity feed.

![Analytics Dashboard](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.1-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Features

### Core Analytics
- **Real-time Metrics**: Track users, revenue, conversion rates, and sessions
- **Interactive Charts**: Area charts, bar charts, and pie charts with Recharts
- **Data Tables**: Sortable tables with trend indicators
- **Activity Feed**: Live notifications and system updates

### User Experience
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark Theme**: Modern dark UI with gradient backgrounds
- **Smooth Animations**: Hover effects and transitions
- **Accessible**: WCAG compliant with proper ARIA labels

### Technical Features
- **Modern React**: Hooks-based architecture with functional components
- **Performance Optimized**: Code splitting and lazy loading ready
- **Production Ready**: Docker containerization and CI/CD workflows
- **Type Safe**: Ready for TypeScript migration

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0, Vite 5.4.1
- **Styling**: Tailwind CSS 3.4.11
- **Charts**: Recharts 2.8.0
- **Icons**: Lucide React 0.263.1
- **Build**: Vite with optimized production builds
- **Deployment**: Docker, Vercel, GitHub Actions

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/vistara-apps/this-is-a-6144.git
cd this-is-a-6144

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment

```bash
# Build Docker image
docker build -t analyflow .

# Run container
docker run -p 3000:3000 analyflow
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── ActivityFeed.jsx # Real-time activity notifications
│   ├── ChartCard.jsx    # Reusable chart component
│   ├── Dashboard.jsx    # Main dashboard layout
│   ├── DataTable.jsx    # Data table with sorting
│   ├── MetricsCard.jsx  # KPI metric cards
│   └── Sidebar.jsx      # Navigation sidebar
├── App.jsx              # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and utilities
```

## 🎨 Component Architecture

### Dashboard Layout
- **Responsive Grid**: Adapts from mobile to desktop
- **Modular Cards**: Reusable metric and chart components
- **Flexible Sidebar**: Collapsible navigation with mobile overlay

### Data Visualization
- **Chart Types**: Area, Bar, and Pie charts
- **Interactive Elements**: Tooltips, hover effects, legends
- **Responsive Charts**: Automatically resize with container

### Activity System
- **Real-time Updates**: Live activity feed with timestamps
- **Categorized Events**: User actions, system alerts, metrics
- **Dismissible Items**: User can manage notifications

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific settings:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=AnalyFlow
VITE_VERSION=1.0.0
```

### Tailwind Customization
The `tailwind.config.js` includes custom color schemes and utilities:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* Custom blue palette */ },
      purple: { /* Custom purple palette */ }
    }
  }
}
```

## 📊 Data Integration

### Mock Data Structure
Currently uses static mock data. Ready for API integration:

```javascript
// Metrics data structure
{
  title: "Total Users",
  value: "24,567",
  change: "+12.5%",
  trend: "up",
  color: "blue"
}

// Chart data structure
{
  name: "Mon",
  value: 4000
}
```

### API Integration Ready
Components are designed for easy API integration:
- Prop-based data passing
- Loading states ready
- Error handling prepared

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker Production
```bash
# Build optimized image
docker build -t analyflow:prod .

# Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production analyflow:prod
```

### GitHub Actions
Automated deployment workflows included:
- `deploy.yml`: General deployment pipeline
- `vercel-deploy.yml`: Vercel-specific deployment

## 🧪 Testing & Quality

### Code Quality
- ESLint configuration ready
- Prettier formatting setup
- Component prop validation

### Performance
- Vite's fast HMR in development
- Optimized production builds
- Code splitting ready
- Asset optimization

## 🔮 Roadmap

### Phase 1 - Core Features ✅
- [x] Responsive dashboard layout
- [x] Interactive charts and metrics
- [x] Activity feed system
- [x] Dark theme implementation

### Phase 2 - Enhanced Features
- [ ] User authentication system
- [ ] Real-time data connections
- [ ] Advanced filtering and search
- [ ] Export functionality

### Phase 3 - Advanced Analytics
- [ ] Custom dashboard builder
- [ ] Advanced chart types
- [ ] Data comparison tools
- [ ] Automated reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Recharts](https://recharts.org/) for excellent chart components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for lightning-fast development

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review existing discussions

---

**Built with ❤️ using React and modern web technologies**
