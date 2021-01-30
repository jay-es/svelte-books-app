<script lang="ts">
  import { Header, Content } from "carbon-components-svelte";
  export let name: string;
</script>

<main>
  <Header company="Books" />

  <Content>
    <h1>Hello {name}!</h1>
    <p>
      Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
      how to build Svelte apps.
    </p>
  </Content>
</main>
