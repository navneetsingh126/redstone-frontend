import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function UserEditView() {
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
          Edit User
        </Typography>
      </Box>

      <Typography variant="body1">
        Edit User content will be implemented here.
      </Typography>
    </DashboardContent>
  );
}
