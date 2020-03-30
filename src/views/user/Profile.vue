<template>
  <div>
    <div class="container mt-4">
      <div class="row" v-if="user && user.loggedIn">
        <div class="col-md-12">
          <h4>Hi {{user.data.displayName}}!</h4>
          email : {{user.data.email}}
        </div>
      </div>
      <div class="row" v-else>
          <div class="col-sm-12">
              <h4>You are not logged in</h4>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style>
</style>