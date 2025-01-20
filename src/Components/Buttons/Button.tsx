import { useContext } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { ButtonProps } from "../../types";
import { EntryContext } from "../../providers/EntryProvider";

interface ComponentProps extends ButtonProps {
  col: number | string;
  row: number | string;
}

export function Button({
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

  let content: string | JSX.Element;
  if (hasSuperscript) {
    content = (
      <span>
        {superscriptShownFirst && <sup>{superscript}</sup>}
        {label}
        {!superscriptShownFirst && <sup>{superscript}</sup>}
      </span>
    );
  } else {
    content = label;
  }

  return (
    <div class="layout" style={`--col: ${col}; --row: ${row};`}>
      <button
        class={`${type}`}
        onClick={() => onKeyPress(value)}
        style={`--paddingBottom: ${hasSuperscript ? "8px" : "0"};`}
        value={value}
      >
        {content}
      </button>
    </div>
  );
}
