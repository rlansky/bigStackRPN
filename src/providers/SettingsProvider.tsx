import { useEffect, useState, useCallback, useMemo } from "preact/hooks";
import { createContext } from "preact";
import * as Types from "../types";

const STORAGE_KEY = "bigStackSettings";

export const SettingsContext = createContext<Types.SettingsContext | null>(
  null
);

export const SettingsProvider = ({ children }) => {
  const [dispMode, setDispMode] = useState<string>(Types.DISP_MODES.PRECISION);
  const [dispSize, setDispSize] = useState<number>(Types.DISP_SIZES.FIVE);
  const [trigMode, setTrigMode] = useState<string>(Types.TRIG.DEGS);

  const updateSettings = useCallback(
    (
      newTrigMode: string,
      newDispSize: number,
      newDispMode: string
    ) => {
      let updateHasHappened = false;

      if (newTrigMode !== trigMode) {
        updateHasHappened = true;
        setTrigMode(newTrigMode);
      }
      if (newDispSize !== dispSize) {
        updateHasHappened = true;
        setDispSize(newDispSize);
      }
      if (newDispMode !== dispMode) {
        updateHasHappened = true;
        setDispMode(newDispMode);
      }

      if (updateHasHappened) {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            dispMode: newDispMode,
            dispSize: newDispSize,
            trigMode: newTrigMode,
          })
        );
      }
    },
    [dispMode, dispSize, trigMode]
  );

  //  Loads the previous settings, if any
  useEffect(() => {
    const savedSettings = window.localStorage.getItem(STORAGE_KEY);
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setDispMode(parsedSettings.dispMode);
      setDispSize(Number(parsedSettings.dispSize));
      setTrigMode(parsedSettings.trigMode);
    }
  }, []);

  const contextValue = useMemo(() => ({
    dispMode,
    dispSize,
    trigMode,
    updateSettings,
  }), [dispMode, dispSize, trigMode, updateSettings]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
