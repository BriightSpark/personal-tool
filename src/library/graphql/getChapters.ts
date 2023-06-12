import { fetchGraphQL } from './api';
import { POST_GRAPHQL_CHAPTER_FIELDS } from 'models/chapter';

function extractChapterEntries( fetchResponse: any ) {
  return fetchResponse?.data?.chapterCollection?.items;
}

export async function getAllStoryChapters( preview: any, locale?: string ) {
  const entries = await fetchGraphQL(
    `query {
      chapterCollection(where: { id_exists: true }, order:id_ASC, preview: ${ preview ? 'true' : 'false' }, limit:10,locale: "${ locale }" ) {
        items {
          ${ POST_GRAPHQL_CHAPTER_FIELDS }
        }
      }
    }`
  );
  return extractChapterEntries( entries );
}