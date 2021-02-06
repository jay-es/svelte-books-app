<script lang="ts">
  import {
    Search,
    Form,
    Select,
    SelectItem,
    Grid,
    Row,
    Column,
  } from "carbon-components-svelte";
  import {
    fetchBooks,
    fetching,
    orderBys,
    params,
    qModes,
  } from "../../stores/search";

  let keyword = $params.keyword;
  let orderBy = $params.orderBy;
  let qMode = $params.qMode;

  // ストアが更新されたら反映
  params.subscribe((newVal) => {
    keyword = newVal.keyword;
    orderBy = newVal.orderBy;
    qMode = newVal.qMode;
  });

  const handleSubmit = async () => {
    // 空なら終了
    if (!keyword) return;

    await fetchBooks({ keyword, orderBy, qMode, page: 0 });
  };

  const handleChange = (event: CustomEvent<string>) => {
    // disabled が変わった時も発火してしまうので除外
    if (event.detail === $params.orderBy || event.detail === $params.qMode)
      return;

    handleSubmit();
  };
</script>

<Form on:submit={handleSubmit}>
  <Search bind:value={keyword} disabled={$fetching} />
  <Grid>
    <Row>
      <Column sm={6}>
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
      </Column>
      <Column sm={6}>
        <Select
          inline
          labelText="Order by"
          disabled={$fetching}
          bind:selected={orderBy}
          on:change={handleChange}
        >
          {#each orderBys as value}
            <SelectItem {value} />
          {/each}
        </Select>
      </Column>
    </Row>
  </Grid>
</Form>
