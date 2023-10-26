<template>
  <div id="login">
    <div class="loginArea" v-if="login">
      <h1>Entrar</h1>
      <form @submit.prevent="handleLogin">
        <input type="text" placeholder="email@email.com" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit">Acessar</button>
      </form>
      <a @click="toggleBtn">Criar Conta</a>
    </div>

    <div class="loginArea" v-else>
      <h1>Cadastrar</h1>
      <form @submit.prevent="handleRegister">
        <input type="text" placeholder="nome" v-model="nome">
        <input type="email" placeholder="email@email.com" v-model="email">
        <input type="password" placeholder="crie aqui a sua senha" v-model="password">
        <button type="submit">Cadastrar</button>
      </form>
      <a @click="toggleBtn">Já possuo uma conta</a>
    </div>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection'

export default {
//eslint-disable-next-line
  name: 'Home',
  data(){
    return{
      nome: '',
      email:'',
      password:'',
      login: true,
    }
  },
  methods:{
    toggleBtn(){
      this.login = !this.login;
      this.nome ='';
      this.email ='';
      this.password ='';
    },
    async  handleRegister(){
      const {user} = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      
      //cria a colletion users caso nao exista e adiciona os campos
      await firebase.firestore().collection('users')
      .doc(user.uid).set({
        nome: this.nome
      })
      .then(async() => {
        //salva informaçõe no localStorage para evitar consulta no banco
        const usuarioLogado = {
          uid: user.uid,
          nome: this.nome
        }
        await localStorage.setItem('devPost', JSON.stringify(usuarioLogado))
        console.log(`usuario de ide:${user.uid}`)
      })
      .catch((err) => console.log(err))
      //se nao cair no erro, segue para a proxima instução
      //a instrução é encaminhar o usuario logado para a pagina de home
      this.$router.push('/')
      },
      async handleLogin(){
      const { user } = await  firebase.auth().signInWithEmailAndPassword(this.email, this.password)

      //buscaro nome do usuario logado
    
      const userProfile = await firebase.firestore().collection('users')
      .doc(user.uid).get();

      const usuarioLogado ={
        uid: user.uid,
        nome: userProfile.data().nome
      }

      await localStorage.setItem('devPost', JSON.stringify(usuarioLogado))

      this.$router.push('/')

      }

     
  }
}
</script>

<style scoped>
  h1{
    text-align: center;
    color: #fff;
  }
  .loginArea{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    margin-top:65px;
    max-width: 600px;
    background-color: #4c5059;
    border-radius: 5px;
  }
  form{
    display: flex;
    flex-direction: column;
    margin: 0 25px;
  }
  input{
    margin-bottom:10px;
    height: 15px;
    width: 300px;
    font-size: 18px;
    padding: 10px;
    outline: none;
    border: 0;
    background: rgb(241, 241, 241)
  }
  form button{
    height: 25px;
    border: 0;
    background-color:#7289c4;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }
  .loginArea a{
    margin-top:20px;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }
</style>


