import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from './services/firebaseConnection'

Vue.config.productionTip = false

let app 
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})

//onAuthStateChanged é uma função do Firebase Authentication que permite que você registre um observador para detectar alterações no estado de autenticação de um usuário. 

