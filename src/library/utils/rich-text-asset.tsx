import React from 'react';
import Image from 'components/shared/image';
import { BLOCKS } from '@contentful/rich-text-types';
import { CustomMarkdownOptionsModel, RichTextModel } from 'models/contentful';

export const customMarkdownOptions = ( content : CustomMarkdownOptionsModel ) => ( {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ( node : any ) => (
      <RichTextAsset
        id={ node.data.target.sys.id }
        assets={ content.links.assets.block }
      />
    )
  }
} );

export default function RichTextAsset( { id, assets } : RichTextModel ) {
  const asset = assets?.find( ( asset : any ) => asset.sys.id === id );

  if ( asset?.url ) {
    return <Image src={ asset.url } layout='fill' alt={ asset.description } />;
  }

  return null;
}
