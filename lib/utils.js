import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

export const getEstimatedReadingTime = post => {
  const wpm = 200; // average time a reader takes (words per minute)
  const content = documentToPlainTextString(post.fields.content);
  const words = (content.match(/\w+/g) ?? []).length;
  return Math.ceil(words / wpm);
};
