import { Button } from "./Button";
import * as Types from "../../types";

export function NumberButtons() {
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
