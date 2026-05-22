import type { ReactNode } from 'react';
import { AppHeader } from '../components/AppHeader';
import { Hero } from '../components/Hero';

type PageProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  showHero?: boolean;
};

export default function Page({
  children,
  sidebar,
  showHero = true,
}: PageProps) {
  return (
    <div className="app flex flex-col min-h-screen gap-12">
      <AppHeader />
      {showHero && <Hero />}

      <main className={sidebar ? 'layout' : 'w-full'}>
        {sidebar}
        {children}
      </main>
    </div>
  );
}
