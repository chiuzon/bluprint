<script lang="ts">
  import GraphComponent from "./lib/components/GraphComponent.svelte";
  import Layout from "./lib/components/Layout.svelte";
  import MenuBar from "./lib/components/MenuBar.svelte";
  import MenuContent from "./lib/components/MenuContent.svelte";
  import BottomContent from "./lib/components/BottomContent.svelte";
  import PropPanel from "./lib/components/PropPanel.svelte";
  import TopBar from "./lib/components/TopBar.svelte";

  // let canvasRef = undefined;

  // let graph: LGraph | undefined = undefined;
  // let canvasGraph: LGraphCanvas | undefined = undefined;

  // registerDefaultNodes();

  // function clearGraph() {
  //   if (graph) {
  //     graph.clear();
  //   }

  //   if (canvasGraph) {
  //     canvasGraph.clear();
  //   }
  // }

  // function onGraphLoad(selectedElement) {
  //   if (!selectedElement) {
  //     return;
  //   }
  //   if (selectedElement.constructor.name !== "ContractFunction") {
  //     clearGraph();
  //     return;
  //   }

  //   clearGraph();

  //   const contractFunction = selectedElement as ContractFunction;

  //   if (contractFunction) {
  //     for (const defaultNode of contractFunction.buildDefaultNode()) {
  //       graph.add(defaultNode);
  //     }
  //   }

  //   graph.start();

  //   console.log(graph.serialize());
  // }

  // onMount(() => {
  //   if (!canvasRef) return;

  //   graph = new LGraph();

  //   graph.onNodeAdded = () => {
  //     console.log("node added");
  //   };

  //   canvasGraph = new LGraphCanvas(canvasRef, graph);
  // });

  // onDestroy(() => {
  //   clearGraph();
  // });

  // $: onGraphLoad($selectedElement);

  const GRAPH_ENUM = {
    NODE: {
      HELLO: 0,
      WORLD: 1,
    },
    EDGE: {
      HELLO_TO_WORLD: 0,
    },
  };

  const GRAPH_SCHEMA = {
    nodes: {
      [GRAPH_ENUM.NODE.HELLO]: {
        name: "Hello",
        outPorts: [
          {
            name: "output",
            type: GRAPH_ENUM.EDGE.HELLO_TO_WORLD,
          },
          {
            name: "output",
            type: GRAPH_ENUM.EDGE.HELLO_TO_WORLD,
          },
        ],
      },
      [GRAPH_ENUM.NODE.WORLD]: {
        name: "World",
        inPorts: [
          {
            name: "input",
            type: GRAPH_ENUM.EDGE.HELLO_TO_WORLD,
          },
        ],
      },
    },
    edges: {
      [GRAPH_ENUM.EDGE.HELLO_TO_WORLD]: {
        from: GRAPH_ENUM.NODE.HELLO,
        to: GRAPH_ENUM.NODE.WORLD,
      },
    },
  };

  var GRAPH_DATA = {
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
      1215: {
        id: 1215,
        nodeType: GRAPH_ENUM.NODE.WORLD,
        name: "World",
        posX: 500,
        posY: 200,
      },
    },
    edges: {
      "1234,0-1235,0": {
        edgeType: GRAPH_ENUM.EDGE.HELLO_TO_WORLD,
        from: 1234,
        to: 1235,
        inPort: 0,
        outPort: 0,
      },
    },
  };
</script>

<Layout>
  <TopBar slot="top-bar" />
  <MenuBar slot="menu-panel" />
  <MenuContent slot="left-panel" />
  <BottomContent slot="bottom-panel" />
  <PropPanel slot="right-panel" />
</Layout>

<GraphComponent schema={GRAPH_SCHEMA} initialData={GRAPH_DATA} />
