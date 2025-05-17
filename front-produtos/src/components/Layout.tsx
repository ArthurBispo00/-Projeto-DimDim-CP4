'use client';

import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl">DIM DIM</h1>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="text-center p-4 text-sm text-gray-900">
        © {new Date().getFullYear()} Meu Projeto DEVOPS
      </footer>
    </div>
  );
}
