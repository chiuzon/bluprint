<script lang="ts">
  import { navLinks2, currentNavLink2, navRoutes2 } from "../stores/router";
</script>

<div class=" bg-dark-0 border-t border-r border-dark-3 flex flex-col h-full">
  <div class="flex gap-1 border-b border-dark-3">
    {#each navLinks2 as navLink}
      <button
        on:click={() => {
          $currentNavLink2 = navLink.link;
        }}
        class={` ${
          navLink.link === $currentNavLink2 ? "bg-dark-2" : ""
        }  px-2 py-1 border-dark-3 border-r`}
      >
        {navLink.icon}
        {navLink.name}
      </button>
    {/each}
  </div>
  <div class=" max-h-max h-48">
    {#if navRoutes2[$currentNavLink2]}
      <svelte:component this={navRoutes2[$currentNavLink2]} />
    {/if}
  </div>
</div>
