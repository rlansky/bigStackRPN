import { useEffect, useState } from "preact/hooks";
import { createContext } from "preact";
import debounce from "lodash.debounce";
import * as Types from "../types";

export const WindowContext = createContext<Types.WindowContext | null>(null);

export const WindowProvider = ({ children }) => {
  const [height, setHeight] = useState<number>(0);
  const [isLandscape, setIsLandscape] = useState<boolean>(true);

  const onWindowChange = debounce(
    () => {
      setHeight(window.innerHeight);
      const aspectRatio = window.innerWidth / window.innerHeight;
      if (aspectRatio > 1.0 && !isLandscape) {
        setIsLandscape(true);
      } else if (aspectRatio <= 1.0 && isLandscape) {
        setIsLandscape(false);
      }
    },
    100,
    { maxWait: 1000 }
  );

  useEffect(() => {
    window.addEventListener("resize", onWindowChange);
    window.addEventListener("orientationchange", onWindowChange);
    onWindowChange();

    return () => {
      window.removeEventListener("resize", onWindowChange);
      window.removeEventListener("orientationchange", onWindowChange);
    };
  }, [isLandscape, onWindowChange]);

  return (
    <WindowContext.Provider value={{ height, isLandscape }}>
      {children}
    </WindowContext.Provider>
  );
};
