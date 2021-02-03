<script lang="ts">
  import type { Book } from "../../stores/search";
  export let book: Book;
  const NO_DATA = "";

  $: thumbnail =
    book.volumeInfo.imageLinks?.thumbnail ??
    book.volumeInfo.imageLinks?.smallThumbnail;
</script>

<article>
  <div class="image">
    {#if thumbnail}
      <img src={thumbnail} alt="thumbnail" class="thumbnail" />
    {:else}
      <p class="no-image">no image</p>
    {/if}
  </div>
  <div class="info">
    <dl>
      <dt>Title</dt>
      <dd>{book.volumeInfo.title}</dd>
      <dt>Author</dt>
      <dd>{book.volumeInfo.authors?.join() ?? NO_DATA}</dd>
      <dt>Publisher</dt>
      <dd>{book.volumeInfo.publisher ?? NO_DATA}</dd>
      <dt>PublishedDate</dt>
      <dd>{book.volumeInfo.publishedDate ?? NO_DATA}</dd>
      <dt>Categories</dt>
      <dd>{book.volumeInfo.categories?.join() ?? NO_DATA}</dd>
      <dt>Page Count</dt>
      <dd>{book.volumeInfo.pageCount ?? NO_DATA}</dd>
      <dt>Description</dt>
      <dd>{book.volumeInfo.description ?? NO_DATA}</dd>
    </dl>
  </div>
</article>

<style>
  .image {
    margin-bottom: 10px;
    max-height: 200px;
    text-align: center;
  }
  @media (min-width: 36rem) {
    .image {
      float: left;
      width: 130px;
      margin-right: 20px;
      text-align: initial;
    }
  }
  .thumbnail {
    border: 1px solid #999;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  .no-image {
    background-color: #f4f4f4;
    text-align: center;
    line-height: 120px;
    color: #bbb;
    font-weight: 600;
  }
  .info {
    overflow: hidden;
  }
  dt {
    margin-bottom: 0.25rem;
    font-weight: 600;
  }
  dd {
    margin-bottom: 1rem;
  }
  dd:empty::after {
    content: "(not available)";
    color: #bbb;
  }
</style>
