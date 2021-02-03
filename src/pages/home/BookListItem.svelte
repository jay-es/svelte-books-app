<script lang="ts">
  import { push } from "svelte-spa-router";
  import Thumbnail from "../../components/Thumbnail.svelte";
  import type { Book } from "../../stores/search";
  export let book: Book;

  $: title = book.volumeInfo.title;
  $: author = book.volumeInfo.authors?.join() ?? "";
</script>

<article on:click={() => push(`/detail/${book.id}`)}>
  <Thumbnail {book} />
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
    line-height: 1.2;
  }
  .title {
    margin-bottom: 5px;
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
