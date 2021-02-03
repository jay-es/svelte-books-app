import type { RouteDefinition } from "svelte-spa-router";
import Home from "./pages/home/Index.svelte";
import Detail from "./pages/detail/Index.svelte";

export const routes: RouteDefinition = {
  "/": Home,
  "/detail/:id": Detail,
};
