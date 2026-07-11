import type{ ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      {children}
    </div>
  );
}