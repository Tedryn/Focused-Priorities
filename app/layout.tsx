import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: {
    default: 'Jef — Photography',
    template: '%s | Jef Photography',
  },
  description: 'Photography portfolio and journal by Jef — capturing light, telling stories.',
  authors: [{ name: 'Jef' }],
  creator: 'Jef',
  publisher: 'Jef Photography',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jeffreyandersenphotography.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Jef — Photography',
    description: 'Photography portfolio and journal by Jef — capturing light, telling stories.',
    siteName: 'Jef Photography',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jef — Photography',
    description: 'Photography portfolio and journal by Jef.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
