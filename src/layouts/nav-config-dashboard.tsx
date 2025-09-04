import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path?: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  children?: NavItem[];
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    icon: icon('ic-user'),
    children: [
      {
        title: 'Profile',
        path: '/user/profile',
        icon: <Iconify icon="solar:pen-bold" />,
      },
      {
        title: 'Cards',
        path: '/user/cards',
        icon: <Iconify icon="solar:cart-3-bold" />,
      },
      {
        title: 'List',
        path: '/user',
        icon: <Iconify icon="solar:eye-bold" />,
      },
      {
        title: 'Create',
        path: '/user/create',
        icon: <Iconify icon="mingcute:add-line" />,
      },
      {
        title: 'Edit',
        path: '/user/edit',
        icon: <Iconify icon="solar:pen-bold" />,
      },
      {
        title: 'Account',
        path: '/user/account',
        icon: <Iconify icon="solar:settings-bold-duotone" />,
      },
    ],
  },
  {
    title: 'Product',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Manage Cities',
    path: '/cities',
    icon: <Iconify icon="solar:home-angle-bold-duotone" />,
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
