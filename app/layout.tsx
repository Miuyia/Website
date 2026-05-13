import type { Metadata, Viewport } from 'next';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { LocaleProvider } from '@/components/locale-provider';
import { SiteHeader } from '@/components/site-header';
import { MobileNav } from '@/components/mobile-nav';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'opsz'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://{{YOUR_DOMAIN}}'),
  title: {
    default: 'Meow',
    template: '%s · Meow',
  },
  description: 'Meow — personal site, galleries and writing.',
  authors: [{ name: 'Meow' }],
  creator: 'Meow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Meow',
    title: 'Meow',
    description: 'Meow — personal site, galleries and writing.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '{{YOUR_TWITTER}}',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

const SET_LANG_EARLY = `(function(){try{var v=localStorage.getItem('site-locale');if(v==='zh'){document.documentElement.lang='zh-Hans';}else{document.documentElement.lang='en';}}catch(e){document.documentElement.lang='en';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)]">
        <Script id="set-lang-early" strategy="beforeInteractive">
          {SET_LANG_EARLY}
        </Script>
        <LocaleProvider>
          <div className="flex min-h-full">
            <SiteHeader />
            <MobileNav />
            <div className="flex-1 flex flex-col min-w-0">
              <main className="flex-1 w-full">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
