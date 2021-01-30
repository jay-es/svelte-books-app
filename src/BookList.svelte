<script lang="ts">
  import { totalItems, books } from "./store";
  import BookListItem from "./BookListItem.svelte";
</script>

<div>
  <p class="results">{$totalItems.toLocaleString()} results</p>
  <ul class="booklist">
    {#each $books as book (book.id)}
      <li class="booklist-item">
        <BookListItem {book} />
      </li>
    {/each}
    {#each $books as book (book.id)}
      <!-- 最終行を左寄せにするため、空の要素を追加 -->
      <li class="booklist-item" />
    {/each}
  </ul>
</div>

<style>
  .results {
    margin-bottom: 10px;
  }
  .booklist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
  }
  .booklist-item {
    width: 140px;
  }
</style>
