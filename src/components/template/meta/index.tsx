import React from 'react';
import Head from 'next/head';

export interface MetaI {
  pageName: string;
  description?: string;
}

export default function Meta( { pageName, description = `Gia Bao Tran's personal site` } : MetaI ) {

  const siteName = 'Gia Bao Tran';
  const siteUrl = 'https://tool.giabaotran.dev';
  const ogImage = ''; // TODO

  return (
    <Head>
      <title>{ pageName ? `${ siteName } - ${ pageName }` : 'Gia Bao Tran' }</title>
      <meta name='description' content={ description } />
      <meta property='og:type' content='website' />
      <meta name='og:title' property='og:title' content={ siteName } />
      <meta name='og:description' property='og:description' content={ description } />
      <meta property='og:site_name' content={ siteName } />
      <meta property='og:url' content={ siteUrl } />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={ siteName } />
      <meta name='twitter:description' content={ description } />
      <meta name='twitter:site' content='' />
      <meta name='twitter:creator' content='' />
      <link rel='icon' type='image/svg' href='/favicon.ico' />
      <link rel='apple-touch-icon' sizes='180x180' href='/favicon.ico' />
      <meta property='og:image' content={ ogImage } />
      <meta name='twitter:image' content={ ogImage } />
    </Head>
  );
}
