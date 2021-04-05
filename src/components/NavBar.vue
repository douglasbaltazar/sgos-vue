<template>
  <div>
    <v-app-bar color="teal darken-4" clipped dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="SGOT"
          class="shrink mr-2"
          contain
          src="../assets/iconwhite.png"
          transition="scale-transition"
          width="25"
        />
        <span class="shrink mt-1 hidden-sm-and-down">Sistema Gerenciador de Ordens de Serviço</span>
        
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/douglasbaltazar" target="_blank" text>
        <span class="mr-2">GitHub/dougBaltazar</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="darken-3--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/tecnicos">
            <v-list-item-icon>
              <v-icon>mdi-account-hard-hat</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tecnicos</v-list-item-title>
          </v-list-item>
          <v-list-item to="/clientes">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Clientes</v-list-item-title>
          </v-list-item>
          <v-list-item to="/servicos">
            <v-list-item-icon>
              <v-icon>mdi-toolbox</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Serviços</v-list-item-title>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sobre</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>

<style>
</style>