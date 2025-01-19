import { useContext } from "preact/hooks";
import { GlobalContext } from "../../providers/GlobalStateProvider";

export function StackEntry() {
  const { entry } = useContext(GlobalContext);

  return <div class="entryContainer">{entry.value}</div>;
}
