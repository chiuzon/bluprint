<script lang="ts">
  import { navLinks, currentNavLink } from "../stores/router";
</script>

<div class=" bg-dark-0 border-r border-dark-3  h-full">
  <div class="flex flex-col">
    {#each navLinks as navLink}
      <button
        on:click={() => {
          $currentNavLink = navLink.link;
        }}
        title={navLink.name}
        class={` ${
          $currentNavLink === navLink.link ? "bg-dark-2" : ""
        } p-5 hover:bg-dark-3 active:bg-dark-1 text-xl`}>{navLink.icon}</button
      >
    {/each}
  </div>
</div>
