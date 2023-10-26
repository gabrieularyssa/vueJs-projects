<template>
  <div id="home">
    <h1>Dashboard</h1>
    <button @click="logout">sair</button>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection'

export default {
//eslint-disable-next-line
  name: 'Dashboard',
  data(){
    return{

    }
  },
  methods:{
    async logout(){
      //recebe bool
      const confirm = window.confirm('você realmente deseja sair?')
      if(confirm){
        await firebase.auth().signOut()
        //excluir dados do localStorage
        .then(async()=>{
          await localStorage.removeItem('devPost')
          this.$router.push('/login')
        })
      }else{
        return
      }
    }
  }
}
</script>

<style scoped>

</style>


