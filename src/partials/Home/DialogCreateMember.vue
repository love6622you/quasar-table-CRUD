<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card
      class="q-dialog-plugin text-center q-pa-md"
      style="width: 480px; max-width: 480px"
    >
      <q-btn
        flat
        round
        dense
        icon="close"
        size="sm"
        class="close-button"
        v-close-popup
      />

      <q-form @submit="onOKClick()">
        <q-card-section>
          <div class="text-h5 text-bold">新增會員</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md text-left">
            <section class="col-12">
              <div class="text-subtitle2 text-weight-bold">姓名：</div>
              <q-input
                dense
                hide-bottom-space
                lazy-rules="ondemand"
                :rules="[(val) => !!val || '請輸入姓名']"
                v-model="formData.name"
              >
              </q-input>
            </section>

            <section class="col-12">
              <div class="text-subtitle2 text-weight-bold">手機：</div>
              <q-input
                dense
                hide-bottom-space
                lazy-rules="ondemand"
                mask="####-###-###"
                unmasked-value
                type="tel"
                :rules="[(val) => !!val || '請輸入手機']"
                v-model="formData.cellphone"
              >
              </q-input>
            </section>

            <section class="col-12">
              <div class="text-subtitle2 text-weight-bold">信箱：</div>
              <q-input
                dense
                hide-bottom-space
                lazy-rules="ondemand"
                type="email"
                :rules="[(val, rules) => rules.email(val) || '請輸入有效信箱']"
                v-model="formData.email"
              >
              </q-input>
            </section>

            <section class="col-12">
              <div class="text-subtitle2 text-weight-bold">性別：</div>
              <q-radio
                dense
                val="男"
                label="男"
                class="q-pr-sm"
                v-model="formData.gender"
              />
              <q-radio
                dense
                val="女"
                label="女"
                class="q-pr-sm"
                v-model="formData.gender"
              />
            </section>

            <section class="col-12">
              <div class="text-subtitle2 text-weight-bold">生日：</div>

              <q-input
                dense
                hide-bottom-space
                lazy-rules="ondemand"
                :rules="[
                  (val) => !!val || '請選擇日期',
                  (val) => $filters.Date.rules.checkInputWithinToday(val),
                ]"
                v-model="formData.birthday"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        no-unset
                        :options="
                          (date) =>
                            $filters.Date.options.limitDateOnTodayAgo()(date)
                        "
                        v-model="formData.birthday"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </section>
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            outline
            dense
            unelevated
            padding="sm xl"
            label="取消"
            @click="onDialogCancel()"
          />
          <q-btn
            dense
            unelevated
            padding="sm xl"
            color="primary"
            type="submit"
            label="提交"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useDialogPluginComponent } from "quasar";

export default defineComponent({
  name: "DialogCreateMember",
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogOK, onDialogHide, onDialogCancel } =
      useDialogPluginComponent();

    const formData = ref({
      name: "",
      cellphone: "",
      email: "",
      gender: "男",
      birthday: "",
    });

    const onOKClick = () => {
      onDialogOK(formData.value);
    };

    return {
      formData,

      dialogRef,
      onDialogHide,
      onDialogCancel,
      onOKClick,
    };
  },
});
</script>
