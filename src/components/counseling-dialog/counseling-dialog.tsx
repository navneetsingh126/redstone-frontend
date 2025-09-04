import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface CounselingDialogProps {
  open: boolean;
  onClose: () => void;
}

const coachingOptions = [
  'Yes, I need coaching',
  'No, I don\'t need coaching',
  'Maybe, I\'m not sure'
];

const loanOptions = [
  'Yes, I need an education loan',
  'No, I don\'t need a loan',
  'Maybe, I\'m considering it'
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
];

const offices = [
  'Mumbai Central', 'Delhi Central', 'Bangalore Central', 'Hyderabad Central', 'Chennai Central'
];

const destinations = [
  'Dubai, UAE', 'Singapore', 'Melbourne, Australia', 'London, UK', 'New York, USA', 'Toronto, Canada'
];

export function CounselingDialog({ open, onClose }: CounselingDialogProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    lookingForCoaching: '',
    lookingForLoan: '',
    city: '',
    nearestOffice: '',
    preferredDestination: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Counseling form submitted:', formData);
    // Here you would typically send the data to your backend
    onClose();
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      mobileNumber: '',
      lookingForCoaching: '',
      lookingForLoan: '',
      city: '',
      nearestOffice: '',
      preferredDestination: ''
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }
      }}
    >
      <DialogTitle sx={{
        textAlign: 'center',
        pb: 1,
        position: 'relative'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Book Free Counselling
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary'
          }}
        >
          <Iconify icon="solar:close-circle-bold" />
        </IconButton>
      </DialogTitle>

      <DialogContent >
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name *"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Email *"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Mobile Number *"
              value={formData.mobileNumber}
              onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mr: 1,
                    color: 'text.secondary'
                  }}>
                    <Typography variant="body2" sx={{ mr: 0.5 }}>🇮🇳</Typography>
                    <Typography variant="body2">+91</Typography>
                  </Box>
                )
              }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Looking for Coaching? *</InputLabel>
              <Select
                value={formData.lookingForCoaching}
                label="Looking for Coaching? *"
                onChange={(e) => handleInputChange('lookingForCoaching', e.target.value)}
              >
                {coachingOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Looking for Education Loan? *</InputLabel>
              <Select
                value={formData.lookingForLoan}
                label="Looking for Education Loan? *"
                onChange={(e) => handleInputChange('lookingForLoan', e.target.value)}
              >
                {loanOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Your City *</InputLabel>
              <Select
                value={formData.city}
                label="Your City *"
                onChange={(e) => handleInputChange('city', e.target.value)}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Nearest Office *</InputLabel>
              <Select
                value={formData.nearestOffice}
                label="Nearest Office *"
                onChange={(e) => handleInputChange('nearestOffice', e.target.value)}
              >
                {offices.map((office) => (
                  <MenuItem key={office} value={office}>
                    {office}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Preferred Destination *</InputLabel>
              <Select
                value={formData.preferredDestination}
                label="Preferred Destination *"
                onChange={(e) => handleInputChange('preferredDestination', e.target.value)}
              >
                {destinations.map((destination) => (
                  <MenuItem key={destination} value={destination}>
                    {destination}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{
        justifyContent: 'center',
        pb: 3,
        px: 3
      }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CounselingDialog;
