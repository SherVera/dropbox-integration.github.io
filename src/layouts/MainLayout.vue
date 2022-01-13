<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center"> Dropbox </q-toolbar-title>
        <q-btn flat icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { api } from "boot/axios";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const $store = useStore();
    const router = useRouter();

    const logout = async () => {
      await api.post("auth/logout");
      $store.commit("generals/logout");
      return router.push("/login");
    };
    return {
      logout,
    };
  },
});
</script>
