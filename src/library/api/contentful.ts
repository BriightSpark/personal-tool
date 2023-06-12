import { createClient } from 'contentful';

export const CONTENT_TYPE_POST = 'post';
export const CONTENT_TYPE_PERSON = 'author';
export const CONTENT_TYPE_TAGS = 'tag';

export class ContentfulService {
  private client = createClient( {
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
  } );

  /**
   * Get all tags
   */
  async getAllTags() {
    const content = await this.client.getTags();

    const tags = content.items.map(
      ( { sys, name } : { sys: any; name: string } ) => ( {
        id: sys.id,
        name: name
      } )
    );

    return { tags };
  }

  async fetchSuggestions( tags: string[], currentArticleSlug: string ) {
    const limit = 3;
    let entries = [];

    const initialOptions = {
      content_type: CONTENT_TYPE_POST,
      limit,
      // find at least one matching tag, else undefined properties are not copied
      'fields.tags.sys.id[in]': tags.length ? tags.join( ',' ) : undefined,
      'fields.slug[ne]': currentArticleSlug // exclude current article
    };

    try {
      const suggestionsByTags = await this.client.getEntries( initialOptions );

      entries = suggestionsByTags.items;
      // number of suggestions by tag is less than the limit
      if ( suggestionsByTags.total < limit ) {
        // exclude already picked slugs
        const slugsToExclude = [
          ...suggestionsByTags.items,
          { fields: { slug: currentArticleSlug } }
        ]
        .map( ( item: { fields: any } ) => item.fields.slug )
        .join( ',' );

        // fetch random suggestions
        const randomSuggestions = await this.client.getEntries( {
          content_type: CONTENT_TYPE_POST,
          limit: limit - suggestionsByTags.total,
          'fields.slug[nin]': slugsToExclude // exclude slugs already fetched
        } );

        entries = [...entries, ...randomSuggestions.items];
      }

      return entries;
    }
    catch ( e ) {
      console.error( e );
    }
  }
}
