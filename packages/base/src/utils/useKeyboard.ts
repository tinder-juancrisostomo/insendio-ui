import { useCallback } from 'react';

export type KeyHandler = (event: React.KeyboardEvent) => void;

export function useKeyboard(handlers: Record<string, KeyHandler>) {
  return useCallback(
    (event: React.KeyboardEvent) => {
      const handler = handlers[event.key];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    },
    [handlers]
  );
}
