import type { RawThumbnail } from './RawThumbnail';

export type RawPost = {
  sys: {
    id: string;
  };
  fields: {
    published: string;
    title: string;
    post: string;
    thumbnail: RawThumbnail;
    tags?: string[];
  };
};
