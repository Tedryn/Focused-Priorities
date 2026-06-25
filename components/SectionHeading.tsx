interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="border-b border-border pb-8">
      <h2 className="font-cormorant text-4xl font-normal tracking-wide text-foreground md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 font-montserrat text-sm tracking-wide text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
