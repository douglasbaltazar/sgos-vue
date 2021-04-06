<template>
 <div class="container">
   <material-card
      icon="mdi-toolbox"
      icon-small
      title="Serviços"
      color="teal darken-3"
    >
      <v-data-table
    :headers="headers"
    :items="servicos"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="teal darken-1"
              dark
              class="mb-2"
              to="/servicos/novo"
              v-bind="attrs"
              v-on="on"
            >
              Novo Atendimento
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nome Completo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.tipo"
                      label="E-mail"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="5"
                  >
                    <v-text-field
                      v-model="editedItem.tecnico"
                      label="tecnico"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="error"
        @click="pegarPedidos"
      >
        Tentar novamente
      </v-btn>
    </template>
  </v-data-table>
    </material-card>
    
 </div>
</template>

<script>
import MaterialCard from '../components/MaterialCard.vue'
import servicosService from '../services/servicosService.ts'
export default {
    name: 'servicos',
    components: {
        MaterialCard
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Empresa',
          align: 'start',
          value: 'cliente.nome',
        },
        { text: 'Tecnico', value: 'tecnico.nome', sortable: false },
        { text: 'Tipo', value: 'tipo', sortable: false },
        { text: 'Status', value: 'status', sortable: false },
        { text: 'Prioridade', value: 'prioridade' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      servicos: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        tipo: 0,
        tecnico: 0,
      },
      defaultItem: {
        name: '',
        tipo: 0,
        tecnico: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Serviço' : 'Editar Serviço'
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

    async created () {
      this.pegarPedidos();
    },

    methods: {
      async pegarPedidos() {
        servicosService.getServicos().then((response) => {
          this.servicos = response.data
        })
      },
      initialize () {
        this.servicos = [
          {
            name: 'Douglas',
            tipo: 'douglasbaltazar1@gmail.com',
            tecnico: '998199161',
            status: "CADASTRADO",
            prioridade: "ALTA"
          },
          {
            name: 'Ice cream sandwich',
            tipo: 'douglasbaltazar1@gmail.com',
            tecnico: '998199161',
            status: "CADASTRADO",
            prioridade: "ALTA"
          },
          {
            name: 'Eclair',
            tipo: 'douglasbaltazar1@gmail.com',
            tecnico: '998199161',
            status: "CADASTRADO",
            prioridade: "ALTA"
          },
          {
            name: 'Cupcake',
            tipo: 'douglasbaltazar1@gmail.com',
            tecnico: '998199161',
            status: "CADASTRADO",
            prioridade: "ALTA"
          },
          {
            name: 'Gingerbread',
            tipo: 'douglasbaltazar1@gmail.com',
            tecnico: '998199161',
            status: "CADASTRADO",
            prioridade: "ALTA"
          },
          {
            name: 'Jelly bean',
            tipo: 'douglasbaltazar1@gmail.com',
            tecnico: '998199161',
            status: "CADASTRADO",
            prioridade: "ALTA"
          },
          {
            name: 'Lollipop',
            tipo: 'douglasbaltazar1@gmail.com',
            tecnico: '998199161',
            status: "CADASTRADO",
            prioridade: "ALTA"
          },
          {
            name: 'Honeycomb',
            tipo: 'douglasbaltazar1@gmail.com',
            tecnico: '998199161',
            status: "CADASTRADO",
            prioridade: "ALTA"
          },
          {
            name: 'Donut',
            tipo: 'douglasbaltazar1@gmail.com',
            tecnico: '998199161',
            status: "CADASTRADO",
            prioridade: "ALTA"
          },
          {
            name: 'KitKat',
            tipo: 'douglasbaltazar1@gmail.com',
            tecnico: '998199161',
            status: "CADASTRADO",
            prioridade: "ALTA"
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.servicos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.servicos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.servicos.splice(this.editedIndex, 1)
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
          Object.assign(this.servicos[this.editedIndex], this.editedItem)
        } else {
          this.servicos.push(this.editedItem)
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