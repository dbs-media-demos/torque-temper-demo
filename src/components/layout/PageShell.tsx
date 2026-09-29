import { ViewTransition, type ReactNode } from "react";

/** Wraps each page's <main> so route changes run the garage-door transition. */
export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <main id="main" className={className}>
        {children}
      </main>
    </ViewTransition>
  );
}
