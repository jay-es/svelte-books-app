<script lang="ts">
  import { Header, Content } from "carbon-components-svelte";
  import Search from "./Search.svelte";
  import BookList from "./BookList.svelte";
</script>

<main>
  <Header company="Books" />

  <Content>
    <section>
      <Search />
    </section>

    <section>
      <BookList />
    </section>
  </Content>
</main>

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
