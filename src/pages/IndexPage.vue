<template>
  <q-page class="row justify-left q-pa-lg">
    <div class="block-item">
      <div class="text-h6">員工基本資訊</div>

      <q-form @submit="onSearch">
        <section class="row q-gutter-y-md q-pt-md">
          <div class="col-12 col-sm-6 col-md-3 q-px-xs">
            <div class="text-weight-bold">姓名</div>
            <q-input
              filled
              dense
              hide-bottom-space
              class="col-12"
              v-model.trim="filters.name"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3 q-px-xs">
            <div class="text-weight-bold">手機</div>
            <q-input
              filled
              dense
              hide-bottom-space
              class="col-12"
              v-model.trim="filters.cellphone"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3 q-px-xs">
            <div class="text-weight-bold">性別</div>
            <q-select
              filled
              dense
              hide-bottom-space
              class="col-12"
              :options="['男', '女']"
              v-model="filters.gender"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3 q-px-xs">
            <div class="text-weight-bold">信箱</div>
            <q-input
              filled
              dense
              hide-bottom-space
              class="col-12"
              v-model.trim="filters.email"
            />
          </div>

          <div class="col-12 text-right">
            <q-btn class="q-mr-sm" color="primary" label="查詢" type="submit" />
            <q-btn class="white" label="重置" @click="onReset" />
          </div>
        </section>
      </q-form>

      <q-separator spaced="16px" />

      <div class="text-right">
        <q-btn
          class="q-mr-sm"
          color="primary"
          label="新增"
          @click="addMember"
        />
        <q-btn
          color="white"
          text-color="black"
          label="刪除"
          @click="deleteMember"
        />
      </div>
      <QTable
        :columns="columns"
        :rows="rows"
        :loading="loading"
        selection="multiple"
        v-model:selected="selected"
      />
    </div>
  </q-page>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useQuasar } from "quasar";
import MemberApi from "src/api/Member";
import QTable from "src/components/QTable.vue";
import DialogConfirmMessage from "src/components/DialogConfirmMessage.vue";
import DialogCreateMember from "src/partials/Home/DialogCreateMember.vue";

export default {
  name: "IndexPage",

  components: {
    QTable,
  },

  setup() {
    const $q = useQuasar();
    const state = reactive({
      columns: [
        {
          name: "name",
          label: "姓名",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "cellphone",
          label: "手機",
          align: "left",
          field: "cellphone",
          sortable: true,
        },
        {
          name: "email",
          label: "信箱",
          align: "left",
          field: "email",
          sortable: true,
        },
        {
          name: "gender",
          label: "性別",
          align: "left",
          field: "gender",
          sortable: true,
        },
        {
          name: "birthday",
          label: "生日",
          align: "left",
          field: "birthday",
          sortable: true,
          format: (val) => {
            if (val === undefined || val === null) return "";

            // 如果字串符合 ####/##/## 的格式，直接回傳
            if (/^\d{4}\/\d{2}\/\d{2}$/.test(val)) return val;

            // 否則，將字串轉換成日期格式，再轉換成指定格式
            const [_year, _month, _date] = val.split("T")[0].split("-");
            let year = _year;
            let month = _month.padStart(2, "0");
            let date = _date.padStart(2, "0");

            return `${year}/${month}/${date}`;
          },
        },
      ],
      rows: [],
      selected: [],
      filters: {
        name: "",
        cellphone: "",
        email: "",
        gender: "",
      },
      loading: false,
    });

    const addMember = () => {
      $q.dialog({
        component: DialogCreateMember,
        componentProps: {},
      }).onOk((payload) => {
        state.rows.unshift(payload);
        $q.notify({
          type: "positive",
          message: `新增成功`,
        });
      });
    };

    const deleteMember = () => {
      const deleteCount = state.selected.length;
      if (deleteCount === 0) {
        $q.notify({ type: "negative", message: "請選擇要刪除的資料" });
        return;
      }

      $q.dialog({
        component: DialogConfirmMessage,
        componentProps: {
          title: "刪除",
          content: `是否確定刪除 ${deleteCount} 筆資料?`,
        },
      }).onOk(() => {
        state.rows = state.rows.filter((row) => !state.selected.includes(row));
        $q.notify({
          type: "positive",
          message: `已刪除 ${deleteCount} 筆資料`,
        });

        // 清空選擇
        state.selected = [];
      });
    };

    const fetehData = async () => {
      try {
        state.loading = true;
        const res = await MemberApi.getMembers();
        state.rows = res.data.members;
      } catch (error) {
        $q.notify({ type: "negative", message: error.message });
      } finally {
        state.loading = false;
      }
    };

    const onSearch = async () => {
      const isAnyValue = Object.values(state.filters).some((value) => value);
      if (!isAnyValue) {
        $q.notify({ type: "negative", message: "請輸入查詢條件" });
        return;
      }

      try {
        state.loading = true;
        const res = await MemberApi.getMember({
          filter: state.filters,
          sort: "-name",
        });
        state.rows = res.data.members;
      } catch (error) {
        $q.notify({ type: "negative", message: error.message });
      } finally {
        state.loading = false;
      }
    };

    const onReset = () => {
      state.filters = {
        name: "",
        cellphone: "",
        email: "",
        gender: "",
      };
      fetehData();
    };

    onMounted(() => {
      fetehData();
    });

    return {
      ...toRefs(state),
      addMember,
      deleteMember,
      onSearch,
      onReset,
    };
  },
};
</script>
<style lang="scss" scoped>
.block-item {
  width: 100%;
  min-width: 400px;
}
</style>
