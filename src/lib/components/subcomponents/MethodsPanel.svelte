<script lang="ts">
  import {
    fileSystem,
    selectedElement,
    selectedFile,
    useFileSystem,
  } from "../../stores";

  const { addContractNewMethod, removeContractMethod } = useFileSystem();

  $: methods = $fileSystem[$selectedFile]?.methods;
</script>

<div class="">
  <div
    class=" font-medium bg-dark-1 border-b text-base border-dark-3 py-1 px-2"
  >
    Methods
  </div>

  {#if methods}
    <div class="flex bg-dark-0 border-b border-dark-2 py-1 px-1">
      <button
        on:click={() => {
          addContractNewMethod($selectedFile);
        }}
        title="Add New Variable"
        class="bg-dark-2 px-2 border border-dark-4 hover:bg-dark-3 active:bg-dark-0"
        >+</button
      >
    </div>

    <div
      class="flex flex-col py-2 px-1 shadow-inner overflow-auto h-screen max-h-full"
    >
      {#each Object.keys(methods) as methodKey}
        <button
          on:click={() => {
            $selectedElement = methodKey;
          }}
          class="flex py-1 px-1 border-b hover:bg-dark-2 border-dark-2 items-center justify-between"
        >
          <span class="text-xs">{methods[methodKey].name}</span>
          <div>
            <button
              on:click={() => removeContractMethod($selectedFile, methodKey)}
              title="Add New Variable"
              class="bg-dark-2 px-1 py-1 text-xs border border-dark-4 hover:bg-dark-3 active:bg-dark-0"
              >❌</button
            >
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <h1 class="text-center p-2 ">Open a contract file first!</h1>
  {/if}
</div>
