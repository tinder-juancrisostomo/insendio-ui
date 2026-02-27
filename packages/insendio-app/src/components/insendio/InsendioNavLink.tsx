import { NavLink } from 'react-router-dom';
import { cn } from '@design-system/utils';

export interface InsendioNavLinkProps {
  to: string;
  children: React.ReactNode;
  /** When true, only matches exact path (e.g. for home "/") */
  end?: boolean;
  className?: string;
  'aria-label'?: string;
  onClick?: () => void;
}

/**
 * Specialized NavLink: wraps react-router NavLink with Insendio sidebar styling.
 * Active state uses blue highlight (bg-[#E3F2FD] text-[#1565C0]).
 */
export function InsendioNavLink({
  to,
  children,
  end,
  className,
  'aria-label': ariaLabel,
  onClick,
}: InsendioNavLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      aria-label={ariaLabel}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-[#E3F2FD] text-[#1565C0]'
            : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)] hover:text-[var(--ds-text-primary)]',
          className
        )
      }
    >
      {children}
    </NavLink>
  );
}
