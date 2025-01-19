import { Button } from "./Button";
import * as Types from "../../types";

export function MathButtons() {
  return (
    <>
      <Button {...Types.BUTTONS.ARC_SINH} col={4} row={1} />
      <Button {...Types.BUTTONS.ARC_COSH} col={5} row={1} />
      <Button {...Types.BUTTONS.ARC_TANH} col={6} row={1} />
      <Button {...Types.BUTTONS.PI} col={7} row={1} />
      <Button {...Types.BUTTONS.E} col={8} row={1} />

      <Button {...Types.BUTTONS.SINH} col={4} row={2} />
      <Button {...Types.BUTTONS.COSH} col={5} row={2} />
      <Button {...Types.BUTTONS.TANH} col={6} row={2} />
      <Button {...Types.BUTTONS.DELTA_PERCENT} col={7} row={2} />
      <Button {...Types.BUTTONS.INV} col={8} row={2} />

      <Button {...Types.BUTTONS.ARC_SIN} col={4} row={3} />
      <Button {...Types.BUTTONS.ARC_COS} col={5} row={3} />
      <Button {...Types.BUTTONS.ARC_TAN} col={6} row={3} />
      <Button {...Types.BUTTONS["10_TO_X"]} col={7} row={3} />
      <Button {...Types.BUTTONS.LOG} col={8} row={3} />

      <Button {...Types.BUTTONS.SIN} col={4} row={4} />
      <Button {...Types.BUTTONS.COS} col={5} row={4} />
      <Button {...Types.BUTTONS.TAN} col={6} row={4} />
      <Button {...Types.BUTTONS.E_TO_X} col={7} row={4} />
      <Button {...Types.BUTTONS.LN} col={8} row={4} />

      <Button {...Types.BUTTONS.Y_TO_X} col={7} row={5} />
      <Button {...Types.BUTTONS.Y_TO_X_ROOT} col={8} row={5} />

      <Button {...Types.BUTTONS.CUBED} col={7} row={6} />
      <Button {...Types.BUTTONS.CUBE_ROOT} col={8} row={6} />

      <Button {...Types.BUTTONS.SQUARED} col={7} row={7} />
      <Button {...Types.BUTTONS.SQUARE_ROOT} col={8} row={7} />

      <Button {...Types.BUTTONS.ADD} col={7} row={8} />
      <Button {...Types.BUTTONS.SUBTRACT} col={8} row={8} />

      <Button {...Types.BUTTONS.MULTIPLY} col={7} row={9} />
      <Button {...Types.BUTTONS.DIVIDE} col={8} row={9} />
    </>
  );
}
