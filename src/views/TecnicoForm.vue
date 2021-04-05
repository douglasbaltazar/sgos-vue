<template>
  <v-container id="user-profile-view" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <material-card color="teal darken-3" icon="mdi-account-hard-hat">
          <template #title>
            <small>Cadastrar Tecnico</small>
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

                <v-col cols="12" md="8">
                  <v-text-field
                    color="teal"
                    label="Email"
                    :rules="inputRules"
                    type="email"
                    v-model="form.email"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    color="teal"
                    label="Max. Atendimentos"
                    type="number"
                    :rules="atendimentoRules"
                    v-model="form.numAtendimentos"
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
export default {
  name: "TecnicoForm",
  components: {
    MaterialCard,
  },
  data: () => ({
    form: {
      nome: "",
      telefone: "",
      email: "",
      numAtendimentos: '',
    },
    inputRules: [
      (v) => !!v || "O campo é obrigatório",
      (v) => (v && v.length >= 3) || "Tamanho minimo são 3 caracteres",
      (v) => (v && v.length < 50) || "O tamanho maximo são 50 caracteres.",
    ],
    atendimentoRules: [
        (v) => (!!v && v !== 0) || "O campo é obrigatório"
    ]
  }),
  methods: {
    cadastrar() {
      if (this.$refs.form.validate()) {
        console.log(this.form);
      }
    },
    limpar() {
      this.form = {
        nome: "",
        telefone: "",
        email: "",
        numAtendimentos: '',
      };
      this.$refs.form.reset()
    },
  },
};
</script>

<style>
</style>