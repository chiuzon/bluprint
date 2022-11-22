import React from "react";

import {
  Button,
  Code,
  Container,
  Label,
  Panel,
  TextInput,
} from "@playcanvas/pcui/react";

function App() {
  return (
    <div className="container">
      <Panel headerSize={0} class="BAR_1" flex={true}>
        {/* Contract Variables */}
        <Button icon="E412" class={"button-1"} />
        {/* Contract Functions */}
        <Button icon="E433" class={"button-1"} />
      </Panel>
      <Panel headerSize={0} class="BAR_2">
        <Label text={"Menu Tab"} />
      </Panel>
      <Panel headerSize={0} class="BOTTOM_1">
        <Label text={"Explorer"} />
      </Panel>
      <Panel headerSize={0} class="BAR_3">
        <Label text={"Props"} />
      </Panel>
      <Panel headerSize={0} class="GRAPH">
        <Label text={"Graph"} />
      </Panel>
    </div>
  );
}

export default App;
