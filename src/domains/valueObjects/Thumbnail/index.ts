import { RawThumbnail } from '@domains/responses/RawThumbnail';
import { Url, toUrl } from '../Url';

export type Thumbnail = {
  title: string;
  url: Url;
  contentType: string;
  size: number;
  width: number;
  height: number;
  description?: string;
};

export function getMockThumbnail(): Thumbnail {
  return {
    title: '',
    url: toUrl('https://dummyimage.com/600x400/000/fff'),
    contentType: '',
    size: 0,
    width: 0,
    height: 0,
  };
}

export function normalizeThumbnail({
  fields: {
    title,
    description,
    file: {
      url,
      contentType,
      details: {
        size,
        image: { width, height },
      },
    },
  },
}: RawThumbnail): Thumbnail {
  return {
    title,
    contentType,
    size,
    width,
    height,
    url: toUrl(url),
    ...(description ? { description } : {}),
  };
}
