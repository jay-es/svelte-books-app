<script lang="ts">
  import { Header, Content } from "carbon-components-svelte";
  import Search from "./Search.svelte";
</script>

<main>
  <Header company="Books" />

  <Content>
    <Search />
    <p>
      Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
      how to build Svelte apps.
    </p>
  </Content>
</main>
