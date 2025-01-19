import { useContext } from "preact/hooks";
import { Button } from "./Button";
import { WindowContext } from "../../providers/WindowProvider";
import * as Types from "../../types";

export function StackButtons() {
  const { isLandscape } = useContext(WindowContext);

  if (isLandscape) {
    return (
      <>
        <Button {...Types.BUTTONS.SWAP} col={1} row={8} />
        <Button {...Types.BUTTONS.UNDO} col={1} row={9} />

        <Button {...Types.BUTTONS.ROTATE_UP} col={2} row={8} />
        <Button {...Types.BUTTONS.ROTATE_DOWN} col={2} row={9} />

        <Button {...Types.BUTTONS.DELETE} col={3} row={8} />
        <Button {...Types.BUTTONS.DELETE_ALL} col={3} row={9} />
      </>
    );
  }

  return (
    <>
      <Button {...Types.BUTTONS.SWAP} col={4} row={1} />

      <Button {...Types.BUTTONS.DELETE} col={4} row={2} />
      <Button {...Types.BUTTONS.DELETE_ALL} col={4} row={3} />
    </>
  );
}
