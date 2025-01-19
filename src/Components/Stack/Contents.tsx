import { useContext } from "preact/hooks";
import { SettingsContext } from "../../providers/SettingsProvider";
import { GlobalContext } from "../../providers/GlobalStateProvider";
import { WindowContext } from "../../providers/WindowProvider";
import * as Types from "../../types";

const renderNumber = (
  val: number,
  dispSize: number,
  dispMode: string
): string => {
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
};

//  Figure out how many rows we can actually show in the stack.
const calcHiddenRowCount = (
  stackLength: number,
  windowHeight: number
): number => {
  //  These values are based on CSS (somewhat brittle as a result)
  const lineHeight = 1.43;
  const rem = 16;
  const vh = windowHeight * 0.01;
  const fontSize = Math.max(3 * vh, rem);
  const entryAndSettingsHeight = Math.max(6 * vh, 1.5 * rem);
  const heightOfEntireStack = (vh * 100 * 7) / 9; //  Has 7/9 of the screen

  const stackHeight = heightOfEntireStack - 2 * entryAndSettingsHeight - rem;
  const numRows = Math.floor(stackHeight / (fontSize * lineHeight));
  return Math.max(stackLength - numRows, 0);
};

export function StackContents() {
  const { dispSize, dispMode } = useContext(SettingsContext);
  const { currentStack } = useContext(GlobalContext);
  const { height } = useContext(WindowContext);

  const rowsToHide = calcHiddenRowCount(currentStack.value.length, height);

  return (
    <div class="contentsContainer">
      {currentStack.value.map((val, index) =>
        index >= rowsToHide ? (
          <div key={index}>{renderNumber(val, dispSize, dispMode)}</div>
        ) : null
      )}
    </div>
  );
}
