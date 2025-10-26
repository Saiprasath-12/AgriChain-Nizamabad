'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/crop-planning', label: 'Crop Planning' },
  { href: '/about', label: 'About' },
  { href: '/impact', label: 'Impact' },
  { href: '/blockchain', label: 'Blockchain' },
  { href: '/contact', label: 'Contact' },
];

interface NavigationProps {
  vertical?: boolean;
  onLinkClick?: () => void;
}

const Navigation = ({ vertical = false, onLinkClick }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex items-center',
        vertical ? 'flex-col space-y-4 items-start' : 'space-x-4 lg:space-x-6'
      )}
    >
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onLinkClick}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === href
              ? 'text-primary'
              : 'text-muted-foreground',
             vertical && 'text-lg w-full p-2 hover:bg-secondary rounded-md'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
