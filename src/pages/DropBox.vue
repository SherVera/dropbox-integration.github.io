<template>
  <q-page>
    <div>
      <q-card flat class="text-primary">
        <q-card-section>
          <div class="row">
            <div class="col-md-9">
              <div class="text-h4"><b>Lista de Archivos</b></div>
            </div>
            <div class="col-md-3" style="text-align: right">
              <q-btn
                v-if="selected.length"
                class="q-ml-sm"
                round
                @click="$q.fullscreen.toggle()"
                icon="download"
                color="primary"
                size="md"
              >
                <q-tooltip> Descargar </q-tooltip>
              </q-btn>
              <q-btn
                class="q-ml-sm"
                round
                @click="$q.fullscreen.toggle()"
                :icon="
                  $q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'
                "
                color="primary"
                size="md"
              >
                <q-tooltip> Pantalla completa </q-tooltip>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pa-sm">
        <q-markup-table dense flat bordered>
          <thead>
            <tr>
              <th class="text-center" style="width: 1vw">Tipo</th>
              <th class="text-left">Nombre de archivo</th>
              <th class="text-left">Ubicacion</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in data.records"
              :key="index"
              style="cursor: pointer"
              @click="selectFile(item)"
            >
              <td class="text-center">
                <q-icon
                  :name="`${item['.tag'] === 'folder' ? 'folder' : 'download'}`"
                  size="sm"
                ></q-icon>
              </td>
              <td class="text-left">{{ item.name }}</td>
              <td class="text-left">
                {{ item.path_display.replace(`/${item.name}`, "") }}
              </td>
            </tr>
            <tr v-if="!data.records.length" style="text-align: center">
              <td class="text-center">No hay registros para mostrar</td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-separator color="grey-4" />
      </div>
    </div>
  </q-page>
</template>
<script>
import { useQuasar } from "quasar";
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { api } from "boot/axios";

const cols = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    sortable: true,
  },
];

const buttons = [
  {
    label: "Nuevo",
    icon: "add",
    color: "primary",
    action: "",
    permission: "2.2",
  },
];
export default {
  setup() {
    const route = useRoute();
    const $q = useQuasar();
    const data = reactive({ records: [] });
    const check1 = ref([]);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10,
    });
    const current = ref(1);
    const text = ref("");
    const filter = ref("");
    const loading = ref(false);
    const selected = ref([]);
    const selectedAll = ref(false);
    const listFolderArguments = ref({
      path: "",
      recursive: true,
      include_deleted: false,
      include_has_explicit_shared_members: false,
      include_mounted_folders: false,
      limit: 1000,
      include_non_downloadable_files: false,
    });

    const getFilesListFolder = async () => {
      $q.loading.show({
        message: "Buscando...",
      });
      const { result } = await api.post(
        "files/list_folder",
        listFolderArguments.value
      );
      $q.loading.hide();
      data.records = result.entries;
    };

    const downloadZip = async (path, name) => {
      $q.loading.show({
        message: "Descargando...",
      });
      const result = await api.post(
        "files/download/zip",
        { path },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([result]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.zip`);
      document.body.appendChild(link);
      link.click();
      $q.loading.hide();
    };

    const download = async (path, name) => {
      $q.loading.show({
        message: "Descargando...",
      });
      const result = await api.post(
        "files/download",
        { path },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([result]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      $q.loading.hide();
    };

    const selectFile = (item) => {
      if (item[".tag"] === "file") {
        download(item.path_lower, item.name);
      } else if (item[".tag"] === "folder") {
        downloadZip(item.path_lower, item.name);
      }
    };

    onMounted(() => {
      getFilesListFolder();
    });

    return {
      check1,
      data,
      getFilesListFolder,
      selected,
      selectedAll,
      filter,
      loading,
      pagination,
      cols,
      buttons,
      text,
      current,
      response: ref({ lastPage: 1 }),
      clearSearch: () => {
        text.value = "";
        getFilesListFolder();
      },
      selectAll: (val) => {
        selected.value = [];
        selectedAll.value = val;
        if (val) {
          data.records.forEach((item) => {
            selected.value.push(item.id);
          });
        }
      },
      listen: (val) => {},
      selectFile,
    };
  },
};
</script>
