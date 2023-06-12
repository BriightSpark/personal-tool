import React, { useEffect, useState } from 'react';
import { default as NextImage, ImageProps } from 'next/image';

const Image = ( { src, ...rest } : ImageProps ) => {
  const [imgSrc, setImgSrc] = useState( src );

  useEffect( () => {
    setImgSrc( src );
  }, [src] );

  return (
    <NextImage
      { ...rest }
      src={ imgSrc ? imgSrc : '/public/fallback-img.webp' }
      onError={ () => {
        setImgSrc( '/public/fallback-img.webp' );
      } }
    />
  );
};

export default Image;