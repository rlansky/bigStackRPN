import { Stack } from "./Stack/Stack";
import { EntryProvider } from "../providers/EntryProvider";
import { GlobalStateProvider } from "../providers/GlobalStateProvider";
import { KeyboardProvider } from "../providers/KeyboardProvider";
import { SettingsProvider } from "../providers/SettingsProvider";
import { StackProvider } from "../providers/StackProvider";
import { WindowProvider } from "../providers/WindowProvider";
import { StackButtons } from "./Buttons/StackButtons";
import { MathButtons } from "./Buttons/MathButtons";
import { NumberButtons } from "./Buttons/NumberButtons";
import { AboutDialog } from "./Dialogs/AboutDialog";
import { SettingsMenu } from "./Dialogs/SettingsMenu";
import { SettingsDialog } from "./Dialogs/SettingsDialog";
import "./calculator.css";
import "./Buttons/buttons.css";

export function Calculator() {
  return (
    <div class="calcContainer">
      <GlobalStateProvider>
        <WindowProvider>
          <SettingsProvider>
            <SettingsMenu />
            <AboutDialog />
            <SettingsDialog />
            <StackProvider>
              <EntryProvider>
                <KeyboardProvider>
                  <Stack />
                  <StackButtons />
                  <MathButtons />
                  <NumberButtons />
                </KeyboardProvider>
              </EntryProvider>
            </StackProvider>
          </SettingsProvider>
        </WindowProvider>
      </GlobalStateProvider>
    </div>
  );
}
