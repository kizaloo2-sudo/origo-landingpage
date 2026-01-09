'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't show footer on admin pages and assessment page
  const isAdminPage = pathname?.startsWith('/admin');
  const isAssessmentPage = pathname === '/assessment';
  
  if (isAdminPage || isAssessmentPage) {
    return null;
  }
  
  return <Footer />;
}
