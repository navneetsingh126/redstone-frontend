import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function UserCardsView() {
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
          User Cards
        </Typography>
      </Box>

      <Typography variant="body1">
        User Cards content will be implemented here.
      </Typography>
    </DashboardContent>
  );
}
