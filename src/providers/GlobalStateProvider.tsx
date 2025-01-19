import { signal, computed } from "@preact/signals";
import { createContext } from "preact";
import * as Types from "../types";

function createGlobalState() {
  const historicalStacks = signal<number[][]>([]);
  const entry = signal<string>("");
  const showAbout = signal<boolean>(false);
  const showMenuPosition = signal<number[] | null>(null);
  const showSettings = signal<boolean>(false);

  const currentStack = computed(() =>
    historicalStacks.value.length
      ? historicalStacks.value[historicalStacks.value.length - 1]
      : []
  );

  return {
    currentStack,
    historicalStacks,
    entry,
    showAbout,
    showMenuPosition,
    showSettings,
  };
}

export const GlobalContext = createContext<Types.GlobalContext>(null);

export const GlobalStateProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={createGlobalState()}>
      {children}
    </GlobalContext.Provider>
  );
};
