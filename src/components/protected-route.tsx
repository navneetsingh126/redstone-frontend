import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import { Box, LinearProgress, linearProgressClasses } from '@mui/material';

import { useAuth } from 'src/contexts/auth-context';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isInitialized, user } = useAuth();

  const renderFallback = () => (
    <DashboardLayout>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LinearProgress
          sx={{
            width: 1,
            maxWidth: 320,
            bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
            [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
          }}
        />
      </Box>
    </DashboardLayout>
  );

  // Show loading while checking authentication status
  if (!isInitialized || isLoading) {
    return renderFallback();
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}
