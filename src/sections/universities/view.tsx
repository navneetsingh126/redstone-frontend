import { useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { CounselingDialog } from 'src/components/counseling-dialog';

// ----------------------------------------------------------------------

const universities = [
  {
    id: 1,
    name: 'University of Dubai',
    location: 'Dubai, UAE',
    type: 'Public',
    ranking: 'Top 500 Global',
    rating: 4.5,
    tuitionFee: '45,000 AED',
    programs: ['Business', 'Engineering', 'Computer Science'],
    description: 'A leading university in the UAE offering world-class education.',
  },
  {
    id: 2,
    name: 'Heriot-Watt University Dubai',
    location: 'Dubai, UAE',
    type: 'Private',
    ranking: 'Top 300 Global',
    rating: 4.7,
    tuitionFee: '55,000 AED',
    programs: ['Business Administration', 'Engineering', 'Design'],
    description: 'A prestigious UK university with a campus in Dubai.',
  },
  {
    id: 3,
    name: 'Middlesex University Dubai',
    location: 'Dubai, UAE',
    type: 'Private',
    ranking: 'Top 600 Global',
    rating: 4.3,
    tuitionFee: '48,000 AED',
    programs: ['Media Studies', 'Business', 'Law'],
    description: 'A modern university focusing on practical skills.',
  }
];

export function UniversitiesView() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [counselingDialogOpen, setCounselingDialogOpen] = useState(false);

  const filteredUniversities = useMemo(
    () =>
      universities.filter(university => {
        const matchesSearch = university.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || university.type === selectedType;
        return matchesSearch && matchesType;
      }),
    [searchTerm, selectedType]
  );
  

  const handleViewMore = () => {
    router.push('/study-destinations');
  };

  const handleCounselingClick = () => {
    setCounselingDialogOpen(true);
  };

  return (
    <>
      {/* Header with Visual */}
      <Box sx={{ 
        mb: 6, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        py: 6,
        px: 3,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="20" cy="20" r="1"/%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            List of Top Universities in Dubai
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            Choose a university that fuels your passion & purpose.
          </Typography>
          
          {/* Decorative Icon */}
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            mb: 2
          }}>
            <Iconify icon="solar:pen-bold" sx={{ fontSize: 40, color: 'white' }} />
          </Box>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="Search Universities"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>University Type</InputLabel>
                <Select
                  value={selectedType}
                  label="University Type"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <MenuItem value="All">All Types</MenuItem>
                  <MenuItem value="Public">Public</MenuItem>
                  <MenuItem value="Private">Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          {filteredUniversities.map((university) => (
            <Grid key={university.id} size={{ xs: 12, lg: 6 }}>
              <Card>
                {/* University Image Header */}
                <Box
                  sx={{
                    height: 180,
                    background: `linear-gradient(135deg, ${university.id === 1 ? '#667eea' : university.id === 2 ? '#f093fb' : '#4facfe'}, ${university.id === 1 ? '#764ba2' : university.id === 2 ? '#f5576c' : '#00f2fe'})`,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* University Icon */}
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Iconify 
                      icon={university.id === 1 ? "solar:home-angle-bold-duotone" : university.id === 2 ? "solar:globe-bold" : "solar:pen-bold"} 
                      sx={{ fontSize: 30 }} 
                    />
                  </Box>
                  
                  {/* Decorative Elements */}
                  <Box sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                  }} />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    width: 25,
                    height: 25,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                  }} />
                </Box>
                
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {university.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {university.location}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Chip label={university.type} size="small" color="primary" />
                    <Chip label={university.ranking} size="small" variant="outlined" />
                  </Box>
                  <Rating value={university.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {university.description}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Tuition Fee: {university.tuitionFee}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {university.programs.map((program) => (
                      <Chip key={program} label={program} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => router.push(`/university/${university.id}`)}
                  >
                    View Programs
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Card sx={{ p: 4, textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Need Guidance? Let us help you.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleViewMore}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              }}
            >
              Explore Study Destinations
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleCounselingClick}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Book Free Counseling
            </Button>
          </Box>
        </Card>
      </Container>

      {/* Counseling Dialog */}
      <CounselingDialog 
        open={counselingDialogOpen} 
        onClose={() => setCounselingDialogOpen(false)} 
      />
    </>
  );
}

export default UniversitiesView;
