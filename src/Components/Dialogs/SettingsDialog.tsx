import { useContext, useRef } from "preact/hooks";
import { GlobalContext } from "../../providers/GlobalStateProvider";
import { SettingsContext } from "../../providers/SettingsProvider";
import * as Types from "../../types";

const trigOptions = [
  { value: String([Types.TRIG.DEGS]), label: "Degrees" },
  { value: String([Types.TRIG.RADS]), label: "Radians" },
];

const displayOptions = [
  { value: String([Types.DISP_MODES.FIXED]), label: "Fixed" },
  { value: String([Types.DISP_MODES.PRECISION]), label: "Precision" },
  { value: String([Types.DISP_MODES.EXP]), label: "Exponential" },
];

const sizeOptions = [
  [Types.DISP_SIZES.ONE],
  [Types.DISP_SIZES.TWO],
  [Types.DISP_SIZES.THREE],
  [Types.DISP_SIZES.FOUR],
  [Types.DISP_SIZES.FIVE],
  [Types.DISP_SIZES.SIX],
  [Types.DISP_SIZES.SEVEN],
  [Types.DISP_SIZES.EIGHT],
  [Types.DISP_SIZES.NINE],
  [Types.DISP_SIZES.TEN],
];

export function SettingsDialog() {
  const settingsRef = useRef<HTMLDialogElement>(null);
  const displayRef = useRef<HTMLSelectElement>(null);
  const sizeRef = useRef<HTMLSelectElement>(null);
  const trigRef = useRef<HTMLSelectElement>(null);

  const { showSettings } = useContext(GlobalContext);
  const settingsContext = useContext(SettingsContext);

  const closeDialog = () => {
    showSettings.value = false;
    settingsRef.current.close();
  };

  const onSave = () => {
    settingsContext.updateSettings(
      trigRef.current.value,
      Number(sizeRef.current.value),
      displayRef.current.value
    );
    closeDialog();
  };

  const resetFormElementsToMatchState = () => {
    trigRef.current.value = settingsContext.trigMode;
    displayRef.current.value = settingsContext.dispMode;
    sizeRef.current.value = String(settingsContext.dispSize);
  };

  if (showSettings.value) {
    resetFormElementsToMatchState();
    settingsRef.current.showModal();
  }

  const renderTrigMode = () => (
    <div>
      <label for="trigMode">Trigonometry Mode:</label>
      <select id="trigMode" ref={trigRef}>
        {trigOptions.map((opt) => (
          <option
            value={opt.value}
            selected={settingsContext.trigMode == opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderDisplayMode = () => (
    <div>
      <label for="displayMode">Display Mode:</label>
      <select id="displayMode" ref={displayRef}>
        {displayOptions.map((opt) => (
          <option
            value={opt.value}
            selected={settingsContext.dispMode == opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderSize = () => (
    <div>
      <label for="prec">Precision:</label>
      <select id="prec" ref={sizeRef}>
        {sizeOptions.map((opt) => (
          <option
            value={String(opt)}
            selected={settingsContext.dispSize == Number(opt)}
          >
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <dialog class="dialog dialogContainer" ref={settingsRef}>
      <h2>Edit Settings</h2>
      <div class="settingsForm">
        {renderTrigMode()}
        {renderDisplayMode()}
        {renderSize()}
      </div>
      <div class="closer">
        <button class="cancel" onClick={closeDialog}>
          <span>Cancel</span>
        </button>
        <button class="closer" onClick={onSave}>
          <span>Save Changes</span>
        </button>
      </div>
    </dialog>
  );
}
