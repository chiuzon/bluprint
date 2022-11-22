<script lang="ts">
</script>

<div class="fixed inset-0 w-full h-screen z-10  pointer-events-none">
  <div class="w-full ">
    <slot name="top-bar" />
  </div>
  <div class="container-ui  w-full h-screen">
    <div class="BAR_1 pointer-events-auto">
      <slot name="menu-panel" />
    </div>
    <div class="BAR_2 pointer-events-auto">
      <slot name="left-panel" />
    </div>
    <div class="BOTTOM_1 pointer-events-auto">
      <slot name="bottom-panel" />
    </div>
    <div class="BAR_3 pointer-events-auto">
      <slot name="right-panel" />
    </div>
    <div class="GRAPH pointer-events-none">
      <slot name="center-panel" />
    </div>
  </div>
</div>

<style>
  .container-ui {
    display: grid;
    grid-template-columns: 0.2fr 0.7fr 3.2fr 0.7fr;
    grid-template-rows: 3.7fr 0.8fr;
    gap: 0px 0px;
    grid-template-areas:
      "BAR_1 BAR_2 GRAPH BAR_3"
      "BAR_1 BAR_2 BOTTOM_1 BAR_3";
  }
  .BAR_1 {
    grid-area: BAR_1;
  }
  .BAR_2 {
    grid-area: BAR_2;
  }
  .BOTTOM_1 {
    grid-area: BOTTOM_1;
  }
  .BAR_3 {
    grid-area: BAR_3;
  }
  .GRAPH {
    grid-area: GRAPH;
  }
</style>
