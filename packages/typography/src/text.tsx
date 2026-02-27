import React from 'react';
import type { TypographyProps } from './types';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'overline';

export interface TextProps extends TypographyProps {
  variant?: TextVariant;
}

const variantStyles: Record<TextVariant, string> = {
  h1: 'text-3xl font-bold tracking-tight text-[var(--ds-text-primary)]',
  h2: 'text-2xl font-semibold tracking-tight text-[var(--ds-text-primary)]',
  h3: 'text-xl font-semibold text-[var(--ds-text-primary)]',
  h4: 'text-lg font-medium text-[var(--ds-text-primary)]',
  body: 'text-base font-normal text-[var(--ds-text-primary)] leading-normal',
  'body-sm': 'text-sm font-normal text-[var(--ds-text-secondary)] leading-normal',
  caption: 'text-xs font-normal text-[var(--ds-text-muted)]',
  overline: 'text-xs font-medium uppercase tracking-wider text-[var(--ds-text-secondary)]',
};

const defaultTag: Record<TextVariant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  overline: 'span',
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ variant = 'body', as, className = '', children, ...props }, ref) => {
    const Tag = (as ?? defaultTag[variant]) as 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    const styles = variantStyles[variant];
    return (
      <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={`${styles} ${className}`.trim()} {...(props as any)}>
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';
