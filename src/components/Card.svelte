<script lang="ts">
  export let title: string;
  export let summary: string;
  export let image: { src: string; alt: string };
  export let rtl = false;
</script>

<div
  class="flex flex-row justify-center {rtl
    ? 'flex-row-reverse'
    : ''} shadow-sm min-w-[480px] max-w-[840px] mx-auto py-2 px-4 my-5"
>
  {#if image}
    <div id="image" class="w-1/3">
      <img src={image?.src} alt={image?.alt} width="265" height="150" />
    </div>
  {/if}
  <div
    class="flex flex-col justify-start items-start px-4 py-2 {image
      ? 'w-2/3'
      : 'w-full'}"
  >
    <h2 class="text-2xl font-semibold">{title}</h2>
    <div id="summary">
      <span class="text-base">{summary}</span>
    </div>
  </div>
</div>
