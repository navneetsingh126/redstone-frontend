import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { PublicLayout } from 'src/layouts/public';
import { DashboardLayout } from 'src/layouts/dashboard';

import { ProtectedRoute } from 'src/components/protected-route';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const UserCreatePage = lazy(() => import('src/pages/user-create'));
export const UserProfilePage = lazy(() => import('src/pages/user-profile'));
export const UserCardsPage = lazy(() => import('src/pages/user-cards'));
export const UserEditPage = lazy(() => import('src/pages/user-edit'));
export const UserAccountPage = lazy(() => import('src/pages/user-account'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const StudyDestinationsPage = lazy(() => import('src/pages/study-destinations'));
export const UniversitiesPage = lazy(() => import('src/pages/universities'));
export const UniversityDetailPage = lazy(() => import('src/pages/university-detail'));
export const CitiesPage = lazy(() => import('src/pages/cities'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
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
);

export const routesSection: RouteObject[] = [
  {
    index: true,
    element: (
      <PublicLayout>
        <StudyDestinationsPage />
      </PublicLayout>
    ),
  },
  {
    path: 'study-destinations',
    element: (
      <PublicLayout>
        <StudyDestinationsPage />
      </PublicLayout>
    ),
  },
  {
    path: 'universities',
    element: (
      <PublicLayout>
        <UniversitiesPage />
      </PublicLayout>
    ),
  },
  {
    path: 'university/:universityId',
    element: (
      <PublicLayout>
        <UniversityDetailPage />
      </PublicLayout>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'user/create', element: <UserCreatePage /> },
      { path: 'user/profile', element: <UserProfilePage /> },
      { path: 'user/cards', element: <UserCardsPage /> },
      { path: 'user/edit', element: <UserEditPage /> },
      { path: 'user/account', element: <UserAccountPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'cities', element: <CitiesPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
