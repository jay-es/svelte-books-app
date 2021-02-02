<script lang="ts">
  import Search from "./Search.svelte";
  import BookList from "./BookList.svelte";
</script>

<section>
  <Search />
</section>

<section>
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
</style>
