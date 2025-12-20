import { ReactNode } from 'react';

type MarkProps = {
  className?: string;
  children: ReactNode;
};

export function Mark({ children, className }: MarkProps) {
  return (
    <mark className={className}>
      <span>{children}</span>
    </mark>
  );
}
