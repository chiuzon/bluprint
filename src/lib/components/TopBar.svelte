<script lang="ts">
  import { fileSystem, selectedFile } from "../stores";
</script>

<div class="bg-dark-1 border-b border-dark-2">
  <span
    >{`${
      $fileSystem[$selectedFile] ? $fileSystem[$selectedFile].name : "..."
    }`}</span
  >
</div>
