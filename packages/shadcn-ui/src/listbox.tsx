import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@design-system/utils';

export interface ListboxOption {
  value: string;
  label: string;
}

export interface ListboxProps {
  options: ListboxOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiple?: boolean;
  'aria-label'?: string;
  disabled?: boolean;
  className?: string;
}

export function Listbox({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  'aria-label': ariaLabel,
  disabled = false,
  className,
}: ListboxProps) {
  const singleValue =
    typeof controlledValue === 'string'
      ? controlledValue
      : Array.isArray(controlledValue)
        ? controlledValue[0]
        : undefined;
  const singleDefault =
    typeof defaultValue === 'string'
      ? defaultValue
      : Array.isArray(defaultValue)
        ? defaultValue[0]
        : undefined;

  if (multiple) {
    return (
      <div
        className={cn(
          'w-full max-w-xs rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-1',
          className
        )}
        role="listbox"
        aria-multiselectable="true"
        aria-label={ariaLabel}
        aria-disabled={disabled}
      >
        {options.map((opt) => {
          const isSelected = Array.isArray(controlledValue)
            ? controlledValue.includes(opt.value)
            : Array.isArray(defaultValue)
              ? defaultValue.includes(opt.value)
              : false;
          return (
            <div
              key={opt.value}
              role="option"
              aria-selected={isSelected}
              className={cn(
                'cursor-pointer rounded px-3 py-2 text-sm',
                'hover:bg-[var(--ds-bg-muted)]',
                isSelected && 'bg-[var(--ds-bg-muted)]'
              )}
              onClick={() => {
                if (disabled) return;
                const current = Array.isArray(controlledValue)
                  ? controlledValue
                  : Array.isArray(defaultValue)
                    ? defaultValue
                    : [];
                const next = current.includes(opt.value)
                  ? current.filter((v) => v !== opt.value)
                  : [...current, opt.value];
                onValueChange?.(next);
              }}
            >
              {opt.label}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <SelectPrimitive.Root
      value={singleValue}
      defaultValue={singleDefault}
      onValueChange={(v) => v && onValueChange?.(v)}
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
        <SelectPrimitive.Value placeholder="Select..." />
        <span className="ml-auto" aria-hidden>▼</span>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(
            'z-50 max-h-60 min-w-[8rem] overflow-hidden rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-1 shadow-md'
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
