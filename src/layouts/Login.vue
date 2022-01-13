<template>
  <q-layout view="lHh Lpr lFf">
    <q-page class="flex flex-center">
      <q-btn
        @click="loginDropbox()"
        no-caps
        text-color="white"
        style="
          background-color: #0070e0;
          background-image: linear-gradient(#168add, #007ee5);
        "
        >Iniciar Sesion</q-btn
      >
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import { openURL, useQuasar } from "quasar";
import { api } from "boot/axios";
export default defineComponent({
  name: "Login",
  setup() {
    const $q = useQuasar();
    const data = ref(null);

    return {
      async loginDropbox() {
        try {
          const data = await api.get("auth/login");
          window.location.href = data;
        } catch (error) {}
      },
      data,
    };
  },
});
</script>
