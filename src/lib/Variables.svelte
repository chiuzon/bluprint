<script lang="ts">
  import ListElement from "./ListElement.svelte";

  import {
    contractFileSystem,
    selectedContract,
    Variable,
    selectedElement,
    selectedLocalVariable,
  } from "./stores/index";

  $: contractVariables = (() => {
    const contract = $contractFileSystem[$selectedContract];

    if (!contract) {
      return [];
    }

    return contract.props.variables;
  })();

  function addNewVariableButton() {
    $contractFileSystem[$selectedContract] =
      $contractFileSystem[$selectedContract].addVariable();
  }

  function selectVariable(contractVariable: Variable) {
    $selectedElement = contractVariable;

    $selectedLocalVariable = undefined;
  }
</script>

<div class="flex-1 bg-[#1c1c1e] rounded-sm h-full ">
  <div
    class="bg-[#2e2e30] flex justify-between items-center p-1 rounded-t-sm uppercase text-sm font-semibold border-b border-[#3b3b3e]"
  >
    <div>Variables</div>
    {#if $contractFileSystem[$selectedContract]}
      <button
        on:click={addNewVariableButton}
        class="bg-[#2e2e30] rounded-md p-1 border border-[#91919421]"
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
    {#each contractVariables as contractVariable}
      <ListElement
        onSelected={(args) => {
          selectVariable(contractVariable);
        }}
        name={contractVariable.props.name}
      />
    {/each}
  </div>
</div>
