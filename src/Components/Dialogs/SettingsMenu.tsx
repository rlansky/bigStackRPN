import { useContext, useRef } from "preact/hooks";
import { GlobalContext } from "../../providers/GlobalStateProvider";
import "./dialog.css";

export function SettingsMenu() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const { showAbout, showMenuPosition, showSettings } = useContext(GlobalContext);

  const closeDialog = () => {
    showMenuPosition.value = null;
    menuRef.current.close();
  };

  const openDialog = () => {
    menuRef.current.style.top = `${showMenuPosition.value[1]}px`;
    menuRef.current.style.left = `${showMenuPosition.value[0]}px`;
    menuRef.current.showModal();

    menuRef.current.addEventListener("click", (event) => {
      if (event.target === menuRef.current) {
        closeDialog();
      }
    });
  };

  const onSettingsClick = () => {
    showSettings.value = true;
    closeDialog();
  }

  const onAboutClick = () => {
    showAbout.value = true;
    closeDialog();
  };

  //  Show the element if needed
  if (showMenuPosition.value) {
    openDialog();
  }

  return (
    <dialog class="dialog settingsMenuContainer" ref={menuRef}>
      <ul>
        <li onClick={onSettingsClick}>Edit Settings...</li>
        <li onClick={onAboutClick}>About</li>
      </ul>
    </dialog>
  );
}
