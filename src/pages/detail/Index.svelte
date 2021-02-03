<script lang="ts">
  import { books } from "../../stores/search";
  import BookDetail from "./BookDetail.svelte";

  export let params: { id: string };
  $: book = $books.find((v) => v.id === params.id);
</script>

{#if book}
  <BookDetail {book} />
{/if}
