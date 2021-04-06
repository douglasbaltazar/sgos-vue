<template>
  <v-container id="user-profile-view" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <material-card color="teal darken-3" icon="mdi-toolbox">
          <template #title>
            <small>Cadastrar Agendamento</small>
          </template>
          <v-form ref="form">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="5">
                  <v-autocomplete
                    v-model="form.cliente"
                    :loading="loading"
                    :items="clientes"
                    :search-input.sync="procurarClientes"
                    cache-items
                    item-text="nome"
                    flat
                    hide-no-data
                    hide-details
                    return-object
                    label="Cliente"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="5">
                  <v-autocomplete
                    v-model="form.tecnico"
                    :loading="loading2"
                    :items="tecnicos"
                    :search-input.sync="procurarTecnicos"
                    cache-items
                    item-text="nome"
                    flat
                    hide-no-data
                    hide-details
                    return-object
                    label="Tecnicos"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    color="teal"
                    label="Valor"
                    type="number"
                    :rules="valorRules"
                    v-model="form.valor"
                  />
                </v-col>

                <v-col cols="12" md="12">
                  <v-select
                    :items="tipos"
                    :rules="selectRules"
                    label="Tipo"
                    outlined
                    v-model="form.tipo"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="12">
                  <v-select
                    :items="statuses"
                    label="Status"
                    :rules="selectRules"
                    outlined
                    v-model="form.status"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="12">
                  <v-select
                    :items="prioridades"
                    label="Prioridade"
                    :rules="selectRules"
                    outlined
                    v-model="form.prioridade"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="12">
                  <v-textarea
                    color="teal"
                    label="Descricao"
                    no-resize
                    counter="250"
                    :rules="descricaoRules"
                    v-model="form.descricao"
                  />
                </v-col>
                <v-col cols="12" class="text-right my-4">
                  <v-btn
                    color="error"
                    class="mr-2"
                    min-width="80"
                    @click="limpar"
                  >
                    Limpar
                  </v-btn>
                  <v-btn color="primary" min-width="150" @click="cadastrar"
                    >Cadastrar</v-btn
                  >
                </v-col>
                <v-snackbar
                  :color="snackbar.color"
                  v-model="snackbar.show"
                  :timeout="snackbar.timeout"
                >
                  {{ snackbar.message }}
                </v-snackbar>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import servicosService from "@/services/servicosService";
import MaterialCard from "../components/MaterialCard.vue";
import clientesService from "../services/clientesService.ts";
import tecnicosServices from "../services/tecnicosService.ts";
export default {
  name: "ServicoForm",
  components: {
    MaterialCard,
  },
  data: () => ({
    loading: false,
    loading2: false,
    clientes: [],
    tecnicos: [],
    procurarClientes: null,
    procurarTecnicos: null,
    select: null,
    form: {
      cliente: "",
      tecnico: "",
      tipo: "",
      status: "",
      prioridade: "",
      valor: "",
      descricao: "",
    },
    snackbar: {
      show: false,
      message: null,
      color: null,
      timeout: 2000,
    },
    inputRules: [
      (v) => !!v || "O campo é obrigatório",
      (v) => (v && v.length >= 3) || "Tamanho minimo são 3 caracteres",
      (v) => (v && v.length < 50) || "O tamanho maximo são 50 caracteres.",
    ],
    valorRules: [
      (v) => !!v || "O campo é obrigatório",
      (v) => (v && v.length < 6) || "O tamanho maximo são 6 caracteres.",
    ],
    selectRules: [(v) => !!v || "Selecione alguma opção"],
    descricaoRules: [
      (v) => v.length < 250 || "O tamanho maximo são 250 caracteres.",
    ],
    tipos: ["Maquina", "Sistema"],
    statuses: ["CADASTRADO", "EM MANUNTEÇÃO", "RESOLVIDO"],
    prioridades: ["BAIXA", "NORMAL", "URGENTE"],
  }),
  watch: {
    procurarClientes(val) {
      val && val !== this.select && this.querySelections(val);
    },
    procurarTecnicos(val) {
      val && val !== this.select && this.querySelections2(val);
    },
  },
  created() {
    this.pegarClientes();
    this.pegarTecnicos();
  },

  methods: {
    async pegarClientes() {
      clientesService.getClientes().then((response) => {
        this.clientes = response.data;
        console.log(this.clientes);
      });
    },
    async pegarTecnicos() {
      tecnicosServices.getTecnicosDisponiveis().then((response) => {
        this.tecnicos = response.data;
        console.log(this.tecnicos);
      });
    },
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.clientes = this.clientes.filter((e) => {
          return (
            (e || "")
              .toString()
              .toLowerCase()
              .indexOf((v || "").toString().toLowerCase()) > -1
          );
        });
        this.loading = false;
      }, 500);
    },
    querySelections2(v) {
      this.loading2 = true;
      setTimeout(() => {
        this.tecnicos = this.tecnicos.filter((e) => {
          return (
            (e || "")
              .toString()
              .toLowerCase()
              .indexOf((v || "").toString().toLowerCase()) > -1
          );
        });
        this.loading2 = false;
      }, 500);
    },
    async cadastrar() {
      if (this.$refs.form.validate()) {
        if ((!this.form.tecnico != null) || (!this.form.cliente != null)) {
          this.snackbar = {
            message: "Cliente ou Tecnico estão em branco.",
            color: "error",
            show: true,
            timeout: 2000,
          };
          return;
        }
        
        console.log(this.form);
        const obj = {
          cliente: this.form.cliente,
          tecnico: this.form.tecnico,
          tipo: this.form.tipo,
          status: this.form.status,
          prioridade: this.form.prioridade,
          valor: this.form.valor,
          descricao: this.form.descricao,
        };
        const tecnico = await tecnicosServices.getById(obj.tecnico.id);
        const tecnico2 = await tecnicosServices.increaseById(tecnico.data);
        await servicosService
          .createServico(obj)
          .then((res) => {
            this.$router.push("/servicos");
          })
          .catch(() => {
            this.snackbar = {
              message: "Erro ao cadastrar",
              color: "error",
              show: true,
              timeout: 2000,
            };
          });
      }
    },
    limpar() {
      this.form = {
        cliente: "",
        tecnico: "",
        tipo: "",
        status: "",
        prioridade: "",
        valor: "",
        descricao: "",
      };
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>