import type { Thumbnail } from './Thumbnail';

export type Post = {
  sys: {
    id: string;
  };
  fields: {
    published: string;
    title: string;
    post: string;
    thumbnail: Thumbnail;
    tags?: string[];
  };
};
