<template>
  <div class="container">
    <material-card
      icon="mdi-account-hard-hat"
      icon-small
      title="Técnicos"
      color="teal darken-3"
    >
      <v-data-table
        :headers="headers"
        :items="tecnicos"
        sort-by="numAtendimentos"
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
                  to="/tecnicos/novo"
                  v-bind="attrs"
                  v-on="on"
                >
                  Novo Tecnico
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.nome"
                          label="Nome Completo"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.email"
                          label="E-mail"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field
                          v-model="editedItem.telefone"
                          label="Telefone"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.numAtendimentos"
                          label="Numero Atendimentos"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
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
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
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
          <v-btn color="error" @click="pegarTecnicos"> Tentar novamente </v-btn>
        </template>
      </v-data-table>
    </material-card>
  </div>
</template>

<script>
import MaterialCard from '../components/MaterialCard.vue'
import tecnicosServices from '../services/tecnicosService.ts'
export default {
    name: 'Tecnicos',
    components: {
        MaterialCard
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nome',
          align: 'start',
          value: 'nome',
        },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Telefone', value: 'telefone', sortable: false },
        { text: 'Atendimentos', value: 'numAtendimentos' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      tecnicos: [],
      editedIndex: -1,
      editedItem: {
        nome: '',
        email: 0,
        telefone: 0,
        numAtendimentos: 0,
      },
      defaultItem: {
        nome: '',
        email: 0,
        telefone: 0,
        numAtendimentos: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Tecnico' : 'Editar Tecnico'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.pegarTecnicos()
    },

    methods: {
      async pegarTecnicos() {
        tecnicosServices.getTecnicos().then((response) => {
          this.tecnicos = response.data
          console.log(this.tecnicos)
        })
      },
      initialize () {
        this.tecnicos = [
          {
            nome: 'Douglas',
            email: 'douglasbaltazar1@gmail.com',
            telefone: '998199161',
            numAtendimentos: 2,
          },
          {
            nome: 'Ice cream sandwich',
            email: 'douglasbaltazar1@gmail.com',
            telefone: '998199161',
            numAtendimentos: 37,
          },
          {
            nome: 'Eclair',
            email: 'douglasbaltazar1@gmail.com',
            telefone: '998199161',
            numAtendimentos: 23,
          },
          {
            nome: 'Cupcake',
            email: 'douglasbaltazar1@gmail.com',
            telefone: '998199161',
            numAtendimentos: 67,
          },
          {
            nome: 'Gingerbread',
            email: 'douglasbaltazar1@gmail.com',
            telefone: '998199161',
            numAtendimentos: 49,
          },
          {
            nome: 'Jelly bean',
            email: 'douglasbaltazar1@gmail.com',
            telefone: '998199161',
            numAtendimentos: 94,
          },
          {
            nome: 'Lollipop',
            email: 'douglasbaltazar1@gmail.com',
            telefone: '998199161',
            numAtendimentos: 98,
          },
          {
            nome: 'Honeycomb',
            email: 'douglasbaltazar1@gmail.com',
            telefone: '998199161',
            numAtendimentos: 87,
          },
          {
            nome: 'Donut',
            email: 'douglasbaltazar1@gmail.com',
            telefone: '998199161',
            numAtendimentos: 51,
          },
          {
            nome: 'KitKat',
            email: 'douglasbaltazar1@gmail.com',
            telefone: '998199161',
            numAtendimentos: 65,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.tecnicos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.tecnicos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.tecnicos.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.tecnicos[this.editedIndex], this.editedItem)
        } else {
          this.tecnicos.push(this.editedItem)
        }
        this.close()
      },
    },
}
</script>

<style>
.container {
  margin-top: 20px;
  max-width: 850px;
}
</style>