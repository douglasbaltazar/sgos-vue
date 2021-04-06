<template>
  <div class="container">
    <material-card
      icon="mdi-account"
      icon-small
      title="Clientes"
      color="teal darken-3"
    >
      <v-data-table
        :headers="headers"
        :items="clientes"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="teal darken-1"
                  dark
                  class="mb-2"
                  to="/clientes/novo"
                  v-bind="attrs"
                  v-on="on"
                >
                  Novo Cliente
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-form ref="form">
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.nome"
                            :rules="inputRules"
                            label="Nome Completo"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.email"
                            :rules="inputRules"
                            label="E-mail"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="5">
                          <v-text-field
                            v-model="editedItem.telefone"
                            :rules="inputRules"
                            label="Telefone"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Salvar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Quer mesmo deletar esse cliente?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="error" @click="pegarClientes"> Tentar novamente </v-btn>
        </template>
      </v-data-table>
    </material-card>
  </div>
</template>

<script>
import MaterialCard from "../components/MaterialCard.vue";
import clientesService from "../services/clientesService.ts";
export default {
  name: "clientes",
  components: {
    MaterialCard,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nome Empresa",
        align: "start",
        value: "nome",
      },
      { text: "Email", value: "email", sortable: false },
      { text: "Telefone", value: "telefone", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    inputRules: [
      (v) => !!v || "O campo é obrigatório",
      (v) => (v && v.length >= 3) || "Tamanho minimo são 3 caracteres",
      (v) => (v && v.length < 50) || "O tamanho maximo são 50 caracteres.",
    ],
    clientes: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      nome: "",
      email: 0,
      telefone: 0,
    },
    defaultItem: {
      id: 0,
      nome: "",
      email: 0,
      telefone: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Cliente" : "Editar Cliente";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.pegarClientes();
  },

  methods: {
    async pegarClientes() {
      clientesService.getClientes().then((response) => {
        this.clientes = response.data;
        console.log(this.clientes);
      });
    },
    editItem(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.clientes.splice(this.editedIndex, 1);
      clientesService.deleteCliente(this.editedItem)
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        if (this.$refs.form.validate()) {
          Object.assign(this.clientes[this.editedIndex], this.editedItem);
          clientesService.editCliente(this.editedItem)
          this.close();
        }
      } else {
        this.clientes.push(this.editedItem);
        this.close();
      }
      
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
  max-width: 850px;
}
</style>