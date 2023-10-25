<template>
  <div id="app">
   
    <hr>
    <div class="autenticacao" v-if="!user">
      <h1>Entrar/Cadastrar</h1>
      <label>Email:</label> 
      <input type="email" v-model="email">
      <label>Senha:</label> 
      <input type="password" v-model="senha"> <br>
      <button @click="cadastrarUsuario">Cadastrar Usuário</button>
      <button @click="entrar">ENTRAR</button>
    </div>
    <div class="autenticacao" v-else>
      <h1>{{this.email + ' esta logado'}}</h1>
      
      <button @click="sair">SAIR</button>
    </div>
    <hr>

    <hr>
   
    <hr>
    <div class="input">
      <h1>CRUD Firebase + VueJS</h1>
      <label>ID:</label>
      <input type="text" v-model="idPost">

      <label>Tarefa:</label>
      <input type="text" v-model="tarefa">

      <label>Autor:</label>
      <input type="text" v-model="autor">

      <button @click="cadastrar">Cadastrar</button>
      <button @click="buscarPosts">Buscar Posts</button>
      <button @click="atualizaPost">Atualizar</button>
    </div>
    <hr/>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <strong>ID:</strong> {{post.id}} 
        <strong>Tarefa:</strong> {{post.tarefa}} 
       <strong>Autor:</strong> {{post.autor}} 
       <button @click="deletarPost(post.id)">Deletar Post</button>
       <hr>
      </li>
    </ul>
    <hr>
    <div class="box">
      <h2>Autenticação e Dados</h2>
      <label>Nome:</label><input type="text" v-model="nomeDois"><br>
      <label>Email:</label><input type="email" v-model="emailDois"><br>
      <label>Senha:</label><input type="password" v-model="senhaDois"><br>
      <button @click="cadastroDois">Cadastrar</button>
    </div>
  </div>
</template>

<script>

import firebase from './services/firebaseConnection'
// import 'firebase/firestore'
export default {
  name: 'App',
  data(){
    return{
      idPost: '',
      tarefa: '',
      autor: '',
      posts: [],
      email: '',
      senha:'',
      user: false,
      emailDois: '',
      senhaDois:'',
      nomeDois:"",
    }
  },
  async created(){

    await firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = true
        this.email = user.email
      }
    })
    this.posts = []
    await firebase.firestore().collection('posts')
    //olheiro para cada atualização no array de posts
    .onSnapshot((doc) =>{
      this.posts = []
      doc.forEach((item) =>{
        this.posts.push({
          id: item.id,
          tarefa: item.data().tarefa,
          autor: item.data().autor
        })
      })
    })
  },
  methods:{
    async cadastrar(){
      if((this.autor && this.tarefa) != '' ){
        await firebase.firestore().collection('posts')
          .add({
            tarefa: this.tarefa,
            autor: this.autor,
          })
          .then(()=>{
            this.autor = '',
            this.tarefa = ''
            console.log('cadastrado com sucesso')
          })
          .catch((err) => console.log(`Erro gerado: ${err}`))
      }else{
        //usei para testar se a condição de campos preenchidos
        alert('Preencha os campos')
      }
    },
    async buscarPosts(){
      //acessa apenas uma doc especifica

      // await firebase.firestore().collection('posts')
      // .doc('123')
      // .get()
      // .then((snapshot)=>{
      //   this.tarefa = snapshot.data().tarefa
      //   this.autor = snapshot.data().autor
      // })
      // .catch((err) => console.log(err))

      //acessa todas as docs da collection
      this.posts = []
      await firebase.firestore().collection('posts')
      .get()
      .then((snapshot) =>{
        snapshot.forEach((doc)=>{
          this.posts.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            autor: doc.data().autor,
          })
        })
      })
      .catch((err) => console.log(err))
    },
    async atualizaPost(){
      await firebase.firestore().collection('posts').doc(this.idPost)
      .update({
        tarefa: this.tarefa,
        autor: this.autor
      })
      .then(()=>{
        console.log('ATUALIZADO COM SUCESSO')
        this.autor = ''
        this.tarefa = ''
        this.idPost = ''
      })
      .catch((err) => console.log(err))
    },
    async deletarPost(id){

      await firebase.firestore().collection('posts').doc(id)
      .delete()
      .then(() => {
        console.log('post deletado')
      })

    },
  async cadastrarUsuario(){
    await firebase.auth().createUserWithEmailAndPassword(this.email, this.senha)
    .then(() =>{
      this.email ='';
      this.senha = '';
    })
    .catch((err) =>{
      if(err.code === 'auth/weak-password'){
        alert('senha muito fraca')
        console.log(err.code)
      }else if(err.code === 'auth/email-already-in-use'){
        alert('este email ja existe')
        console.log(err)
      }
      // console.log(err.code)
    })
  },
  async entrar(){ 
    await firebase.auth().signInWithEmailAndPassword(this.email, this.senha)
    .then((response) =>{
      console.log(response)
    })
    .catch((err) => console.log(err))
  },
  async sair(){
    await firebase.auth().signOut()
    .then(() => {
      this.user = false
      this.email = ''
    })
    .catch((err) => console.log(err))
  },
  async cadastroDois(){
    const {user} = await firebase.auth().createUserWithEmailAndPassword(this.emailDois, this.senhaDois)
    await firebase.firestore().collection('users')
    .doc(user.uid)
    .set({
      nome: this.nomeDois
    })
    .then(() => {
      this.nomeDois = "";
      this.emailDois ="";
      this.senhaDois = "";
      console.log(`eu cadastrei o email ${user.email}, seu ID, é:${user.uid}`)
    })
    .catch((err) => console.log(err))
  },

  },
  
  components: {

  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul li {
  list-style: none;
}
.input{
  width: 100%;
  height: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.label{
  font-size: 25px;
}
</style>
