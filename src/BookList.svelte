<script lang="ts">
  import { PaginationNav } from "carbon-components-svelte";
  import { totalItems, books, formData, fetchBooks } from "./store";
  import BookListItem from "./BookListItem.svelte";

  let offsetWidth;
  const emptyItems = Array(8); // 最大列数

  const handlePageChange = (event: CustomEvent<{ page: number }>): void => {
    // total などが変わった時も発火してしまう。ページが変わっていなければ除外
    if (page === event.detail.page) return;

    fetchBooks(event.detail);
  };

  $: page = $formData.page;
  $: shown = Math.floor(offsetWidth / 48) - 2;
  $: total = Math.ceil($totalItems / $formData.pageSize);
</script>

<div bind:offsetWidth>
  <p class="results">{$totalItems.toLocaleString()} results</p>

  {#if total > 0}
    <PaginationNav {page} {shown} {total} on:change={handlePageChange} />
  {/if}

  {#if $books.length}
    <ul class="booklist">
      {#each $books as book (book.id)}
        <li class="booklist-item">
          <BookListItem {book} />
        </li>
      {/each}
      {#each emptyItems as _, index (index)}
        <!-- 最終行を左寄せにするため、空の要素を追加 -->
        <li class="booklist-item" />
      {/each}
    </ul>

    <PaginationNav {page} {shown} {total} on:change={handlePageChange} />
  {/if}
</div>

<style>
  .booklist {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
  }
  .booklist-item {
    width: 140px;
  }
</style>
