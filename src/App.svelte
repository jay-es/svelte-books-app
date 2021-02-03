<script lang="ts">
  import { Header, Content } from "carbon-components-svelte";
  import Router from "svelte-spa-router";
  import type { RouteDefinition } from "svelte-spa-router";
  import Home from "./pages/home/Index.svelte";
  import Detail from "./pages/detail/Index.svelte";

  const routes: RouteDefinition = {
    "/": Home,
    "/detail/:id": Detail,
  };
</script>

<main>
  <Header company="Book Search App" />

  <Content>
    <Router {routes} />
  </Content>
</main>
