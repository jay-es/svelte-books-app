<script lang="ts">
  import type { Book } from "../stores/search";
  export let book: Book;
  export let detail = false;

  $: thumbnail =
    book.volumeInfo.imageLinks?.thumbnail ??
    book.volumeInfo.imageLinks?.smallThumbnail;
</script>

<div class={`image ${detail ? "detail" : ""}`}>
  {#if thumbnail}
    <img src={thumbnail} alt="thumbnail" class="thumbnail" />
  {:else}
    <p class="no-image">no image</p>
  {/if}
</div>

<style>
  .image {
    margin-bottom: 10px;
    text-align: center;
  }
  .image:not(.detail) {
    height: 120px;
  }
  .image.detail {
    max-height: 200px;
  }
  @media (min-width: 36rem) {
    .image.detail {
      float: left;
      width: 130px;
      margin-right: 20px;
      text-align: initial;
    }
  }

  .thumbnail {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  .detail > .thumbnail {
    border: 1px solid #999;
  }

  .no-image {
    line-height: 120px;
    color: #bbb;
    font-weight: 600;
  }
  .detail > .no-image {
    background-color: #f4f4f4;
    text-align: center;
  }
</style>
