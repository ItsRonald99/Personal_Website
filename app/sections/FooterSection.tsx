import Container from "@/app/components/Container";
import type { SiteContent } from "@/data/content";

interface FooterSectionProps {
  content: Pick<SiteContent, "name" | "github" | "email">;
}

export default function FooterSection({ content }: FooterSectionProps) {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 py-10">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-stone-400 dark:text-stone-500">
          © {new Date().getFullYear()} {content.name}. Built with Next.js & ☕
        </p>
        <div className="flex items-center gap-4">
          <a
            href={content.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
            aria-label="GitHub profile"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href={`mailto:${content.email}`}
            className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
            aria-label="Send email"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </Container>
    </footer>
  );
}
