'use client';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 mr-6">
        <Leaf className="h-7 w-7 text-primary" />
        <span className="text-lg font-bold font-headline text-primary whitespace-nowrap">
          AgriChain Nizamabad
        </span>
    </Link>
  );
};

export default Logo;
