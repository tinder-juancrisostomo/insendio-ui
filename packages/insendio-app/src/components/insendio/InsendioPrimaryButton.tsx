import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

export interface InsendioPrimaryButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

/**
 * Specialized Button: wraps generic Button with Insendio purple primary styling.
 */
export function InsendioPrimaryButton({
  children,
  className,
  size = 'md',
  disabled,
  onClick,
  type = 'button',
}: InsendioPrimaryButtonProps) {
  const { Button } = useInsendioComponents();
  return (
    <Button
      variant="default"
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={cn('bg-[#7B1FA2] hover:bg-[#6A1B9A]', className)}
    >
      {children}
    </Button>
  );
}
