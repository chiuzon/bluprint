<script lang="ts">
  import {
    fileSystem,
    selectedElement,
    selectedFile,
    uiElementsMetadata,
    UIElementsTypes,
  } from "../stores";

  $: selectedObject = (() => {
    const contract = $fileSystem[$selectedFile];

    if (!contract) {
      return;
    }

    const isContract = $fileSystem[$selectedElement];

    if (isContract) {
      return isContract;
    }

    const isVar = contract.variables[$selectedElement];

    if (isVar) {
      return isVar;
    }

    const isMethod = contract.methods[$selectedElement];

    if (isMethod) {
      return isMethod;
    }
  })();

  $: objectProps = (() => {
    if (!selectedObject) return [];

    const uiObjMetadata = uiElementsMetadata[selectedObject.objectType];

    const props: { name: string; type: string }[] = [];

    for (const i of uiObjMetadata.props) {
      const index = Object.keys(selectedObject).indexOf(i.name);

      if (index !== -1) {
        props.push(i);
      }
    }

    return props;
  })();
</script>

<div class=" bg-dark-0 border-r border-l border-dark-3  h-full">
  <div class="">
    <div
      class="text-sm font-medium bg-dark-1 border-b  border-dark-3 py-1 px-2"
    >
      Properties: {`${selectedObject ? selectedObject.name : ""}`}
    </div>

    <div class="flex flex-col shadow-inner">
      {#if selectedObject}
        {#each objectProps as objectProp}
          <svelte:component
            this={UIElementsTypes[objectProp.type].component}
            props={{
              metadata: objectProp,
              value: selectedObject[objectProp.name],
              objectType: selectedObject.objectType,
            }}
          />
        {/each}
      {/if}
    </div>
  </div>
</div>
