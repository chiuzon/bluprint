<script lang="ts">
  export let props;

  console.log(props);

  import {
    fileSystem,
    selectedElement,
    selectedFile,
    uiElementsMetadata,
    UIElementsTypes,
  } from "../stores";

  //
  function onInput(e) {
    switch (props.objectType) {
      case "contract":
        fileSystem.update((fs) => {
          fs[$selectedFile][props.metadata.name] = e.target.value;
          return fs;
        });

        break;
      case "variable":
        fileSystem.update((fs) => {
          fs[$selectedFile].variables[$selectedElement][props.metadata.name] =
            e.target.value;
          return fs;
        });
        break;
      case "method":
        fileSystem.update((fs) => {
          fs[$selectedFile].methods[$selectedElement][props.metadata.name] =
            e.target.value;
          return fs;
        });
        break;
    }
  }
</script>

<div
  class="flex break-all  px-1 border-b  border-dark-4 items-center justify-between"
>
  <span class="text-xs ">Name</span>
  <div>
    <input on:input={onInput} value={props.value} class="bg-dark-2 text-xs" />
  </div>
</div>
<!-- 
<input
  on:input={onInput}
  class="bg-[#2e2e30] rounded-sm w-full"
  value={props.element.value}
/> -->
