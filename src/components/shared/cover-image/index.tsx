import React from 'react';
import ContentfulImage from 'components/shared/contentful-image';
import Link from 'components/shared/link';
import cn from 'classnames';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

interface CoverImageModel {
  title: string
  url?: string
  slug?: string
  imgSrc?: string
}

export default function CoverImage( { title, url, slug, imgSrc = '' } : CoverImageModel ) {
  const image = (
    <ContentfulImage
      width={ 2000 }
      height={ 1000 }
      alt={ `Cover Image for ${ title }` }
      className={ cn( 'shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug
      } ) }
      src={ imgSrc }
    />
  );

  return (
    <div className='sm:mx-0'>
      { slug ? (
        <Link href={ `/post/${ slug }` } scroll={ false }>
          <a aria-label={ title } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>{ image }</a>
        </Link>
      ) : (
        image
      ) }
    </div>
  );
}
