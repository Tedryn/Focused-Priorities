/** Individual photo within a gallery */
export interface Photo {
  src: string;
  width?: number;
  height?: number;
  caption?: string;
  camera?: string;
  lens?: string;
  film?: string;
  exposure?: string;
  notes?: string;
}

/** A gallery collection parsed from /content/gallery/*.md */
export interface Gallery {
  title: string;
  slug: string;
  description: string;
  date: string;
  featuredImage: string;
  photos: Photo[];
  tags?: string[];
}

/** A blog post parsed from /content/blog/*.md */
export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage?: string;
  tags?: string[];
  htmlContent?: string;
  readingTime?: {
    minutes: number;
    text: string;
  };
}

/** Raw frontmatter data before validation (gallery) */
export interface GalleryFrontmatter {
  title?: string;
  slug?: string;
  description?: string;
  date?: string;
  featuredImage?: string;
  photos?: Photo[];
  tags?: string[];
}

/** Raw frontmatter data before validation (blog) */
export interface BlogPostFrontmatter {
  title?: string;
  slug?: string;
  date?: string;
  excerpt?: string;
  featuredImage?: string;
  tags?: string[];
}
