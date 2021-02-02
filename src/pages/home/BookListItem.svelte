<script lang="ts">
  import { push } from "svelte-spa-router";
  import type { Book } from "../../stores/search";
  export let book: Book;

  $: title = book.volumeInfo.title;
  $: author = book.volumeInfo.authors?.join() ?? "";
  $: thumbnail =
    book.volumeInfo.imageLinks?.thumbnail ??
    book.volumeInfo.imageLinks?.smallThumbnail;
</script>

<article on:click={() => push(`/detail/${book.id}`)}>
  <div class="image">
    {#if thumbnail}
      <img src={thumbnail} alt="thumbnail" class="thumbnail" />
    {:else}
      <p class="no-image">no image</p>
    {/if}
  </div>
  <div class="title">{title}</div>
  <div class="author">{author}</div>
</article>

<style>
  article {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f4f4f4;
    height: 210px;
    cursor: pointer;
  }
  .image {
    margin-bottom: 10px;
    height: 120px;
    text-align: center;
  }
  .thumbnail {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  .no-image {
    line-height: 120px;
    opacity: 0.33;
    font-weight: 600;
  }
  .title {
    margin-bottom: 10px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .author {
    font-size: 85%;
    opacity: 0.7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
