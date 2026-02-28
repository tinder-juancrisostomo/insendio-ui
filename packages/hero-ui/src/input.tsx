import * as React from 'react';
import { Input as HeroInput } from '@heroui/react';
import type { InputProps as HeroInputProps } from '@heroui/react';

export interface InputProps extends HeroInputProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ iconLeft, iconRight, startContent, endContent, ...props }, ref) => {
    return (
      <HeroInput
        ref={ref}
        startContent={iconLeft ?? startContent}
        endContent={iconRight ?? endContent}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
