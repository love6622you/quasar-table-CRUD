<template>
  <q-page class="row justify-left q-pa-lg">
    <div class="block-item">
      <div class="row justify-between items-center">
        <div class="text-h6">員工基本資訊</div>
        <div>
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
import { useQuasar, uid, date } from "quasar";
import MemberApi from "src/api/Member";
import QTable from "src/components/QTable.vue";
import DialogConfirmMessage from "src/components/DialogConfirmMessage.vue";

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
      loading: false,
    });

    const addMember = () => {
      const birthday = date.formatDate(new Date(), "YYYY-MM-DD");

      state.rows.unshift({
        name: uid().slice(0, Math.random() * 10 + 10),
        cellphone: "0912345678",
        email: uid().slice(0, Math.random() * 10 + 10) + "@gmail.com",
        gender: Math.random() > 0.5 ? "男" : "女",
        birthday,
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

    onMounted(() => {
      fetehData();
    });

    return {
      ...toRefs(state),
      addMember,
      deleteMember,
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
