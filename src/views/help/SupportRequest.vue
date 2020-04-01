<template>
  <div>
    <div class="container mt-4">
      <div class="row" v-if="user && user.loggedIn">
        <div class="col-sm-12">
          <div class="card mt-4">
            <div class="card-body" v-if="supportrequest && supportrequest.request">
              <h4 class="text-primary">{{supportrequest.request.title}}</h4><br/>
              {{supportrequest.request.detail}}
              <br /><br/>
              {{supportrequest}}
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-sm-12">
          <h4>You haven't logged in</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      supportrequest: {}
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  created() {
    if (
      this.user &&
      this.user.data &&
      this.user.data.email &&
      this.$route.params.supportrequestid
    ) {
      var db = firebase.firestore();
      db.collection("support_requests")
        .doc(this.$route.params.supportrequestid)
        .get()
        .then(docRef => {
          this.supportrequest = docRef.data();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>