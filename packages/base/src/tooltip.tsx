/**
 * Tooltip - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 */

import React, { useState, useCallback, useRef } from 'react';
import { useId } from './utils/useId';

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  delay?: number;
  tooltipClassName?: string;
}

export function Tooltip({ children, content, delay = 300, tooltipClassName }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  const child = React.Children.only(children);
  const triggerProps = {
    'aria-describedby': visible ? tooltipId : undefined,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  };

  return (
    <>
      {React.cloneElement(child, triggerProps)}
      {visible && (
        <div id={tooltipId} role="tooltip" className={tooltipClassName}>
          {content}
        </div>
      )}
    </>
  );
}
