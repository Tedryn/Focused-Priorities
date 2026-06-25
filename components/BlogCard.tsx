import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  featuredImage?: string;
  readingTime?: {
    minutes: number;
    text: string;
  };
  tags?: string[];
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  featuredImage,
  readingTime,
}: BlogCardProps) {
  return (
    <article className="group cursor-pointer">
      <Link href={`/blog/${slug}`} className="block">
        {featuredImage ? (
          /* Image + text horizontal layout */
          <div className="flex gap-4">
            {/* Image */}
            <div className="relative w-32 shrink-0 overflow-hidden rounded-[12px] sm:w-40">
              <div className="aspect-[3/2] w-full">
                <Image
                  src={featuredImage}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 160px, 160px"
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center space-y-2">
              <h3 className="font-cormorant text-xl font-normal tracking-wide text-foreground transition-colors duration-200 group-hover:text-accent">
                {title}
              </h3>
              <p className="line-clamp-2 font-montserrat text-sm leading-relaxed text-muted">
                {excerpt}
              </p>
              <MetaLine date={date} readingTime={readingTime} />
            </div>
          </div>
        ) : (
          /* Text-only card with accent border */
          <div className="border-l-2 pl-4 transition-colors duration-200 group-hover:border-accent/70">
            <h3 className="font-cormorant text-xl font-normal tracking-wide text-foreground transition-colors duration-200 group-hover:text-accent">
              {title}
            </h3>
            <p className="line-clamp-2 font-montserrat text-sm leading-relaxed text-muted">
              {excerpt}
            </p>
            <MetaLine date={date} readingTime={readingTime} />
          </div>
        )}
      </Link>
    </article>
  );
}

function MetaLine({
  date,
  readingTime,
}: {
  date: string;
  readingTime?: { minutes: number; text: string };
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-montserrat text-xs tracking-wide text-muted">
        {date}
      </span>
      {readingTime && (
        <>
          <span className="text-border">·</span>
          <span className="font-montserrat text-xs tracking-wide text-muted">
            {readingTime.text}
          </span>
        </>
      )}
    </div>
  );
}
