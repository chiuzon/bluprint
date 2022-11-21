<script lang="ts">
  import {
    ContractFunction,
    selectedElement,
    contractFileSystem,
    selectedContract,
  } from "../stores";

  export let props;

  $: list = (() => {
    if (!$selectedElement) {
      return [];
    }

    if ($selectedElement.constructor.name !== "ContractFunction") {
      return [];
    }

    const contractFunction = $selectedElement as ContractFunction;

    return contractFunction.props[props.element.name];
  })();

  function addNewEntry() {
    $contractFileSystem = {
      ...$contractFileSystem,
      [$selectedContract]: $contractFileSystem[
        $selectedContract
      ].addFunctionEntryPoint($selectedElement as ContractFunction),
    };

    $selectedElement = $selectedElement;
  }

  $: console.log(props);

  function editArgName(element, index, ev) {
    $contractFileSystem = {
      ...$contractFileSystem,
      [$selectedContract]: $contractFileSystem[
        $selectedContract
      ].editFunctionEntryPoint($selectedElement as ContractFunction, index, {
        ...element,
        name: ev.target.value,
      }),
    };
    $selectedElement = $selectedElement;
  }

  function editArgType(element, index, ev) {
    $contractFileSystem = {
      ...$contractFileSystem,
      [$selectedContract]: $contractFileSystem[
        $selectedContract
      ].editFunctionEntryPoint($selectedElement as ContractFunction, index, {
        ...element,
        type: ev.target.value,
      }),
    };
    $selectedElement = $selectedElement;
  }
</script>

<div class="flex flex-col w-full">
  <button
    on:click={addNewEntry}
    class="bg-[#27272a] px-2 py-1 rounded-sm text-xs font-semibold">+</button
  >
  {#each list as listElement, index}
    <div class="flex justify-between gap-1 border border-[#101011]">
      <input
        on:input={(ev) => editArgName(listElement, index, ev)}
        value={listElement.name}
        class="bg-[#27272a] w-1/2"
      />
      <input
        on:input={(ev) => editArgType(listElement, index, ev)}
        value={listElement.type}
        class="bg-[#27272a] w-1/2"
      />
    </div>
  {/each}
</div>
