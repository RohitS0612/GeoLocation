import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchProjects } from '../services/api';

export function useProjects() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    search: '',
    statuses: [],
    dateFrom: null,
    dateTo: null
  });

  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: 'asc'
  });

  useEffect(() => {
    fetchProjects()
      .then(res => {
        setData(res);
        setFilteredData(res);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const applyFiltersAndSort = useCallback((allData, currentFilters, currentSort) => {
    let result = [...allData];

    if (currentFilters.search) {
      const q = currentFilters.search.toLowerCase();
      result = result.filter(item => item.projectName.toLowerCase().includes(q));
    }

    if (currentFilters.statuses?.length > 0) {
      result = result.filter(item => currentFilters.statuses.includes(item.status));
    }

    if (currentFilters.dateFrom) {
      const from = new Date(currentFilters.dateFrom).setHours(0,0,0,0);
      result = result.filter(item => new Date(item.lastUpdated) >= from);
    }

    if (currentFilters.dateTo) {
      const to = new Date(currentFilters.dateTo).setHours(23,59,59,999);
      result = result.filter(item => new Date(item.lastUpdated) <= to);
    }

    if (currentSort.field) {
      result.sort((a, b) => {
        let aVal = a[currentSort.field];
        let bVal = b[currentSort.field];

        if (currentSort.field === 'lastUpdated') {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }

        const modifier = currentSort.direction === 'asc' ? 1 : -1;

        // Handle null/undefined consistently
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return -1 * modifier;
        if (bVal == null) return 1 * modifier;

        // If both values are numeric (or numeric-strings), compare numerically
        const aNum = Number(aVal);
        const bNum = Number(bVal);
        const bothNumbers = !Number.isNaN(aNum) && !Number.isNaN(bNum);
        if (bothNumbers) {
          if (aNum < bNum) return -1 * modifier;
          if (aNum > bNum) return 1 * modifier;
          return 0;
        }

        // Fallback to case-insensitive string comparison
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return -1 * modifier;
        if (aStr > bStr) return 1 * modifier;
        return 0;
      });
    }

    setFilteredData(result);
  }, []);

  const updateFilters = useCallback((updater) => {
    setFilters(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      applyFiltersAndSort(data, next, sortConfig);
      return next;
    });
  }, [data, sortConfig, applyFiltersAndSort]);

  const updateSort = useCallback((field) => {
    setSortConfig(prev => {
      const next = {
        field,
        direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
      };
      applyFiltersAndSort(data, filters, next);
      return next;
    });
  }, [data, filters, applyFiltersAndSort]);

  const clearFilters = useCallback(() => {
    const reset = { search: '', statuses: [], dateFrom: null, dateTo: null };
    setFilters(reset);
    applyFiltersAndSort(data, reset, sortConfig);
  }, [data, sortConfig, applyFiltersAndSort]);

  return {
    data: filteredData,
    loading,
    error,
    filters,
    sortConfig,
    updateFilters,
    updateSort,
    clearFilters,
    totalCount: filteredData.length
  };
}
