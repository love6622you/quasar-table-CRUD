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
        clearable
        debounce="500"
        placeholder="Search"
        v-model="filter"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template #body-cell="props">
      <q-td
        :props="props"
        @click="onClickCell(props.value)"
        style="cursor: pointer"
      >
        {{ props.value }}
        <q-tooltip anchor="bottom middle" self="center middle">
          {{ props.value }}
        </q-tooltip>
      </q-td>
    </template>
  </q-table>
</template>
<script>
import { useQuasar, copyToClipboard } from "quasar";
import { ref } from "vue";
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
    const $q = useQuasar();

    const filter = ref("");
    const modelSelected = useModelWrapper(props, emit, "selected");

    const onClickCell = (value) => {
      copyToClipboard(value).then(() => {
        $q.notify({
          message: "已複製",
          color: "positive",
          icon: "done",
        });
      });
    };

    return {
      filter,
      modelSelected,

      onClickCell,
    };
  },
};
</script>
