import React from 'react';

import { Header } from 'components/template/header';
import { SocialNavigation } from 'components/template/social-nav';
import { ScrollToTop } from 'components/template/scroll-top';
import { Breadcrumb } from 'components/template/breadcrumbs';
import Alert from 'components/template/alert';
import Meta, { MetaI } from 'components/template/meta';

import { motion } from 'framer-motion';
import { main } from './motion';
import { v4 as uuidv4 } from 'uuid';

interface LayoutModel {
  preview: any
  children: any
  className?: string
  absoluteHeader?: boolean
  meta: MetaI
}

export default function ContentLayout( { preview, absoluteHeader = false, children, meta, className = '' } : LayoutModel ) {
  return (
    <>
      <Meta { ...meta } />
      <Header absoluteHeader={ absoluteHeader } />
      <motion.main
        className={ `min-height ${ className }` }
        variants={ main }
        initial='hidden'
        animate='enter'
        exit='exit'
        key={ uuidv4() }
      >
        <Breadcrumb />
        <Alert preview={ preview } />
        { children }
      </motion.main>
      <SocialNavigation />
      <ScrollToTop />
    </>
  );
}
