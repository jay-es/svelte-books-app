<script lang="ts">
  import { fetching } from "../../stores/search";
  import Search from "./Search.svelte";
  import BookList from "./BookList.svelte";
</script>

<section class={$fetching ? "disabled" : ""}>
  <Search />
</section>

<section class={$fetching ? "disabled" : ""}>
  <BookList />
</section>

<style>
  section {
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
  }
  section ~ section {
    margin-top: 1rem;
  }
  .disabled {
    cursor: progress;
  }
  .disabled :global(*) {
    pointer-events: none;
  }
</style>
