import { RawPost } from '@domains/responses/RawPost';
import { Thumbnail, normalizeThumbnail, getMockThumbnail } from '../Thumbnail';

export type Post = {
  id: string;
  published: string;
  title: string;
  post: string;
  thumbnail: Thumbnail;
  tags: string[];
};

export function getMockPost(): Post {
  return {
    id: '',
    published: '0',
    title: '',
    post: '',
    thumbnail: getMockThumbnail(),
    tags: [],
  };
}

export function normalizePost({ sys: { id }, fields: { published, title, post, thumbnail, tags } }: RawPost): Post {
  return {
    id,
    published,
    title,
    post,
    tags: tags ?? [],
    thumbnail: normalizeThumbnail(thumbnail),
  };
}
