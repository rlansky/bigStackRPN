import { useContext, useEffect } from "preact/hooks";
import { createContext } from "preact";
import { GlobalContext } from "./GlobalStateProvider";
import * as Types from "../types";

export const StackContext = createContext<Types.StackContext | null>(null);

const HISTORY_LIMIT = 50;
const STORAGE_KEY = "bigStackState";

export const StackProvider = ({ children }) => {
  const { currentStack, historicalStacks } = useContext(GlobalContext);

  const update = (newStackEntry: number[]): void => {
    const fullStack = historicalStacks.value.concat([newStackEntry]);
    if (fullStack.length > HISTORY_LIMIT) {
      fullStack.shift();
    }

    historicalStacks.value = fullStack;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fullStack));
  };

  const clear = () => update([]);

  const dupe = () => {
    const newStackEntry = [...currentStack.value];
    const len = newStackEntry.length;
    if (len) {
      update(newStackEntry.concat(newStackEntry[len - 1]));
    }
  };

  //  Doesn't remove the entries
  const fetch = (numEntries: number = 1): number[] => {
    const stack = currentStack.value;
    if (stack.length < numEntries) {
      throw Types.ERRORS.NOT_ENOUGH_ENTRIES;
    }

    return stack.slice(stack.length - numEntries);
  };

  const pop = (): number | undefined => {
    if (currentStack.value.length) {
      const newStackEntry = [...currentStack.value];
      const entry = newStackEntry.pop();
      update(newStackEntry);
      return entry;
    }
  };

  const push = (value: number) => {
    const lastEntry = historicalStacks.value.length
      ? [...currentStack.value]
      : [];
    update(lastEntry.concat(value));
  };

  const replace = (numEntries: number, newValues: number[] | number) => {
    if (currentStack.value.length < numEntries) {
      throw Types.ERRORS.NOT_ENOUGH_ENTRIES;
    }
    const newEntry = [...currentStack.value].slice(
      0,
      currentStack.value.length - numEntries
    );
    update(newEntry.concat(newValues));
  };

  const rotDown = () => {
    if (currentStack.value.length > 1) {
      const newStackEntry = [...currentStack.value];
      const btm = newStackEntry.pop();
      newStackEntry.unshift(btm);
      update(newStackEntry);
    }
  };

  const rotUp = () => {
    if (currentStack.value.length > 1) {
      const newStackEntry = [...currentStack.value];
      const top = newStackEntry.shift();
      update(newStackEntry.concat(top));
    }
  };

  const swap = () => {
    if (currentStack.value.length > 1) {
      const newStackEntry = [...currentStack.value];
      const x = newStackEntry.pop();
      const y = newStackEntry.pop();
      update(newStackEntry.concat(x, y));
    }
  };

  const undo = () => {
    if (historicalStacks.value.length) {
      const newStack = [...historicalStacks.value];
      newStack.pop();
      historicalStacks.value = newStack;
    }
  };

  //  This loads the stack from their last usage when things start up
  useEffect(() => {
    const savedStack = window.localStorage.getItem(STORAGE_KEY);
    if (savedStack) {
      const parsedStack = JSON.parse(savedStack);
      if (parsedStack?.length) {
        historicalStacks.value = parsedStack;
      }
    }
  }, []);

  return (
    <StackContext.Provider
      value={{
        clear,
        dupe,
        fetch,
        pop,
        push,
        replace,
        rotDown,
        rotUp,
        swap,
        undo,
      }}
    >
      {children}
    </StackContext.Provider>
  );
};
