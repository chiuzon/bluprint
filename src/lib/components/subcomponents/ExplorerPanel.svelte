<script lang="ts">
  import {
    fileSystem,
    selectedElement,
    selectedFile,
    useFileSystem,
  } from "../../stores";

  const { addNewContract } = useFileSystem();
</script>

<div class="flex items-center border-y border-dark-2">
  <button on:click={addNewContract} class="px-2 bg-dark-2">+</button>
</div>

<div class="flex flex-wrap gap-2 p-1 overflow-auto max-h-32">
  {#each Object.keys($fileSystem) as fsKey}
    <button
      on:click={() => {
        $selectedFile = fsKey;
        $selectedElement = fsKey;
      }}
      class="px-4 py-2 hover:bg-dark-3 h-12 w-20 flex flex-col justify-center items-center bg-dark-2"
    >
      <div class="text-xs">📜</div>
      <span class="text-xs break-all">{$fileSystem[fsKey].name}</span>
    </button>
  {/each}
</div>
