<script lang="ts">
  import { Search, Form } from "carbon-components-svelte";
  import { fetchBooks, fetching, params } from "../../stores/search";

  let input: HTMLInputElement;

  const handleSubmit = async () => {
    const keyword = input.value;

    // 空なら終了
    if (!keyword) return;

    await fetchBooks({ keyword, page: 0 });
  };
</script>

<Form on:submit={handleSubmit}>
  <Search bind:ref={input} value={$params.keyword} disabled={$fetching} />
</Form>
