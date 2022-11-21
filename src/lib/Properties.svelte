<script lang="ts">
  import {
    selectedElement,
    uiElementsMetadata,
    UIElementsTypes,
    contractFileSystem,
    selectedContract,
    Contract,
    ContractFunction,
    Variable,
    selectedLocalVariable,
  } from "./stores";

  $: elementProperties = (() => {
    if (!$selectedElement) {
      return [];
    }

    const props = [];

    // Used to show the properties of the selected local variable of a function
    if ($selectedElement && $selectedLocalVariable) {
      for (const key of Object.keys($selectedLocalVariable.props)) {
        const supportedProp = uiElementsMetadata[
          $selectedLocalVariable.constructor.name
        ].props.find((val) => val.name === key);

        if (supportedProp) {
          props.push({
            name: supportedProp.name,
            type: supportedProp.type,
            value: $selectedLocalVariable.props[key],
          });
        }
      }

      return props;
    }

    // Used for contract, contract variable, contract function
    for (const key of Object.keys($selectedElement.props)) {
      const supportedProp = uiElementsMetadata[
        $selectedElement.constructor.name
      ].props.find((val) => val.name === key);

      if (supportedProp) {
        props.push({
          name: supportedProp.name,
          type: supportedProp.type,
          value: $selectedElement.props[key],
        });
      }
    }

    return props;
  })();

  function onEdit(key: string, value: any) {
    // $selectedElement.props[key] = value;

    if (!selectedElement) {
      return;
    }

    // IS EDITING THE CONTRACT PROPS
    if ($selectedElement === $contractFileSystem[$selectedContract]) {
      const localContract = $contractFileSystem[$selectedContract];
      localContract.props[key] = value;

      $contractFileSystem = {
        ...$contractFileSystem,
        [$selectedContract]: localContract,
      };

      $selectedElement = $contractFileSystem[$selectedContract];
    } else if ($selectedElement.constructor.name === "ContractFunction") {
      if ($selectedLocalVariable) {
        $contractFileSystem = {
          ...$contractFileSystem,
          [$selectedContract]: $contractFileSystem[
            $selectedContract
          ].editFunctionLocalVariableProp(
            $selectedElement as ContractFunction,
            $selectedLocalVariable,
            key,
            value
          ),
        };

        $selectedElement = $selectedElement;
        $selectedLocalVariable = $selectedLocalVariable;

        return;
      }

      $contractFileSystem = {
        ...$contractFileSystem,
        [$selectedContract]: $contractFileSystem[
          $selectedContract
        ].editFunctionProp($selectedElement as ContractFunction, key, value),
      };

      $selectedElement = $selectedElement;
    } else if ($selectedElement.constructor.name === "Variable") {
      $contractFileSystem = {
        ...$contractFileSystem,
        [$selectedContract]: $contractFileSystem[
          $selectedContract
        ].editVariableProp($selectedElement as Variable, key, value),
      };

      $selectedElement = $selectedElement;
    } else {
    }
    // ELSE IS EDITING VARIABLE
  }
</script>

<div class="flex-1 bg-[#1c1c1e] rounded-sm">
  <div
    class="bg-[#2e2e30] p-1 rounded-t-sm uppercase text-sm font-semibold border-b border-[#3b3b3e]"
  >
    Properties
  </div>
  <div class="flex flex-col  overflow-auto">
    {#each elementProperties as element}
      <div
        class="flex flex-col justify-between flex-wrap gap-1 py-2 px-1 border-b border-[#3b3b3e] text-xs"
      >
        <div class="flex-1">{element.name}</div>
        <div class="flex flex-wrap">
          <svelte:component
            this={UIElementsTypes[element.type].component}
            props={{ element, onEdit }}
          />
        </div>
      </div>
    {/each}
  </div>
</div>
