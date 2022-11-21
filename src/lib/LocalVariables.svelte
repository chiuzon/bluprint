<script lang="ts">
  import ListElement from "./ListElement.svelte";

  import {
    contractFileSystem,
    ContractFunction,
    selectedContract,
    selectedElement,
    Variable,
    selectedLocalVariable,
  } from "./stores/index";

  $: functionLocalVariables = (() => {
    if (!$selectedElement) {
      return [];
    }

    if ($selectedElement.constructor.name !== "ContractFunction") {
      return [];
    }

    const contractFunction = $selectedElement as ContractFunction;

    return contractFunction.props.variables;
  })();

  function addNewLocalVariable() {
    if (!$selectedElement) {
      return [];
    }

    if ($selectedElement.constructor.name === "ContractFunction") {
      console.log($selectedElement);

      const func = $contractFileSystem[
        $selectedContract
      ].addLocalVariableFunction($selectedElement as ContractFunction);

      $contractFileSystem[$selectedContract] = func;

      $selectedElement = $selectedElement;
    }
  }

  function selectVariable(contractVariable: Variable) {
    $selectedLocalVariable = contractVariable;

    $selectedElement = $selectedElement;
  }
</script>

<div class="flex-1 bg-[#1c1c1e] rounded-sm">
  <div
    class="bg-[#2e2e30] p-1 flex justify-between items-center rounded-t-sm uppercase text-sm font-semibold border-b border-[#3b3b3e]"
  >
    <div>Local Variables</div>

    {#if $selectedElement && $selectedElement.constructor.name === "ContractFunction"}
      <button
        on:click={addNewLocalVariable}
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
    {#each functionLocalVariables as localVariable}
      <ListElement
        onSelected={(args) => {
          selectVariable(localVariable);
        }}
        name={localVariable.props.name}
      />
    {/each}
  </div>
</div>
