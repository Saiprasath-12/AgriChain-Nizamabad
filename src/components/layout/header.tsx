'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import Logo from '@/components/logo';
import Navigation from './navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Navigation />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">Join Cooperative</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className='flex items-center justify-between pb-4 border-b'>
                  <Logo />
                  <Button variant="ghost" onClick={() => setIsOpen(false)} >
                    <X />
                    <span className="sr-only">Close Menu</span>
                  </Button>
                </div>
                <div className="mt-6">
                  <Navigation vertical onLinkClick={() => setIsOpen(false)}/>
                </div>
                <div className="mt-auto pt-6">
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsOpen(false)}>
                    <Link href="/contact">Join Cooperative</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
