import { ReactNode } from 'react';

type MarkProps = {
  children: ReactNode;
};

export function Mark({ children }: MarkProps) {
  return (
    <mark className="place-card__mark">
      <span>{children}</span>
    </mark>
  );
}
