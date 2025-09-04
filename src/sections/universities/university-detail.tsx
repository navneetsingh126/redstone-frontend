import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { CounselingDialog } from 'src/components/counseling-dialog';

// ----------------------------------------------------------------------

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`university-tabpanel-${index}`}
      aria-labelledby={`university-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

interface UniversityDetailProps {
  universityId: string;
}

export function UniversityDetail({ universityId }: UniversityDetailProps) {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [counselingDialogOpen, setCounselingDialogOpen] = useState(false);

  // Mock data - in real app, fetch from API using universityId
  const university = {
    id: universityId,
    name: 'University of Dubai',
    location: 'Dubai, UAE',
    type: 'Public',
    ranking: 'Top 500 Global',
    rating: 4.5,
    website: 'uod.ac.ae',
    founded: '1997',
    acceptanceRate: '65%',
    totalStudents: '4,500',
    internationalStudents: '1,200',
    studentFacultyRatio: '15:1',
    placementRate: '92%',
    description: 'The University of Dubai is a prestigious institution offering world-class education in the heart of the UAE. With state-of-the-art facilities and internationally recognized programs, we prepare students for successful careers in a global marketplace.',
    rankings: [
      { source: 'QS World Ranking', rank: '#565' },
      { source: 'Times Higher Education', rank: '#301-350' },
      { source: 'Webometrics World', rank: '#141' },
      { source: 'Webometrics National', rank: '#66' },
    ],
    intakes: [
      { name: 'Fall Intake', period: 'September', deadline: 'May 31' },
      { name: 'Spring Intake', period: 'January', deadline: 'October 31' },
    ],
    programs: [
      {
        name: 'M.S. in Business Analytics & Project Management',
        type: 'Masters',
        duration: '19 Months',
        fee: '45,000 AED',
        campus: 'Main Campus',
      },
      {
        name: 'M.S. in Financial Technology',
        type: 'Masters',
        duration: '19 Months',
        fee: '50,000 AED',
        campus: 'Main Campus',
      },
      {
        name: 'B.S. in Business Administration',
        type: 'Bachelors',
        duration: '48 Months',
        fee: '35,000 AED',
        campus: 'Main Campus',
      },
      {
        name: 'B.S. in Computer Science',
        type: 'Bachelors',
        duration: '48 Months',
        fee: '38,000 AED',
        campus: 'Main Campus',
      },
    ],
    costs: {
      tuition: '35,000 - 50,000 AED',
      accommodation: '15,000 - 25,000 AED',
      livingExpenses: '20,000 - 30,000 AED',
      total: '70,000 - 105,000 AED',
    },
    scholarships: [
      {
        name: 'Merit Scholarship',
        type: 'Merit Based',
        amount: 'Up to 50% tuition waiver',
        eligibility: 'GPA 3.5+',
      },
      {
        name: 'International Student Grant',
        type: 'Need Based',
        amount: 'Up to 30% tuition waiver',
        eligibility: 'Financial need demonstrated',
      },
    ],
    admissionRequirements: {
      undergraduate: {
        gpa: '3.0 out of 4.0',
        englishTests: ['TOEFL iBT: 79', 'IELTS: 6.5', 'DET: 100'],
        standardizedTests: 'SAT/ACT (optional)',
      },
      graduate: {
        gpa: '3.0 out of 4.0',
        englishTests: ['TOEFL iBT: 79', 'IELTS: 6.5', 'DET: 100'],
        standardizedTests: 'GRE/GMAT (optional)',
      },
    },
    placements: {
      rate: '92%',
      topRecruiters: ['Emirates', 'Dubai Airports', 'Etisalat', 'Dubai Municipality'],
      averageSalary: '45,000 - 80,000 AED',
      jobProfiles: [
        { role: 'Business Analyst', salary: '45,000 - 65,000 AED' },
        { role: 'Software Engineer', salary: '50,000 - 75,000 AED' },
        { role: 'Marketing Manager', salary: '40,000 - 60,000 AED' },
        { role: 'Financial Analyst', salary: '50,000 - 80,000 AED' },
      ],
    },
    faqs: [
      {
        question: 'Is the University of Dubai accredited?',
        answer: 'Yes, the University of Dubai is accredited by the UAE Ministry of Education and holds international accreditations for its business programs.',
      },
      {
        question: 'What are the English language requirements?',
        answer: 'For undergraduate programs: TOEFL iBT 79, IELTS 6.5, or DET 100. For graduate programs: TOEFL iBT 79, IELTS 6.5, or DET 100.',
      },
      {
        question: 'Are there scholarships available for international students?',
        answer: 'Yes, we offer merit-based scholarships up to 50% tuition waiver and need-based grants up to 30% tuition waiver for eligible international students.',
      },
      {
        question: 'What is the acceptance rate?',
        answer: 'The University of Dubai has an acceptance rate of approximately 65%, making it a competitive but accessible choice for qualified applicants.',
      },
    ],
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleApplyNow = () => {
    // Handle application logic
    console.log('Apply to university:', university.name);
    setCounselingDialogOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section with Visual */}
      <Box sx={{ 
        mb: 4, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        p: 4,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 200,
          height: 200,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)'
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            {university.name}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
            {university.location} • {university.type} University
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Rating value={university.rating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {university.rating}/5
            </Typography>
            <Chip label={university.ranking} color="primary" />
          </Box>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            {university.description}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleApplyNow}
            startIcon={<Iconify icon="solar:pen-bold" />}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            Apply Now
          </Button>
        </Box>
      </Box>

      {/* Key Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ textAlign: 'center', p: 3, position: 'relative', overflow: 'hidden' }}>
            {/* Background Icon */}
            <Box sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              opacity: 0.1,
              color: 'primary.main'
            }}>
              <Iconify icon="solar:check-circle-bold" sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h4" color="primary.main" sx={{ mb: 1, position: 'relative', zIndex: 1 }}>
              {university.acceptanceRate}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ position: 'relative', zIndex: 1 }}>
              Acceptance Rate
            </Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ textAlign: 'center', p: 3, position: 'relative', overflow: 'hidden' }}>
            {/* Background Icon */}
            <Box sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              opacity: 0.1,
              color: 'primary.main'
            }}>
              <Iconify icon="solar:globe-bold" sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h4" color="primary.main" sx={{ mb: 1, position: 'relative', zIndex: 1 }}>
              {university.totalStudents}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ position: 'relative', zIndex: 1 }}>
              Total Students
            </Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ textAlign: 'center', p: 3, position: 'relative', overflow: 'hidden' }}>
            {/* Background Icon */}
            <Box sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              opacity: 0.1,
              color: 'primary.main'
            }}>
              <Iconify icon="solar:pen-bold" sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h4" color="primary.main" sx={{ mb: 1, position: 'relative', zIndex: 1 }}>
              {university.studentFacultyRatio}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ position: 'relative', zIndex: 1 }}>
              Student-Faculty Ratio
            </Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ textAlign: 'center', p: 3, position: 'relative', overflow: 'hidden' }}>
            {/* Background Icon */}
            <Box sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              opacity: 0.1,
              color: 'primary.main'
            }}>
              <Iconify icon="solar:home-angle-bold-duotone" sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h4" color="primary.main" sx={{ mb: 1, position: 'relative', zIndex: 1 }}>
              {university.placementRate}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ position: 'relative', zIndex: 1 }}>
              Placement Rate
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Card sx={{ p: 1}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="university tabs">
            <Tab label="Overview" />
            <Tab label="Programs" />
            <Tab label="Costs" />
            <Tab label="Admissions" />
            <Tab label="Placements" />
            <Tab label="FAQs" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                University Rankings
              </Typography>
              <List>
                {university.rankings.map((ranking, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2">{ranking.source}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {ranking.rank}
                    </Typography>
                  </Box>
                ))}
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Intakes
              </Typography>
              <List>
                {university.intakes.map((intake, index) => (
                  <Box key={index} sx={{ py: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {intake.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {intake.period} • Deadline: {intake.deadline}
                    </Typography>
                  </Box>
                ))}
              </List>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Available Programs
          </Typography>
                      <Grid container spacing={2}>
              {university.programs.map((program, index) => (
                <Grid key={index} size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden' }}>
                    {/* Program Header with Visual */}
                    <Box sx={{
                      height: 80,
                      background: `linear-gradient(135deg, ${index % 2 === 0 ? '#667eea' : '#f093fb'}, ${index % 2 === 0 ? '#764ba2' : '#f5576c'})`,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {/* Program Icon */}
                      <Box sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        <Iconify 
                          icon={program.type === 'Masters' ? "solar:pen-bold" : "solar:home-angle-bold-duotone"} 
                          sx={{ fontSize: 20 }} 
                        />
                      </Box>
                    </Box>
                    
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                        {program.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip label={program.type} size="small" color="primary" />
                        <Chip label={program.campus} size="small" variant="outlined" />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Duration: {program.duration}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {program.fee}
                        </Typography>
                      </Box>
                      <Button variant="contained" size="small" fullWidth>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Cost Breakdown
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Annual Costs
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography>Tuition Fees</Typography>
                    <Typography fontWeight="bold">{university.costs.tuition}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography>Accommodation</Typography>
                    <Typography fontWeight="bold">{university.costs.accommodation}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography>Living Expenses</Typography>
                    <Typography fontWeight="bold">{university.costs.livingExpenses}</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary.main">
                      {university.costs.total}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Available Scholarships
              </Typography>
              {university.scholarships.map((scholarship, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                      {scholarship.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip label={scholarship.type} size="small" color="secondary" />
                      <Chip label={scholarship.amount} size="small" variant="outlined" />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Eligibility: {scholarship.eligibility}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Admission Requirements
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Undergraduate Requirements
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Academic Requirements
                    </Typography>
                    <Typography variant="body2">
                      GPA: {university.admissionRequirements.undergraduate.gpa}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      English Proficiency
                    </Typography>
                    {university.admissionRequirements.undergraduate.englishTests.map((test, index) => (
                      <Typography key={index} variant="body2">
                        • {test}
                      </Typography>
                    ))}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Standardized Tests
                    </Typography>
                    <Typography variant="body2">
                      {university.admissionRequirements.undergraduate.standardizedTests}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Graduate Requirements
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Academic Requirements
                    </Typography>
                    <Typography variant="body2">
                      GPA: {university.admissionRequirements.graduate.gpa}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      English Proficiency
                    </Typography>
                    {university.admissionRequirements.graduate.englishTests.map((test, index) => (
                      <Typography key={index} variant="body2">
                        • {test}
                      </Typography>
                    ))}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Standardized Tests
                    </Typography>
                    <Typography variant="body2">
                      {university.admissionRequirements.graduate.standardizedTests}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Career Outcomes
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Placement Statistics
                  </Typography>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h3" color="primary.main">
                      {university.placements.rate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Placement Rate
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                    Top Recruiters
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {university.placements.topRecruiters.map((recruiter, index) => (
                      <Chip key={index} label={recruiter} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Job Profiles & Salaries
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Job Profile</TableCell>
                    <TableCell align="right">Average Salary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {university.placements.jobProfiles.map((job, index) => (
                    <TableRow key={index}>
                      <TableCell>{job.role}</TableCell>
                      <TableCell align="right">{job.salary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={5}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Frequently Asked Questions
          </Typography>
          {university.faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<Iconify icon="solar:arrow-right-bold" />}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>
      </Card>

      {/* Call to Action */}
      <Card sx={{ p: 4, textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Ready to Start Your Journey?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Join thousands of students who have chosen {university.name} for their education.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleApplyNow}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            Apply Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderColor: 'white', color: 'white' }}
            onClick={() => router.push('/universities')}
          >
            Back to Universities
          </Button>
        </Box>
      </Card>

      {/* Counseling Dialog */}
      <CounselingDialog 
        open={counselingDialogOpen} 
        onClose={() => setCounselingDialogOpen(false)} 
      />
    </Container>
  );
}

export default UniversityDetail;
