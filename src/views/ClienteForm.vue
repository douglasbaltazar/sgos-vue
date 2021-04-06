<template>
  <v-container id="user-profile-view" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <material-card color="teal darken-3" icon="mdi-account">
          <template #title>
            <small>Cadastrar Cliente</small>
          </template>
          <v-form ref="form">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    color="teal"
                    label="Nome"
                    :rules="inputRules"
                    v-model="form.nome"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    color="teal"
                    label="Telefone"
                    :rules="inputRules"
                    v-model="form.telefone"
                  />
                </v-col>

                <v-col cols="12" md="12">
                  <v-text-field
                    color="teal"
                    label="Email"
                    :rules="inputRules"
                    type="email"
                    v-model="form.email"
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
                <v-snackbar :color="snackbar.color" v-model="snackbar.show" :timeout="snackbar.timeout">
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
import MaterialCard from "../components/MaterialCard.vue";
import clientesService from "../services/clientesService.ts";
export default {
  name: "ClienteForm",
  components: {
    MaterialCard,
  },
  data: () => ({
    form: {
      nome: "",
      telefone: "",
      email: "",
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
  }),
  methods: {
    cadastrar() {
      if (this.$refs.form.validate()) {
        console.log(this.form);
        const obj = {
          nome: this.form.nome,
          email: this.form.email,
          telefone: this.form.telefone,
        };
        clientesService
          .createCliente(obj)
          .then((res) => {
            this.snackbar = {
              message: "Cadastrado com sucesso",
              color: "success",
              show: true,
              timeout: 2000
            };
            this.$router.push("/clientes");
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
        nome: "",
        telefone: "",
        email: "",
      };
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>