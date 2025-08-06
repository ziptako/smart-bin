'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@/i18n/navigation';

export function Navbar() {
  const t = useTranslations('Navigation');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="navbar-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo-1024x1024.png" alt="SmartBin Logo" width={32} height={32} className="rounded" />
          <span className="font-bold text-xl">SmartBin</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  {t('home')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  {t('about')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side controls */}
        <div className="flex items-center space-x-2">
          {/* Desktop controls */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="outline" size="sm" className="h-9" asChild>
              <Link href="/login">{t('login')}</Link>
            </Button>
            <Button size="sm" className="h-9" asChild>
              <Link href="/register">{t('register')}</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/" className="w-full">
                  {t('home')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about" className="w-full">
                  {t('about')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div className="w-full">
                  <LanguageSwitcher />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div className="w-full">
                  <ThemeToggle />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/login" className="w-full">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    {t('login')}
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register" className="w-full">
                  <Button size="sm" className="w-full justify-start">
                    {t('register')}
                  </Button>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
