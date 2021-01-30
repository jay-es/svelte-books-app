<script lang="ts">
  import { Search, Form } from "carbon-components-svelte";
  import { fetchBooks, fetching } from "./store";

  export let keyword: string;
  $: disabled = $fetching;

  const handleSubmit = async () => {
    // 空なら終了
    if (!keyword) return;

    await fetchBooks(keyword);
    keyword = "";
  };
</script>

<Form on:submit={handleSubmit}>
  <Search bind:value={keyword} bind:disabled />
</Form>
