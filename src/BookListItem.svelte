<script lang="ts">
  import type { Book } from "./store";
  export let book: Book;

  $: title = book.volumeInfo.title;
  $: author = book.volumeInfo.authors?.join() ?? "";
  $: thumbnail =
    book.volumeInfo.imageLinks?.thumbnail ??
    book.volumeInfo.imageLinks?.smallThumbnail ??
    "http://design-ec.com/d/e_others_50/m_e_others_500.png";
</script>

<article>
  <div class="image">
    <img src={thumbnail} alt="thumbnail" class="thumbnail" />
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
  }
  .image {
    margin-bottom: 10px;
    width: 100%;
    height: 120px;
    text-align: center;
  }
  .thumbnail {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
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
