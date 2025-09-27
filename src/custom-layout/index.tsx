'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import PublicLayout from './public';
import PrivateLayout from './private';

function CustomLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = ["/" , "/login", "/register"].includes(pathname);
  if(isPublicRoute)
  {
    return <PublicLayout>
        {children}
    </PublicLayout>
  }
  return (
    <PrivateLayout>
        {children}
    </PrivateLayout>
  )
}

export default CustomLayout