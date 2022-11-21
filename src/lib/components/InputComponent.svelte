<script lang="ts">
  export let props;

  const lastValue = props.element.value;

  function onInput(e: any) {
    if (lastValue !== e.target.value) {
      props.onEdit(props.element.name, e.target.value);
    }
  }
</script>

<input
  on:input={onInput}
  class="bg-[#2e2e30] rounded-sm w-full"
  value={props.element.value}
/>
