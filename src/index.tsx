import { render } from "preact";

import { Calculator } from "./Components/Calculator";

export function App() {
  return <Calculator />;
}

render(<App />, document.getElementById("app"));
