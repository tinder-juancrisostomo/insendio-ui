import { Tooltip as BaseTooltip, type TooltipProps as BaseTooltipProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export interface TooltipProps extends BaseTooltipProps {
  tooltipClassName?: string;
}

export function Tooltip({ tooltipClassName, content, ...props }: TooltipProps) {
  return (
    <BaseTooltip
      {...props}
      content={content}
      tooltipClassName={cn('rounded-md bg-gray-900 px-2 py-1 text-xs text-white', tooltipClassName)}
    />
  );
}
