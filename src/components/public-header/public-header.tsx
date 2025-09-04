import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export function PublicHeader() {
  const router = useRouter();

  return (
    <Box
      component="header"
      sx={{
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            sx={{ cursor: 'pointer', color: 'primary.main' }}
            onClick={() => router.push('/')}
          >
            Study Abroad
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="text"
              onClick={() => router.push('/study-destinations')}
            >
              Study Destinations
            </Button>
            <Button
              variant="text"
              onClick={() => router.push('/universities')}
            >
              Universities
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.push('/sign-in')}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
