<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card
      class="q-dialog-plugin text-center q-pa-md"
      style="width: 300px; max-width: 300px"
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

      <q-form @submit="onDialogOK()">
        <q-card-section>
          <div class="text-h5 text-bold">
            {{ title }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1">
            {{ content }}
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            v-if="cancel"
            outline
            dense
            unelevated
            padding="sm xl"
            :label="cancelText"
            @click="onDialogCancel()"
          />
          <q-btn
            v-if="confirm"
            dense
            unelevated
            padding="sm xl"
            color="primary"
            type="submit"
            :label="confirmText"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { useDialogPluginComponent } from "quasar";

export default defineComponent({
  name: "DialogConfirmMessage",
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    confirm: {
      type: Boolean,
      default: true,
    },
    cancel: {
      type: Boolean,
      default: true,
    },
    confirmText: {
      type: String,
      default: "確定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    return {
      dialogRef,

      onDialogHide,
      onDialogOK,
      onDialogCancel,
    };
  },
});
</script>

<style>
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}
</style>
