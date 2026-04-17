interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <span className="inline-block font-mono text-xs font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-2">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-stone-500 dark:text-stone-400 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
