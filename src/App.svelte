<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import Properties from "./lib/Properties.svelte";
  import LocalVariables from "./lib/LocalVariables.svelte";
  import Functions from "./lib/Functions.svelte";
  import Variables from "./lib/Variables.svelte";
  import Explorer from "./lib/Explorer.svelte";

  import registerDefaultNodes from "./lib/nodes/defaultNodes";

  import "litegraph.js/css/litegraph.css";

  import { ContractFunction, selectedElement } from "./lib/stores";

  import { LGraph, LGraphCanvas, LiteGraph } from "litegraph.js";

  let canvasRef = undefined;

  let graph: LGraph | undefined = undefined;
  let canvasGraph: LGraphCanvas | undefined = undefined;

  registerDefaultNodes();

  function clearGraph() {
    if (graph) {
      graph.clear();
    }

    if (canvasGraph) {
      canvasGraph.clear();
    }
  }

  function onGraphLoad(selectedElement) {
    if (!selectedElement) {
      return;
    }
    if (selectedElement.constructor.name !== "ContractFunction") {
      clearGraph();
      return;
    }

    clearGraph();

    const contractFunction = selectedElement as ContractFunction;

    if (contractFunction) {
      for (const defaultNode of contractFunction.buildDefaultNode()) {
        graph.add(defaultNode);
      }
    }

    graph.start();

    console.log(graph.serialize());
  }

  onMount(() => {
    if (!canvasRef) return;

    graph = new LGraph();

    graph.onNodeAdded = () => {
      console.log("node added");
    };

    canvasGraph = new LGraphCanvas(canvasRef, graph);
  });

  onDestroy(() => {
    clearGraph();
  });

  $: onGraphLoad($selectedElement);
</script>

<canvas
  id="mycanvas"
  bind:this={canvasRef}
  width="1920"
  height="1080"
  class="w-full"
/>
<div class="flex flex-col h-screen fixed inset-0 pointer-events-none">
  <div class=" p-1 flex pointer-events-auto">
    <button class="bg-[#1c1c1e] px-2 py-1 rounded-sm text-xs font-semibold"
      >Deploy</button
    >
  </div>
  <div class="flex justify-between h-full ">
    <div
      class="w-1/6 h-full justify-between flex flex-col gap-2 p-1 pointer-events-auto"
    >
      <Variables />
      <Functions />
    </div>
    <div class="w-2/3 flex flex-col h-full">
      <div class=" w-full h-full  pointer-events-none" />

      <Explorer />
    </div>
    <div class="w-1/6  gap-2 p-1  flex flex-col pointer-events-auto">
      <Properties />
      <LocalVariables />
    </div>
  </div>
</div>
