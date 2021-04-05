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
                <v-col cols="12" md="6">
                  <v-text-field
                    color="teal"
                    label="Cliente (AUTO COMPLETE) "
                    :rules="inputRules"
                    v-model="form.cliente"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    color="teal"
                    label="Tecnico (AUTO COMPLETE)"
                    :rules="inputRules"
                    v-model="form.tecnico"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    :items="tipos"
                    :rules="selectRules"
                    label="Tipo"
                    outlined
                    v-model="form.tipo"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    :items="statuses"
                    label="Status"
                    :rules="selectRules"
                    outlined
                    v-model="form.status"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    :items="prioridades"
                    label="Prioridade"
                    :rules="selectRules"
                    outlined
                    v-model="form.prioridade"
                  >
                  </v-select>
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
  name: "ServicoForm",
  components: {
    MaterialCard,
  },
  data: () => ({
    form: {
      cliente: "",
      tecnico: "",
      tipo: "",
      status: "",
      prioridade: "",
    },
    inputRules: [
      (v) => !!v || "O campo é obrigatório",
      (v) => (v && v.length >= 3) || "Tamanho minimo são 3 caracteres",
      (v) => (v && v.length < 50) || "O tamanho maximo são 50 caracteres.",
    ],
    selectRules: [
        (v) => !!v || "Selecione alguma opção"
    ],
    tipos: ["Maquina", "Sistema"],
    statuses: ["CADASTRADO", "EM MANUNTEÇÃO", "RESOLVIDO"],
    prioridades: ['BAIXA', 'NORMAL', 'URGENTE'],

  }),
  methods: {
    cadastrar() {
      if (this.$refs.form.validate()) {
        console.log(this.form);
      }
    },
    limpar() {
      this.form = {
        cliente: "",
        tecnico: "",
        tipo: "",
        status: "",
        prioridade: "",
      };
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>