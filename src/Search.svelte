<script lang="ts">
  import { Search, Form } from "carbon-components-svelte";
  import { fetchBooks, formData } from "./store";

  let input: HTMLInputElement;

  const handleSubmit = async () => {
    const keyword = input.value;

    // 空なら終了
    if (!keyword) return;

    await fetchBooks({ keyword, page: 0 });
  };
</script>

<Form on:submit={handleSubmit}>
  <Search
    bind:ref={input}
    value={$formData.keyword}
    disabled={$formData.fetching}
  />
</Form>
