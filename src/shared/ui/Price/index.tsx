import { ReactNode } from 'react';

type PriceProps = {
  children: ReactNode;
  block: 'place-card' | 'offer';
};

export function Price({ children, block }: PriceProps) {
  return (
    <div className={`${block}__price`}>
      <b className={`${block}__price-value`}>&euro;{children}</b>
      <span className={`${block}__price-text`}>&#47;&nbsp;night</span>
    </div>
  );
}
