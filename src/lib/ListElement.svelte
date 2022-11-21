<script lang="ts">
  export let name = "";
  export let args = {};

  export let onSelected = (args: any) => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
  on:click={() => onSelected(args)}
  class="flex justify-between text-xs h-10 border-y items-center border-[#202022] px-2"
>
  <div>{name}</div>
  <div class="flex items-center">
    <slot name="buttons" />
    <!-- <button class="bg-[#2e2e30] rounded-md p-1 border border-[#91919421]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button> -->
  </div>
</button>
