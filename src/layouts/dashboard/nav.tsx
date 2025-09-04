import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { WorkspacesPopover } from '../components/workspaces-popover';

import type { NavItem } from '../nav-config-dashboard';
import type { WorkspacesPopoverProps } from '../components/workspaces-popover';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, sx }: NavContentProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleToggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isItemActive = (item: NavItem): boolean => {
    if (item.path === pathname) return true;
    if (item.children) {
      return item.children.some(child => child.path === pathname);
    }
    return false;
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isActive = isItemActive(item);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);

    if (hasChildren) {
      return (
        <Box key={item.title}>
          <ListItem disableGutters disablePadding>
            <ListItemButton
              disableGutters
              onClick={() => handleToggleExpand(item.title)}
              sx={[
                (theme) => ({
                  pl: 2 + level * 2,
                  py: 1,
                  gap: 2,
                  pr: 1.5,
                  borderRadius: 0.75,
                  typography: 'body2',
                  fontWeight: 'fontWeightMedium',
                  color: theme.vars.palette.text.secondary,
                  minHeight: 44,
                  ...(isActive && {
                    fontWeight: 'fontWeightSemiBold',
                    color: theme.vars.palette.primary.main,
                    bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                    '&:hover': {
                      bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
                    },
                  }),
                }),
              ]}
            >
              <Box component="span" sx={{ width: 24, height: 24 }}>
                {item.icon}
              </Box>

              <Box component="span" sx={{ flexGrow: 1 }}>
                {item.title}
              </Box>

              <Iconify 
                icon={isExpanded ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
                sx={{ width: 16, height: 16 }}
              />

              {item.info && item.info}
            </ListItemButton>
          </ListItem>

          <Collapse in={isExpanded}>
            <Box
              component="ul"
              sx={{
                gap: 0.5,
                display: 'flex',
                flexDirection: 'column',
                pl: 2,
                borderLeft: (theme) => `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
                ml: 2,
              }}
            >
              {item.children!.map((child) => renderNavItem(child, level + 1))}
            </Box>
          </Collapse>
        </Box>
      );
    }

    return (
      <ListItem disableGutters disablePadding key={item.title}>
        <ListItemButton
          disableGutters
          component={RouterLink}
          href={item.path!}
          sx={[
            (theme) => ({
              pl: 2 + level * 2,
              py: 1,
              gap: 2,
              pr: 1.5,
              borderRadius: 0.75,
              typography: 'body2',
              fontWeight: 'fontWeightMedium',
              color: theme.vars.palette.text.secondary,
              minHeight: 44,
              ...(isActive && {
                fontWeight: 'fontWeightSemiBold',
                color: theme.vars.palette.primary.main,
                bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                '&:hover': {
                  bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
                },
              }),
            }),
          ]}
        >
          <Box component="span" sx={{ width: 24, height: 24 }}>
            {item.icon}
          </Box>

          <Box component="span" sx={{ flexGrow: 1 }}>
            {item.title}
          </Box>

          {item.info && item.info}
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <>
      <Logo />

      {slots?.topArea}

      {/* <WorkspacesPopover data={workspaces} sx={{ my: 2 }} /> */}

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box
            component="ul"
            sx={{
              my: 3,
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {data.map((item) => renderNavItem(item))}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </>
  );
}
