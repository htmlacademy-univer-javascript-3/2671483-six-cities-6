import { ReactNode } from 'react';

type PriceProps = {
  children: ReactNode;
};

export function Price({ children }: PriceProps) {
  return (
    <div className="place-card__price">
      <b className="place-card__price-value">&euro;{children}</b>
      <span className="place-card__price-text">&#47;&nbsp;night</span>
    </div>
  );
}
