import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@design-system/utils';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  'aria-label'?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Combobox mapped to Radix Select.
 * Note: Radix Select is a dropdown, not a filterable combobox.
 * For full typeahead/filter support, use @design-system/base Combobox.
 */
export function Combobox({
  options,
  value,
  defaultValue,
  onValueChange,
  'aria-label': ariaLabel,
  placeholder = 'Select...',
  disabled = false,
  className,
}: ComboboxProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        aria-label={ariaLabel}
        className={cn(
          'flex h-10 w-full max-w-xs items-center justify-between rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] px-3 py-2 text-sm',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <span className="ml-auto" aria-hidden>▼</span>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(
            'z-50 max-h-60 min-w-[8rem] overflow-hidden rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-1 shadow-md',
            '[&_ul]:mt-1 [&_ul]:max-h-60 [&_ul]:overflow-auto [&_ul]:rounded-md [&_ul]:border [&_ul]:border-gray-200 [&_ul]:bg-white [&_ul]:py-1',
            '[&_li]:cursor-pointer [&_li]:px-3 [&_li]:py-2 [&_li]:text-sm [&_li:hover]:bg-gray-100 [&_li[aria-selected=true]]:bg-gray-100'
          )}
        >
          {options.map((opt) => (
            <SelectPrimitive.Item
              key={opt.value}
              value={opt.value}
              className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 pl-8 text-sm outline-none',
                'focus:bg-[var(--ds-bg-muted)] data-[highlighted]:bg-[var(--ds-bg-muted)]'
              )}
            >
              <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute left-2 flex h-4 w-4 items-center justify-center">
                ✓
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
