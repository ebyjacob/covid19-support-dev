<template>
    
</template>
<script>
import firebase from "firebase";
export default {
  created() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.replace({
          name: "login"
        });
      })
      .catch(() => {
        this.$router.replace({
          name: "welcome"
        });
      });
  }
};
</script>