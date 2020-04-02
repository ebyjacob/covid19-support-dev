<template>
  <div>
    Admin
  {{user}}
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
}
</script>