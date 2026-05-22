import { NavLink } from 'react-router-dom';

type NavItem = {
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: 'Landing', path: '/' },
  { label: 'Browse', path: '/browse' },
  { label: 'Recommendations', path: '/recommendations' },
  { label: 'About', path: '/about' },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${isActive
    ? 'bg-gray-900 text-white'
    : 'text-gray-700 hover:bg-gray-200'
  }`;

export default function Navbar() {
  return (
    <nav className="w-full px-4 py-3 flex gap-2">
      {navItems.map((item) => (
        <NavLink key={item.path} to={item.path} className={linkClass}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
