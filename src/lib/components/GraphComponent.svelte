<script lang="ts">
  import { Graph } from "@playcanvas/pcui-graph";

  export let schema: any;
  export let initialData: any;

  export let options = {
    defaultStyles: {
      edge: {
        connectionStyle: "smoothInOut",
      },
      background: {
        color: "#18181c",
        gridSize: 10,
      },
    },
  };

  let graphParentDiv: HTMLElement;
  let graph: Graph;

  $: {
    if (graphParentDiv) {
      graph = new Graph(schema, {
        initialData,
        dom: graphParentDiv,
        ...options,
      });
    } else {
      console.error("Something is wrong!");
    }
  }
</script>

<div style="height: 100vh;" bind:this={graphParentDiv} />

<style global type="text/scss">
  @import "@playcanvas/pcui/dist/fonts.scss";
  @import "@playcanvas/pcui/dist/variables.scss";
  @import "@playcanvas/pcui/dist/theme-colors-green.scss";
  @import "@playcanvas/pcui/dist/pcui-theme-green.scss";
  @import "@playcanvas/pcui-graph/dist/pcui-graph.scss";
</style>
