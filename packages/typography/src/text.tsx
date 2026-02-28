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

const variantClasses: Record<TextVariant, string> = {
  h1: 'ds-text-h1',
  h2: 'ds-text-h2',
  h3: 'ds-text-h3',
  h4: 'ds-text-h4',
  body: 'ds-text-body',
  'body-sm': 'ds-text-body-sm',
  caption: 'ds-text-caption',
  overline: 'ds-text-overline',
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
    const variantClass = variantClasses[variant];
    return (
      <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={`${variantClass} ${className}`.trim()} {...(props as any)}>
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';
