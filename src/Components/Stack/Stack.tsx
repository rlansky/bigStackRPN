import { StackContents } from "./Contents";
import { StackEntry } from "./Entry";
import { StackSettings } from "./Settings";
import "./stack.css";

export function Stack() {
  return (
    <div class="stackContainer">
      <StackSettings />
      <StackContents />
      <StackEntry />
    </div>
  );
}
