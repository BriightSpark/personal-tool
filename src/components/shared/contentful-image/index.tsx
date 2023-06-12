import React from 'react';
import Image from '../image';

interface ContenfulImageModel {
  src: string
  width?: number
  height?: number
  quality?: string
  alt?: string
  loader?: any
  className?: string
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive'
}

const contentfulLoader = ( { src, width, quality } : ContenfulImageModel ) => {
  return `${ src }?w=${ width }&q=${ quality || 75 }`;
};

const ContentfulImage = ( props : ContenfulImageModel ) => {
  return <Image loader={ contentfulLoader } { ...props } />;
};

export default ContentfulImage;
