import { useEffect, useState, useMemo, useCallback } from "preact/hooks";
import { createContext } from "preact";
import { debounce } from "../utils/debounce";
import * as Types from "../types";

export const WindowContext = createContext<Types.WindowContext | null>(null);

export const WindowProvider = ({ children }) => {
  const [height, setHeight] = useState<number>(0);
  const [isLandscape, setIsLandscape] = useState<boolean>(true);

  const handleWindowChange = useCallback(() => {
    setHeight(window.innerHeight);
    const aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio > 1.0 && !isLandscape) {
      setIsLandscape(true);
    } else if (aspectRatio <= 1.0 && isLandscape) {
      setIsLandscape(false);
    }
  }, [isLandscape]);

  const onWindowChange = useMemo(
    () => debounce(handleWindowChange, 100, 1000),
    [handleWindowChange]
  );

  useEffect(() => {
    window.addEventListener("resize", onWindowChange);
    window.addEventListener("orientationchange", onWindowChange);
    onWindowChange();

    return () => {
      window.removeEventListener("resize", onWindowChange);
      window.removeEventListener("orientationchange", onWindowChange);
    };
  }, [onWindowChange]);

  const contextValue = useMemo(() => ({ height, isLandscape }), [height, isLandscape]);

  return (
    <WindowContext.Provider value={contextValue}>
      {children}
    </WindowContext.Provider>
  );
};
