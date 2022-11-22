import { FC, useEffect, useMemo, useRef } from "react";
import { Graph } from "@playcanvas/pcui-graph";

import "@playcanvas/pcui-graph/dist/pcui-graph.scss";
import { group } from "console";

export interface GraphComponentProps {
  schema: any;
  onClick?: any;
  onChange?: any;
}
const GRAPH_ENUM = {
  NODE: {
    HELLO: 0,
    WORLD: 1,
  },
  EDGE: {
    HELLO_TO_WORLD: 0,
  },
};
const GraphComponent: FC<GraphComponentProps> = (props) => {
  const attachElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!attachElement.current) {
      return;
    }

    const graph = new Graph(props.schema, {
      dom: attachElement.current,
      passiveUIEvents: false,

      defaultStyles: {
        edge: {
          connectionStyle: "smoothInOut",
        },
        background: {
          color: "#20292B",
          gridSize: 10,
        },
      },

      initialData: {
        nodes: {
          1234: {
            id: 1234,
            nodeType: GRAPH_ENUM.NODE.HELLO,
            name: "Hello",
            posX: 200,
            posY: 200,
          },
          1235: {
            id: 1235,
            nodeType: GRAPH_ENUM.NODE.WORLD,
            name: "World",
            posX: 500,
            posY: 200,
          },
        },
      },
    });

    console.log(graph.data);
  }, [props.schema]);

  return <div style={{ height: "100vh" }} ref={attachElement}></div>;
};

export default GraphComponent;
