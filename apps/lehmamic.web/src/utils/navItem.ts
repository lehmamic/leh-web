export interface NavItem {
  url: string;
  label: string;
  isProtected?: boolean,
}

export const navItems: NavItem[] = [
  {
    label: 'Blog',
    url: '/blog',
  },
  {
    label: 'About',
    url: '/about',
  },
  {
    label: 'Admin',
    url: '/admin',
    isProtected: true,
  },
];
