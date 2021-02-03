<script lang="ts">
  import Thumbnail from "../../components/Thumbnail.svelte";
  import type { Book } from "../../stores/search";
  export let book: Book;
  const NO_DATA = "";
</script>

<article>
  <Thumbnail {book} detail />
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
