<template>
  <div id="app">
    <header>Minhas Tarefas</header>
    <TaskItem></TaskItem>
  </div>
</template>

<script>
import TaskItem from './components/Tasks.vue'
export default {
  name: 'App',
  components: {
    TaskItem
  }
}
</script>

<style>
  header{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    font-size: 40px;
    color: #fff;
  }
</style>
