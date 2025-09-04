import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { CounselingDialog } from 'src/components/counseling-dialog';


// ----------------------------------------------------------------------

const destinations = [
  {
    id: 1,
    name: 'Dubai',
    country: 'UAE',
    description: 'A futuristic city with over 60 world-renowned university campuses and booming economy',
    image: '/assets/images/cover/dubai-skyline.jpg',
    tuitionFee: '50,000 AED',
    livingCost: '30,000 AED',
    totalCost: '88,500 AED',
    popularCourses: ['Tourism & Hospitality Management', 'Business & Management', 'Aerospace Engineering'],
    benefits: [
      'Global campuses of world-reputed universities',
      'Affiliated with top international universities',
      'Excellent job opportunities in booming economy',
      'Safe city with modern infrastructure',
      'Affordable tuition and living expenses'
    ]
  },
  {
    id: 2,
    name: 'Singapore',
    country: 'Singapore',
    description: 'A global education hub with world-class universities and multicultural environment',
    image: '/assets/images/cover/singapore-marina.jpg',
    tuitionFee: '35,000 SGD',
    livingCost: '25,000 SGD',
    totalCost: '65,000 SGD',
    popularCourses: ['Computer Science', 'Business Administration', 'Engineering'],
    benefits: [
      'World-class education system',
      'Multicultural and safe environment',
      'Strong industry connections',
      'Excellent research opportunities',
      'Gateway to Asia-Pacific markets'
    ]
  },
  {
    id: 3,
    name: 'Melbourne',
    country: 'Australia',
    description: 'Australia\'s cultural capital with top-ranked universities and vibrant student life',
    image: '/assets/images/cover/melbourne-city.jpg',
    tuitionFee: '45,000 AUD',
    livingCost: '28,000 AUD',
    totalCost: '78,000 AUD',
    popularCourses: ['Medicine', 'Arts & Humanities', 'Environmental Science'],
    benefits: [
      'Top-ranked universities globally',
      'High quality of life',
      'Post-study work opportunities',
      'Diverse cultural experiences',
      'Strong research focus'
    ]
  }
];

export function StudyDestinationsView() {
  const router = useRouter();
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [counselingDialogOpen, setCounselingDialogOpen] = useState(false);

  const handleViewMore = () => {
    router.push('/universities');
  };

  const handleCounselingClick = () => {
    setCounselingDialogOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mx: 1,
          mt: 1,
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                Study Abroad
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                Discover world-class education opportunities across the globe
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
                Choose from prestigious universities in top study destinations and advance your career globally
              </Typography>
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
                Explore Universities
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  width: '100%',
                  height: 300,
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative Elements */}
                <Box sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                }} />
                <Box sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: -30,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                }} />
                <Iconify icon="solar:globe-bold" sx={{ fontSize: 80, opacity: 0.8, zIndex: 1 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Destination Selection */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Popular Study Destinations
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {destinations.map((destination) => (
            <Grid key={destination.id} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: selectedDestination.id === destination.id ? '2px solid' : '1px solid',
                  borderColor: selectedDestination.id === destination.id ? 'primary.main' : 'divider',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => setSelectedDestination(destination)}
              >
                {/* Destination Image */}
                <Box
                  sx={{
                    height: 200,
                    background: `linear-gradient(135deg, ${destination.id === 1 ? '#667eea' : destination.id === 2 ? '#f093fb' : '#4facfe'}, ${destination.id === 1 ? '#764ba2' : destination.id === 2 ? '#f5576c' : '#00f2fe'})`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Placeholder Icon */}
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    opacity: 0.8
                  }}>
                    <Iconify 
                      icon={destination.id === 1 ? "solar:home-angle-bold-duotone" : destination.id === 2 ? "solar:globe-bold" : "solar:pen-bold"} 
                      sx={{ fontSize: 60 }} 
                    />
                  </Box>
                  {/* Decorative Elements */}
                  <Box sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                  }} />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                  }} />
                </Box>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {destination.name}, {destination.country}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {destination.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Selected Destination Details */}
        <Card sx={{ p: 4 }}>
          {/* Destination Header with Visual */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4,
            p: 3,
            background: `linear-gradient(135deg, ${selectedDestination.id === 1 ? '#667eea' : selectedDestination.id === 2 ? '#f093fb' : '#4facfe'}, ${selectedDestination.id === 1 ? '#764ba2' : selectedDestination.id === 2 ? '#f5576c' : '#00f2fe'})`,
            borderRadius: 2,
            color: 'white'
          }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 3
            }}>
              <Iconify 
                icon={selectedDestination.id === 1 ? "solar:home-angle-bold-duotone" : selectedDestination.id === 2 ? "solar:globe-bold" : "solar:pen-bold"} 
                sx={{ fontSize: 40, color: 'white' }} 
              />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ mb: 1, color: 'white' }}>
                Study in {selectedDestination.name}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {selectedDestination.country}
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 4 }}>
            {selectedDestination.description}
          </Typography>

          {/* Benefits */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Why Study in {selectedDestination.name}?
            </Typography>
            <Grid container spacing={2}>
              {selectedDestination.benefits.map((benefit, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Iconify icon="solar:check-circle-bold" sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body2">{benefit}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Cost Breakdown */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Cost of Studying in {selectedDestination.name}
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Types of Expenses</TableCell>
                    <TableCell align="right">Annual Expenses</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Tuition Fees (one year)</TableCell>
                    <TableCell align="right">{selectedDestination.tuitionFee}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Living and Accommodation</TableCell>
                    <TableCell align="right">{selectedDestination.livingCost}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Airfare</TableCell>
                    <TableCell align="right">1,500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Visa Fees</TableCell>
                    <TableCell align="right">7,000</TableCell>
                  </TableRow>
                  <TableRow sx={{ backgroundColor: 'primary.light', color: 'white' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Total Expenses</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      {selectedDestination.totalCost}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Popular Courses */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Popular Courses in {selectedDestination.name}
            </Typography>
            <Grid container spacing={2}>
              {selectedDestination.popularCourses.map((course, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2">{course}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Call to Action */}
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Ready to start your journey?
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleViewMore}
                startIcon={<Iconify icon="solar:arrow-right-bold" />}
                sx={{ px: 4, py: 1.5 }}
              >
                View Universities
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleCounselingClick}
                startIcon={<Iconify icon="solar:pen-bold" />}
                sx={{ px: 4, py: 1.5 }}
              >
                Book Free Counseling
              </Button>
            </Box>
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

export default StudyDestinationsView;
