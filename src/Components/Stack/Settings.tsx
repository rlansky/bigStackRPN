import { useContext } from "preact/hooks";
import { SettingsContext } from "../../providers/SettingsProvider";
import { GlobalContext } from "../../providers/GlobalStateProvider";

export function StackSettings() {
  const settingsContext = useContext(SettingsContext);
  const { showMenuPosition } = useContext(GlobalContext);

  const onSettingsClick = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    showMenuPosition.value = [clientX, clientY];
  }

  return (
    <div class="settingsContainer" onClick={onSettingsClick}>
      <div class="settingsTrig">{settingsContext.trigMode}</div>
      <div class="settingsDisplay">
        {settingsContext.dispMode.toLowerCase()}-{settingsContext.dispSize}
      </div>
    </div>
  );
}
