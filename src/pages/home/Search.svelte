<script lang="ts">
  import { Search, Form, Select, SelectItem } from "carbon-components-svelte";
  import { fetchBooks, fetching, params, qModes } from "../../stores/search";
  import type { Params } from "../../stores/search";

  let keyword: Params["keyword"] = "";
  let qMode: Params["qMode"] = "";

  // ストアが更新されたら反映
  params.subscribe((newVal) => {
    keyword = newVal.keyword;
    qMode = newVal.qMode;
  });

  const handleSubmit = async () => {
    // 空なら終了
    if (!keyword) return;

    await fetchBooks({ keyword, page: 0 });
  };

  const handleChange = (event: CustomEvent<string>) => {
    // disabled が変わった時も発火してしまうので除外
    if (event.detail === $params.qMode) return;

    fetchBooks({ qMode, page: 0 });
  };
</script>

<Form on:submit={handleSubmit}>
  <Search bind:value={keyword} disabled={$fetching} />
  <Select
    inline
    labelText="Search in"
    disabled={$fetching}
    bind:selected={qMode}
    on:change={handleChange}
  >
    {#each qModes as { text, value }}
      <SelectItem {text} {value} />
    {/each}
  </Select>
</Form>
