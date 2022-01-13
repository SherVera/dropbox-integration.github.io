<template>
  <q-layout view="lHh Lpr lFf"> </q-layout>
</template>
<script>
import { useQuasar } from "quasar";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "boot/axios";
import { useStore } from "vuex";
export default defineComponent({
  name: "Callback",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const $store = useStore();
    const data = ref(null);

    async function getToken(code) {
      if (code) {
        return await api.get("auth/token?code=" + code);
      }
    }

    onMounted(() => {
      const code = route.query.code;
      $q.loading.show({ delay: 0 });
      getToken(code).then((res) => {
        $q.loading.hide();
        if (res) {
          $store.commit("generals/login", res.access_token);
          return router.push({ name: "dropbox" });
        }
        return router.push("/login");
      });
    });

    return {
      data,
      getToken,
    };
  },
});
</script>
