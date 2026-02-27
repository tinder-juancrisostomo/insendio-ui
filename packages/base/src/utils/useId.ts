import { useId as useReactId } from 'react';

export function useId(idOverride?: string): string {
  const reactId = useReactId();
  return idOverride ?? reactId;
}
