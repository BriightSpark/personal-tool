import { fetchGraphQL } from './api';
import { POST_GRAPHQL_POST_FIELDS } from 'models/post';

function extractPost( fetchResponse: any ) {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries( fetchResponse: any ) {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getPreviewPostBySlug( slug: any ) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${ slug }" }, preview: true, limit: 1) {
        items {
          ${ POST_GRAPHQL_POST_FIELDS }
        }
      }
    }`,
    true
  );
  return extractPost( entry );
}

export async function getAllPostsWithSlug( locale?: string ) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC, locale: "${ locale }") {
        items {
          ${ POST_GRAPHQL_POST_FIELDS }
        }
      }
    }`
  );
  return extractPostEntries( entries );
}

export async function getAllPostsForHome( preview: any, locale: string ) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, preview: ${ preview ? 'true' : 'false' }, locale: "${ locale }") {
        items {
          ${ POST_GRAPHQL_POST_FIELDS }
        }
      }
    }`,
    preview
  );
  return extractPostEntries( entries );
}

export async function getPostAndMorePosts( { slug = '', preview, locale = '' } : { slug: any, preview: boolean, locale?: string } ) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${ slug }" }, preview: ${ preview ? 'true' : 'false' }, limit: 1, locale: "${ locale }") {
        items {
          ${ POST_GRAPHQL_POST_FIELDS }
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${ slug }" }, order: date_DESC, preview: ${ preview ? 'true' : 'false' }, limit: 2, locale: "${ locale }") {
        items {
          ${ POST_GRAPHQL_POST_FIELDS }
        }
      }
    }`,
    preview
  );
  return {
    post: extractPost( entry ),
    morePosts: extractPostEntries( entries )
  };
}
