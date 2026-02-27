import { useCallback, useMemo, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useTheme } from '../context/ThemeContext';

interface CodeEditorProps {
  code: string;
  ariaLabel?: string;
  maxHeightPx?: number;
}

export function CodeEditor({ code, ariaLabel = 'Code example', maxHeightPx = 360 }: CodeEditorProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const extensions = useMemo(() => [javascript({ typescript: true, jsx: true })], []);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore (clipboard not available)
    }
  }, [code]);

  return (
    <div className="mt-3 rounded-lg border border-[var(--ds-border-default)] overflow-hidden bg-[var(--ds-bg-elevated)]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)]">
        <span className="text-xs font-medium text-[var(--ds-text-secondary)]">Code</span>
        <button
          type="button"
          onClick={onCopy}
          className="rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] px-2 py-1 text-xs"
          aria-label="Copy code"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div style={{ maxHeight: maxHeightPx, overflow: 'auto' }}>
        <CodeMirror
          value={code}
          theme={theme === 'dark' ? oneDark : undefined}
          extensions={extensions}
          editable={false}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: false,
            foldGutter: false,
          }}
          aria-label={ariaLabel}
        />
      </div>
    </div>
  );
}

