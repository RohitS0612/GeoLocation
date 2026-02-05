import { useRef, useCallback, useState } from 'react';
import { 
  Box, Container, Paper, Alert, CircularProgress, 
  Dialog, DialogTitle, DialogContent, IconButton, Typography 
} from '@mui/material';
import { Close as CloseIcon, Map as MapIcon } from '@mui/icons-material';

import DataTable from './components/DataTable';
import MapView from './components/MapView';
import Filters from './components/Filters';
import { useProjects } from './hooks/useProjects';

function App() {
  const tableRef = useRef(null);
  const { 
    data, loading, error, filters, sortConfig, 
    updateFilters, updateSort, clearFilters, totalCount 
  } = useProjects();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleRowClick = useCallback((id) => {
    setSelectedId(id);
    setDialogOpen(true);
  }, []);

  const handleMarkerClick = useCallback((id) => {
    setSelectedId(id);
    if (tableRef.current) tableRef.current.scrollToRow(id);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa', pb: 4 }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#1976d2', color: 'white', p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <MapIcon />
        <Typography variant="h6" fontWeight="bold">Geo Data Dashboard</Typography>
      </Box>
      
      <Container maxWidth="lg">
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Filters
              filters={filters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
              count={totalCount}
            />
            
            <Paper elevation={3} sx={{ height: 'calc(100vh - 280px)', overflow: 'hidden', borderRadius: 2 }}>
              <DataTable
                ref={tableRef}
                data={data}
                selectedId={selectedId}
                onRowClick={handleRowClick}
                sortConfig={sortConfig}
                onSort={updateSort}
              />
            </Paper>

            <Dialog 
              open={dialogOpen} 
              onClose={() => setDialogOpen(false)}
              maxWidth="lg"
              fullWidth
              PaperProps={{ sx: { height: '85vh', borderRadius: 3 } }}
            >
              <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">Project Location</Typography>
                <IconButton onClick={() => setDialogOpen(false)}><CloseIcon /></IconButton>
              </DialogTitle>
              <DialogContent dividers sx={{ p: 0, height: '100%' }}>
                <MapView
                  data={data}
                  selectedId={selectedId}
                  onMarkerClick={handleMarkerClick}
                />
              </DialogContent>
            </Dialog>
          </>
        )}
      </Container>
    </Box>
  );
}

export default App;
