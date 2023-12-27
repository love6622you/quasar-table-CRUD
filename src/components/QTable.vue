<template>
  <q-table
    flat
    bordered
    class="q-mt-sm"
    row-key="name"
    separator="cell"
    :columns="columns"
    :rows="rows"
    :rows-per-page-options="[10, 20, 50, 100]"
    :filter="filter"
    v-model:selected="modelSelected"
    v-bind="$attrs"
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="500"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template #body-cell="props">
      <q-td :props="props">
        {{ props.value }}
        <q-tooltip anchor="bottom middle" self="center middle">
          {{ props.value }}
        </q-tooltip>
      </q-td>
    </template>
  </q-table>
</template>
<script>
import { onMounted, ref } from "vue";
import useModelWrapper from "src/hooks/useModelWrapper";

export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:selected"],
  setup(props, { emit }) {
    const filter = ref("");
    const modelSelected = ref(useModelWrapper(props, emit, "selected"));

    return {
      filter,
      modelSelected,
    };
  },
};
</script>
