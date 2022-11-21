<script lang="ts">
  import {
    Contract,
    contractFileSystem,
    selectedElement,
    selectedContract,
    selectedLocalVariable,
  } from "./stores";
  import { v4 as uuidv4 } from "uuid";

  function selectItem(id: string) {
    $selectedContract = id;

    $selectedElement = $contractFileSystem[$selectedContract];
    $selectedLocalVariable = undefined;
  }

  function onClickAddButton() {
    $contractFileSystem = {
      ...$contractFileSystem,
      [uuidv4()]: new Contract(
        `Contract_${Object.keys($contractFileSystem).length + 1}`
      ),
    };
  }
</script>

<div class="h-1/4 p-1 pointer-events-auto">
  <div class="bg-[#1c1c1e] h-full rounded-sm flex flex-col">
    <div
      class="bg-[#2e2e30] flex justify-between items-center p-1 rounded-t-sm uppercase text-sm font-semibold border-b border-[#3b3b3e]"
    >
      <span>Explorer</span>

      <button
        on:click={onClickAddButton}
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
    </div>
    <div class="p-1 flex justify-start gap-2 flex-wrap overflow-auto">
      {#each Object.keys($contractFileSystem) as fileId}
        <button
          on:click={() => {
            selectItem(fileId);
          }}
          class="bg-[#2e2e30] hover:bg-[#343437] cursor-pointer p-2 rounded-sm w-20 flex flex-col justify-center items-center"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z"
              />
              <path
                d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"
              />
            </svg>
          </div>
          <div class="text-xs">
            {$contractFileSystem[fileId].props.name}
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>
