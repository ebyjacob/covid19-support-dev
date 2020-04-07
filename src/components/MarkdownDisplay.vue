<template>
    <div v-html="output"></div>
</template>

<script>
  import marked from 'marked';
  export default {
    computed: {
      output(){
        return marked(this.text);
      }
    },
    props: ['text']
  }
</script>