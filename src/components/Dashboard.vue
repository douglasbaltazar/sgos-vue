<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Bem-vindo ao seu Dashboard
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" lg="4">
        <material-card
          icon="mdi-account"
          icon-small
          subtitle="Clientes"
          color="teal darken-3"
        >
          <h4>{{ clientesCadastrados }} empresa(s) cadastrada(s)</h4>
          <br />
        </material-card>
      </v-col>
            <v-col cols="12" md="4" lg="4">
        <material-card
          icon="mdi-account-hard-hat"
          icon-small
          subtitle="Tecnicos"
          color="teal darken-3"
        >
          <h4>{{ tecnicosCadastrados }} tecnico(s) cadastrado(s)</h4>
          <br />
        </material-card>
      </v-col>
            <v-col cols="12" md="4" lg="4">
        <material-card
          icon="mdi-toolbox"
          icon-small
          subtitle="Serviços"
          color="teal darken-3"
        >
          <h4>{{ servicosCadastrados }} serviço(s) cadastrado(s)</h4>
          <br />
        </material-card>
      </v-col>
    </v-row>
    <v-snackbar
      :color="snackbar.color"
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialCard from "./MaterialCard.vue";
import clientesService from "../services/clientesService";
import tecnicosService from "../services/tecnicosService";
import servicosService from "../services/servicosService";

export default Vue.extend({
  name: "Dashboard",
  components: {
    MaterialCard,
  },

  data: () => ({
    clientes: [],
    tecnicos: [],
    servicos: [],
    snackbar: {
      show: false,
      message: "",
      color: "",
      timeout: 2000,
    },
    clientesCadastrados: 0,
    tecnicosCadastrados: 0,
    servicosCadastrados: 0,
  }),
  async created() {
    await this.pegarClientes();
    await this.pegarTecnicos();
    await this.pegarServicos();
    
  },
  methods: {
    pegarClientes() {
      clientesService
        .getClientes()
        .then((res) => {
          this.clientes = res.data;
          this.clientesCadastrados = res.data.length
        })
        .catch(() => {
          this.snackbar = {
            message: 'Não foi possivel acessar o banco de dados',
            color: "error",
            show: true,
            timeout: 2000,
          };
        });
    },
    pegarTecnicos() {
      tecnicosService
        .getTecnicos()
        .then((res) => {
          this.tecnicos = res.data;
          this.tecnicosCadastrados = res.data.length
        })
        .catch(() => {
          this.snackbar = {
            message: 'Não foi possivel acessar o banco de dados',
            color: "error",
            show: true,
            timeout: 2000,
          };
        });
    },
    pegarServicos() {
      servicosService
        .getServicos()
        .then((res) => {
          this.servicos = res.data;
          this.servicosCadastrados = res.data.length
        })
        .catch(() => {
          this.snackbar = {
            message: 'Não foi possivel acessar o banco de dados',
            color: "error",
            show: true,
            timeout: 2000,
          };
        });
    },
  },
});
</script>
