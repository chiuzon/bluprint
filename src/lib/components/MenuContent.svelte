<script lang="ts">
  import { currentNavLink, navRoutes } from "../stores/router";
</script>

<div class=" bg-dark-0 border-r border-dark-3  h-full">
  {#if navRoutes[$currentNavLink]}
    <svelte:component this={navRoutes[$currentNavLink]} />
  {:else}
    {"  "}
  {/if}
</div>
