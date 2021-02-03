<script lang="ts">
  import { Header, Content } from "carbon-components-svelte";
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
</script>

<main>
  <Header company="Book Search App" />

  <Content>
    <Router {routes} />
  </Content>
</main>
