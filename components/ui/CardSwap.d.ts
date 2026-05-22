import { FC, ReactNode, CSSProperties, MouseEvent, RefAttributes, ForwardRefExoticComponent } from 'react';

export interface CardProps extends Record<string, unknown> {
  customClass?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: MouseEvent) => void;
  children?: ReactNode;
}

export declare const Card: ForwardRefExoticComponent<CardProps & RefAttributes<HTMLDivElement>>;

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children?: ReactNode;
}

declare const CardSwap: FC<CardSwapProps>;
export default CardSwap;
