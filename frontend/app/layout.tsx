import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './provider';


export const metadata: Metadata = {
  title: 'Next.js Auth App',
  description: 'Role-based authentication with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}