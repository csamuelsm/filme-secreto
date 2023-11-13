import type { Metadata } from 'next';

import Providers from '~/app/providers';
import Layout from '~/lib/layout';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'Filme Secreto | Jogo diário de adivinhar o filme com ajuda de uma IA!';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | Filme Secreto' },
  description: 'O objetivo de Filme Secreto é acertar o filme secreto do dia com a ajuda de uma IA. Para isso, você pode chutar filmes e um algoritmo de inteligência artificial dirá o quão parecido com o filme secreto é o filme que você chutou. É um jogo similar a Contexto e Termooo.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#FFFFFF',
  openGraph: {
    url: 'https://filme-secreto.com.br/',
    title: 'Filme Secreto',
    description: 'O objetivo de Filme Secreto é acertar o filme secreto do dia com a ajuda de uma IA. Para isso, você pode chutar filmes e um algoritmo de inteligência artificial dirá o quão parecido com o filme secreto é o filme que você chutou. É um jogo similar a Contexto e Termooo.',
    images: {
      url: 'gtm-og-image.png',
      alt: 'Filme Secreto og-image',
    },
  },
  twitter: {
    creator: '@csamsanm',
    card: 'summary_large_image',
  },
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Layout>{children}</Layout>
          <Analytics />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1009095463777730"
            id="adsbygoogle-init"
            strategy='afterInteractive'
            crossOrigin='anonymous'>
          </Script>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
