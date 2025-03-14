import { useContext, useMemo } from "preact/hooks";
import { SettingsContext } from "../../providers/SettingsProvider";
import { GlobalContext } from "../../providers/GlobalStateProvider";
import { WindowContext } from "../../providers/WindowProvider";
import * as Types from "../../types";

function renderNumber(val: number, dispSize: number, dispMode: string): string {
  if (!Number.isFinite(val)) {
    return String(val);
  }

  switch (dispMode) {
    case Types.DISP_MODES.FIXED: {
      return val.toFixed(dispSize);
    }
    case Types.DISP_MODES.PRECISION: {
      return val.toPrecision(dispSize);
    }
    case Types.DISP_MODES.EXP: {
      return val.toExponential(dispSize);
    }
    default:
      return String(val);
  }
}

//  Figure out how many rows we can actually show in the stack.
const calcHiddenRowCount = (
  stackLength: number,
  windowHeight: number,
  isLandscape: boolean
): number => {
  //  These values are based on CSS
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const targetLineHeight = 1.43;
  const vh = windowHeight * 0.01;

  const fontSize = Math.max(3 * vh, rem);
  const entryAndSettingsHeight = Math.max(6 * vh, 1.5 * rem);
  const stackPortionOfScreen = isLandscape ? 7.0 / 9.0 : 3.0 / 8.0;
  const heightOfEntireStack = vh * 100 * stackPortionOfScreen;

  const stackHeight = heightOfEntireStack - 2 * entryAndSettingsHeight - rem;
  const numRows = Math.floor(stackHeight / (fontSize * targetLineHeight));
  return Math.max(stackLength - numRows, 0);
};

export function StackContents() {
  const { dispSize, dispMode } = useContext(SettingsContext);
  const { currentStack } = useContext(GlobalContext);
  const { height, isLandscape } = useContext(WindowContext);

  const rowsToHide = useMemo(() => 
    calcHiddenRowCount(
      currentStack.value.length,
      height,
      isLandscape
    ), 
    [currentStack.value.length, height, isLandscape]
  );

  const stackItems = useMemo(() => 
    currentStack.value.map((val, index) =>
      index >= rowsToHide ? (
        <div key={index}>{renderNumber(val, dispSize, dispMode)}</div>
      ) : null
    ),
    [currentStack.value, rowsToHide, dispSize, dispMode]
  );

  return (
    <div class="contentsContainer">
      {stackItems}
    </div>
  );
}
