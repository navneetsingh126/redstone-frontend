// Import CSS for slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import { useState, useEffect } from 'react';

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
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { CounselingDialog } from 'src/components/counseling-dialog';


// Define the type for destinations
interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  tuitionFee: string;
  livingCost: string;
  totalCost: string;
  popularCourses: string[];
  benefits: string[];
  whyTrending: string[];
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Dubai',
    country: 'UAE',
    description: 'A futuristic city with over 70+ international universities and a thriving economy',
    image: `${import.meta.env.BASE_URL}assets/images/dubai_circular.png`,
    tuitionFee: '~50,000 AED',
    livingCost: '~30,000 AED',
    totalCost: '~88,500 AED',
    popularCourses: [
      'AI, Data Science & Cybersecurity',
      'Business, Finance & MBA Specialisations',
      'Engineering across several disciplines',
      'Medicine, Nursing & Allied Health',
      'Luxury Hospitality & Tourism',
      'Law & Global Affairs',
      'Media, Creative Arts & Communications',
      'Urban Planning & Sustainability',
      'FinTech, Accounting & Banking',
    ],
    benefits: [
      'Over 70+ international universities with globally recognized degrees',
      'Modern campus life in the heart of the Middle East',
      'Internship and job opportunities in a thriving economy',
      'Programs from the UK, USA, Australia, and Europe available locally',
      'A multicultural and safe student environment',
    ],
    whyTrending: [
      'Alignment with UAE’s national vision: Smart Infrastructure, AI, Healthcare Expansion, Global Tourism, Finance Hub, Legal Frameworks, Creative Industries, and Sustainability',
      'Employability: Graduates see strong job placement and salary growth. E.g. tech & AI roles start ~AED 15,000+, and bachelor’s degree can mean a 28% pay bump, masters an additional ~21%',
      'Institutional strength: Schools like MBZUAI, Khalifa University, AUS, Middlesex University, and AUD offer globally reputed, accredited & specialised programs',
    ],
  },
];

export function StudyDestinationsView() {
  const router = useRouter();
  const [selectedDestination, setSelectedDestination] = useState<Destination>(destinations[0]);
  const [counselingDialogOpen, setCounselingDialogOpen] = useState(false);
  // Define logos as an array of strings
  const [logos, setLogos] = useState<string[]>([]);

  const handleViewMore = () => {
    router.push('/universities');
  };

  const handleCounselingClick = () => {
    setCounselingDialogOpen(true);
  };

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}assets/logos/logos.json`)
      .then((res) => res.json())
      .then((data: string[]) => setLogos(data))
      .catch((err) => console.error('Error loading logos.json:', err));
  }, []);

  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1200,
    infinite: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, centerPadding: '40px' } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: '20px' } },
    ],
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
                Study Hub Dubai – Where Global Education Meets Endless Opportunities
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                Discover world-class education opportunities in the UAE
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
                Welcome to Study Hub Dubai, your trusted partner in pursuing world-class education in the UAE. We specialize in guiding students through every step of their journey – from choosing the right course and university to securing admission, scholarships, and visas.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleCounselingClick}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'grey.100',
                    },
                  }}
                >
                  Book Free Consultation
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleViewMore}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'grey.100',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Apply Now
                </Button>
              </Box>
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
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                  }}
                />
                <img
                  src={`${import.meta.env.BASE_URL}assets/study_hub_dubai-removebg-preview.png`}
                  alt={selectedDestination.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Carousel Section */}
      <Container sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
          Our Partner Universities
        </Typography>
        <Slider {...settings}>
          {logos.map((file, idx) => (
            <Box key={idx} sx={{ px: 2 }}>
              <Card
                sx={{
                  m: 0.7,
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 150,
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/logos/${file}`}
                  alt={file.replace(/\..+$/, '')}
                  style={{
                    maxHeight: '80px',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'grayscale(80%)',
                    transition: 'filter 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.filter = 'none')}
                  onMouseOut={(e) => (e.currentTarget.style.filter = 'grayscale(80%)')}
                />
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>

      {/* Destination Details */}
      <Container sx={{ mb: 6, mx: 1 }} maxWidth={false}>
        <Card sx={{ p: 4 }}>
          {/* Destination Header with Visual */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 4,
              p: 3,
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: 2,
              color: 'white',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 3,
                overflow: 'hidden',
              }}
            >
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
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

          {/* Why Trending */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Why These Fields Are Trending
            </Typography>
            <Grid container spacing={2}>
              {selectedDestination.whyTrending.map((reason, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Iconify icon="solar:check-circle-bold" sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body2">{reason}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Cost Breakdown */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Average Cost of Studying in {selectedDestination.name}
            </Typography>
            <TableContainer component={Paper} sx={{ mx: 1 }}>
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
                    <TableCell align="right">~1,500 AED</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Visa Fees</TableCell>
                    <TableCell align="right">~7,000 AED</TableCell>
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
                    <Typography
                      variant="body2"
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: 'grey.100',
                          transform: 'scale(1.05)',
                          cursor: 'context-menu',
                        },
                      }}
                    >
                      {course}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Our Services */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Our Services
            </Typography>
            <Grid container spacing={2}>
              {[
                'Career Counselling & Guidance – Tailored to your goals',
                'University & Course Selection – Across top institutions in Dubai',
                'Application & Admission Support – Hassle-free process',
                'Visa & Documentation Help – End-to-end assistance',
                'Scholarship Guidance – Find the best funding opportunities',
                'Pre & Post Arrival Support – From orientation to settling in Dubai',
              ].map((service, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Iconify icon="solar:check-circle-bold" sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body2">{service}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Call to Action */}
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Take the first step towards your future today!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleViewMore}
                startIcon={<Iconify icon="solar:arrow-right-bold" />}
                sx={{ px: 4, py: 1.5 }}
              >
                Apply Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleCounselingClick}
                startIcon={<Iconify icon="solar:pen-bold" />}
                sx={{ px: 4, py: 1.5 }}
              >
                Book Free Consultation
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