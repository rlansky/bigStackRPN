import { Signal } from "@preact/signals";

export interface ButtonProps {
  label: string;
  superscript?: string;
  superscriptShownFirst?: boolean;
  type?: "light" | "dark";
  value: string;
}

export interface EntryContext {
  onKeyPress: (value: string) => void;
}

export interface GlobalContext {
  currentStack: Signal<number[]>;
  entry: Signal<string>;
  historicalStacks: Signal<number[][]>;
  showAbout: Signal<boolean>;
  showMenuPosition: Signal<number[] | null>;
  showSettings: Signal<boolean>;
}

export interface SettingsContext {
  dispMode: string;
  dispSize: number;
  trigMode: string;
  updateSettings: (newTrigMode: string, newDispSize: number, newDispMode: string) => void;
}

export interface StackContext {
  clear: () => void;
  dupe: () => void;
  fetch: (numEntries?: number) => number[];
  pop: () => number | undefined;
  push: (value: number) => void;
  replace: (numEntries: number, newValues: number[] | number) => void;
  rotDown: () => void;
  rotUp: () => void;
  swap: () => void;
  undo: () => void;
}

export interface WindowContext {
  height: number;
  isLandscape: boolean;
}

export const BUTTONS: { [key: string]: ButtonProps } = {
  0: { label: "0", type: "light", value: "0" },
  1: { label: "1", type: "light", value: "1" },
  2: { label: "2", type: "light", value: "2" },
  3: { label: "3", type: "light", value: "3" },
  4: { label: "4", type: "light", value: "4" },
  5: { label: "5", type: "light", value: "5" },
  6: { label: "6", type: "light", value: "6" },
  7: { label: "7", type: "light", value: "7" },
  8: { label: "8", type: "light", value: "8" },
  9: { label: "9", type: "light", value: "9" },

  ".": { label: ".", type: "light", value: "." },
  "10_TO_X": { label: "10", superscript: "x", value: "10_to_x" },
  ADD: { label: "+", value: "add" },
  ARC_COS: { label: "cos", superscript: "-1", value: "arc_cos" },
  ARC_SIN: { label: "sin", superscript: "-1", value: "arc_sin" },
  ARC_TAN: { label: "tan", superscript: "-1", value: "arc_tan" },
  ARC_COSH: { label: "cosh", superscript: "-1", value: "arc_cosh" },
  ARC_SINH: { label: "sinh", superscript: "-1", value: "arc_sinh" },
  ARC_TANH: { label: "tanh", superscript: "-1", value: "arc_tanh" },
  COS: { label: "cos", value: "cos" },
  COSH: { label: "cosh", value: "cosh" },
  CUBED: { label: "x", superscript: "3", value: "cubed" },
  CUBE_ROOT: {
    label: "√x",
    superscript: "3",
    superscriptShownFirst: true,
    value: "cube_root",
  },
  DELETE: { label: "⌫", value: "del" },
  DELETE_ALL: { label: "🗑", value: "del_all" },
  DELTA_PERCENT: { label: "Δ%", value: "delta_percent" },
  DIVIDE: { label: "/", value: "div" },
  E: { label: "e", value: "e_val" },
  E_TO_X: { label: "e", superscript: "x", value: "e_to_x" },
  EXP: { label: "EE", type: "light", value: "e" },
  ENTER: { label: "Enter", type: "light", value: "enter" },
  INV: { label: "1 / x", value: "inverse" },
  LN: { label: "ln", value: "ln" },
  LOG: { label: "log", value: "log" },
  MULTIPLY: { label: "×", value: "mult" },
  NEG: { label: "+ / −", type: "light", value: "-" },
  PI: { label: "π", value: "pi" },
  ROTATE_DOWN: { label: "rot ↓", value: "rot_down" },
  ROTATE_UP: { label: "rot ↑", value: "rot_up" },
  SIN: { label: "sin", value: "sin" },
  SINH: { label: "sinh", value: "sinh" },
  SQUARED: { label: "x", superscript: "2", value: "squared" },
  SQUARE_ROOT: { label: "√x", value: "square_root" },
  SUBTRACT: { label: "−", value: "sub" },
  SWAP: { label: "x↔y", value: "swap" },
  TAN: { label: "tan", value: "tan" },
  TANH: { label: "tanh", value: "tanh" },
  UNDO: { label: "undo", value: "undo" },
  Y_TO_X: { label: "y", superscript: "x", value: "y_to_x" },
  Y_TO_X_ROOT: {
    label: "√y",
    superscript: "x",
    superscriptShownFirst: true,
    value: "y_to_x_root",
  },
};

export const NUM_KEYS = [
  BUTTONS[0].value,
  BUTTONS[1].value,
  BUTTONS[2].value,
  BUTTONS[3].value,
  BUTTONS[4].value,
  BUTTONS[5].value,
  BUTTONS[6].value,
  BUTTONS[7].value,
  BUTTONS[8].value,
  BUTTONS[9].value,
];

export enum DISP_MODES {
  EXP = "Exp",
  FIXED = "Fixed",
  PRECISION = "Prec",
}

export enum DISP_SIZES {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
}

export enum ERRORS {
  NOT_ENOUGH_ENTRIES = "not enough entries on stack",
}

export enum TRIG {
  RADS = "rads",
  DEGS = "degs",
}
