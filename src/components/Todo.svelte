<script lang="ts">
  export let title = 'Test Title';
  export let done = false;

  $: {
    console.log('checked: ', done);
  }

  $: {
    console.log('text value changed: ', title);
  }
</script>

<div
  class="flex w-full flex-row items-center justify-around gap-4 mx-4 my-2 px-4 shadow-md border border-gray-50"
>
  <input
    type="checkbox"
    class="px-4 text-center text-xl text-gray-700 w-1/8"
    bind:checked={done}
  />
  <input
    class="px-4 text-center text-xl text-gray w-2/3 border-b border-b-gray-500"
    bind:value={title}
  />

  <div class="w-1/4 flex flex-row gap-2 items-start justify-between">
    <button
      class="text-red-700 font-bold py-4 underline underline-offset-4 rounded-md w-1/2"
      >Delete</button
    >
    <button
      class="py-4 rounded-md text-blue-800 underline underline-offset-4 w-1/2"
      >Done</button
    >
  </div>
</div>
