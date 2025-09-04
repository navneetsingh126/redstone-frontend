import React, { ReactNode } from 'react';

import Box from '@mui/material/Box';

import { PublicHeader } from 'src/components/public-header';

// ----------------------------------------------------------------------

type PublicLayoutProps = {
  children: ReactNode;
};

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <PublicHeader />
      {children}
    </Box>
  );
}
