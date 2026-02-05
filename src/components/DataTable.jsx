import React, { useMemo, useState, forwardRef, useImperativeHandle } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TableSortLabel, Chip, Box, TablePagination, Typography
} from '@mui/material';
import { format } from 'date-fns';

const getStatusColor = (status) => {
  switch (status) {
    case 'Active': return 'success';
    case 'Pending': return 'warning';
    case 'Completed': return 'info';
    case 'On Hold': return 'error';
    default: return 'default';
  }
};

const DataTable = forwardRef(({ data, selectedId, onRowClick, sortConfig, onSort }, ref) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useImperativeHandle(ref, () => ({
    scrollToRow: (id) => {
      const el = document.getElementById(`row-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }));

  const columns = [
    { id: 'projectName', label: 'Project Name', minWidth: 200 },
    { id: 'latitude', label: 'Latitude', align: 'right' },
    { id: 'longitude', label: 'Longitude', align: 'right' },
    { id: 'status', label: 'Status', align: 'center' },
    { id: 'lastUpdated', label: 'Updated', align: 'center' }
  ];

  const paginatedData = useMemo(() => {
    return data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }, [data, page, rowsPerPage]);

  return (
    <Paper sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.id} align={col.align} style={{ fontWeight: 'bold' }}>
                  <TableSortLabel
                    active={sortConfig.field === col.id}
                    direction={sortConfig.field === col.id ? sortConfig.direction : 'asc'}
                    onClick={() => onSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 10 }}>
                  <Typography variant="body1" color="textSecondary">
                    No records found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map(row => (
                <TableRow
                  key={row.id}
                  id={`row-${row.id}`}
                  hover
                  onClick={() => onRowClick(row.id)}
                  selected={row.id === selectedId}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{row.projectName}</TableCell>
                  <TableCell align="right">{row.latitude.toFixed(4)}</TableCell>
                  <TableCell align="right">{row.longitude.toFixed(4)}</TableCell>
                  <TableCell align="center">
                    <Chip label={row.status} size="small" color={getStatusColor(row.status)} />
                  </TableCell>
                  <TableCell align="center">
                    {format(new Date(row.lastUpdated), 'MMM dd, yyyy')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    <Box
  sx={{
    borderTop: '1px solid',
    borderColor: 'divider',
    overflow: 'hidden',
    flexShrink: 0
  }}
>
  <TablePagination
    rowsPerPageOptions={[10, 25, 50, 100]}
    component="div"
    count={data.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={(_, p) => setPage(p)}
    onRowsPerPageChange={(e) => {
      setRowsPerPage(parseInt(e.target.value, 10));
      setPage(0);
    }}
  />
</Box>

    </Paper>
  );
});

export default DataTable;
