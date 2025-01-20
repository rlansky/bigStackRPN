import { createContext } from "preact";
import { GlobalContext } from "./GlobalStateProvider";
import { StackContext } from "./StackProvider";
import { SettingsContext } from "./SettingsProvider";
import * as Types from "../types";
import { useContext } from "preact/hooks";

export const EntryContext = createContext<Types.EntryContext | null>(null);

type opFunc = (...args: number[]) => number;

export const EntryProvider = ({ children }) => {
  const { entry } = useContext(GlobalContext);
  const { trigMode } = useContext(SettingsContext);
  const stackCommands = useContext(StackContext);
  const { BUTTONS } = Types;

  const addConstant = (value: number) => {
    if (entry.value !== "") {
      //  Since they were entering a number, we'll push that onto the stack as well
      stackCommands.replace(0, [parseFloat(entry.value), value]);
      entry.value = "";
    } else {
      stackCommands.push(value);
    }
  };

  const performOperation = (numEntries: number, op: opFunc) => {
    try {
      let entries = [];
      if (entry.value !== "") {
        //  Since there is input entered, we'll include that as one of the entries in the operation
        numEntries--;
        if (numEntries === 1) {
          entries = stackCommands.fetch(numEntries);
        }
        entries.push(parseFloat(entry.value));
        entry.value = "";
      } else {
        //  Get the entries from the stack
        entries = stackCommands.fetch(numEntries);
      }

      //  Now that we have the entries for the operation, perform it an update the stack
      const result = op(...entries);
      stackCommands.replace(numEntries, result);
    } catch (e) {
      console.log(e);
    }
  };

  const performTrigOperation = (op: opFunc) => {
    performOperation(1, (x) =>
      op(trigMode === Types.TRIG.RADS ? x : (x / 180.0) * Math.PI)
    );
  };

  const performInverseTrigOperation = (op: opFunc) => {
    performOperation(
      1,
      (x) => op(x) * (trigMode === Types.TRIG.RADS ? 1.0 : 180.0 / Math.PI)
    );
  };

  const deleteFromEntry = () => {
    let newEntry = entry.value.slice(0, entry.value.length - 1);
    //  Don't leave a dangling minus sign
    if (newEntry[newEntry.length - 1] === "-") {
      newEntry = newEntry.slice(0, newEntry.length - 1);
    }
    entry.value = newEntry;
  }

  const onKeyPress = (pressedKey: string) => {
    if (Types.NUM_KEYS.includes(pressedKey)) {
      if (entry.value !== "0") {
        entry.value += pressedKey;
      }
      return;
    }

    switch (pressedKey) {
      case BUTTONS["."].value: {
        if (
          !entry.value.includes(pressedKey) &&
          !entry.value.includes(BUTTONS.EXP.value)
        ) {
          entry.value += pressedKey;
        }
        break;
      }

      case BUTTONS["10_TO_X"].value: {
        performOperation(1, (x: number) => Math.pow(10.0, x));
        break;
      }

      case BUTTONS.ADD.value: {
        performOperation(2, (y, x) => x + y);
        break;
      }

      case BUTTONS.ARC_COS.value: {
        performInverseTrigOperation((x) => Math.acos(x));
        break;
      }

      case BUTTONS.ARC_COSH.value: {
        performInverseTrigOperation((x) => Math.acosh(x));
        break;
      }

      case BUTTONS.ARC_SIN.value: {
        performInverseTrigOperation((x) => Math.asin(x));
        break;
      }

      case BUTTONS.ARC_SINH.value: {
        performInverseTrigOperation((x) => Math.asinh(x));
        break;
      }

      case BUTTONS.ARC_TAN.value: {
        performInverseTrigOperation((x) => Math.atan(x));
        break;
      }

      case BUTTONS.ARC_TANH.value: {
        performInverseTrigOperation((x) => Math.atanh(x));
        break;
      }

      case BUTTONS.COS.value: {
        performTrigOperation((x) => Math.cos(x));
        break;
      }

      case BUTTONS.COSH.value: {
        performTrigOperation((x) => Math.cosh(x));
        break;
      }

      case BUTTONS.CUBED.value: {
        performOperation(1, (x) => Math.pow(x, 3.0));
        break;
      }

      case BUTTONS.CUBE_ROOT.value: {
        performOperation(1, (x) => Math.pow(x, 1.0 / 3.0));
        break;
      }

      case BUTTONS.DELETE.value: {
        if (entry.value !== "") {
          deleteFromEntry();
        } else {
          //  Delete from the stack
          stackCommands.pop();
        }
        break;
      }

      case BUTTONS.DELETE_ALL.value: {
        if (entry.value !== "") {
          //  Delete the entry
          entry.value = "";
        } else {
          //  Delete the entire stack
          stackCommands.clear();
        }
        break;
      }

      case BUTTONS.DELTA_PERCENT.value: {
        performOperation(2, (y, x) => ((x - y) / y) * 100.0);
        break;
      }

      case BUTTONS.DIVIDE.value: {
        performOperation(2, (y, x) => y / x);
        break;
      }

      case BUTTONS.E.value: {
        addConstant(Math.E);
        break;
      }

      case BUTTONS.E_TO_X.value: {
        performOperation(1, (x) => Math.pow(Math.E, x));
        break;
      }

      case BUTTONS.EXP.value: {
        if (entry.value !== "" && !entry.value.includes(BUTTONS.EXP.value)) {
          entry.value += pressedKey;
        }
        break;
      }

      case BUTTONS.ENTER.value: {
        if (entry.value !== "") {
          stackCommands.push(parseFloat(entry.value));
          entry.value = "";
        } else {
          stackCommands.dupe();
        }
        break;
      }

      case BUTTONS.INV.value: {
        performOperation(1, (x) => 1.0 / x);
        break;
      }

      case BUTTONS.LN.value: {
        performOperation(1, (x) => Math.log(x));
        break;
      }

      case BUTTONS.LOG.value: {
        performOperation(1, (x) => Math.log10(x));
        break;
      }

      case BUTTONS.MULTIPLY.value: {
        performOperation(2, (y, x) => y * x);
        break;
      }

      case BUTTONS.NEG.value: {
        if (entry.value !== "" && entry.value !== "0") {
          const expLocation = entry.value.indexOf(BUTTONS.EXP.value);
          if (expLocation > -1) {
            //  There is an exponent, so we'll flip the sign of that
            const exp = entry.value.slice(expLocation + 1);
            if (exp !== "") {
              if (exp.indexOf(BUTTONS.NEG.value) === -1) {
                entry.value =
                  entry.value.slice(0, expLocation + 1) +
                  BUTTONS.NEG.value +
                  exp;
              } else {
                entry.value =
                  entry.value.slice(0, expLocation + 1) + exp.slice(1);
              }
            }
          } else {
            //  Flip the sign of the entered number
            if (entry.value.indexOf(BUTTONS.NEG.value) === -1) {
              entry.value = BUTTONS.NEG.value + entry.value;
            } else {
              entry.value = entry.value.slice(1);
            }
          }
        } else {
          const lastStackEntry = stackCommands.fetch(1)[0];
          if (lastStackEntry !== 0) {
            stackCommands.replace(1, -lastStackEntry);
          }
        }
        break;
      }

      case BUTTONS.PI.value: {
        addConstant(Math.PI);
        break;
      }

      case BUTTONS.ROTATE_DOWN.value: {
        stackCommands.rotDown();
        break;
      }

      case BUTTONS.ROTATE_UP.value: {
        stackCommands.rotUp();
        break;
      }

      case BUTTONS.SIN.value: {
        performTrigOperation((x) => Math.sin(x));
        break;
      }

      case BUTTONS.SINH.value: {
        performTrigOperation((x) => Math.sinh(x));
        break;
      }

      case BUTTONS.SQUARED.value: {
        performOperation(1, (x) => Math.pow(x, 2.0));
        break;
      }

      case BUTTONS.SQUARE_ROOT.value: {
        performOperation(1, (x) => Math.pow(x, 1.0 / 2.0));
        break;
      }

      case BUTTONS.SWAP.value: {
        if (entry.value !== "") {
          const x = parseFloat(entry.value);
          const y = stackCommands.fetch(1)[0];
          stackCommands.replace(1, [x, y]);
          entry.value = "";
        } else {
          stackCommands.swap();
        }
        break;
      }

      case BUTTONS.SUBTRACT.value: {
        performOperation(2, (y, x) => y - x);
        break;
      }

      case BUTTONS.TAN.value: {
        performTrigOperation((x) => Math.tan(x));
        break;
      }

      case BUTTONS.TANH.value: {
        performTrigOperation((x) => Math.tanh(x));
        break;
      }

      case BUTTONS.UNDO.value: {
        if (entry.value !== "") {
          //  This isn't exactly an undo... but hopefully it's close enough since I am not currently 
          //  tracking history for the entry
          deleteFromEntry();
        } else {
          stackCommands.undo();
        }
        break;
      }

      case BUTTONS.Y_TO_X.value: {
        performOperation(2, (y, x) => Math.pow(y, x));
        break;
      }

      case BUTTONS.Y_TO_X_ROOT.value: {
        performOperation(2, (y, x) => Math.pow(y, 1.0 / x));
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <EntryContext.Provider value={{ onKeyPress }}>
      {children}
    </EntryContext.Provider>
  );
};
