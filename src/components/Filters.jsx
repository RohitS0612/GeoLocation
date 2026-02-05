import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Paper, TextField, Select, MenuItem, FormControl,
  InputLabel, Button, Box, Chip, OutlinedInput, Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { getStatuses } from '../services/api';

function Filters({ filters, onFiltersChange, onClearFilters, count }) {
  const [search, setSearch] = useState(filters.search || '');
  const statuses = useMemo(() => getStatuses(), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== filters.search) {
        onFiltersChange(prev => ({ ...prev, search }));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleStatusChange = (e) => {
    const val = e.target.value;
    onFiltersChange(prev => ({
      ...prev,
      statuses: typeof val === 'string' ? val.split(',') : val
    }));
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={0} sx={{ p: 2, mb: 2, border: '1px solid #eee', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField
            label="Search projects..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 2, minWidth: 200 }}
          />
          
          <FormControl size="small" sx={{ flex: 1, minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              multiple
              value={filters.statuses || []}
              onChange={handleStatusChange}
              input={<OutlinedInput label="Status" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((v) => <Chip key={v} label={v} size="small" />)}
                </Box>
              )}
            >
              {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>

          <DatePicker
            label="From"
            value={filters.dateFrom ? dayjs(filters.dateFrom) : null}
            onChange={(d) => onFiltersChange(p => ({ ...p, dateFrom: d ? d.format('YYYY-MM-DD') : null }))}
            slotProps={{ textField: { size: 'small', sx: { flex: 1 } } }}
          />

          <DatePicker
            label="To"
            value={filters.dateTo ? dayjs(filters.dateTo) : null}
            onChange={(d) => onFiltersChange(p => ({ ...p, dateTo: d ? d.format('YYYY-MM-DD') : null }))}
            slotProps={{ textField: { size: 'small', sx: { flex: 1 } } }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Found <b>{count.toLocaleString()}</b> results
          </Typography>
          
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => { setSearch(''); onClearFilters(); }}
          >
            Clear
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}

export default Filters;
