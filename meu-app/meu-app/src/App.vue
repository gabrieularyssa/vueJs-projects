<template>
  <div id="app">
    <img src="./assets/cronometro.png" alt="" class="img">
    <a href="" class="timer">{{numero}}</a>
    <div class="areaBtn">
      <button class="btn" @click="iniciar" >{{botao}}</button>  
      <button class="btn" @click="limpar">LIMPAR</button>
    </div>
    <div class="list" v-show="historico.length> 0">
      <ul>
        <li v-for="item in historico" :key='item'>VOCÊ FEZ UMA PAUSA EM: {{item}}</li>
      </ul>
      <button class='btn' @click="historico = []">LIMPAR HISTÓRICO</button>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'App',
    data(){
      return{
        numero:0,
        botao:"INICIAR",
        timer: null,
        ss:0,
        mm:0,
        hh:0,
        historico: []
      }
    },
    methods:{
      iniciar(){
        if(this.timer !== null){
          //ja tem algo rodando no timer
          clearInterval(this.timer)
          this.timer = null 
          this.botao = 'INICIAR'
          if(this.ss !== 0){
            this.historico.push(this.numero)
          }
        }else{
          //o cronometro ainda nao foi iniciado
          this.timer = setInterval(() => {
            this.rodarTimer();
            }, 1000);
            this.botao = 'PAUSAR';
        }
      },
      limpar(){
        if(this.timer !== null){
          clearInterval(this.timer);
          this.timer = null
          this.ss = 0
          this.mm = 0
          this.hh = 0
          this.numero = 0
          this.botao = "INICIAR"
          this.historico = []
        }
      },
      rodarTimer(){
        this.ss++
        if(this.ss == 59){
          this.ss = 0
          this.mm++;
        }
        if(this.mm == 59){
          this.mm = 0
          this.hh++;
        }
        let format = (this.hh < 10 ? '0'+this.hh : this.hh)+':'+(this.mm < 10 ? '0'+this.mm+':' : this.mm+':')+ (this.ss < 10 ? '0'+this.ss : this.ss)

        return this.numero = format

      },
    

    }

  }
</script>

<style>
  #app{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .img{
    width: 75%;
    height: 75%;
    padding-top: 20px;
  }
  .timer{
    color: #fff;
    font-size:55px;
    margin-top: -170px;
    text-decoration: none;
  }
  .areaBtn{
    margin-top: 175px;
  }
  .btn{
    width: 150px;
    background-color: #fff;
    font-size: 20px;
    border: 0;
    border-radius: 5px;
    text-align: center;
    margin-left: 15px;
    margin-right: 15px;
    padding: 6px;
    cursor: pointer;
    -webkit-user-select: none;
  }
  .btn:hover{
    opacity: 0.8;
    transition: all 0.50s;
  }
  ul {
    text-align: center;
    padding: 0;
  }
  ul li {
    margin-top:4px;
    padding: 15px;
    background-color: #707070;
    list-style: none;
    color: #fff;
    font-size: 10px;
    border-radius: 5px;
  }


  @media (min-width: 400px) {
    .timer{
      color: #fff;
      font-size:70px;
      margin-top: -230px;
      text-decoration: none;
    }
    .img{
      width: 420px;
      height: 420px;
      padding-top: 100px;
  }
}
</style>
