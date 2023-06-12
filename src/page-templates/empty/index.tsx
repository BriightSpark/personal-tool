import React from 'react';
import Alert from 'components/template/alert';
import Meta, { MetaI } from 'components/template/meta';
import { SocialNavigation } from 'components/template/social-nav';

interface LayoutModel {
  preview: any
  children: any
  meta: MetaI
}

export default function Layout( { preview, children, meta } : LayoutModel ) {
  return (
    <>
      <Meta { ...meta } />
      <div className=''>
        <Alert preview={ preview } />
        <SocialNavigation />
        <main>{ children }</main>
      </div>
    </>
  );
}
