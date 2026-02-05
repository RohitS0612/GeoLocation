# 🌍 Geo Data Dashboard

A high-performance React application for visualizing large-scale spatial datasets. This project is built with a focus on simplicity, readability, and a professional human-written code structure.

## 🚀 Key Features

### 🏢 Diverse Data Categories
Unlike generic dashboards, this app features realistic data across multiple sectors:
- **Education**: Schools, Libraries, and Digital Hubs
- **Healthcare**: Wellness Centers, Hospitals, and Research Labs
- **Infrastructure**: Bridges, Smart Highways, and Power Plants
- **Environment**: Preservation areas, Solar Parks, and Sanctuaries
- **Technology**: AI Centers, Cyber Labs, and Incubators

### 🗺️ Satellite Map Integration
- **High-Res Imagery**: Uses Esri World Imagery for a stunning professional look.
- **Marker Clustering**: Efficiently renders 5,000+ points by grouping them dynamically.
- **Interactive Projections**: Click any table row to open a **Map Dialog** that zooms directly to the project location.

### ⚡ Performance Optimized
- **Virtualization & Pagination**: Handles 5,000+ records without any scrolling lag.
- **Debounced Search**: Responsive search filter that doesn't trigger on every single keystroke.
- **Canvas Rendering**: Map markers are rendered on a high-speed canvas layer.

## 🏗️ Simplified Project Structure

The codebase is designed to be extremely readable and easy for developers to follow:

```
src/
 ├── components/
 │    ├── DataTable.jsx  - Sortable/Paginated table with empty state handling.
 │    ├── MapView.jsx    - Leaflet cluster map with satellite view.
 │    ├── Filters.jsx    - Clean two-row filter panel (Search, Status, Dates).
 ├── hooks/
 │    ├── useProjects.js - Consolidated filtering and sorting logic.
 ├── services/
 │    ├── api.js         - Simplified data generation and mock API logic.
 ├── App.jsx             - Main entry point and Dashboard orchestration.
```

## 🛠️ Technology Stack
- **React 19** + **Vite** (Fast modern development)
- **Material UI** (Professional component library)
- **Leaflet** + **React-Leaflet-Cluster** (High-performance mapping)
- **Day.js** (Lightweight date handling)

## 📦 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🎯 Usage
- **Filter**: Use the search bar for text, or the dropdowns for specific sectors/statuses.
- **View Location**: Click on any table row to instantly see the project on the map in a centered dialog.
- **Sync**: Clicking a map marker will scroll the table to that specific project's row.

---
# GeoLocation
