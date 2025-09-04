import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContentText from '@mui/material/DialogContentText';

import { axiosInstance, API_ENDPOINTS } from 'src/utils/axios-instance';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

type CityProps = {
  id: number;
  name: string;
};

export function CitiesView() {
  const table = useTable();
  const { showSnackbar } = useSnackbar();
  const [cities, setCities] = useState<CityProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingCity, setEditingCity] = useState<CityProps | null>(null);
  const [cityName, setCityName] = useState('');

  // Fetch cities from API
  const fetchCities = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.cities.list);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      showSnackbar('Failed to load cities', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const dataFiltered = cities.filter((city) =>
    city.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const notFound = !dataFiltered.length && !!filterName;

  const handleAddCity = async () => {
    if (cityName.trim()) {
      try {
        const response = await axiosInstance.post(API_ENDPOINTS.cities.create, {
          name: cityName.trim(),
        });
        setCities([...cities, response.data]);
        setCityName('');
        showSnackbar('City added successfully', 'success');
      } catch (error) {
        console.error('Error adding city:', error);
        showSnackbar('Failed to add city', 'error');
      }
    } else {
      showSnackbar('Please enter a city name', 'warning');
    }
  };

  const handleEditCity = (city: CityProps) => {
    setEditingCity(city);
    setCityName(city.name);
    setEditMode(true);
  };

  const handleSaveEdit = async () => {
    if (editingCity && cityName.trim()) {
      try {
        const response = await axiosInstance.put(API_ENDPOINTS.cities.update(editingCity.id), {
          name: cityName.trim(),
        });
        setCities(cities.map(city => 
          city.id === editingCity.id 
            ? response.data
            : city
        ));
        setCityName('');
        setEditMode(false);
        setEditingCity(null);
        showSnackbar('City updated successfully', 'success');
      } catch (error) {
        console.error('Error updating city:', error);
        showSnackbar('Failed to update city', 'error');
      }
    } else if (!cityName.trim()) {
      showSnackbar('Please enter a city name', 'warning');
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(API_ENDPOINTS.cities.delete(deleteId));
        setCities(cities.filter(city => city.id !== deleteId));
        setOpenDialog(false);
        setDeleteId(null);
        showSnackbar('City deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting city:', error);
        showSnackbar('Failed to delete city', 'error');
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Manage Cities
        </Typography>
      </Box>

      {/* Add City Form */}
      <Card sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {editMode ? 'Edit City' : 'Add New City'}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="City Name"
              variant="outlined"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                onClick={editMode ? handleSaveEdit : handleAddCity}
                startIcon={<Iconify icon="mingcute:add-line" />}
                sx={{ backgroundColor: 'black', borderRadius: 1 }}
              >
                {editMode ? 'Save' : 'Add City'}
              </Button>
              {editMode && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditMode(false);
                    setEditingCity(null);
                    setCityName('');
                  }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Cities List */}
      <Card>
        <Box sx={{ p: 3 }}>
          <TextField
            label="Search City"
            variant="outlined"
            fullWidth
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>

                 <Scrollbar>
           <TableContainer sx={{ overflow: 'unset' }}>
             <Table sx={{ minWidth: 800 }}>
               <TableHead>
                 <TableRow>
                   <TableCell>S.No</TableCell>
                   <TableCell>City Name</TableCell>
                   <TableCell>Actions</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {loading ? (
                   <TableRow>
                     <TableCell colSpan={3} sx={{ textAlign: 'center', py: 3 }}>
                       <CircularProgress />
                     </TableCell>
                   </TableRow>
                 ) : (
                   <>
                     {dataFiltered
                       .slice(
                         table.page * table.rowsPerPage,
                         table.page * table.rowsPerPage + table.rowsPerPage
                       )
                       .map((row, index) => (
                         <TableRow key={row.id}>
                           <TableCell>{table.page * table.rowsPerPage + index + 1}</TableCell>
                           <TableCell>{row.name}</TableCell>
                           <TableCell>
                             <IconButton onClick={() => handleEditCity(row)}>
                               <Iconify icon="solar:pen-bold" />
                             </IconButton>
                             <IconButton onClick={() => handleDeleteClick(row.id)}>
                               <Iconify icon="solar:trash-bin-trash-bold" />
                             </IconButton>
                           </TableCell>
                         </TableRow>
                       ))}

                     {notFound && (
                       <TableRow>
                         <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                           No cities found
                         </TableCell>
                       </TableRow>
                     )}
                   </>
                 )}
               </TableBody>
             </Table>
           </TableContainer>
         </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this city?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}

export default CitiesView;
