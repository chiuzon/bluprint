<script lang="ts">
  import {
    contractFileSystem,
    ContractFunction,
    selectedContract,
    selectedElement,
    selectedLocalVariable,
  } from "./stores/index";

  import ListElement from "./ListElement.svelte";

  $: contractFunctions = (() => {
    const contract = $contractFileSystem[$selectedContract];

    if (!contract) {
      return [];
    }

    return contract.props.functions;
  })();

  function addNewFunctionButton() {
    $contractFileSystem[$selectedContract] =
      $contractFileSystem[$selectedContract].addFunction();
  }

  function selectFunction(func: ContractFunction) {
    $selectedElement = func;

    $selectedLocalVariable = undefined;
  }
</script>

<div class="flex-1 bg-[#1c1c1e] rounded-sm h-full ">
  <div
    class="bg-[#2e2e30] flex justify-between items-center p-1 rounded-t-sm uppercase text-sm font-semibold border-b border-[#3b3b3e]"
  >
    <div>Functions</div>
    {#if $contractFileSystem[$selectedContract]}
      <button
        on:click={addNewFunctionButton}
        class="bg-[#2e2e30] hover:bg-[#353537] rounded-md p-1 border border-[#91919421]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    {/if}
  </div>
  <div class="flex flex-col overflow-y-scroll h-full max-h-[26rem]">
    {#each contractFunctions as contractFunction}
      <ListElement
        onSelected={(args) => {
          selectFunction(contractFunction);
        }}
        name={contractFunction.props.name}
      />
    {/each}
  </div>
</div>
