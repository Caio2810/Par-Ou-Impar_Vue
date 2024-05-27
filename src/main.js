// main.js

// Importando as bibliotecas e componentes necessários
import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/index.css'
import { createRouter, createWebHistory } from 'vue-router'
import Game from './components/Game.vue'
import Content from './components/Content.vue'

// Definindo as rotas da aplicação
const routes = [
  { path: '/', component: Content }, // Rota padrão
  { 
    path: '/game', 
    component: Game, 
    // Passando props para o componente Game a partir dos parâmetros da URL
    props: (route) => ({ 
      numero: route.query.numero,
      opcao: route.query.opcao
    })
  }
];

// Criando o router
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Criando a aplicação Vue
const app = createApp(App)

// Adicionando o plugin Toast à aplicação
app.use(Toast)

// Adicionando o router à aplicação
app.use(router)

// Montando a aplicação no elemento com o id 'app' do HTML
app.mount('#app')
