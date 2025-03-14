import { useContext, useMemo, useCallback } from "preact/hooks";
import { ButtonProps } from "../../types";
import { EntryContext } from "../../providers/EntryProvider";
import { memo } from "preact/compat";

interface ComponentProps extends ButtonProps {
  col: number | string;
  row: number | string;
}

function ButtonComponent({
  col,
  label,
  superscript,
  superscriptShownFirst = false,
  row,
  type = "dark",
  value,
}: ComponentProps) {
  const hasSuperscript = Boolean(superscript);
  const { onKeyPress } = useContext(EntryContext);

  const content = useMemo(() => {
    if (hasSuperscript) {
      return (
        <span>
          {superscriptShownFirst && <sup>{superscript}</sup>}
          {label}
          {!superscriptShownFirst && <sup>{superscript}</sup>}
        </span>
      );
    }
    return label;
  }, [hasSuperscript, superscript, superscriptShownFirst, label]);

  const buttonStyle = useMemo(() => 
    `--paddingBottom: ${hasSuperscript ? "8px" : "0"};`,
    [hasSuperscript]
  );

  const layoutStyle = useMemo(() => 
    `--col: ${col}; --row: ${row};`,
    [col, row]
  );

  const handleClick = useCallback(() => {
    onKeyPress(value);
  }, [onKeyPress, value]);

  return (
    <div class="layout" style={layoutStyle}>
      <button
        class={`${type}`}
        onClick={handleClick}
        style={buttonStyle}
        value={value}
      >
        {content}
      </button>
    </div>
  );
}

// Use memo to prevent re-rendering when props haven't changed
export const Button = memo(ButtonComponent);
