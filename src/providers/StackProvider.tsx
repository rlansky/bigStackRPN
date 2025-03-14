import { useContext, useEffect, useCallback, useMemo } from "preact/hooks";
import { createContext } from "preact";
import { GlobalContext } from "./GlobalStateProvider";
import * as Types from "../types";

export const StackContext = createContext<Types.StackContext | null>(null);

const HISTORY_LIMIT = 50;
const STORAGE_KEY = "bigStackState";

export const StackProvider = ({ children }) => {
  const { currentStack, historicalStacks } = useContext(GlobalContext);

  const update = useCallback((newStackEntry: number[]): void => {
    const fullStack = historicalStacks.value.concat([newStackEntry]);
    if (fullStack.length > HISTORY_LIMIT) {
      fullStack.shift();
    }

    historicalStacks.value = fullStack;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fullStack));
  }, [historicalStacks]);

  const clear = useCallback(() => update([]), [update]);

  const dupe = useCallback(() => {
    const newStackEntry = [...currentStack.value];
    const len = newStackEntry.length;
    if (len) {
      update(newStackEntry.concat(newStackEntry[len - 1]));
    }
  }, [currentStack, update]);

  //  Doesn't remove the entries
  const fetch = useCallback((numEntries: number = 1): number[] => {
    const stack = currentStack.value;
    if (stack.length < numEntries) {
      throw Types.ERRORS.NOT_ENOUGH_ENTRIES;
    }

    return stack.slice(stack.length - numEntries);
  }, [currentStack]);

  const pop = useCallback((): number | undefined => {
    if (currentStack.value.length) {
      const newStackEntry = [...currentStack.value];
      const entry = newStackEntry.pop();
      update(newStackEntry);
      return entry;
    }
  }, [currentStack, update]);

  const push = useCallback((value: number) => {
    const lastEntry = historicalStacks.value.length
      ? [...currentStack.value]
      : [];
    update(lastEntry.concat(value));
  }, [currentStack, historicalStacks, update]);

  const replace = useCallback((numEntries: number, newValues: number[] | number) => {
    if (currentStack.value.length < numEntries) {
      throw Types.ERRORS.NOT_ENOUGH_ENTRIES;
    }
    const newEntry = [...currentStack.value].slice(
      0,
      currentStack.value.length - numEntries
    );
    update(newEntry.concat(newValues));
  }, [currentStack, update]);

  const rotDown = useCallback(() => {
    if (currentStack.value.length > 1) {
      const newStackEntry = [...currentStack.value];
      const btm = newStackEntry.pop();
      newStackEntry.unshift(btm);
      update(newStackEntry);
    }
  }, [currentStack, update]);

  const rotUp = useCallback(() => {
    if (currentStack.value.length > 1) {
      const newStackEntry = [...currentStack.value];
      const top = newStackEntry.shift();
      update(newStackEntry.concat(top));
    }
  }, [currentStack, update]);

  const swap = useCallback(() => {
    if (currentStack.value.length > 1) {
      const newStackEntry = [...currentStack.value];
      const x = newStackEntry.pop();
      const y = newStackEntry.pop();
      update(newStackEntry.concat(x, y));
    }
  }, [currentStack, update]);

  const undo = useCallback(() => {
    if (historicalStacks.value.length) {
      const newStack = [...historicalStacks.value];
      newStack.pop();
      historicalStacks.value = newStack;
    }
  }, [historicalStacks]);

  //  This loads the stack from their last usage when things start up
  useEffect(() => {
    const savedStack = window.localStorage.getItem(STORAGE_KEY);
    if (savedStack) {
      const parsedStack = JSON.parse(savedStack);
      if (parsedStack?.length) {
        historicalStacks.value = parsedStack;
      }
    }
  }, [historicalStacks]);

  const contextValue = useMemo(() => ({
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
  }), [clear, dupe, fetch, pop, push, replace, rotDown, rotUp, swap, undo]);

  return (
    <StackContext.Provider value={contextValue}>
      {children}
    </StackContext.Provider>
  );
};
