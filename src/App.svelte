<script lang="ts">
  import { Header, Content } from "carbon-components-svelte";
  import Router from "svelte-spa-router";
  import type { RouteDefinition } from "svelte-spa-router";
  import Home from "./pages/home/Index.svelte";

  const routes: RouteDefinition = {
    "/": Home,
  };
</script>

<main>
  <Header company="Books" />

  <Content>
    <Router {routes} />
  </Content>
</main>
