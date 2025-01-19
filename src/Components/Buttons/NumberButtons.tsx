import { useContext } from "preact/hooks";
import { Button } from "./Button";
import { WindowContext } from "../../providers/WindowProvider";
import * as Types from "../../types";

export function NumberButtons() {
  const { isLandscape } = useContext(WindowContext);

  if (isLandscape) {
    return (
      <>
        <Button {...Types.BUTTONS[7]} col={4} row={5} />
        <Button {...Types.BUTTONS[8]} col={5} row={5} />
        <Button {...Types.BUTTONS[9]} col={6} row={5} />

        <Button {...Types.BUTTONS[4]} col={4} row={6} />
        <Button {...Types.BUTTONS[5]} col={5} row={6} />
        <Button {...Types.BUTTONS[6]} col={6} row={6} />

        <Button {...Types.BUTTONS[1]} col={4} row={7} />
        <Button {...Types.BUTTONS[2]} col={5} row={7} />
        <Button {...Types.BUTTONS[3]} col={6} row={7} />

        <Button {...Types.BUTTONS.NEG} col={4} row={8} />
        <Button {...Types.BUTTONS[0]} col={5} row={8} />
        <Button {...Types.BUTTONS["."]} col={6} row={8} />

        <Button {...Types.BUTTONS.EXP} col={4} row={9} />
        <Button {...Types.BUTTONS.ENTER} col="5 / 7" row={9} />
      </>
    );
  }

  return (
    <>
      <Button {...Types.BUTTONS[7]} col={1} row={4} />
      <Button {...Types.BUTTONS[8]} col={2} row={4} />
      <Button {...Types.BUTTONS[9]} col={3} row={4} />

      <Button {...Types.BUTTONS[4]} col={1} row={5} />
      <Button {...Types.BUTTONS[5]} col={2} row={5} />
      <Button {...Types.BUTTONS[6]} col={3} row={5} />

      <Button {...Types.BUTTONS[1]} col={1} row={6} />
      <Button {...Types.BUTTONS[2]} col={2} row={6} />
      <Button {...Types.BUTTONS[3]} col={3} row={6} />

      <Button {...Types.BUTTONS.NEG} col={1} row={7} />
      <Button {...Types.BUTTONS[0]} col={2} row={7} />
      <Button {...Types.BUTTONS["."]} col={3} row={7} />

      <Button {...Types.BUTTONS.EXP} col={1} row={8} />
      <Button {...Types.BUTTONS.ENTER} col="2 / 4" row={8} />
    </>
  );
}
