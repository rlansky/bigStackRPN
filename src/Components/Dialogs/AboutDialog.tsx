import { useContext, useRef } from "preact/hooks";
import { GlobalContext } from "../../providers/GlobalStateProvider";

export function AboutDialog() {
  const aboutRef = useRef<HTMLDialogElement>(null);
  const { showAbout } = useContext(GlobalContext);

  const closeDialog = () => {
    showAbout.value = false;
    aboutRef.current.close();
  };

  if (showAbout.value) {
    aboutRef.current.showModal();
  }

  return (
    <dialog class="dialog dialogContainer" ref={aboutRef}>
      <h2>About</h2>
      <p>
        A simple RPN calculator I created since I couldn't find a good app or
        website for this aleady.
      </p>
      <p>
        This is intended for usage on a phone as a progressive web app (PWA),
        but it'll work fine on a desktop as well, as either a PWA or in a
        browser.
      </p>
      <p>
        In landscape orientation, it's a full scientific calculator. In portrait
        orientation, it's a simple calculator.
      </p>
      <p>Questions or comments? HMU at bigStack [at] yabers.com</p>
      <div class="closer">
        <button class="closer" onClick={closeDialog}>
          <span>Close</span>
        </button>
      </div>
    </dialog>
  );
}
