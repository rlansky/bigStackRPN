import { useContext, useEffect } from "preact/hooks";
import { createContext } from "preact";
import { EntryContext } from "./EntryProvider";
import { GlobalContext } from "./GlobalStateProvider";
import * as Types from "../types";

export const KeyboardContext = createContext<null>(null);

const passthroughKeys = [
  ...Types.NUM_KEYS,
  Types.BUTTONS["."].value,
  Types.BUTTONS.EXP.value,
];

const mappedKeys = {
  "+": Types.BUTTONS.ADD.value,
  "/": Types.BUTTONS.DIVIDE.value,
  "*": Types.BUTTONS.MULTIPLY.value,
  ArrowRight: Types.BUTTONS.SWAP.value,
  ArrowLeft: Types.BUTTONS.SWAP.value,
  ArrowUp: Types.BUTTONS.ROTATE_UP.value,
  ArrowDown: Types.BUTTONS.ROTATE_DOWN.value,
  Backspace: Types.BUTTONS.DELETE.value,
  Enter: Types.BUTTONS.ENTER.value,
};

export const KeyboardProvider = ({ children }) => {
  const { onKeyPress } = useContext(EntryContext);
  const { entry } = useContext(GlobalContext);

  //  Listens for certain keypress and simulates the equivilant button press in the application
  const onKeyboardDown = (event) => {
    const { key } = event;
    let keyUsed = false;

    if (passthroughKeys.includes(key)) {
      onKeyPress(key);
      keyUsed = true;
    } else if (Object.keys(mappedKeys).includes(key)) {
      onKeyPress(mappedKeys[key]);
      keyUsed = true;
    } else if (key === "-") {
      //  Different depending on if they are entering a number or not
      if (entry.value === "") {
        onKeyPress(Types.BUTTONS.SUBTRACT.value);
      } else {
        onKeyPress(Types.BUTTONS.NEG.value);
      }
      keyUsed = true;
    }

    //  Only stop propogation if we've used the key (don't want tp break their browser shortcuts)
    if (keyUsed) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyboardDown);

    return () => {
      window.removeEventListener("keydown", onKeyboardDown);
    };
  }, [onKeyboardDown]);

  return (
    <KeyboardContext.Provider value={null}>{children}</KeyboardContext.Provider>
  );
};
