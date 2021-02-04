<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import ArrowLeft16 from "carbon-icons-svelte/lib/ArrowLeft16";
  import { pop } from "svelte-spa-router";
  import { books } from "../../stores/search";
  import BookDetail from "./BookDetail.svelte";

  export let params: { id: string };
  $: book = $books.find((v) => v.id === params.id);
</script>

{#if book}
  <BookDetail {book} />
{/if}
<div class="btn-wrap">
  <Button kind="secondary" icon={ArrowLeft16} on:click={pop}>Back</Button>
</div>

<style>
  .btn-wrap {
    margin-top: 1rem;
    text-align: center;
  }
</style>
