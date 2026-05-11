import type { ReactNode } from 'react';

type ProseProps = {
  children?: ReactNode;
  html?: string;
  className?: string;
};

export function Prose({ children, html, className = '' }: ProseProps) {
  if (html !== undefined) {
    return (
      <div
        className={`prose ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return <div className={`prose ${className}`.trim()}>{children}</div>;
}
